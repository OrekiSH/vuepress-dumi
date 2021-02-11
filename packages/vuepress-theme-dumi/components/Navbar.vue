<template>
  <header class="navbar">
    <SidebarButton @toggle-sidebar="$emit('toggle-sidebar')" />

    <RouterLink
      :to="$localePath"
      class="home-link"
    >
      <img
        v-if="$site.themeConfig.logo"
        class="logo"
        :src="$withBase($site.themeConfig.logo)"
        :alt="$siteTitle"
      >
      <span
        v-if="$siteTitle"
        ref="siteName"
        class="site-name"
        :class="{ 'can-hide': $site.themeConfig.logo }"
      >{{ $siteTitle }}</span>
    </RouterLink>

    <div
      class="links"
      :style="linksWrapMaxWidth ? {
        'max-width': linksWrapMaxWidth + 'px'
      } : {}"
    >
      <AlgoliaSearchBox
        v-if="isAlgoliaSearch"
        :options="algolia"
      />
      <SearchBox v-else-if="$site.themeConfig.search !== false && $page.frontmatter.search !== false" />
      <NavLinks class="can-hide" />
    </div>
  </header>
</template>

<script>
import AlgoliaSearchBox from '@AlgoliaSearchBox'
import SearchBox from '@SearchBox'
import SidebarButton from '@theme/components/SidebarButton.vue'
import NavLinks from '@theme/components/NavLinks.vue'

export default {
  name: 'Navbar',

  components: {
    SidebarButton,
    NavLinks,
    SearchBox,
    AlgoliaSearchBox
  },

  data () {
    return {
      linksWrapMaxWidth: null
    }
  },

  computed: {
    algolia () {
      return this.$themeLocaleConfig.algolia || this.$site.themeConfig.algolia || {}
    },

    isAlgoliaSearch () {
      return this.algolia && this.algolia.apiKey && this.algolia.indexName
    }
  },

  mounted () {
    const MOBILE_DESKTOP_BREAKPOINT = 719 // refer to config.styl
    const NAVBAR_VERTICAL_PADDING = parseInt(css(this.$el, 'paddingLeft')) + parseInt(css(this.$el, 'paddingRight'))
    const handleLinksWrapWidth = () => {
      if (document.documentElement.clientWidth < MOBILE_DESKTOP_BREAKPOINT) {
        this.linksWrapMaxWidth = null
      } else {
        this.linksWrapMaxWidth = this.$el.offsetWidth - NAVBAR_VERTICAL_PADDING -
          ((this.$refs.siteName && this.$refs.siteName.offsetWidth) || 0)
      }
    }
    handleLinksWrapWidth()
    window.addEventListener('resize', handleLinksWrapWidth, false)
  }
}

function css (el, property) {
  // NOTE: Known bug, will return 'auto' if style value is 'auto'
  const win = el.ownerDocument.defaultView
  // null means not to return pseudo styles
  return win.getComputedStyle(el, null)[property]
}
</script>

<style lang="stylus">
$navbar-horizontal-padding = 4rem

.navbar
  padding 0 $navbar-horizontal-padding
  display: flex
  align-items: center
  justify-content: space-between

  a, span, img
    display inline-block
  .logo
    height $navbarHeight - 1.4rem
    min-width $navbarHeight - 1.4rem
    margin-right 0.8rem
    vertical-align top
  .site-name
    font-size 1.3rem
    font-weight 500
    color #080e29
    position relative
  .links
    display flex
    align-items center
    padding-left 1.5rem
    box-sizing border-box
    background-color white
    white-space nowrap
    font-size 0.9rem
    height: 100%

    .search-box
      input
        border: none
        color: $textColor
        background: url("data:image/png;base64,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") #f5f6f7 no-repeat right 14px center/16px

      .suggestions
        padding: 0.25rem 0
        border-radius: 2px
        border-color: $borderColor
        transition: background-color 0.2s
        box-shadow 0 2px 20px 0 rgba(0, 0, 0, 0.05)
        .suggestion
          border-radius: 0px
          font-weight: normal
          padding: 0.5rem 1.5rem

          &:hover
            background-color: #f9fafb
            .page-title
              color: lighten($accentColor, 20%)
            .header
              color: $accentColor

          .page-title
            color: #717484
            font-weight: normal
          .header
            color: $textColor

@media (max-width: $MQMobile)
  .navbar
    padding-left 4rem
    .can-hide
      display none
    .links
      padding-left 1.5rem
    .site-name
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
    .search-box
      input:focus
        width 8rem
        left -8rem
</style>
