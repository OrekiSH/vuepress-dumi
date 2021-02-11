<script>
import { isActive, hashRE, groupHeaders } from '../util'

export default {
  functional: true,

  props: ['item', 'sidebarDepth'],

  render (h,
    {
      parent: {
        $page,
        $route,
        $themeConfig,
        $themeLocaleConfig
      },
      props: {
        item,
        sidebarDepth
      }
    }) {
    // use custom active class matching logic
    // due to edge case of paths ending with / + hash
    const selfActive = isActive($route, item.path)
    // for sidebar: auto pages, a hash link should be active if one of its child
    // matches
    const active = item.type === 'auto'
      ? selfActive || item.children.some(c => isActive($route, item.basePath + '#' + c.slug))
      : selfActive
    const link = item.type === 'external'
      ? renderExternal(h, item.path, item.title || item.path)
      : renderLink(h, item.path, item.title || item.path, active)

    const maxDepth = [
      $page.frontmatter.sidebarDepth,
      sidebarDepth,
      $themeLocaleConfig.sidebarDepth,
      $themeConfig.sidebarDepth,
      1
    ].find(depth => depth !== undefined)

    const displayAllHeaders = $themeLocaleConfig.displayAllHeaders ||
      $themeConfig.displayAllHeaders

    if (item.type === 'auto') {
      return [link, renderChildren(h, item.children, item.basePath, $route, maxDepth)]
    } else if ((active || displayAllHeaders) && item.headers && !hashRE.test(item.path)) {
      const children = groupHeaders(item.headers)
      return [link, renderChildren(h, children, item.path, $route, maxDepth)]
    } else {
      return link
    }
  }
}

function renderLink (h, to, text, active, level) {
  const component = {
    props: {
      to,
      activeClass: '',
      exactActiveClass: ''
    },
    class: {
      active,
      'sidebar-link': true
    }
  }

  if (level > 2) {
    component.style = {
      'padding-right': level + 'rem'
    }
  }

  return h('RouterLink', component, text)
}

function renderChildren (h, children, path, route, maxDepth, depth = 1) {
  if (!children || depth > maxDepth) return null
  return h('ul', { class: 'sidebar-sub-headers' }, children.map(c => {
    const active = isActive(route, path + '#' + c.slug)
    return h('li', { class: 'sidebar-sub-header' }, [
      renderLink(h, path + '#' + c.slug, c.title, active, c.level - 1),
      renderChildren(h, c.children, path, route, maxDepth, depth + 1)
    ])
  }))
}

function renderExternal (h, to, text) {
  return h('a', {
    attrs: {
      href: to,
      target: '_blank',
      rel: 'noopener noreferrer'
    },
    class: {
      'sidebar-link': true
    }
  }, [text, h('OutboundLink')])
}
</script>

<style lang="stylus">
.sidebar .sidebar-sub-headers
  padding-left 1rem
  font-size 0.95em

a.sidebar-link
  font-size 1em
  font-weight 400
  position: relative
  display inline-block
  color $textColor
  border-right 0.25rem solid transparent
  padding 0.35rem 1rem 0.35rem 1.25rem
  line-height 2
  width: 100%
  box-sizing: border-box

  &::before
    content: ''
    position: absolute
    top: 50%
    margin-left: -10px
    display: inline-block
    width: 5px
    height: 5px
    background-color: $accentColor
    border-radius: 50%
    opacity: 0
    transition: transform 0.2s, opacity 0.2s
    transform: scale(0) translate(-10px, -50%)

  &:hover
    color $accentColor

  &.active
    color $accentColor
    border-right-color $accentColor
    background linear-gradient(270deg, #f8faff, rgba(248,250,255,0))
    font-weight: 500

  .sidebar-group &
    padding-right 2rem

  .sidebar-sub-headers &
    border-right none
    background: none;
    &.active
      &::before
        opacity: 1;
        transform: scale(1) translate(0, -50%);
</style>
