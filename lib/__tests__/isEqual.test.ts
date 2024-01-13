import {describe, expect, test} from "vitest";
import {isEqual, isEqualB} from "../util/isEqual";

describe('isEqual', () => {
  test('can check equality of primitives', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual(1, null)).toBe(false);
    expect(isEqual(1, undefined)).toBe(false);

    expect(isEqual('hey', 'hey')).toBe(true);
    expect(isEqual('hey', 'world')).toBe(false);
    expect(isEqual('hey', null)).toBe(false);
    expect(isEqual('hey', undefined)).toBe(false);

    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(null, undefined)).toBe(false);

    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(true, null)).toBe(false);
    expect(isEqual(true, undefined)).toBe(false);
  });

  test('can check equality of arrays', () => {
    expect(
      isEqual(
        [1, 2, 3],
        [1, 2, 3]
      )
    ).toBe(true);

    expect(
      isEqual(
        [1, 2, 3],
        [1, 2, 3, 4]
      )
    ).toBe(false);

    expect(
      isEqual(
        [1, 2, 3],
        [1, 2]
      )
    ).toBe(false);

    expect(
      isEqual(
        [1, 2, 3],
        [1, 2, 4]
      )
    ).toBe(false);
  })

  test('can check equality of objects', () => {
    expect(isEqual({ hello: 'world' }, { hello: 'world' })).toBe(true);
    expect(isEqual({ hello: 'world' }, { hello: 'not world' })).toBe(false);
    expect(isEqual({ hello: 'world' }, { hello: null })).toBe(false);
    expect(isEqual({ hello: 'world' }, 'what the heck')).toBe(false);

    expect(
      isEqual(
        {
          hello: 'world',
          metadata: {
            a: 1,
            b: 2,
            nested: {
              more: {
                hehe: true
              }
            }
          }
        },
        {
          hello: 'world',
          metadata: {
            a: 1,
            b: 2,
            nested: {
              more: {
                hehe: true
              }
            }
          }
        },
      )
    ).toBe(true);

    expect(
      isEqual(
        {
          hello: 'world',
          metadata: {
            a: 1,
            b: 2,
            nested: {
              more: {
                hehe: true
              }
            }
          }
        },
        {
          hello: 'world',
          metadata: {
            a: 1,
            b: 200000000,
            nested: {
              more: {
                hehe: true
              }
            }
          }
        },
      )
    ).toBe(false);
  });

  test('deeply nested objects and arrays', () => {
    expect(
      isEqual(
        {
          hello: 'world',
          metadata: {
            a: 1,
            b: 2,
            nested: {
              more: {
                hehe: true,
                array: [1, 2, 3]
              }
            }
          }
        },
        {
          hello: 'world',
          metadata: {
            a: 1,
            b: 2,
            nested: {
              more: {
                hehe: true,
                array: [1, 2, 3]
              }
            }
          }
        },
      )
    ).toBe(true);
  });

  test('deeply nested objects and arrays', () => {
    expect(
      isEqual(
        {
          hello: 'world',
          metadata: {
            a: 1,
            b: 2,
            nested: {
              more: {
                hehe: true,
                array: [1, 2, 3]
              }
            }
          }
        },
        {
          hello: 'world',
          metadata: {
            a: 1,
            b: 2,
            nested: {
              more: {
                hehe: true,
                array: [1, 2, 3, 4]
              }
            }
          }
        },
      )
    ).toBe(false);
  });

  test('crazy huge object', () => {
    expect(isEqual(wow, clone(wow))).toBe(true)
    expect(isEqual(wow, wow2)).toBe(false);
  })
});

const clone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
}

const wow = [
  {
    "url": "https://alchemy-theme-modern.myshopify.com",
    "path": "Alchemy/4.2.5.html",
    "scrapedAt": "2023-05-20T00:01:19.997Z",
    "theme": {
      "name": "Alchemy",
      "version": "4.2.5",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body#alchemy-modern-theme.template-index.cc-animate-enabled.has-image-banner.header-overlapping > div#shopify-section-header.shopify-section.section-header > div > div#pageheader.pageheader > header#pageheader__contents.pageheader__contents.pageheader__contents--sticky.pageheader__contents--overlap.pageheader__contents--inline.pageheader__contents--inline--visible > div.pageheader__layout > div.header-left > div.inline-header-nav > div.nav-row.multi-level-nav > div.tier-1 > ul"
    ],
    "confirmedMobileSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body#alchemy-modern-theme.template-index.cc-animate-enabled.has-image-banner.header-overlapping > div#shopify-section-header.shopify-section.section-header > div > div#pageheader.pageheader > header#pageheader__contents.pageheader__contents.pageheader__contents--sticky.pageheader__contents--overlap.pageheader__contents--inline.pageheader__contents--inline--visible > div.pageheader__layout > div.header-left > details#main-menu-disclosure.main-menu-wrapper > div#main-menu > div.main-menu-inner > div.main-menu-panel-wrapper > nav#main-menu-panel.main-menu-panel > ul.main-menu-links"
    ]
  },
  {
    "url": "https://theme-a-demo-01.myshopify.com",
    "path": "Align/1.1.html",
    "scrapedAt": "2023-05-20T00:01:20.293Z",
    "theme": {
      "name": "Align",
      "version": "1.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.has-js > body.layout-theme.template-index > div#nav-wrapper.header-visible.reached-top > div#shopify-section-navigation-main.shopify-section > header.header > div.container > div.header__menu"
    ],
    "confirmedMobileSelectors": [
      "html.has-js > body.layout-theme.template-index > div#nav-wrapper.header-visible.reached-top > div#shopify-section-navigation-main.shopify-section > header.header > div.container > div.nav.nav--mobile > div.container > div.nav--mobile__inner-container > div.nav--mobile__column > div.nav__mobile-dropdown-wrapper.nav__mobile-dropdown-wrapper--open > div.nav__mobile-dropdown__content-wrapper > div.nav__content__outer > div.nav__content > div.nav__main-menu > ul"
    ]
  },
  {
    "url": "https://underwear-theme-v1.myshopify.com/",
    "path": "Andaman/1.3.1.html",
    "scrapedAt": "2023-05-20T00:01:20.622Z",
    "theme": {
      "name": "Andaman",
      "version": "1.3.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.no-js.shopify-features__smart-payment-buttons--enabled > body.template-index.script.scroll-on-top.use-popup-quick-view > div#page > div#main > barracuda-main#page-content > div#header-sections > div#shopify-section-sections--20197653938457__header.shopify-section.shopify-section-group-group-header.header-container > div#header.can-be-transparent.should-be-transparent.change-color-overlap.use-inverted-colors > div.header > div.max-width-header-large > div#shopify-block-3e5d7d5c-430d-4a92-b3ea-1b1c3ca4e908.inline-navigation.only-desktop-navigation"
    ],
    "confirmedMobileSelectors": [
      "html.no-js > body.template-index.script.scroll-on-top.topbar-open.no-scroll > div#page > div#main > main#page-content > div#header-sections > div#shopify-section-header.shopify-section.header-container > nav.navigation.scroll-inside > div#menu.topbar.scroll-inside.control-visible > div.topbar-content.topbar-content-max-width.topbar-focus.with-menu > div.main-menu > ul.primary-menu"
    ]
  },
  {
    "url": "https://athens-theme.myshopify.com",
    "path": "Athens/1.8.0.html",
    "scrapedAt": "2023-05-20T00:01:20.896Z",
    "theme": {
      "name": "Athens",
      "version": "1.8.0",
      "themeStore": true
    },
    "confirmedMobileSelectors": [
      "html.js > body.template-index.setting-buttons-solid > div#shopify-section-sections--16698369671420__header.shopify-section.shopify-section-group-header-group.section-header > sticky-header > header#header.header > div.color-background-1 > div.container > div.head-mast > div.head-slot.head-slot-end > div.head-slot-item.head-slot-item-icons > div.head-slot-nav-mobile-link-wrapper > div.mobile-menu.color-background-1 > div.mobile-menu-inner > nav.navigation-mobile-wrap.typography-body > ul.navigation-mobile"
    ],
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.setting-buttons-solid > div#shopify-section-sections--16698369671420__header.shopify-section.shopify-section-group-header-group.section-header > sticky-header > header#header.header > div.navigation-wrapper.color-accent-1.typography-body > div.container > nav.nav-main > ul.navigation-menu.navigation-main"
    ]
  },
  {
    "url": "https://atlantic-theme-organic.myshopify.com",
    "path": "Atlantic/16.0.0.html",
    "scrapedAt": "2023-05-20T00:01:21.141Z",
    "theme": {
      "name": "Atlantic",
      "version": "16.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.header-layout-minimal.shopify-features__smart-payment-buttons--enabled > body.template-index.product-grid-default > div#shopify-section-sections--14920518139958__header.shopify-section.shopify-section-group-header-group.shopify-section--header > header.main-header-wrap.main-header--minimal.main-header--centered > section.main-header > div.header-minimal.header-minimal-centered > nav.full.main-header--nav-compressed.compress.bordered > ul.main-header--nav-links"
    ],
    "confirmedMobileSelectors": [
      "html.js.no-touch.header-layout-minimal.shopify-features__smart-payment-buttons--enabled > body.template-index.product-grid-default > div#shopify-section-sections--14920518139958__header.shopify-section.shopify-section-group-header-group.shopify-section--header > header.main-header-wrap.main-header--minimal.main-header--centered > section.main-header > section#main-header--mobile-nav.mobile-dropdown > div.mobile-dropdown--wrapper > div.mobile-dropdown--content > ul.list.primary"
    ]
  },
  {
    "url": "https://atom-demo-store.myshopify.com",
    "path": "Atom/1.1.0.html",
    "scrapedAt": "2023-05-20T00:01:21.350Z",
    "theme": {
      "name": "Atom",
      "version": "1.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "skip"
    ]
  },
  {
    "url": "https://gsc-theme-demo.myshopify.com",
    "path": "Aurora/1.3.0.html",
    "scrapedAt": "2023-05-20T00:01:21.581Z",
    "theme": {
      "name": "Aurora",
      "version": "1.3.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.color-primary.theme-with-high-rounded-style.theme-with-rounded-style > header#shopify-section-sections--16679800799473__header.shopify-section.shopify-section-group-main-header-group.shopify-section-header > header-component#header-component.header.section-sections--16679800799473__header.color-primary.header--desktop > div.header__container.container.container--full-screen > div.header__grid.header__grid--1 > div.header__nav"
    ]
  },
  {
    "url": "https://stickytstory.myshopify.com",
    "path": "Automation/2.1.2.html",
    "scrapedAt": "2023-05-20T00:01:21.824Z",
    "theme": {
      "name": "Automation",
      "version": "2.1.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index > div#PageContainer.page-container > div.transition-body > div > div#shopify-section-sections--18771943883040__header.shopify-section.shopify-section-group-header-group > div.header-sticky-wrapper > div#HeaderWrapper.header-wrapper > div#StickyHeaderWrap > header#SiteHeader.site-header.color--body.header-inverse-overlay > div.page-width > div.header-layout.header-layout--left-center > div.grid__item-header.grid__item-header--navigation.text-center > ul.site-nav.site-navigation.small--hide"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.template-index > div#PageContainer.page-container > div.transition-body > div > div#shopify-section-sections--18771943883040__header.shopify-section.shopify-section-group-header-group > div#MenuDrawer.drawer.drawer--right.drawer__mobile-nav > div.drawer__contents > div.drawer__scrollable.cart-drawer-form.drawer__contents > div#MobileNav > div.mobile-nav__wrapper > ul.mobile-nav"
    ]
  },
  {
    "url": "https://avatar-shirts.myshopify.com",
    "path": "Avatar/1.2.0.html",
    "scrapedAt": "2023-05-20T00:01:22.049Z",
    "theme": {
      "name": "Avatar",
      "version": "1.2.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.avatar.index-template.js-focus-visible > body > div#shopify-section-header.shopify-section.shopify-section-header > div > nav.main-nav.d-none.d-lg-block.position-relative.tw-bg-body.tw-z-10.critical-hidden > div.container > ul.nav.justify-content-center.align-items-center.tw-flex-wrap"
    ],
    "confirmedMobileSelectors": [
      "html.js.avatar.index-template.js-focus-visible > body > div#shopify-section-header.shopify-section.shopify-section-header > div > nav#mobile-nav.mobile-nav.collapse.d-lg-none.tw-bg-body.critical-hidden > ul.nav.flex-column.px-3.border-top.tw-flex-nowrap"
    ]
  },
  {
    "url": "https://clothing-filter-theme.myshopify.com",
    "path": "Avenue/5.2.1.html",
    "scrapedAt": "2023-05-20T00:01:22.288Z",
    "theme": {
      "name": "Avenue",
      "version": "5.2.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.no-js > body.loading > div#shopify-section-sections--18520738791736__header.shopify-section.shopify-section-group-header-group.shopify-section-header > header#header.clearfix > div#header-toolbar.header-toolbar.sticky.open-container > div.header.sticky-navigation.include-border.relative.clearfix > div.sticky-navigation-container.open-container > div#header-navigation.header-navigation.home > div.container.half-pad.clearfix > div.twelve > div.relative > div.table.right-width.clearfix > div.main-menu.table-cell > nav > ul#responsiveMenu.responsiveMenu.text-right"
    ]
  },
  {
    "url": "https://banjo-default.myshopify.com",
    "path": "Banjo/2.1.0.html",
    "scrapedAt": "2023-05-20T00:01:22.533Z",
    "theme": {
      "name": "Banjo",
      "version": "2.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.BanjoTheme.Template.Template--index > div#shopify-section-sections--15999624872130__header.shopify-section.shopify-section-group-header-group.shopify-section--header > header#Header.Header.Header--spacingMedium.Header--middleLeft.Header--mainMenuHorizontal.Header--logoLeftMainMenuLeft > div.Header__Main.Container.Container--fluid > div.Header__MainMenu.HiddenMediumDown > ul.Nav"
    ]
  },
  {
    "url": "https://baseline-theme-bold.myshopify.com",
    "path": "Baseline/2.0.0.html",
    "scrapedAt": "2023-05-20T00:01:22.764Z",
    "theme": {
      "name": "Baseline",
      "version": "2.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-cookies > body#mofa.template-index.show-button-arrows > div.relative > div#shopify-section-header.shopify-section.section-header > section > header.bg-header-background.text-header-text.border-b-grid.relative.z-10.border-theme-color > nav.relative.hidden.lg:block > div.section-x-padding.flex.items-center.justify-between.flex-wrap.py-2"
    ]
  },
  {
    "url": "https://zen-demo-light.myshopify.com",
    "path": "Bazaar/1.1.46.html",
    "scrapedAt": "2023-05-20T00:01:22.977Z",
    "theme": {
      "name": "Bazaar",
      "version": "1.1.46",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html > body#zen-professional-gadgets-amp-apparels-home-office-furnitures.gradient.template-index.header-visible > div#shopify-section-sections--16686794932476__listmenu.shopify-section.shopify-section-group-header-group.top-level-element.listmenu-section > div.section-content.listmenu-section-content > div#listmenu-menu-1.subsection.fl-c.color-base-1.listmenu-subsection.large-hide > div.listmenus__wrapper.align-center.boxed-width > list-menu.large-hide > nav#list-menu-menu-1.list-menu > ul.fl-c.list-menu_wrapper.h-1"
    ],
    "confirmedMobileSelectors": [
      "html > body#zen-professional-gadgets-amp-apparels-home-office-furnitures.gradient.template-index.header-visible > div#shopify-section-sections--16686794932476__header.shopify-section.shopify-section-group-header-group.header > div.panels-container > div.panel-menus-container > panel-menu#menu-panelmenu-1.pop-panel.position-left > div.poppanel-content.header-panel-menu > div.panel-menu__main > multi-level-navigation.multi-level-navigation > nav.header-panel-menu__wrapper.multi-level-navigation__main > ul.fl-co.header-panel-menu_list.items-container.open",
      "html > body#zen-professional-gadgets-amp-apparels-home-office-furnitures.gradient.template-index.header-visible > div#shopify-section-sections--16686794932476__header.shopify-section.shopify-section-group-header-group.header > div.panels-container > div.panel-menus-container > panel-menu#menu-panelmenu-2.pop-panel.position-left > div.poppanel-content.header-panel-menu > div.panel-menu__main > multi-level-navigation.multi-level-navigation > nav.header-panel-menu__wrapper.multi-level-navigation__main > ul.fl-co.header-panel-menu_list.items-container.open"
    ]
  },
  {
    "url": "https://beyours-theme-beauty.myshopify.com",
    "path": "Be Yours/6.9.0.html",
    "scrapedAt": "2023-05-20T00:01:23.208Z",
    "theme": {
      "name": "Be Yours",
      "version": "6.9.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.template-index.loaded > div.transition-body > div#shopify-section-sections--16719829336305__header.shopify-section.shopify-section-group-header-group.shopify-section-header > sticky-header.header-wrapper.header-wrapper--border-bottom.header-transparent > header.header.header--top-center.header--mobile-center.page-width.header-section--padding > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ],
    "confirmedMobileSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.template-index.loaded > div.transition-body > div#shopify-section-sections--16719829336305__header.shopify-section.shopify-section-group-header-group.shopify-section-header > sticky-header.header-wrapper.header-wrapper--border-bottom.header-transparent > header.header.header--top-center.header--mobile-center.page-width.header-section--padding > div.header__left.header__left--localization > header-drawer > details.menu-drawer-container > div#menu-drawer.menu-drawer.motion-reduce > div.menu-drawer__inner-container > div.menu-drawer__navigation-container > nav.menu-drawer__navigation > ul.menu-drawer__menu.list-menu"
    ]
  },
  {
    "url": "https://beyond-theme-4.myshopify.com",
    "path": "Beyond/3.1.1.html",
    "scrapedAt": "2023-05-20T00:01:23.429Z",
    "theme": {
      "name": "Beyond",
      "version": "3.1.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.flexbox-gap > body.template--index.page--beyond-theme-4 > div.layout--viewport > div.layout--main-content > header.layout--header-group > div#shopify-section-sections--16056179064983__header.shopify-section.shopify-section-group-header-group.section--header > header-root.header--root > div.header--top-row > div.header--left-column > div.header--x-menu > x-menu-root.x-menu > ul.x-menu--level-1--container"
    ],
    "confirmedMobileSelectors": [
      "html.js.flexbox-gap > body.template--index.page--beyond-theme-4 > div.layout--viewport > drawer-root.drawer--root > transition-root.drawer--instance:nth-of-type(6) > div.drawer--container > div.mobile-nav > div.mobile-nav--menu > y-menu-root.y-menu > ul.y-menu--level-1--container"
    ]
  },
  {
    "url": "https://blockshop-theme-beauty.myshopify.com",
    "path": "Blockshop/9.1.1.html",
    "scrapedAt": "2023-05-20T00:01:23.726Z",
    "theme": {
      "name": "Blockshop",
      "version": "9.1.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.flexbox-gap.shopify-features__smart-payment-buttons--enabled > body.template--index.page--blockshop-theme-beauty > div.layout--viewport > div.layout--main-content > header.layout--header-group > div#shopify-section-sections--14504813625399__header.shopify-section.shopify-section-group-header-group.section--header > header-root.header--root > div.header--bottom-row > div.header--menu > x-menu-root.x-menu > ul.x-menu--level-1--container"
    ],
    "confirmedMobileSelectors": [
      "html.js.flexbox-gap.shopify-features__smart-payment-buttons--enabled > body.template--index.page--blockshop-theme-beauty > div.layout--viewport > drawer-root.drawer--root > transition-root.drawer--instance:nth-of-type(6) > div.drawer--container > div.mobile-nav--menu > y-menu-root.y-menu > ul.y-menu--level-1--container"
    ]
  },
  {
    "url": "https://blum-mondo.myshopify.com",
    "path": "Blum/1.0.2.html",
    "scrapedAt": "2023-05-20T00:01:23.926Z",
    "theme": {
      "name": "Blum",
      "version": "1.0.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.js-main-body.template-index > div#shopify-section-sections--15552332628107__header.shopify-section.shopify-section-group-header-group.js-section-header.header-wrapper.p-relative.zi-4 > sht-sticky-header > sht-header.js-header.section-header.p-relative > header.header.ctnr.menu--horizontal.logo-position--middle-left.middle-xs.p-relative.zi-4 > div.header__menu.d-flex.fd-column.js-menu-drawer-content > nav.header__nav.js-header-navigation.flex-1.w-100 > ul.main__menu.m-zero.ls-none"
    ]
  },
  {
    "url": "https://spark-theme.myshopify.com",
    "path": "Boost/6.0.0.html",
    "scrapedAt": "2023-05-20T00:01:24.227Z",
    "theme": {
      "name": "Boost",
      "version": "6.0.0",
      "themeStore": true
    },
    "confirmedMobileSelectors": [
      "html.js.supports-cookies > body#boost-a-bold-modern-and-impactful-shopify-theme.template-index.swatch-method-standard.cc-animate-enabled > div.header-group > div#shopify-section-sections--15869509828665__header.shopify-section.shopify-section-group-header-group > div.site-header.docking-header > div.docked-navigation-container.docked-navigation-container--center > div.docked-navigation-container__inner > section.header-navigation.container > nav.navigation__container.page-width > ul.nav.mobile-site-nav"
    ],
    "confirmedDesktopSelectors": [
      "html.js.supports-cookies > body#boost-a-bold-modern-and-impactful-shopify-theme.template-index.swatch-method-standard.cc-animate-enabled > div.header-group > div#shopify-section-sections--15869509828665__header.shopify-section.shopify-section-group-header-group > div.site-header.docking-header > div.docked-navigation-container.docked-navigation-container--center > div.docked-navigation-container__inner > section.header-navigation.container > nav.navigation__container.page-width > ul.nav.site-nav.site-nav--center"
    ]
  },
  {
    "url": "https://broadcast-clean.myshopify.com",
    "path": "Broadcast/5.0.0.html",
    "scrapedAt": "2023-05-20T00:01:24.504Z",
    "theme": {
      "name": "Broadcast",
      "version": "5.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.supports-cookies.iframe > body#broadcast-theme-clean-preset.template-index.grid-classic.aos-initialized.is-loaded > div.container > div.header-sections > div#shopify-section-sections--14608719642688__header.shopify-section.shopify-section-group-group-header.page-header > div.header__wrapper > header.theme__header > div.header__desktop > div.header__desktop__upper.header__desktop__upper--reverse > div.header__desktop__bar__c > nav.header__menu"
    ],
    "confirmedMobileSelectors": [
      "html.js.no-touch.supports-cookies.iframe > body#broadcast-theme-clean-preset.template-index.grid-classic.aos-initialized.is-loaded > div.container > div.header-sections > div#shopify-section-sections--14608719642688__header.shopify-section.shopify-section-group-group-header.page-header > div.header__wrapper > nav#header-menu.drawer.drawer--header > div.drawer__inner > div.drawer__body > div.drawer__content > div.drawer__menu"
    ]
  },
  {
    "url": "https://bullet1-openthinking.myshopify.com",
    "path": "Bullet/4.0.0.html",
    "scrapedAt": "2023-05-20T00:01:24.701Z",
    "theme": {
      "name": "Bullet",
      "version": "4.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.t-index.ip--none.hpsticky > div#app > div#shopify-section-sections--16648453849330__header.shopify-section.shopify-section-group-group-header.main-header > header#header > x-grid#header-grid > x-cell.menulink.large-only > nav > ul.inline.large-only"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.t-index.ip--none.hpsticky > div#app > div#shopify-section-sections--16648453849330__header.shopify-section.shopify-section-group-group-header.main-header > section#mobmenu > div.mobnav > nav > x-grid.bordi.menus"
    ]
  },
  {
    "url": "https://california-theme-generic.myshopify.com",
    "path": "California/9.7.0.html",
    "scrapedAt": "2023-05-20T00:01:24.936Z",
    "theme": {
      "name": "California",
      "version": "9.7.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body#california.template-index.centered.align-left.sticky-header.loaded.no-outlines > div#shopify-section-header.shopify-section.section-header > div.header > div.inner > div.content > div.left > div.menu > div.nav"
    ],
    "confirmedMobileSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body#california.template-index.centered.align-left.sticky-header.loaded.no-outlines > div#shopify-section-header.shopify-section.section-header > div.header > div.inner > div.side-nav-section > div.side-nav > div.nav > ul.main"
    ]
  },
  {
    "url": "https://canopy-theme-glow.myshopify.com",
    "path": "Canopy/5.0.0.html",
    "scrapedAt": "2023-05-20T00:01:25.220Z",
    "theme": {
      "name": "Canopy",
      "version": "5.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.cc-animate-enabled.scrolled-top > div#page-wrap > div#page-wrap-inner > div#page-wrap-content > div#shopify-section-header.shopify-section.section-header > div.header-container > div.page-header.layout-center.using-compact-mobile-logo > div.container.nav-container > div.logo-nav > nav.main-nav.cf.desktop.align-center"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.template-index.cc-animate-enabled.scrolled-top > nav#mobile-nav > div.inner > div > nav > ul.mobile-nav-menu.plain"
    ]
  },
  {
    "url": "https://capital-theme-berlin.myshopify.com",
    "path": "Capital/32.0.0.html",
    "scrapedAt": "2023-05-20T00:01:25.431Z",
    "theme": {
      "name": "Capital",
      "version": "32.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports.flexbox.csstransforms3d > body.template-index.js-focus-visible.using-mouse > div#main-body.slideout-panel.slideout-panel-right > div#shopify-section-sections--14779254439972__header.shopify-section.shopify-section-group-header-group > header.main-header.no-border > div.main-navigation-wrapper.main-navigation-wrapper--center"
    ],
    "confirmedMobileSelectors": [
      "html.js.supports.flexbox.csstransforms3d > body.template-index.js-focus-visible.using-mouse > div#main-body.slideout-panel.slideout-panel-right > div#shopify-section-sections--14779254439972__header.shopify-section.shopify-section-group-header-group > header.main-header.no-border > div.main-navigation-wrapper.navigation-mobile > nav.main-navigation > ul.navigation-list"
    ]
  },
  {
    "url": "https://cascade-preset-1.myshopify.com",
    "path": "Cascade/3.0.2.html",
    "scrapedAt": "2023-05-20T00:01:25.664Z",
    "theme": {
      "name": "Cascade",
      "version": "3.0.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.theme-ctas-are-theme-buttons.theme-buttons-style-1 > div#shopify-section-header.shopify-section > section#header > div.font-main.normal-case.text-scheme-text.bg-scheme-background.grid.gap-x-4.grid-cols-[minmax(min-content,_1fr)_auto_minmax(min-content,_1fr)].md:grid-cols-[minmax(min-content,_1fr)_auto_minmax(min-content,_1fr)].py-4.px-5.lg:px-10.motion-reduce:transition-none > div.w-full.flex.justify-start.items-center.md:order-none > div.hidden.md:block.js-enabled.w-full > nav > ul.flex.justify-start.items-center.flex-wrap.max-w-full.-mx-2.-my-1"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.theme-ctas-are-theme-buttons.theme-buttons-style-1 > div#modals-leftDrawer.fixed.inset-0.z-110 > div#left-drawer-slot.relative.w-11/12.md:w-7/12.lg:w-5/12.px-5.lg:px-10.h-full.bg-scheme-background.text-scheme-text.mr-auto.overflow-y-auto > div.sidebar-nav.py-6 > div > ul.mt-8"
    ]
  },
  {
    "url": "https://champion-theme-flash.myshopify.com",
    "path": "Champion/1.0.0.html",
    "scrapedAt": "2023-05-20T00:01:25.929Z",
    "theme": {
      "name": "Champion",
      "version": "1.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.capitalize-buttons > header#shopify-section-sections--17863737180454__header.shopify-section.shopify-section-group-header-group.shopify-section--header > loess-header.section.header.header--transparent.block.color.color-default-with-accent-1 > div.container > div.header-wrapper.header-wrapper--collapse-menu-on-tablet > div.header-top.header-top--center-inline > nav.header-menu > ul.menu-list"
    ],
    "confirmedMobileSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.capitalize-buttons > header#shopify-section-sections--17863737180454__header.shopify-section.shopify-section-group-header-group.shopify-section--header > loess-drawer#SideBarMenu.drawer.block.color.color-inverse > div.drawer__inner > div.drawer__content > nav > ul.drawer-menu"
    ]
  },
  {
    "url": "https://chord-warm.myshopify.com",
    "path": "Chord/3.1.1.html",
    "scrapedAt": "2023-05-20T00:01:26.193Z",
    "theme": {
      "name": "Chord",
      "version": "3.1.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.ChordTheme.Template.Template--index > div#shopify-section-sections--16756003045594__header.shopify-section.shopify-section-group-header-group.shopify-section--header > header#Header.Header.Header--spacingMedium.Header--topCenter > div.Header__MainMenu.HiddenMediumDown > ul.Nav"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.ChordTheme.Template.Template--index > div#shopify-section-menu-drawer.shopify-section.shopify-section--menu-drawer > section#MenuDrawer.MenuDrawer.Drawer.Drawer--start > div.Drawer__Body > nav.MenuDrawer__Nav.MenuDrawer__Nav--primary > div#MenuDrawerAccordion.Accordion"
    ]
  },
  {
    "url": "https://theme-colorblock-demo.myshopify.com",
    "path": "Dawn/4.0.0.html",
    "scrapedAt": "2023-05-20T00:01:26.385Z",
    "theme": {
      "name": "Dawn",
      "version": "4.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > div.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > div.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > header-drawer > details#Details-menu-drawer-container.menu-drawer-container > div#menu-drawer.gradient.menu-drawer.motion-reduce > div.menu-drawer__inner-container > div.menu-drawer__navigation-container > nav.menu-drawer__navigation"
    ]
  },
  {
    "url": "https://colors-theme-generic.myshopify.com",
    "path": "Colors/9.6.0.html",
    "scrapedAt": "2023-05-20T00:01:26.690Z",
    "theme": {
      "name": "Colors",
      "version": "9.6.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.shopify-features__smart-payment-buttons--enabled > body#colors-theme.template-index.loaded.no-outlines.shaped > div#shopify-section-header.shopify-section.section-header > div.header.sticky.no-padding.collapsed.show-background.color-body-bg-is-white > div.relative > div.nav.main-nav.normal > ul.root"
    ],
    "confirmedMobileSelectors": [
      "html.shopify-features__smart-payment-buttons--enabled > body#colors-theme.template-index.loaded.no-outlines.shaped > div#shopify-section-header.shopify-section.section-header > div.nav.side-nav > div.inner > div.menu > ul.root"
    ]
  },
  {
    "url": "https://bundle-theme-demo-home.myshopify.com",
    "path": "Combine/2.1.0.html",
    "scrapedAt": "2023-05-20T00:01:26.900Z",
    "theme": {
      "name": "Combine",
      "version": "2.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html#html.no-js > body#bundle-theme-demo-home.template-index.no-touchevents.header-loaded > div#shopify-section-sections--18063045394750__header.shopify-section.shopify-section-group-header-group.site-header-container.mount-header.mount-css-slider > main-header#site-header.site-header.site-header--border.site-header--alignment-left.site-header--absolute.site-header--absolute-show-border > div.header-container.header-container--bottom.no-header-blocks > div.header__bottom.container--large > div.site-nav.style--classic > div.site-nav-container > nav > ul.link-list"
    ],
    "confirmedMobileSelectors": [
      "html#html.no-js > body#bundle-theme-demo-home.template-index.no-touchevents.header-loaded > div#shopify-section-sections--18063045394750__header.shopify-section.shopify-section-group-header-group.site-header-container.mount-header.mount-css-slider > sidebar-drawer#site-menu-sidebar.sidebar.sidebar--right > div.sidebar__body > mobile-navigation > div.site-nav.style--sidebar > div.site-nav-container > nav > ul.link-list"
    ]
  },
  {
    "url": "https://context-theme-chic.myshopify.com",
    "path": "Context/2.2.4.html",
    "scrapedAt": "2023-05-20T00:01:27.174Z",
    "theme": {
      "name": "Context",
      "version": "2.2.4",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.supports-cookies.shopify-features__smart-payment-buttons--enabled.header-transparent > body.template-index > div#root > header.header-container > section#shopify-section-header.shopify-section.header-section > div.w-100.z-5 > div#header.header.header--default.header--transparent.header--no-border > div.header__content.header__content--has-customer-accounts > div.flex.justify-between > nav.header__nav > ul.list.ma0.pa0.lh-copy.nav.nav--depth-1"
    ],
    "confirmedMobileSelectors": [
      "html.supports-cookies.shopify-features__smart-payment-buttons--enabled.header-transparent > body.template-index > div#root > header.header-container > section#shopify-section-header.shopify-section.header-section > div.w-100.z-5 > div.drawer-menu.popover > div.drawer-menu__panel > div.drawer-menu__bottom > div.drawer-menu__all-links > div.drawer-menu__contents > div.drawer-menu__main > ul.drawer-menu__primary-links.drawer-menu-list--0"
    ]
  },
  {
    "url": "https://theme-craft-demo.myshopify.com",
    "path": "Dawn/2.5.0.html",
    "scrapedAt": "2023-05-20T00:01:27.378Z",
    "theme": {
      "name": "Dawn",
      "version": "2.5.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > header-drawer > details#Details-menu-drawer-container.menu-drawer-container > div#menu-drawer.menu-drawer.motion-reduce > div.menu-drawer__inner-container > div.menu-drawer__navigation-container > nav.menu-drawer__navigation > ul.menu-drawer__menu.list-menu"
    ]
  },
  {
    "url": "https://theme-crave-demo.myshopify.com",
    "path": "Dawn/2.5.0.html",
    "scrapedAt": "2023-05-20T00:01:27.650Z",
    "theme": {
      "name": "Dawn",
      "version": "2.5.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > header-drawer > details#Details-menu-drawer-container.menu-drawer-container > div#menu-drawer.menu-drawer.motion-reduce > div.menu-drawer__inner-container > div.menu-drawer__navigation-container > nav.menu-drawer__navigation > ul.menu-drawer__menu.list-menu"
    ]
  },
  {
    "url": "https://creative-theme-chalk.myshopify.com",
    "path": "Creative/4.0.1.html",
    "scrapedAt": "2023-05-20T00:01:28.039Z",
    "theme": {
      "name": "Creative",
      "version": "4.0.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touchevents.fontface.sr.shopify-features__smart-payment-buttons--enabled > body#creative-theme-chalk.template-index.js-theme-loaded.drawer--is-loading > div.page-container > div#shopify-section-sections--16680454619390__header.shopify-section.shopify-section-group-header-group.shopify-section-header.js-section__header > header#top.header.js-header.header--sticky.js-header-sticky.header--scroll.js-header-scroll.header--logo-left.u-flex.u-flex--middle.u-flex--center.header--mega.header--search-enabled.header--transparent.header--has-transparent-divider > div.header-navs.js-heaver-navs.u-clearfix.u-hidden@tab-down > nav.primary-nav.header-navs__items.js-primary-nav"
    ],
    "confirmedMobileSelectors": [
      "html.js.no-touchevents.fontface.sr.shopify-features__smart-payment-buttons--enabled > body#creative-theme-chalk.template-index.js-theme-loaded.drawer--is-loading > div.page-container > div#shopify-section-sections--16680454619390__mobile-drawer.shopify-section.shopify-section-group-header-group.js-section__mobile-draw > div.mobile-draw.mobile-draw--dark.js-menu-draw.mfp-hide > div.mobile-draw__wrapper > nav.mobile-draw__nav.mobile-nav > ul.mobile-nav__items.o-list-bare"
    ]
  },
  {
    "url": "https://creator-theme-enthusiast.myshopify.com/",
    "path": "Creator/3.2.0.html",
    "scrapedAt": "2023-05-20T00:01:28.286Z",
    "theme": {
      "name": "Creator",
      "version": "3.2.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.primary-button-style--solid.secondary-button-style--outline.mobile-bottom-offset > div#shopify-section-sections--19003721842964__header.shopify-section.shopify-section-group-header-group > site-header.header.header--mobile-bottom.header--desktop-top.header--full-width.header--transparent-ready > div.row.row--no-gutters.row--align-center > div.col-6.col-lg-8 > ul.nav.no-bullets.d-none.d-lg-block.text-center"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.primary-button-style--solid.secondary-button-style--outline.mobile-bottom-offset > div#shopify-section-sections--19003721842964__header.shopify-section.shopify-section-group-header-group > site-header.header.header--mobile-bottom.header--desktop-top.header--full-width.header--transparent-ready > div.row.row--no-gutters.row--align-center > div.col-6.col-lg-8 > div.toggle-menu-wrapper > div.toggle-menu > div.toggle-menu__content > ul.toggle-menu__links.no-bullets.d-lg-none",
      "html.js > body.primary-button-style--solid.secondary-button-style--outline.mobile-bottom-offset > div#shopify-section-sections--19003721842964__header.shopify-section.shopify-section-group-header-group > site-header.header.header--mobile-bottom.header--desktop-top.header--full-width.header--transparent-ready > div.row.row--no-gutters.row--align-center > div.col-6.col-lg-8 > div.toggle-menu-wrapper > div.toggle-menu > div.toggle-menu__content > ul.toggle-menu__links.no-bullets.d-none.d-lg-block"
    ]
  },
  {
    "url": "https://theme-dawn-demo.myshopify.com",
    "path": "Dawn/2.5.0.html",
    "scrapedAt": "2023-05-20T00:01:28.506Z",
    "theme": {
      "name": "Dawn",
      "version": "2.5.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > header-drawer > details#Details-menu-drawer-container.menu-drawer-container > div#menu-drawer.menu-drawer.motion-reduce > div.menu-drawer__inner-container > div.menu-drawer__navigation-container > nav.menu-drawer__navigation > ul.menu-drawer__menu.list-menu"
    ]
  },
  {
    "url": "https://district-theme-demo.myshopify.com",
    "path": "District/4.4.2.html",
    "scrapedAt": "2023-05-20T00:01:28.788Z",
    "theme": {
      "name": "District",
      "version": "4.4.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body#district-shopify-theme-by-style-hatch.font-body.bg-section-background > div#shopify-section-sections--15488225935413__header.shopify-section.shopify-section-group-header-group.section__header > header-section.block > div.header-wrapper.flex.items-center > div.flex.items-center.w-full.max-w-screen.mx-auto > header.header.relative.w-full > div.header-secondary > nav.header-secondary__navigation > ul.header-secondary__menu.header-menu--uppercase.header-menu.list-menu"
    ],
    "confirmedMobileSelectors": [
      "html.js > body#district-shopify-theme-by-style-hatch.font-body.bg-section-background > div#shopify-section-sections--15488225935413__header-top.shopify-section.shopify-section-group-header-group.section__header-top > header-top-section.block > menu-drawer#MenuDrawer > div.menu-drawer.font-navigation.flex.flex-col.fixed.left-0.inset-y-0.w-full.max-w-sm.h-screen.bg-primary-secondary-background.overflow-y-auto.z-20 > nav.menu-drawer__navigation > ul.menu-drawer__menu.drawer-menu.list-menu",
      "html.js > body#district-shopify-theme-by-style-hatch.font-body.bg-section-background > div#shopify-section-sections--15488225935413__header.shopify-section.shopify-section-group-header-group.section__header > header-section.block > menu-drawer#MenuDrawerHeader > div.menu-drawer.font-navigation.flex.flex-col.fixed.left-0.inset-y-0.w-full.max-w-sm.h-screen.bg-primary-secondary-background.overflow-y-auto.z-20 > nav.menu-drawer__navigation > ul.menu-drawer__menu.drawer-menu.list-menu"
    ]
  },
  {
    "url": "https://drop-theme-countdown-demo.myshopify.com",
    "path": "Drop/3.2.0.html",
    "scrapedAt": "2023-05-20T00:01:29.023Z",
    "theme": {
      "name": "Drop",
      "version": "3.2.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-no-cookies.shopify-features__smart-payment-buttons--enabled > body#drop-a-premium-fashion-shopify-theme.template-index.js-slideout-toggle-wrapper.js-modal-toggle-wrapper.animation--active.animation-type--fade.animation-text--active.animation-text-type--fade.section-fade-in > main.site-wrap > div#shopify-section-sections--16789752479987__header.shopify-section.shopify-section-group-header-group.js-site-header > header.section-header.header-section.no-section-animation.header__over-content--false > section.section-header__main-bar.main-bar.w100.sm-hide.js-theme-header.stickynav > div.grid__wrapper.block-layout > article.header-block__nav-wrapper.span-12.v-center.a-center > div.navigation > ul.header__navigation.mb0.inline-block"
    ],
    "confirmedMobileSelectors": [
      "html.js.supports-no-cookies.shopify-features__smart-payment-buttons--enabled > body#drop-a-premium-fashion-shopify-theme.template-index.js-slideout-toggle-wrapper.js-modal-toggle-wrapper.animation--active.animation-type--fade.animation-text--active.animation-text-type--fade.section-fade-in > aside#slideout-mobile-navigation.slideout.slideout__drawer-left > div#shopify-section-mobile-navigation.shopify-section > div.mobile-nav__wrapper.no-section-animation > div.mobile-nav__menu-blocks.pt6.grid__wrapper.narrow > div.mobile-nav__mobile-menu-wrapper.span-12.auto.relative"
    ]
  },
  {
    "url": "https://editions-theme-spring.myshopify.com",
    "path": "Editions/13.0.0.html",
    "scrapedAt": "2023-05-20T00:01:29.249Z",
    "theme": {
      "name": "Editions",
      "version": "13.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.shopify-features__smart-payment-buttons--enabled > body.template-index > div#shopify-section-sections--14837034778714__header.shopify-section.shopify-section-group-header-group.shopify-section--header > div.site-header-container.site-header-container--sticky > header.site-header.site-header--sticky > div.site-header__wrapper > nav.site-navigation > ul.navigation-desktop"
    ],
    "confirmedMobileSelectors": [
      "html.js.no-touch.shopify-features__smart-payment-buttons--enabled > body.template-index > nav.navigation-mobile > div.navigation-mobile__flyout > ul.mobile-menu.pxu-lia-block"
    ]
  },
  {
    "url": "https://effortless-theme-demo.myshopify.com",
    "path": "Effortless/2.2.0.html",
    "scrapedAt": "2023-05-20T00:01:29.568Z",
    "theme": {
      "name": "Effortless",
      "version": "2.2.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.template--index.template-- > div#shopify-section-header.shopify-section > sticky-header.header-wrapper > header > div.page-width > div.header.header--center-drawer.header--has-menu > div.header-item.header__inline-menu > header-drawer > details.menu-drawer-container > div#menu-drawer.menu-drawer.motion-reduce > div.menu-drawer__inner-container > div.menu-drawer__navigation-container > nav.menu-drawer__navigation"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.template--index.template-- > div#shopify-section-header.shopify-section > sticky-header.header-wrapper > header > div.page-width > div.header.header--center-drawer.header--has-menu > div.header-item.header__inline-menu > header-drawer > details.menu-drawer-container > div#menu-drawer.menu-drawer.motion-reduce > div.menu-drawer__inner-container > div.menu-drawer__navigation-container > nav.menu-drawer__navigation"
    ]
  },
  {
    "url": "https://local-theme-light.myshopify.com",
    "path": "Emerge/6.1.1.html",
    "scrapedAt": "2023-05-20T00:01:29.798Z",
    "theme": {
      "name": "Emerge",
      "version": "6.1.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.flexbox-gap.shopify-features__smart-payment-buttons--enabled > body.template--index.page--shapes > div.layout--viewport > div.layout--main-content > header.layout--header-group > div#shopify-section-sections--14806934323278__header.shopify-section.shopify-section-group-header-group.section--header > header-root.header--root > transition-root.header--container > div.header--left-side > div.header--main-menu > x-menu-root.x-menu > ul.x-menu--level-1--container"
    ],
    "confirmedMobileSelectors": [
      "html.js.flexbox-gap.shopify-features__smart-payment-buttons--enabled > body.template--index.page--shapes > div.layout--viewport > drawer-root.drawer--root > transition-root.drawer--instance:nth-of-type(6) > div.drawer--container > mobile-nav-root.mobile-nav > div.mobile-nav--menu > y-menu-root.y-menu > ul.y-menu--level-1--container"
    ]
  },
  {
    "url": "https://empire-theme-supply.myshopify.com",
    "path": "Empire/9.0.0.html",
    "scrapedAt": "2023-05-20T00:01:30.091Z",
    "theme": {
      "name": "Empire",
      "version": "9.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.shopify-features__smart-payment-buttons--enabled > body.template-index.site-header-sticky > div#shopify-section-sections--14878200922210__header.shopify-section.shopify-section-group-header-group.site-header-wrapper > header.site-header.site-header-nav--open > div#site-header-nav.site-navigation-wrapper.site-navigation--has-actions.site-header--full-width > nav.site-navigation > ul.navmenu.navmenu-depth-1"
    ]
  },
  {
    "url": "https://emporium-theme-fruity.myshopify.com",
    "path": "Emporium/2.1.0.html",
    "scrapedAt": "2023-05-20T00:01:30.301Z",
    "theme": {
      "name": "Emporium",
      "version": "2.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled.js-focus-visible > body.template-index.font-body.font-normal-body.w-1/1 > div#shopify-section-header.shopify-section.behavior-static.scroll-direction-down > header.color-scheme-primary-1.relative > nav > div.color-scheme-primary-1.bg-background.hidden.md:block.select-none > div.box-content.max-w-screen-2xl.mx-auto.px-4.md:px-6.xl:px-8.2xl:px-10 > ce-drop-down-placer > div > ul.-mx-6.md:flex.md:flex-wrap.md:justify-start"
    ]
  },
  {
    "url": "https://enterprise-theme-digital.myshopify.com",
    "path": "Enterprise/1.0.1.html",
    "scrapedAt": "2023-05-20T00:01:30.570Z",
    "theme": {
      "name": "Enterprise",
      "version": "1.0.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [],
    "confirmedMobileSelectors": [
      "html.js > body.cc-animate-enabled.dom-loaded.fixed.dom-loaded-plus-6 > div#shopify-section-sections--18873641992480__header.shopify-section.shopify-section-group-header-group.cc-header.cc-header--sticky > store-header.header.bg-theme-bg.text-theme-text.has-motion > header.header__grid.container.flex.flex-wrap.items-center > main-menu.main-menu.main-menu--left-mob > details.main-menu__disclosure.has-motion > div.main-menu__content.has-motion > nav > ul.main-nav"
    ]
  },
  {
    "url": "https://envy-oslo.myshopify.com",
    "path": "Envy/32.0.0.html",
    "scrapedAt": "2023-05-20T00:01:30.860Z",
    "theme": {
      "name": "Envy",
      "version": "32.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.js.header-wrapper--overlay.unstuck > div.sticky-header-wrapper > div.sticky-header-wrapper__inner > div.sticky-header-menu.d-none.d-lg-block > div#main-navigation-wrapper.main-navigation-wrapper.main-navigation-wrapper--center.mega-menu-wrapper > ul.nav.js.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.js.header-wrapper--overlay.unstuck > div.sticky-header-wrapper > div.sticky-header-wrapper__inner > div.sticky-header-menu.d-none.d-lg-block > div#main-navigation-wrapper.main-navigation-wrapper.main-navigation-wrapper--center.mega-menu-wrapper > ul.nav.no-js.desktop.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.js.header-wrapper--overlay.unstuck > div.sticky-header-wrapper > div.sticky-header-wrapper__inner > div.sticky-header-menu.d-none.d-lg-block > div#main-navigation-wrapper.main-navigation-wrapper.main-navigation-wrapper--center.mega-menu-wrapper > ul.nav.no-js.mobile.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.js.header-wrapper--overlay.unstuck > div.header-menu-wrapper.d-none.d-lg-block > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.main-navigation-wrapper--center.mega-menu-wrapper > ul.nav.js.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.js.header-wrapper--overlay.unstuck > div.header-menu-wrapper.d-none.d-lg-block > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.main-navigation-wrapper--center.mega-menu-wrapper > ul.nav.no-js.desktop.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.js.header-wrapper--overlay.unstuck > div.header-menu-wrapper.d-none.d-lg-block > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.main-navigation-wrapper--center.mega-menu-wrapper > ul.nav.no-js.mobile.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.no-js > nav > div.header-menu-wrapper > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.mega-menu-wrapper > ul.nav.js.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.no-js > nav > div.header-menu-wrapper > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.mega-menu-wrapper > ul.nav.no-js.desktop.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.no-js > nav > div.header-menu-wrapper > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.mega-menu-wrapper > ul.nav.no-js.mobile.nav-pills"
    ]
  },
  {
    "url": "https://whileymai-dev-new.myshopify.com",
    "path": "Erickson/3.0.0.html",
    "scrapedAt": "2023-05-20T00:01:31.128Z",
    "theme": {
      "name": "Erickson",
      "version": "3.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-no-cookies.pb-0 > body#index.erickson-theme.page-content > div#shopify-section-sections--16210813845689__header-section.shopify-section.shopify-section-group-header-group.index-home-header > header#sections--16210813845689__header-section.header-global.border-bottom > section.mega-menu.container > nav#navbar.menu.navbar.navbar-expand-lg.megamenu-bg.container.mx-auto.px-0.megamenu-wide > ul.navbar-nav.mx-auto.main-menu"
    ]
  },
  {
    "url": "https://x-breeze.myshopify.com",
    "path": "Eurus/2.0.0.html",
    "scrapedAt": "2023-05-20T00:01:31.413Z",
    "theme": {
      "name": "Eurus",
      "version": "2.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.no-js > body.gradient.scrollbar-body.overflow-x-hidden.text-[0.7875rem].md:text-[0.875rem] > div#shopify-section-sections--18777565823270__header.shopify-section.shopify-section-group-header-group.section-header > div#x-header-container.relative.z-50 > div#sticky-header.shopify-header.transparent-header > div#sticky-header-content.sticky-header-content.w-full.pt-4.lg:pt-2.top-0.pl-5.pr-5.pb-4.md:pb-0.2xl:pl-0.2xl:pr-0.absolute.disable-tranparent-collection.lg:hover:bg-[rgba(var(--background-color-header))] > header.page-width.grid.lg:mx-auto.gap-x-2 > nav.[grid-area:navigation].pb-2.lg:[grid-area:auto].order-3.hidden.header__inline-menu.lg:flex.items-center"
    ]
  },
  {
    "url": "https://expanse-theme-beauty.myshopify.com",
    "path": "Expanse/4.3.4.html",
    "scrapedAt": "2023-05-20T00:01:31.668Z",
    "theme": {
      "name": "Expanse",
      "version": "4.3.4",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.loaded > div#PageContainer.page-container > div.transition-body > div#shopify-section-sections--16027982561457__header.shopify-section.shopify-section-group-header-group.header-section.header-section--overlay > div > div#HeaderWrapper.header-wrapper.header-wrapper--overlay.is-light > header#SiteHeader.site-header > div.site-header__element.site-header__element--top > div.page-width > div.header-layout > div.header-item.header-item--navigation > ul.site-nav.site-navigation.site-navigation--beside.small--hide"
    ]
  },
  {
    "url": "https://naturale-theme.myshopify.com",
    "path": "Expression/7.0.0.html",
    "scrapedAt": "2023-05-20T00:01:31.874Z",
    "theme": {
      "name": "Expression",
      "version": "7.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-cookies > body#expression-ideal-for-promotion-focused-stores-with-large-inventories.template-index > div#shopify-section-header.shopify-section > header.page-width.page-header.section--header > div.page-header--content.container > nav.main-nav-bar > div.mobile-nav-column-outer > div.mobile-nav-column-inner > div.mobile-nav-menu-container.mobile-menu-level-1 > ul.main-nav"
    ]
  },
  {
    "url": "https://fashionopolism-secret-sale.myshopify.com",
    "path": "Fashionopolism/9.1.0.html",
    "scrapedAt": "2023-05-20T00:01:32.155Z",
    "theme": {
      "name": "Fashionopolism",
      "version": "9.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gridlock.template-index.index.theme-features__product-variants--swatches.theme-features__section-title-border--none.theme-features__details-align--center.theme-features__image-hover-transition--true.theme-features__ghost-buttons--false.js-slideout-toggle-wrapper.js-modal-toggle-wrapper > div.site-wrap > div.page-wrap > div#shopify-section-sections--14900048429107__header.shopify-section.shopify-section-group-header-group.js-site-header > theme-header > div.header-section.js-header-section > header.theme-header.stickynav > div#identity.row > nav.navigation.inline-header.js-nav > div#navigation.navigation__maincontainer > ul#nav"
    ]
  },
  {
    "url": "https://fetch-theme-modern.myshopify.com",
    "path": "Fetch/1.1.4.html",
    "scrapedAt": "2023-05-20T00:01:32.395Z",
    "theme": {
      "name": "Fetch",
      "version": "1.1.4",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.loaded > div#PageContainer.page-container > div.transition-body > div#shopify-section-sections--18940378775833__header.shopify-section.shopify-section-group-header-group.header-section > div > div#HeaderWrapper.header-wrapper > header#SiteHeader.site-header > div.site-header__element.site-header__element--top > div.page-width > div.header-layout > div.header-item.header-item--navigation > ul.site-nav.site-navigation.site-navigation--beside.small--hide"
    ]
  },
  {
    "url": "https://flow-queenstown.myshopify.com",
    "path": "Flow/31.0.8.html",
    "scrapedAt": "2023-05-20T00:01:32.614Z",
    "theme": {
      "name": "Flow",
      "version": "31.0.8",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body#flow-theme-queenstown.template-index.page-fade.images-aspect-ratio.loaded > div#PageContainer > div#shopify-section-sections--14761014132806__header.shopify-section.shopify-section-group-header-group.header-section.sticky-header > div.header-section--wrapper.overlay-header-wrapper > header.site-header.medium--hide.small--hide.overlay-header.overlay-logo > div.site-header__wrapper.site-header__wrapper--logo-center.site-header__wrapper--with-menu > div.site-header__wrapper__left > div#top_links_wrapper.js.site-header__nav.top-links > ul#AccessibleNav.site-nav.mega-menu-wrapper.js"
    ]
  },
  {
    "url": "https://focal-theme-carbon.myshopify.com",
    "path": "Focal/8.1.0.html",
    "scrapedAt": "2023-05-20T00:01:32.953Z",
    "theme": {
      "name": "Focal",
      "version": "8.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.no-focus-outline.features--image-zoom > div#shopify-section-header.shopify-section.shopify-section--header > store-header.header > div.container > div.header__wrapper > nav.header__inline-navigation"
    ]
  },
  {
    "url": "https://foodie-theme-coffee.myshopify.com",
    "path": "Foodie/4.1.0.html",
    "scrapedAt": "2023-05-20T00:01:33.304Z",
    "theme": {
      "name": "Foodie",
      "version": "4.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-no-cookies > body#foodie-shopify-theme.template-index.js-slideout-toggle-wrapper.js-modal-toggle-wrapper.fade.section-fade-in > main.site-wrap > div#shopify-section-sections--16109095092395__header.shopify-section.shopify-section-group-header-group.js-site-header > header.section-header.header-section.no-section-animation > section.section-header__main-bar.main-bar.w100.devices-hide.js-theme-header.stickynav > div.grid__wrapper.inline-layout > article.header-inline__nav-wrapper.span-4.auto.v-center.a-left > div.navigation > ul.header__navigation.mb0.inline-block"
    ]
  },
  {
    "url": "https://forge-theme-demo.myshopify.com",
    "path": "Forge/2.2.0.html",
    "scrapedAt": "2023-05-20T00:01:33.562Z",
    "theme": {
      "name": "Forge",
      "version": "2.2.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-no-cookies > body#forge-shopify-theme.template-index.js-slideout-toggle-wrapper.js-modal-toggle-wrapper.animation--active.animation-type--fade.animation-text--active.animation-text-type--fadeInUp > main.site-wrap > div#shopify-section-sections--16763909898473__header.shopify-section.shopify-section-group-header-group > header.section-header.header-section.no-section-animation > section.section-header__main-bar.main-bar.w100.devices-hide.js-theme-header.stickynav.js-stickynav > div.grid__wrapper.inline-layout > article.header-inline__nav-wrapper.span-4.auto.v-center.a-center > div.navigation > ul#main-nav.navigation__menu.tablet-hide.sm-hide"
    ]
  },
  {
    "url": "https://archer-themes.myshopify.com",
    "path": "Frame/2.2.2.html",
    "scrapedAt": "2023-05-20T00:01:33.800Z",
    "theme": {
      "name": "Frame",
      "version": "2.2.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.svg.flexbox.csstransforms > body.template-index.hasHover > div#shopify-section-header.shopify-section > sticky-header.header-wrapper > header.header.header--top-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://fresh-theme-sweet.myshopify.com",
    "path": "Fresh/32.0.0.html",
    "scrapedAt": "2023-05-20T00:01:34.081Z",
    "theme": {
      "name": "Fresh",
      "version": "32.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body#fresh-theme-sweet.page-title--fresh-theme-sweet.template-index.flexbox-wrapper > div#PageContainer.main-body-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--16026532348095__header.shopify-section.shopify-section-group-header-group > div#theme-section-header.header-wrapper.logo-placement--center.overlay--active.unstuck.header-wrapper--overlay > div.sticky-header-wrapper > div.sticky-header-wrapper__inner > div.sticky-desktop-menu.d-none.d-lg-block > div.header-menu-wrapper.d-none.d-lg-block > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.mega-menu-wrapper > ul.nav.nav-pills",
      "html.js.shopify-features__smart-payment-buttons--enabled > body#fresh-theme-sweet.page-title--fresh-theme-sweet.template-index.flexbox-wrapper > div#PageContainer.main-body-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--16026532348095__header.shopify-section.shopify-section-group-header-group > div#theme-section-header.header-wrapper.logo-placement--center.overlay--active.unstuck.header-wrapper--overlay > div.header-row > div.header-menu-wrapper.d-none.d-lg-block > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.mega-menu-wrapper > ul.nav.nav-pills"
    ]
  },
  {
    "url": "https://utd-theme-2.myshopify.com",
    "path": "Gain/1.0.0.html",
    "scrapedAt": "2023-05-20T00:01:34.339Z",
    "theme": {
      "name": "Gain",
      "version": "1.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.shopify-features__smart-payment-buttons--enabled > body.template-index > div#shopify-section-sections--18320264233252__header.shopify-section.shopify-section-group-header-group-with-cart-drawer.header-section > header.header.header--bottom-border.js-header > div.header__container > div.header__menu > nav.header-menu > ul.header-menu__list.header-menu__list--main"
    ]
  },
  {
    "url": "https://galleria-tech.myshopify.com",
    "path": "Galleria/3.0.15.html",
    "scrapedAt": "2023-05-20T00:01:34.569Z",
    "theme": {
      "name": "Galleria",
      "version": "3.0.15",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body > div#shopify-section-main-header.shopify-section.shopify-section--no-animation > main-header#MainHeader.#main-header.block.@text-size:md.@overlap:dark.@overlap > div.#main-header-inner > div.#main-nav-container > div#main-header-mainNav.#main-nav-wrapper.hide-mobile > main-nav.#main-nav.@text-size:md > ul.#main-nav-menu"
    ]
  },
  {
    "url": "https://grid-theme-bright.myshopify.com",
    "path": "Grid/6.0.0.html",
    "scrapedAt": "2023-05-20T00:01:34.770Z",
    "theme": {
      "name": "Grid",
      "version": "6.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.shopify-features__smart-payment-buttons--enabled.js.no-touch.cssanimations.csstransforms.csstransitions.svg.inlinesvg.cookies.bgsizecover.csscalc.placeholder > body.template-index.template-suffix- > div#shopify-section-sections--14840845697105__header.shopify-section.shopify-section-group-header-group > section.header.header-layout-compact-left.header-content-width > header.main-header > div.header-main-content > div.navigation-wrapper.navigation--loaded > nav.navigation.navigation-desktop.navigation-has-mega-nav"
    ]
  },
  {
    "url": "https://habitat-main.myshopify.com",
    "path": "Habitat/2.0.2.html",
    "scrapedAt": "2023-05-20T00:01:34.959Z",
    "theme": {
      "name": "Habitat",
      "version": "2.0.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.animations-true.button-uppercase-true.navigation-uppercase-false.product-title-uppercase-false.template-index.header-sticky--active > div#wrapper > div#shopify-section-sections--15799275225280__header.shopify-section.shopify-section-group-header-group.header-section > theme-header#header.header.header-sticky--active.style1.header--shadow-none > div.row.expanded > div.small-12.columns > full-menu.full-menu > ul.thb-full-menu"
    ]
  },
  {
    "url": "https://handmade-demo.myshopify.com",
    "path": "Handmade/2.0.0.html",
    "scrapedAt": "2023-05-20T00:01:35.218Z",
    "theme": {
      "name": "Handmade",
      "version": "2.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index > div#shopify-section-sections--16059895709893__header.shopify-section.shopify-section-group-header-group.shopify-section-header > sticky-header.header-wrapper.color-background-1 > header.header.header--center.container.container--header.header--has-menu > div.container > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://highlight-theme.myshopify.com",
    "path": "Highlight/3.0.1.html",
    "scrapedAt": "2023-05-20T00:01:35.455Z",
    "theme": {
      "name": "Highlight",
      "version": "3.0.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "skip"
    ]
  },
  {
    "url": "https://icon-shopify-theme.myshopify.com",
    "path": "Icon/9.1.0.html",
    "scrapedAt": "2023-05-20T00:01:35.731Z",
    "theme": {
      "name": "Icon",
      "version": "9.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gridlock.template-index.js-slideout-toggle-wrapper.js-modal-toggle-wrapper.theme-features__secondary-color-not-black--false.theme-features__product-variants--swatches.theme-features__image-flip--enabled.theme-features__sold-out-icon--enabled.theme-features__sale-icon--enabled.theme-features__new-icon--enabled.theme-features__section-titles--none.theme-features__section-title-align--center.theme-features__details-align--center.theme-features__rounded-buttons--disabled.theme-features__zoom-effect--enabled.theme-features__icon-position--top_right.theme-features__icon-shape--rectangle > div.site-wrap > div#shopify-section-sections--14532379213906__header.shopify-section.shopify-section-group-header-group > theme-header > header.header-section > div#navigation > div.row > div.nav-container.grid__wrapper.inline > nav.navigation.header-navigation.span-5.auto > ul#main-nav.navigation__menu"
    ]
  },
  {
    "url": "https://impact-theme-sound.myshopify.com",
    "path": "Impact/4.3.1.html",
    "scrapedAt": "2023-05-20T00:01:35.988Z",
    "theme": {
      "name": "Impact",
      "version": "4.3.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.native-share--disabled.shopify-features__smart-payment-buttons--enabled > body.page-transition.zoom-image--enabled > header#shopify-section-sections--16731742961914__header.shopify-section.shopify-section-group-header-group.shopify-section--header > height-observer > store-header.header > div.header__wrapper > div.header__main-nav > div.header__icon-list > nav.header__link-list.justify-center.wrap > ul.contents"
    ]
  },
  {
    "url": "https://impulse-theme-fashion.myshopify.com",
    "path": "Impulse/7.3.4.html",
    "scrapedAt": "2023-05-20T00:01:36.232Z",
    "theme": {
      "name": "Impulse",
      "version": "7.3.4",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index > div#PageContainer.page-container > div.transition-body > div#shopify-section-sections--14565180506170__header.shopify-section.shopify-section-group-header-group > div > div.header-sticky-wrapper > div#HeaderWrapper.header-wrapper > div#StickyHeaderWrap > header#SiteHeader.site-header > div.page-width > div.header-layout.header-layout--center-split > div.header-item.header-item--logo-split > div.header-item.header-item--split-right > ul.site-nav.site-navigation.small--hide"
    ]
  },
  {
    "url": "https://influence-theme.myshopify.com",
    "path": "Influence/3.0.0.html",
    "scrapedAt": "2023-05-20T00:01:36.509Z",
    "theme": {
      "name": "Influence",
      "version": "3.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.max-w-full.overflow-x-hidden.!h-auto.shopify-features__smart-payment-buttons--enabled > body.template-index.bg-page.text-base.font-body.max-w-full.overflow-x-hidden.!h-auto > div#shopify-section-sections--16874698539222__header.shopify-section.shopify-section-group-header-group.relative > header-main > header.grid.py-3.px-4.lg:px-5.xl:px-6.lg:py-0.md:gap-[1rem].items-center.bg-page.text-body.relative.border-b.border-b-border-opacity-10 > div#main-navigation.invisible.lg:visible.lg:h-full.flex.flex-col.items-start.lg:items-center.absolute.bottom-0.left-0.right-0.translate-y-full.opacity-0.lg:opacity-100.z-[101].pb-4.lg:pb-0.lg:static.lg:transform-none.bg-page.main-navigation > ul.lg:h-full.inline-flex.flex-col.lg:flex-row.flex-wrap.w-full.px-4.lg:px-0"
    ]
  },
  {
    "url": "https://ira-theme-active.myshopify.com",
    "path": "Ira/4.7.0.html",
    "scrapedAt": "2023-05-20T00:01:36.704Z",
    "theme": {
      "name": "Ira",
      "version": "4.7.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js-focus-visible > body.template-index.show-borders > div.page > div#shopify-section-header.shopify-section.header__outer-wrapper > header.header.header--inline.header--logo--left.header--transparent-home.header--has-accounts > div.header__links > ul.header__links-list.fs-body-base"
    ]
  },
  {
    "url": "https://king-theme-v3.myshopify.com",
    "path": "Kingdom/5.0.0.html",
    "scrapedAt": "2023-05-20T00:01:36.977Z",
    "theme": {
      "name": "Kingdom",
      "version": "5.0.0",
      "themeStore": true
    }
  },
  {
    "url": "https://label-theme-record-2.myshopify.com",
    "path": "Label/3.0.3.html",
    "scrapedAt": "2023-05-20T00:01:37.215Z",
    "theme": {
      "name": "Label",
      "version": "3.0.3",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-cookies.shopify-features__smart-payment-buttons--enabled > body#records.template-index.font-body > div#shopify-section-header.shopify-section.section-site-header.relative > header.site-header.section-x-padding.w-full.text-white-text.absolute.z-20 > div#headerBorderWrap.headerBorderWrap.border-b-theme-width.border-transparent > div#headerContainer.z-10 > div.py-4.lg:py-8 > div.flex.justify-between.items-center > div.flex.flex-grow.w-1/3.justify-start.items-center > div.hidden.lg:block > nav > ul.-mx-4.flex.flex-wrap.justify-start.items-center.type-navigation.text-base"
    ]
  },
  {
    "url": "https://launch-theme-cool.myshopify.com",
    "path": "Launch/8.0.0.html",
    "scrapedAt": "2023-05-20T00:01:37.448Z",
    "theme": {
      "name": "Launch",
      "version": "8.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.hydrated > body.template-index.has-slideshow-full-window.has-goal-expired.slide-color-light > div#shopify-section-sections--15088694820887__header.shopify-section.shopify-section-group-header-group.shopify-section--header > div.header.higher-than-slideshow > div.main-header-wrapper > div.main-header > div.header-tools > nav#header-navigation.navigation"
    ]
  },
  {
    "url": "https://local-theme-light-demo.myshopify.com",
    "path": "Local/2.1.0.html",
    "scrapedAt": "2023-05-20T00:01:37.719Z",
    "theme": {
      "name": "Local",
      "version": "2.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.no-js.shopify-features__smart-payment-buttons--enabled > body#local-shopify-theme.no-touchevents.template-index > div#shopify-section-sections--15174145409085__header.shopify-section.shopify-section-group-header-group.site-header-container.mount-header > main-header#site-header.site-header > div.header-container.header-container--bottom.show-header-actions-on-mobile > div.header__bottom.container--large > scrollable-navigation.header-links > div.site-nav.style--classic > div.site-nav-container > nav > ul.link-list"
    ]
  },
  {
    "url": "https://loft-theme-demo-nashville.myshopify.com",
    "path": "Loft/2.3.0.html",
    "scrapedAt": "2023-05-20T00:01:37.951Z",
    "theme": {
      "name": "Loft",
      "version": "2.3.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.hydrated > body#loft-theme.template-index > article.header__section-wrapper > div#shopify-section-header.shopify-section.section-header > div > header#header.site-header.site-header--top.nav-bar.card-shadow > div.header__wrapper.header__wrapper--left > div.header__nav.header__nav--left.medium-down--hide > nav.js__desktop--nav > ul#AccessibleNav.site-nav.mega-menu.multinav"
    ]
  },
  {
    "url": "https://lorenza-theme-chic.myshopify.com",
    "path": "Lorenza/5.6.0.html",
    "scrapedAt": "2023-05-20T00:01:38.221Z",
    "theme": {
      "name": "Lorenza",
      "version": "5.6.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.header-transparent > body.template-index.secondary_button-style-bordered > header.header-container > div#shopify-section-header.shopify-section.header-section > section.w-100.z-5.first-section-is-full-width > div#header.header.header--default.header--alignment-left.header--position-inline.header--content-normal.header--style-is-icon.header--has-mobile-search-icon.header--transparent.animation.animation--header > div.header__content > div.header__content-inner.flex.justify-between.w-100 > nav.header__nav"
    ]
  },
  {
    "url": "https://maker-theme-luna.myshopify.com",
    "path": "Maker/8.1.1.html",
    "scrapedAt": "2023-05-20T00:01:38.511Z",
    "theme": {
      "name": "Maker",
      "version": "8.1.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.flexbox-gap.shopify-features__smart-payment-buttons--enabled > body.template--index.page--maker-theme-luna > div.layout--viewport > div.layout--main-content > header.layout--header-group > div#shopify-section-sections--16077326581917__header.shopify-section.shopify-section-group-header-group.section--header > header-root.header--root > div.header--container > div.header--left-side > x-menu-root.x-menu > ul.x-menu--level-1--container"
    ]
  },
  {
    "url": "https://mandolin-neat.myshopify.com",
    "path": "Mandolin/2.4.0.html",
    "scrapedAt": "2023-05-20T00:01:38.740Z",
    "theme": {
      "name": "Mandolin",
      "version": "2.4.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.MandolinTheme.Template.Template--index > div#shopify-section-sections--16732953510103__header.shopify-section.shopify-section-group-header-group.shopify-section--header > header#Header.Header.Header--spacingMedium.Header--transparent.Header--transparentInHeaderGroup > div.Header__Main.Container.Container--fluid > div.Header__MainMenu.HiddenMediumDown > ul.Nav"
    ]
  },
  {
    "url": "https://marble-theme-demo.myshopify.com",
    "path": "Marble/1.3.3.html",
    "scrapedAt": "2023-05-20T00:01:39.079Z",
    "theme": {
      "name": "Marble",
      "version": "1.3.3",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template > div#shopify-section-sections--16054133522629__header.shopify-section.shopify-section-group-header-group.shopify-section-header > sticky-header.header.header--logo-center.header--dropdown-animation-elastic.header--sticky.color-style-2.header--has-logo > div.container.container--fullwidth > div.header__inner > nav.header__nav.small-hide.medium-hide > ul.header__nav-items.list-unstyled"
    ]
  },
  {
    "url": "https://flamingo-theme.myshopify.com",
    "path": "Masonry/5.0.0.html",
    "scrapedAt": "2023-05-20T00:01:39.282Z",
    "theme": {
      "name": "Masonry",
      "version": "5.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": []
  },
  {
    "url": "https://mavon-demo.myshopify.com",
    "path": "Mavon/1.2.0.html",
    "scrapedAt": "2023-05-20T00:01:39.532Z",
    "theme": {
      "name": "Mavon",
      "version": "1.2.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body > header#shopify-section-sections--18787314729258__header.shopify-section.shopify-section-group-header-group > div#shopify__header__section.header.header__area.transparent--header > div.header_bottom.header__sticky.transparent_header_color.middle_left > div.container > div.header__inner.row > nav.header__menu.col.d-md-none.justify-content-center > ul.header__menu_ul"
    ]
  },
  {
    "url": "https://minion-theme-vertical.myshopify.com",
    "path": "Minion/2.2.1.html",
    "scrapedAt": "2023-05-20T00:01:39.766Z",
    "theme": {
      "name": "Minion",
      "version": "2.2.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.dom-loaded > body > div#shopify-section-sections--16667434123496__header.shopify-section.shopify-section-group-header-group.section-header > sticky-header.display-block > header > div.header__desktop > div.header-layout-vertical.page-width > div.header.menu-to-right > nav.list-menu.menu--animation-underline > ul.unstyle-ul.list-menu--inline"
    ]
  },
  {
    "url": "https://mode-theme-orbit.myshopify.com",
    "path": "Mode/3.0.0.html",
    "scrapedAt": "2023-05-20T00:01:40.043Z",
    "theme": {
      "name": "Mode",
      "version": "3.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.template-index.swatch-method-standard.swatch-style-icon_square.image-load-anim-enabled.cc-animate-enabled > div#shopify-section-header.shopify-section.section-header > div.wide-container.cc-animate-init.-in.cc-animate-complete > div#pageheader.pageheader.pageheader--layout-inline-menu-center.pageheader--layout-inline-permitted.pageheader--sticky.card.card--header > div.logo-area > div.logo-area__left > div.logo-area__left__inner > div.navigation.navigation--desktop"
    ]
  },
  {
    "url": "https://mayfair-theme.myshopify.com",
    "path": "Modular/3.1.1.html",
    "scrapedAt": "2023-05-20T00:01:40.291Z",
    "theme": {
      "name": "Modular",
      "version": "3.1.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.iframe > body#modular-theme-mayfair.template-index.allow-text-animations.allow-grid-animations.allow-image-animations > div.page-wrap > div#shopify-section-header.shopify-section.shopify-section-header > header.site-header.header--is-standard.header--logo_center_links_left > div.container > div.row > div.header-fix-cont > div.header-fix-cont-inner > nav.nav-standard.nav-main"
    ]
  },
  {
    "url": "https://aberne.myshopify.com",
    "path": "Modules/1.1.0.html",
    "scrapedAt": "2023-05-20T00:01:40.480Z",
    "theme": {
      "name": "Modules",
      "version": "1.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.shopify-features__smart-payment-buttons--enabled > body > div#shopify-section-header.shopify-section > div#headerWrap > header#headerBar.square.headerBorderBottom > div.flexAlignCenter.headerContentWrap > nav.mainNav"
    ]
  },
  {
    "url": "https://mojave-theme.myshopify.com",
    "path": "Mojave/2.0.6.html",
    "scrapedAt": "2023-05-20T00:01:40.781Z",
    "theme": {
      "name": "Mojave",
      "version": "2.0.6",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template.template--index.template--default > div#shopify-section-sections--16714402595037__header.shopify-section.shopify-section-group-header-group.section--header > sticky-header.header-wrapper.header.header--logo-center.header--border-bottom.header--has-menu > header.header__wrapper > div.container > div.header__inner > nav.header__nav > ul.header__nav__list.list-unstyled"
    ]
  },
  {
    "url": "https://momentum-theme-demo-tyres.myshopify.com",
    "path": "Momentum/3.0.0.html",
    "scrapedAt": "2023-05-20T00:01:41.172Z",
    "theme": {
      "name": "Momentum",
      "version": "3.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.relative.bg-page.text-base.font-body.font-body-weight.font-body-style.overflow-x-hidden > section.block.sticky-header.relative > div#shopify-section-sections--16724852703462__navigation.shopify-section.shopify-section-group-header-group.relative > div.bg-page.text-body > armada-navigation > div#main-navigation.overflow-x-hidden.overflow-y-auto.invisible.lg:visible.lg:min-h-0.lg:h-full.flex.flex-col.items-start.lg:items-center.absolute.bottom-0.left-0.right-0.translate-y-full.opacity-0.lg:opacity-100.z-[101].pb-xl.lg:pb-0.lg:static.lg:transform-none.bg-page.main-navigation"
    ]
  },
  {
    "url": "https://the-mono-theme.myshopify.com",
    "path": "Mono/1.0.7.html",
    "scrapedAt": "2023-05-20T00:01:41.395Z",
    "theme": {
      "name": "Mono",
      "version": "1.0.7",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.template-index > div#shopify-section-sections--16733218472180__header.shopify-section.shopify-section-group-header-group.section-header > sticky-header.header-wrapper.gradient > header.header.header--top-left.page-width-tablet.header--has-menu > nav.header__inline-menu > ul#SiteNav.site-nav.list--inline"
    ]
  },
  {
    "url": "https://motion-theme-adventure.myshopify.com",
    "path": "Motion/9.0.0.html",
    "scrapedAt": "2023-05-20T00:01:41.614Z",
    "theme": {
      "name": "Motion",
      "version": "9.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.template-index.loaded > div#PageContainer.page-container > div.transition-body > div#shopify-section-header.shopify-section > div > div#HeaderWrapper.header-wrapper.header-wrapper--overlay.is-light > div#StickyHeaderWrap > header#SiteHeader.site-header > div.page-width > div.header-layout.header-layout--left-center > div.header-item.header-item--navigation.text-center > ul.site-nav.site-navigation.medium-down--hide"
    ]
  },
  {
    "url": "https://mr-parker.myshopify.com",
    "path": "Mr Parker/9.1.0.html",
    "scrapedAt": "2023-05-20T00:01:41.827Z",
    "theme": {
      "name": "Mr Parker",
      "version": "9.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gridlock.ultra_wide.template-index.index.theme-features__header-border-style--solid.theme-features__header-horizontal-alignment--bottom.theme-features__header-border-weight--3.theme-features__header-border-width--10.theme-features__header-edges--none.theme-features__h2-size--26.theme-features__header-vertical-alignment--center.theme-features__rounded-buttons--enabled.theme-features__display-options--image-switch.theme-features__product-align--center.theme-features__product-border--disabled.theme-features__product-info--sizes.theme-features__price-bold--disabled.theme-features__product-icon-position--top-left.theme-features__ultra-wide--enabled.js-slideout-toggle-wrapper.js-modal-toggle-wrapper > main.site-wrap > div.js-header-group > div#shopify-section-sections--15197147365410__header.shopify-section.shopify-section-group-header-group.js-site-header > theme-header > header.header__wrapper.inline_left.js-theme-header.stickynav > nav.header__nav-container.hover-color.js-nav > div.header__nav-below.grid__wrapper.device-hide > div.span-8.a-center.auto.v-center > ul.header__nav__list.inline__wrapper.nav"
    ]
  },
  {
    "url": "https://north-original.myshopify.com",
    "path": "North/1.9.7.html",
    "scrapedAt": "2023-05-20T00:01:42.054Z",
    "theme": {
      "name": "North",
      "version": "1.9.7",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.button-uppercase--false > div#wrapper.open > div#shopify-section-sections--14752103628885__header.shopify-section.shopify-section-group-header-group.header-section > header.header.style1.header--shadow-none.light-title.fixed > div.row.align-middle > div.small-12.columns > div.header-grid > div.show-for-large > nav.menu-holder > ul.thb-full-menu.uppercase-false"
    ]
  },
  {
    "url": "https://theme-origin-demo.myshopify.com",
    "path": "Dawn/7.0.1.html",
    "scrapedAt": "2023-05-20T00:01:42.306Z",
    "theme": {
      "name": "Dawn",
      "version": "7.0.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.gradient > main#MainContent.content-for-layout.focus-none > section#shopify-section-template--16487782875445__featured_collection.shopify-section.section > div.color-background-1.isolate.gradient > div.collection.section-template--16487782875445__featured_collection-padding.collection--full-width > slider-component.slider-mobile-gutter.slider-component-full-width.slider-component-desktop > ul#Slider-template--16487782875445__featured_collection.grid.product-grid.contains-card.contains-card--product.grid--5-col-desktop.grid--2-col-tablet-down.slider.slider--desktop.slider--tablet.grid--peek"
    ]
  },
  {
    "url": "https://pacific-theme-bold.myshopify.com",
    "path": "Pacific/6.0.0.html",
    "scrapedAt": "2023-05-20T00:01:42.554Z",
    "theme": {
      "name": "Pacific",
      "version": "6.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.shopify-features__smart-payment-buttons--enabled > body.sidebar-disabled.template-index.main-header-sticky > div#shopify-section-sections--14891563417651__header.shopify-section.shopify-section-group-header-group.section-header > div > div.main-header-wrapper > div.mobile-nav-wrapper > div.site-mobile-nav > nav.mobile-nav-content > ul.navmenu.navmenu-depth-1"
    ]
  },
  {
    "url": "https://palo-alto-theme-vibrant.myshopify.com",
    "path": "Palo Alto/5.0.0.html",
    "scrapedAt": "2023-05-20T00:01:42.834Z",
    "theme": {
      "name": "Palo Alto",
      "version": "5.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.is-loaded > body#palo-alto-theme-vibrant.template-index.body--rounded-corners.aos-initialized.palette--light.no-outline.hide-header > div#shopify-section-sections--18868559020310__header.shopify-section.shopify-section-group-group-header.shopify-section-header > header#SiteHeader.site-header.site-header--fixed.site-header--nav-left.site-header--transparent.site-header--has-logo.site-header--has-border > div.wrapper.aos-init.aos-animate > nav#NavStandard.nav.nav--default.nav--weight-bold > div.menu__items"
    ]
  },
  {
    "url": "https://paperthemedemo2.myshopify.com",
    "path": "Paper/5.1.0.html",
    "scrapedAt": "2023-05-20T00:01:43.063Z",
    "theme": {
      "name": "Paper",
      "version": "5.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.min-h-[100vh] > body.min-h-[100vh].break-words.index > header.z-30.dynamic.sticky.top-0.left-0.right-0.animation-300 > div#shopify-section-sections--16747559616745__theme_header.shopify-section.shopify-section-group-header-group > nav.border--b-width.color__bg-body.color__text.color__border-divider-1 > div.relative > div.md:flex.items-stretch.justify-between.hidden.window--wide.flex-wrap > div.flex.flex-wrap.items-center.type__body.w-full"
    ]
  },
  {
    "url": "https://parallax-theme-aspen.myshopify.com",
    "path": "Parallax/6.0.0.html",
    "scrapedAt": "2023-05-20T00:01:43.297Z",
    "theme": {
      "name": "Parallax",
      "version": "6.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.mediaqueries.no-touchevents > body.index.feature_image > div#mm-0.mm-page.mm-slideout > div#shopify-section-sections--14979479601231__header.shopify-section.shopify-section-group-header-group.shopify-section--header.feature_image > div.header.header-dropdown-position--below_parent.header-background--false.header-transparency--false.header-text-shadow--false.sticky-header--true.mm-fixed-top.is-absolute.animated.fadeIn > section.section > div.container.dropdown__wrapper > div.five-sixths.columns.nav.mobile_hidden > ul.header__navigation.menu.center"
    ]
  },
  {
    "url": "https://pipeline-theme-fashion.myshopify.com",
    "path": "Pipeline/7.0.2.html",
    "scrapedAt": "2023-05-20T00:01:43.592Z",
    "theme": {
      "name": "Pipeline",
      "version": "7.0.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.aos-initialized > body#pipeline-fashion.template-index.theme-animate-hover > div#shopify-section-sections--16811992580312__header.shopify-section.shopify-section-group-group-header > div.header__wrapper > header.theme__header > div.header__inner > div.wrapper--full > div.header__desktop.header__desktop--menu_center > div.header__desktop__bar__c > nav.header__menu > div.header__menu__inner"
    ]
  },
  {
    "url": "https://portland-demo-heartbeat.myshopify.com",
    "path": "Portland/2.0.0.html",
    "scrapedAt": "2023-05-20T00:01:43.847Z",
    "theme": {
      "name": "Portland",
      "version": "2.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.body-template-index > div#shopify-section-sections--18942783258898__header.shopify-section.shopify-section-group-header-group.shopify-section-header > sticky-header.header-wrapper > header.header.header--center.container.container--header.header--has-menu > nav.header__inline-menu.header__inline-menu--js > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://prestige-theme-allure.myshopify.com",
    "path": "Prestige/7.3.0.html",
    "scrapedAt": "2023-05-20T00:01:44.092Z",
    "theme": {
      "name": "Prestige",
      "version": "7.3.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.features--button-transition.features--zoom-image > header#shopify-section-sections--14544586014783__header.shopify-section.shopify-section-group-header-group.shopify-section--header > height-observer > x-header.header > nav.header__primary-nav > ul.contents.unstyled-list.md-max:hidden"
    ]
  },
  {
    "url": "https://thunderbolt-providence.myshopify.com",
    "path": "Providence/5.10.2.html",
    "scrapedAt": "2023-05-20T00:01:44.279Z",
    "theme": {
      "name": "Providence",
      "version": "5.10.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.index.thunderbolt.js.flexbox.flexboxlegacy.canvas.canvastext.webgl.no-touch.geolocation.postmessage.websqldatabase.indexeddb.hashchange.history.draganddrop.websockets.rgba.hsla.multiplebgs.backgroundsize.borderimage.borderradius.boxshadow.textshadow.opacity.cssanimations.csscolumns.cssgradients.cssreflections.csstransforms.csstransforms3d.csstransitions.fontface.generatedcontent.video.audio.localstorage.sessionstorage.webworkers.no-applicationcache.svg.inlinesvg.smil.svgclippaths > body > header#shopify-section-header.shopify-section > div.column-screen > div#app-header.sticky-on > div#app-lower-header > div.column-max > nav.menu.text-center"
    ]
  },
  {
    "url": "https://theme-publisher-demo.myshopify.com",
    "path": "Dawn/7.0.1.html",
    "scrapedAt": "2023-05-20T00:01:44.519Z",
    "theme": {
      "name": "Dawn",
      "version": "7.0.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.gradient > main#MainContent.content-for-layout.focus-none > section#shopify-section-template--16487782875445__featured_collection.shopify-section.section > div.color-background-1.isolate.gradient > div.collection.section-template--16487782875445__featured_collection-padding.collection--full-width > slider-component.slider-mobile-gutter.slider-component-full-width.slider-component-desktop > ul#Slider-template--16487782875445__featured_collection.grid.product-grid.contains-card.contains-card--product.grid--5-col-desktop.grid--2-col-tablet-down.slider.slider--desktop.slider--tablet.grid--peek"
    ]
  },
  {
    "url": "https://pursuit-outdoor.myshopify.com",
    "path": "Pursuit/1.0.html",
    "scrapedAt": "2023-05-20T00:01:44.768Z",
    "theme": {
      "name": "Pursuit",
      "version": "1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index > div#shopify-section-header.shopify-section > div > header.site-header.logo--inline.enable_emphasize_category_menu > div.hide_site_header__mobile_nav.grid.grid--no-gutters.site-header__mobile-nav > nav#AccessibleNav.grid__item.medium-up--ten-twelfths.small--hide > div.navigation_wrapper > ul.nav-bar__linklist.list--unstyled.main_nav-bar_linklist"
    ]
  },
  {
    "url": "https://reformation-main.myshopify.com",
    "path": "Reformation/1.5.4.html",
    "scrapedAt": "2023-05-20T00:01:45.036Z",
    "theme": {
      "name": "Reformation",
      "version": "1.5.4",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.animations-true.button-uppercase-true.navigation-uppercase-true.product-title-uppercase-true.template-index > div#wrapper > div#shopify-section-sections--16216397316245__header.shopify-section.shopify-section-group-header-group.header-section > header#header.header.style3.header--shadow-small.transparent--true.header-sticky--active > div.row.expanded > div.small-12.columns > full-menu.full-menu > ul.thb-full-menu"
    ]
  },
  {
    "url": "https://theme-refresh-demo.myshopify.com",
    "path": "Dawn/5.0.0.html",
    "scrapedAt": "2023-05-20T00:01:45.289Z",
    "theme": {
      "name": "Dawn",
      "version": "5.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-inverse.gradient > header.header.header--top-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://responsive-theme-london.myshopify.com",
    "path": "Responsive/9.0.0.html",
    "scrapedAt": "2023-05-20T00:01:45.529Z",
    "theme": {
      "name": "Responsive",
      "version": "9.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch > body.index.promo_banner-show > div#shopify-section-sections--14845371252826__header.shopify-section.shopify-section-group-header-group.shopify-section--header > section.section > div.container.content.header-container > div.one-whole.column > div#nav.nav-align--center.nav-border--solid.nav-separator--solid > ul#menu.js-navigation.menu-navigation.disclosure--enabled.menu-desktop"
    ]
  },
  {
    "url": "https://retina-theme-melbourne.myshopify.com",
    "path": "Retina/7.0.0.html",
    "scrapedAt": "2023-05-20T00:01:45.779Z",
    "theme": {
      "name": "Retina",
      "version": "7.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.index.banner-present--true > div#shopify-section-sections--14889254125666__header.shopify-section.shopify-section-group-header-group.site-header__outer-wrapper.site-header__outer-wrapper--transparent.site-header__outer-wrapper--loaded > header.site-header > div.site-header__wrapper.site-header__wrapper--logo-center > nav.site-header__navigation > ul.main-nav"
    ]
  },
  {
    "url": "https://theme-ride-demo.myshopify.com",
    "path": "Ride/1.0.0.html",
    "scrapedAt": "2023-05-20T00:01:46.026Z",
    "theme": {
      "name": "Ride",
      "version": "1.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--middle-left.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://roam-theme-solo.myshopify.com",
    "path": "Roam/3.0.0.html",
    "scrapedAt": "2023-05-20T00:01:46.282Z",
    "theme": {
      "name": "Roam",
      "version": "3.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.page-template-index.isDesktop > div#shopify-section-sections--17505497448734__header.shopify-section.shopify-section-group-header-group.site-main.site-header > header.container.site-header-wrapper > nav.site-navigation"
    ]
  },
  {
    "url": "https://sahara-theme.myshopify.com",
    "path": "Sahara/1.0.9.html",
    "scrapedAt": "2023-05-20T00:01:46.538Z",
    "theme": {
      "name": "Sahara",
      "version": "1.0.9",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template.template--index.template-theme--sahara > div#shopify-section-sections--19113630171451__header.shopify-section.shopify-section-group-header-group.section--header > header#header.header.js-header.is-transparent.is-sticky.section-sections--19113630171451__header > div.container.container--fullwidth > div.header__inner > nav.header__nav.small-hide.medium-hide.svg-color-inherit.js-nav > ul.header__nav-items.list-unstyled"
    ]
  },
  {
    "url": "https://theme-sense-demo.myshopify.com",
    "path": "Dawn/2.5.0.html",
    "scrapedAt": "2023-05-20T00:01:46.766Z",
    "theme": {
      "name": "Dawn",
      "version": "2.5.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://shapes-theme-skincare.myshopify.com",
    "path": "Shapes/2.0.0.html",
    "scrapedAt": "2023-05-20T00:01:47.028Z",
    "theme": {
      "name": "Shapes",
      "version": "2.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body > div#shopify-section-sections--15812949246133__header.shopify-section.shopify-section-group-header-group.section-site-header.relative.z-40.has-no-height > header.site-header.w-full.text-scheme-text.absolute.top-0.left-0.right-0.z-20.border-b-section.bg-transparent.border-transparent.transition-[background-color,border-color].ease-in-out.duration-200 > div#headerBorderWrap.headerBorderWrap > div#headerContainer.z-10 > div.py-2.lg:py-0.px-section.overflow-hidden > div.flex.justify-between.items-center > div.flex.flex-grow.w-1/3.justify-start.items-stretch > div.hidden.lg:block > nav"
    ]
  },
  {
    "url": "https://showcase-theme-mila.myshopify.com",
    "path": "Showcase/6.0.0.html",
    "scrapedAt": "2023-05-20T00:01:47.245Z",
    "theme": {
      "name": "Showcase",
      "version": "6.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-transforms > body.page-mila.template-index.animation-speed-medium.cc-animate-enabled.nav-transparent.showing-announcement.header-section-overlap.use-alt-logo > div#shopify-section-header.shopify-section > div > div#site-control.site-control.inline.icons.nav-inline-desktop.fixed.has-announcement.alt-logo-when-active.cc-animate-init.-in.cc-animate-complete > div.links.site-control__inner > div.site-control__inline-links > div.nav-row.multi-level-nav.reveal-on-hover > div.tier-1 > ul"
    ]
  },
  {
    "url": "https://showtime-home.myshopify.com",
    "path": "ShowTime/7.10.0.html",
    "scrapedAt": "2023-05-20T00:01:47.552Z",
    "theme": {
      "name": "ShowTime",
      "version": "7.10.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body > cart-provider > section#shopify-section-g_header.shopify-section > div#mainHeaderg_header.#header.@sticky.shadow-3 > div.#header-main > div.#container.@width:wide > div.#header-main-inner > div.#header-primary-nav.mobile-hidden > main-navigation.#main-navigation.@position:primary > ul.#main-navigation-list"
    ]
  },
  {
    "url": "https://spark-theme-chic.myshopify.com",
    "path": "Spark/2.11.0.html",
    "scrapedAt": "2023-05-20T00:01:47.774Z",
    "theme": {
      "name": "Spark",
      "version": "2.11.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.shopify-features__smart-payment-buttons--enabled > body.template-index.header-sticky > div.page > div#shopify-section-header.shopify-section.header__outer-wrapper > header.header.header--inline.header--center.header--navigation-inline.header--transparent-home > div.header__inner > div.header__left > nav.header__links > ul.header__links-list"
    ]
  },
  {
    "url": "https://cuber-theme.myshopify.com",
    "path": "Split/4.0.3.html",
    "scrapedAt": "2023-05-20T00:01:48.032Z",
    "theme": {
      "name": "Split",
      "version": "4.0.3",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.no-js > body#collections.no-touchevents.template-list-collections > div#shopify-section-sections--14761392865365__header.shopify-section.shopify-section-group-header-group.mount-header > main-header#site-header.site-header.desktop-view--classic > div#site-nav--desktop.site-nav.style--classic > div.site-nav-container.portable--hide > nav.primary-menu > ul.link-list > li#menu-item-collections.has-submenu > ul#SiteNavLabel-collections-classic.submenu.mega-menu > div.submenu-holder > div.submenu-masonry.with-promotion",
      "html.no-js > body#collections.no-touchevents.template-list-collections > sidebar-drawer#site-nav--mobile.site-nav.style--sidebar > div#site-navigation.site-nav-container > div.site-nav-container-last > div.top > nav.primary-menu > ul.link-list > li#menu-item-collections.has-submenu > ul#SiteNavLabel-collections-sidebar.submenu.mega-menu > div.submenu-holder > div.submenu-masonry.without-promotion"
    ]
  },
  {
    "url": "https://theme-spotlight-demo.myshopify.com",
    "path": "Spotlight/8.0.0.html",
    "scrapedAt": "2023-05-20T00:01:48.244Z",
    "theme": {
      "name": "Spotlight",
      "version": "8.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-sections--15582238801967__header.shopify-section.shopify-section-group-header-group.section-header > sticky-header.header-wrapper.color-background-1.gradient.header-wrapper--border-bottom > header.header.header--middle-left.header--mobile-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline > ul#meteor-desktop-nav.DesktopNavigation"
    ]
  },
  {
    "url": "https://startup-theme-home.myshopify.com/",
    "path": "Startup/12.0.0.html",
    "scrapedAt": "2023-05-20T00:01:48.464Z",
    "theme": {
      "name": "Startup",
      "version": "12.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.no-touch.js.flexbox.cssanimations.csstransitions.svg.csscalc > body.template-index > div#shopify-section-sections--14595241050174__header.shopify-section.shopify-section-group-header-group.main-header-section > nav.drawer-nav > div.drawer-nav__flyout > ul.drawer-menu__tier-1-menu"
    ]
  },
  {
    "url": "https://stiletto-theme-vogue.myshopify.com",
    "path": "Stiletto/2.0.1.html",
    "scrapedAt": "2023-05-20T00:01:48.729Z",
    "theme": {
      "name": "Stiletto",
      "version": "2.0.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.do-anim.sticky-header-enabled > body.template-index.header-transparent.quick-search-position-left > div.page > div#shopify-section-sections--16262203179157__header.shopify-section.shopify-section-group-header-group.header__outer-wrapper > header.header.header--layout-logo-center-nav-below.header--has-logo.header--transparent.header--has-transparent-logo.header--has-accounts.header--has-secondary-menu.header--has-social-links.header--has-country-or-locale > div.header__inner > div.header__row.header__row-desktop.lower.three-segment > div.header__links-primary-scroll-container.scroll-container-initialized > div > nav.header__links.header__links-primary > ul.header__links-list.fs-navigation-base"
    ]
  },
  {
    "url": "https://stockholm-demo.myshopify.com",
    "path": "Stockholm/2.0.0.html",
    "scrapedAt": "2023-05-20T00:01:48.967Z",
    "theme": {
      "name": "Stockholm",
      "version": "2.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body > div#shopify-section-sections--15102982979607__header.shopify-section.shopify-section-group-header-group.shopify-section-header > sticky-header.header-wrapper.header-wrapper--border-bottom > header.header.header--top-center.container.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://stockmart-modern.myshopify.com",
    "path": "Stockmart/1.0.0.html",
    "scrapedAt": "2023-05-20T00:01:49.200Z",
    "theme": {
      "name": "Stockmart",
      "version": "1.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index > div#shopify-section-sections--17920095355199__header.shopify-section.shopify-section-group-header-group.shopify-section-header > sticky-header.header-wrapper > header.header.header--bottom-menu.header--has-menu > div.header__bottom > div.header__bottom-inner.container > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://story-theme-demo.myshopify.com",
    "path": "Story/4.0.0.html",
    "scrapedAt": "2023-05-20T00:01:49.414Z",
    "theme": {
      "name": "Story",
      "version": "4.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-cookies > body#story-theme-demo.template-index.decoration-none > div#shopify-section-sections--16752165028073__header.shopify-section.shopify-section-group-group-header > div.header__wrapper > header.theme__header > div > div.header__desktop > div.header__desktop__upper > div.wrapper > div.header__desktop-inner > div.header__desktop__bar__c > nav.header__menu > div.header__menu__inner"
    ]
  },
  {
    "url": "https://streamline-theme-core.myshopify.com",
    "path": "Streamline/6.1.0.html",
    "scrapedAt": "2023-05-20T00:01:49.650Z",
    "theme": {
      "name": "Streamline",
      "version": "6.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.loaded > div.root > div#PageContainer.page-container > div.transition-body > div#shopify-section-header.shopify-section > div > div.header-wrapper.header-wrapper--overlay.is-light > header.site-header > div.page-width > div.header-layout.header-layout--left-center.header-layout--mobile-logo-only > div.header-item.header-item--navigation.text-center.small--hide > ul.site-nav.site-navigation.small--hide"
    ]
  },
  {
    "url": "https://theme-studio-demo.myshopify.com",
    "path": "Dawn/3.0.0.html",
    "scrapedAt": "2023-05-20T00:01:49.846Z",
    "theme": {
      "name": "Dawn",
      "version": "3.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--middle-left.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://sunrise-theme.myshopify.com",
    "path": "Sunrise/11.02.01.html",
    "scrapedAt": "2023-05-20T00:01:50.084Z",
    "theme": {
      "name": "Sunrise",
      "version": "11.02.01",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body#index.two-column > div#site-wrap > header#header > div#shopify-section-header.shopify-section > div.site-width > nav.top-menu.hide-mobile.clearfix"
    ]
  },
  {
    "url": "https://chantilly.myshopify.com",
    "path": "Symmetry/6.0.2.html",
    "scrapedAt": "2023-05-20T00:01:50.367Z",
    "theme": {
      "name": "Symmetry",
      "version": "6.0.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.swatch-method-standard.swatch-style-icon_circle.cc-animate-enabled > div#shopify-section-header.shopify-section.section-header > div.cc-animate-init.-in.cc-animate-complete > div#pageheader.pageheader.pageheader--layout-inline-menu-left.pageheader--transparent-permitted.pageheader--transparent.pageheader--sticky.pageheader--layout-inline-permitted > div.logo-area.container.container--no-max > div.logo-area__left > div.logo-area__left__inner > div.navigation.navigation--left > div.navigation__tier-1-container > ul.navigation__tier-1",
      "html.js > body.template-index.swatch-method-standard.swatch-style-icon_circle.cc-animate-enabled > div#shopify-section-header.shopify-section.section-header > div.cc-animate-init.-in.cc-animate-complete > div#main-nav.desktop-only > div.navigation.navigation--main > div.navigation__tier-1-container > ul.navigation__tier-1"
    ]
  },
  {
    "url": "https://taiga-demo-fashion.myshopify.com",
    "path": "Taiga/1.2.0.html",
    "scrapedAt": "2023-05-20T00:01:50.592Z",
    "theme": {
      "name": "Taiga",
      "version": "1.2.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.template-index.sticky-header-initialized.sticky-header-scroll > body.woolman > div#shopify-section-sections--15769601474716__header.shopify-section.shopify-section-group-header-group.site-header.section-in-view > header#MainHeader.header.is-light-background.logo-center__menu-left > div.header-content > div.header-item.--left > nav.header-shortlinks"
    ]
  },
  {
    "url": "https://tailor-theme-cotton.myshopify.com",
    "path": "Tailor/2.0.0-pre.0.html",
    "scrapedAt": "2023-05-20T00:01:50.838Z",
    "theme": {
      "name": "Tailor",
      "version": "2.0.0-pre.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.shopify-features__smart-payment-buttons--enabled > body.template-index > div#shopify-section-sections--16009838821564__header.shopify-section.shopify-section-group-header-group.section-header > section#72980d6b-645c-4d51-9646-fb489711625c.header.header--nav-position-left-left > section-wrapper > header.header__header > div.header__wrapper > div.header__controls.header__controls--first > nav#bbd740fc-43f5-40fb-8cdc-7f99380f12d0.nav-desktop.header__controls--first-navigation"
    ]
  },
  {
    "url": "https://theme-taste-demo.myshopify.com",
    "path": "Dawn/3.0.0.html",
    "scrapedAt": "2023-05-20T00:01:51.057Z",
    "theme": {
      "name": "Dawn",
      "version": "3.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--middle-left.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://testament.myshopify.com",
    "path": "Testament/11.0.0.html",
    "scrapedAt": "2023-05-20T00:01:51.318Z",
    "theme": {
      "name": "Testament",
      "version": "11.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gridlock.template-index.index.js-slideout-toggle-wrapper.js-modal-toggle-wrapper.product-variant-type--swatches.theme-image-effect.theme-buttons-curved.theme-image-hover > div.site-wrap > div.page-wrap > div#header-group.header-group > div#shopify-section-sections--15630073987124__header.shopify-section.shopify-section-group-header-group.js-site-header > theme-header > div.header-section.js-header > div.js-header-wrapper.header-wrapper.nav__option-full > nav.navigation.js-navigation > ul#main-nav.navigation__menu.tablet-hide.sm-hide"
    ]
  },
  {
    "url": "https://upscale-theme-gem.myshopify.com",
    "path": "Upscale/1.0.0.html",
    "scrapedAt": "2023-05-20T00:01:51.503Z",
    "theme": {
      "name": "Upscale",
      "version": "1.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body > header#shopify-section-header.shopify-section > loess-header.section.header.block.color.color-default-with-accent-1.header--transparent > div.container > div.header-wrapper.header-wrapper--collapse-menu-on-tablet > div.header-top.header-top--left-center > nav.header-menu > ul.menu-list.menu-list--centered"
    ]
  },
  {
    "url": "https://rutherford-romaguera2611.myshopify.com",
    "path": "Vantage/10.0.0.html",
    "scrapedAt": "2023-05-20T00:01:51.767Z",
    "theme": {
      "name": "Vantage",
      "version": "10.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-js.supports-no-touch.supports-csstransforms.supports-csstransforms3d.supports-fontface > body.gridlock.index.template-index.js-slideout-toggle-wrapper.js-modal-toggle-wrapper.theme-features__section-titles--bottom-only-short.theme-features__image-ratio--as-is.theme-features__grid-text-alignment--center.theme-features__product-variants--swatches.theme-features__color-swatch-style--circle.theme-features__ajax-cart-method--drawer.theme-features__upcase-nav--false.theme-features__button-shape--rounded > main.site-wrap > div#wrapper.site-wrap__container > div#shopify-section-sections--14794421665877__header.shopify-section.shopify-section-group-header-group.js-site-header > div.header-section.header__wrapper.full-width-false.block-layout-true.inline-layout-false.cart-icon-bag > div#header-wrapper.header__main-wrapper.device-hide > ul#main-nav.span-12.auto.nav.header__main-nav.header__nav__list.js-theme-header.stickynav"
    ]
  },
  {
    "url": "https://venue-theme-morning.myshopify.com",
    "path": "Venue/9.0.0.html",
    "scrapedAt": "2023-05-20T00:01:52.093Z",
    "theme": {
      "name": "Venue",
      "version": "9.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touchevents.fontface.sr.shopify-features__smart-payment-buttons--enabled > body#venue-theme-morning.template-index.js-theme-loaded.drawer--is-loading > div.page-container > div#shopify-section-sections--15054983462960__header.shopify-section.shopify-section-group-header-group.shopify-section-header.js-section__header > header#top.header.js-header.header--sticky.js-header-sticky.header--scroll.js-header-scroll.header--left.u-flex.u-flex--middle.u-flex--center.header--mega.header--search-enabled.header--transparent.header--has-transparent-divider > div.header-navs.js-heaver-navs.u-clearfix.u-hidden@tab-down > nav.primary-nav.header-navs__items.js-primary-nav"
    ]
  },
  {
    "url": "https://viola-theme.myshopify.com",
    "path": "Viola/1.0.3.html",
    "scrapedAt": "2023-05-20T00:01:52.366Z",
    "theme": {
      "name": "Viola",
      "version": "1.0.3",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient.template-index > div#shopify-section-sections--15838450581696__header.shopify-section.shopify-section-group-header-group.section-header > sticky-header.header-wrapper.color-background-1.gradient > div.color-background-2.gradient.wbmenuup.header__inline-menu > div.page-width.wbmenubtm > nav.wbsimplemenuxs"
    ]
  },
  {
    "url": "https://vision-main.myshopify.com",
    "path": "Vision/1.0.3.html",
    "scrapedAt": "2023-05-20T00:01:52.570Z",
    "theme": {
      "name": "Vision",
      "version": "1.0.3",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.animations-true.button-uppercase-false.navigation-uppercase-false.product-card-spacing-medium.article-card-spacing-large.template-index.header-sticky--active > div#wrapper > div#shopify-section-sections--17918040670490__header.shopify-section.shopify-section-group-header-group.header-section > theme-header#header.header.style5.header--shadow-small.transparent--false.header-sticky--active > div.header--inner > full-menu.full-menu > ul.thb-full-menu"
    ]
  },
  {
    "url": "https://warehouse-theme-metal.myshopify.com",
    "path": "Warehouse/3.1.0.html",
    "scrapedAt": "2023-05-20T00:01:52.849Z",
    "theme": {
      "name": "Warehouse",
      "version": "3.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.warehouse--v1.features--animate-zoom.template-index > div#shopify-section-header.shopify-section.shopify-section__header > section > nav.nav-bar > div.nav-bar__inner > div.container > ul.nav-bar__linklist.list--unstyled"
    ]
  },
  {
    "url": "https://whisk-theme-soft.myshopify.com",
    "path": "Whisk/4.0.1.html",
    "scrapedAt": "2023-05-20T00:01:53.123Z",
    "theme": {
      "name": "Whisk",
      "version": "4.0.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.page-layout.body--template-index.theme-style--soft > div.group--header > header#shopify-section-sections--16723679641836__header.shopify-section.shopify-section-group-header-group.section--site-header.motion-reduce > sticky-header#site-header.site-header.site-header--transparent > div.site-header__container.space--viewport-sides.site-header__container--middle-left.site-header__container--has-menu.site-header__container--accounts-enabled > nav.site-header__inline-menu > ul.site-header__inline-menu-list.list--unstyled"
    ]
  },
  {
    "url": "https://xtra-warehouse.myshopify.com",
    "path": "Xtra/3.1.0.html",
    "scrapedAt": "2023-05-20T00:01:53.383Z",
    "theme": {
      "name": "Xtra",
      "version": "3.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.t1sn.search-compact-is-centered.has-mobile-visible-search.has-long-nav.t1sh-mobile.search-compact-handle.no-mobile.has-sticky-nav.cookie-on > body.template-index > div#root > div#shopify-section-sections--16819566182646__header.shopify-section.shopify-section-group-header-group.shopify-section-header.has-mobile-visible-search.hide-btn-mobile > div#header-outer > nav#nav-bar.text-justify.has-menu-bar > ul"
    ]
  },
  {
    "url": "https://yuva-theme-amaze.myshopify.com",
    "path": "Yuva/7.0.0.html",
    "scrapedAt": "2023-05-20T00:01:53.615Z",
    "theme": {
      "name": "Yuva",
      "version": "7.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-js.supports-no-touch.supports-csstransforms.supports-csstransforms3d.supports-fontface > body.template_index.breadcrumb-false.theme-layout-rounded.header2.announcement-open > div.body-wrapper > div.wrapper > div#shopify-section-sections--18909547069733__header.shopify-section.shopify-section-group-header-group.shopify-section-main-header.transparent-header-true > header.header > div.top-header.header_2.logo-center > div.nav__header.nav_2 > div.container > div.navbar.navbar-expand-md > ul.list-unstyled.navbar-nav.list-menu--inline"
    ]
  },
  {
    "url": "https://zest-fleek.myshopify.com",
    "path": "Zest/5.0.0.html",
    "scrapedAt": "2023-05-20T00:01:53.892Z",
    "theme": {
      "name": "Zest",
      "version": "5.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.index-.mobile-sticky-bar-enabled.header-sticky-enabled > div#shopify-section-sections--18641117315376__header.shopify-section.shopify-section-group-header-group.f-section-header > sticky-header.site-header__wrapper > header.site-header.site-header--design-2 > div.container > div.site-header__inner.flex.site-header__mobile-logo--center > div.site-header__left.site-header__menu.hidden.md:flex > nav.f-site-nav.md-down:hidden.f-site-nav--space-md > ul.f-site-nav__list.list-none"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.template-index.index-.mobile-sticky-bar-enabled.header-sticky-enabled > drawer-component#Drawer-MobileNav.f-drawer.f-drawer--left.f-drawer-mobile-nav > div.f-drawer__content.focus-inset > div.scroll-container > div#Mobile-Nav.f-mobile-nav > div.f-mobile-nav__inner > ul.list-none"
    ]
  }
]

const wow2 = [
  {
    "url": "https://alchemy-theme-modern.myshopify.com",
    "path": "Alchemy/4.2.5.html",
    "scrapedAt": "2023-05-20T00:01:19.997Z",
    "theme": {
      "name": "Alchemy",
      "version": "4.2.5",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body#alchemy-modern-theme.template-index.cc-animate-enabled.has-image-banner.header-overlapping > div#shopify-section-header.shopify-section.section-header > div > div#pageheader.pageheader > header#pageheader__contents.pageheader__contents.pageheader__contents--sticky.pageheader__contents--overlap.pageheader__contents--inline.pageheader__contents--inline--visible > div.pageheader__layout > div.header-left > div.inline-header-nav > div.nav-row.multi-level-nav > div.tier-1 > ul"
    ],
    "confirmedMobileSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body#alchemy-modern-theme.template-index.cc-animate-enabled.has-image-banner.header-overlapping > div#shopify-section-header.shopify-section.section-header > div > div#pageheader.pageheader > header#pageheader__contents.pageheader__contents.pageheader__contents--sticky.pageheader__contents--overlap.pageheader__contents--inline.pageheader__contents--inline--visible > div.pageheader__layout > div.header-left > details#main-menu-disclosure.main-menu-wrapper > div#main-menu > div.main-menu-inner > div.main-menu-panel-wrapper > nav#main-menu-panel.main-menu-panel > ul.main-menu-links"
    ]
  },
  {
    "url": "https://theme-a-demo-01.myshopify.com",
    "path": "Align/1.1.html",
    "scrapedAt": "2023-05-20T00:01:20.293Z",
    "theme": {
      "name": "Align",
      "version": "1.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.has-js > body.layout-theme.template-index > div#nav-wrapper.header-visible.reached-top > div#shopify-section-navigation-main.shopify-section > header.header > div.container > div.header__menu"
    ],
    "confirmedMobileSelectors": [
      "html.has-js > body.layout-theme.template-index > div#nav-wrapper.header-visible.reached-top > div#shopify-section-navigation-main.shopify-section > header.header > div.container > div.nav.nav--mobile > div.container > div.nav--mobile__inner-container > div.nav--mobile__column > div.nav__mobile-dropdown-wrapper.nav__mobile-dropdown-wrapper--open > div.nav__mobile-dropdown__content-wrapper > div.nav__content__outer > div.nav__content > div.nav__main-menu > ul"
    ]
  },
  {
    "url": "https://underwear-theme-v1.myshopify.com/",
    "path": "Andaman/1.3.1.html",
    "scrapedAt": "2023-05-20T00:01:20.622Z",
    "theme": {
      "name": "Andaman",
      "version": "1.3.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.no-js.shopify-features__smart-payment-buttons--enabled > body.template-index.script.scroll-on-top.use-popup-quick-view > div#page > div#main > barracuda-main#page-content > div#header-sections > div#shopify-section-sections--20197653938457__header.shopify-section.shopify-section-group-group-header.header-container > div#header.can-be-transparent.should-be-transparent.change-color-overlap.use-inverted-colors > div.header > div.max-width-header-large > div#shopify-block-3e5d7d5c-430d-4a92-b3ea-1b1c3ca4e908.inline-navigation.only-desktop-navigation"
    ],
    "confirmedMobileSelectors": [
      "html.no-js > body.template-index.script.scroll-on-top.topbar-open.no-scroll > div#page > div#main > main#page-content > div#header-sections > div#shopify-section-header.shopify-section.header-container > nav.navigation.scroll-inside > div#menu.topbar.scroll-inside.control-visible > div.topbar-content.topbar-content-max-width.topbar-focus.with-menu > div.main-menu > ul.primary-menu"
    ]
  },
  {
    "url": "https://athens-theme.myshopify.com",
    "path": "Athens/1.8.0.html",
    "scrapedAt": "2023-05-20T00:01:20.896Z",
    "theme": {
      "name": "Athens",
      "version": "1.8.0",
      "themeStore": true
    },
    "confirmedMobileSelectors": [
      "html.js > body.template-index.setting-buttons-solid > div#shopify-section-sections--16698369671420__header.shopify-section.shopify-section-group-header-group.section-header > sticky-header > header#header.header > div.color-background-1 > div.container > div.head-mast > div.head-slot.head-slot-end > div.head-slot-item.head-slot-item-icons > div.head-slot-nav-mobile-link-wrapper > div.mobile-menu.color-background-1 > div.mobile-menu-inner > nav.navigation-mobile-wrap.typography-body > ul.navigation-mobile"
    ],
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.setting-buttons-solid > div#shopify-section-sections--16698369671420__header.shopify-section.shopify-section-group-header-group.section-header > sticky-header > header#header.header > div.navigation-wrapper.color-accent-1.typography-body > div.container > nav.nav-main > ul.navigation-menu.navigation-main"
    ]
  },
  {
    "url": "https://atlantic-theme-organic.myshopify.com",
    "path": "Atlantic/16.0.0.html",
    "scrapedAt": "2023-05-20T00:01:21.141Z",
    "theme": {
      "name": "Atlantic",
      "version": "16.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.header-layout-minimal.shopify-features__smart-payment-buttons--enabled > body.template-index.product-grid-default > div#shopify-section-sections--14920518139958__header.shopify-section.shopify-section-group-header-group.shopify-section--header > header.main-header-wrap.main-header--minimal.main-header--centered > section.main-header > div.header-minimal.header-minimal-centered > nav.full.main-header--nav-compressed.compress.bordered > ul.main-header--nav-links"
    ],
    "confirmedMobileSelectors": [
      "html.js.no-touch.header-layout-minimal.shopify-features__smart-payment-buttons--enabled > body.template-index.product-grid-default > div#shopify-section-sections--14920518139958__header.shopify-section.shopify-section-group-header-group.shopify-section--header > header.main-header-wrap.main-header--minimal.main-header--centered > section.main-header > section#main-header--mobile-nav.mobile-dropdown > div.mobile-dropdown--wrapper > div.mobile-dropdown--content > ul.list.primary"
    ]
  },
  {
    "url": "https://atom-demo-store.myshopify.com",
    "path": "Atom/1.1.0.html",
    "scrapedAt": "2023-05-20T00:01:21.350Z",
    "theme": {
      "name": "Atom",
      "version": "1.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "skip"
    ]
  },
  {
    "url": "https://gsc-theme-demo.myshopify.com",
    "path": "Aurora/1.3.0.html",
    "scrapedAt": "2023-05-20T00:01:21.581Z",
    "theme": {
      "name": "Aurora",
      "version": "1.3.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.color-primary.theme-with-high-rounded-style.theme-with-rounded-style > header#shopify-section-sections--16679800799473__header.shopify-section.shopify-section-group-main-header-group.shopify-section-header > header-component#header-component.header.section-sections--16679800799473__header.color-primary.header--desktop > div.header__container.container.container--full-screen > div.header__grid.header__grid--1 > div.header__nav"
    ]
  },
  {
    "url": "https://stickytstory.myshopify.com",
    "path": "Automation/2.1.2.html",
    "scrapedAt": "2023-05-20T00:01:21.824Z",
    "theme": {
      "name": "Automation",
      "version": "2.1.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index > div#PageContainer.page-container > div.transition-body > div > div#shopify-section-sections--18771943883040__header.shopify-section.shopify-section-group-header-group > div.header-sticky-wrapper > div#HeaderWrapper.header-wrapper > div#StickyHeaderWrap > header#SiteHeader.site-header.color--body.header-inverse-overlay > div.page-width > div.header-layout.header-layout--left-center > div.grid__item-header.grid__item-header--navigation.text-center > ul.site-nav.site-navigation.small--hide"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.template-index > div#PageContainer.page-container > div.transition-body > div > div#shopify-section-sections--18771943883040__header.shopify-section.shopify-section-group-header-group > div#MenuDrawer.drawer.drawer--right.drawer__mobile-nav > div.drawer__contents > div.drawer__scrollable.cart-drawer-form.drawer__contents > div#MobileNav > div.mobile-nav__wrapper > ul.mobile-nav"
    ]
  },
  {
    "url": "https://avatar-shirts.myshopify.com",
    "path": "Avatar/1.2.0.html",
    "scrapedAt": "2023-05-20T00:01:22.049Z",
    "theme": {
      "name": "Avatar",
      "version": "1.2.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.avatar.index-template.js-focus-visible > body > div#shopify-section-header.shopify-section.shopify-section-header > div > nav.main-nav.d-none.d-lg-block.position-relative.tw-bg-body.tw-z-10.critical-hidden > div.container > ul.nav.justify-content-center.align-items-center.tw-flex-wrap"
    ],
    "confirmedMobileSelectors": [
      "html.js.avatar.index-template.js-focus-visible > body > div#shopify-section-header.shopify-section.shopify-section-header > div > nav#mobile-nav.mobile-nav.collapse.d-lg-none.tw-bg-body.critical-hidden > ul.nav.flex-column.px-3.border-top.tw-flex-nowrap"
    ]
  },
  {
    "url": "https://clothing-filter-theme.myshopify.com",
    "path": "Avenue/5.2.1.html",
    "scrapedAt": "2023-05-20T00:01:22.288Z",
    "theme": {
      "name": "Avenue",
      "version": "5.2.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.no-js > body.loading > div#shopify-section-sections--18520738791736__header.shopify-section.shopify-section-group-header-group.shopify-section-header > header#header.clearfix > div#header-toolbar.header-toolbar.sticky.open-container > div.header.sticky-navigation.include-border.relative.clearfix > div.sticky-navigation-container.open-container > div#header-navigation.header-navigation.home > div.container.half-pad.clearfix > div.twelve > div.relative > div.table.right-width.clearfix > div.main-menu.table-cell > nav > ul#responsiveMenu.responsiveMenu.text-right"
    ]
  },
  {
    "url": "https://banjo-default.myshopify.com",
    "path": "Banjo/2.1.0.html",
    "scrapedAt": "2023-05-20T00:01:22.533Z",
    "theme": {
      "name": "Banjo",
      "version": "2.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.BanjoTheme.Template.Template--index > div#shopify-section-sections--15999624872130__header.shopify-section.shopify-section-group-header-group.shopify-section--header > header#Header.Header.Header--spacingMedium.Header--middleLeft.Header--mainMenuHorizontal.Header--logoLeftMainMenuLeft > div.Header__Main.Container.Container--fluid > div.Header__MainMenu.HiddenMediumDown > ul.Nav"
    ]
  },
  {
    "url": "https://baseline-theme-bold.myshopify.com",
    "path": "Baseline/2.0.0.html",
    "scrapedAt": "2023-05-20T00:01:22.764Z",
    "theme": {
      "name": "Baseline",
      "version": "2.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-cookies > body#mofa.template-index.show-button-arrows > div.relative > div#shopify-section-header.shopify-section.section-header > section > header.bg-header-background.text-header-text.border-b-grid.relative.z-10.border-theme-color > nav.relative.hidden.lg:block > div.section-x-padding.flex.items-center.justify-between.flex-wrap.py-2"
    ]
  },
  {
    "url": "https://zen-demo-light.myshopify.com",
    "path": "Bazaar/1.1.46.html",
    "scrapedAt": "2023-05-20T00:01:22.977Z",
    "theme": {
      "name": "Bazaar",
      "version": "1.1.46",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html > body#zen-professional-gadgets-amp-apparels-home-office-furnitures.gradient.template-index.header-visible > div#shopify-section-sections--16686794932476__listmenu.shopify-section.shopify-section-group-header-group.top-level-element.listmenu-section > div.section-content.listmenu-section-content > div#listmenu-menu-1.subsection.fl-c.color-base-1.listmenu-subsection.large-hide > div.listmenus__wrapper.align-center.boxed-width > list-menu.large-hide > nav#list-menu-menu-1.list-menu > ul.fl-c.list-menu_wrapper.h-1"
    ],
    "confirmedMobileSelectors": [
      "html > body#zen-professional-gadgets-amp-apparels-home-office-furnitures.gradient.template-index.header-visible > div#shopify-section-sections--16686794932476__header.shopify-section.shopify-section-group-header-group.header > div.panels-container > div.panel-menus-container > panel-menu#menu-panelmenu-1.pop-panel.position-left > div.poppanel-content.header-panel-menu > div.panel-menu__main > multi-level-navigation.multi-level-navigation > nav.header-panel-menu__wrapper.multi-level-navigation__main > ul.fl-co.header-panel-menu_list.items-container.open",
      "html > body#zen-professional-gadgets-amp-apparels-home-office-furnitures.gradient.template-index.header-visible > div#shopify-section-sections--16686794932476__header.shopify-section.shopify-section-group-header-group.header > div.panels-container > div.panel-menus-container > panel-menu#menu-panelmenu-2.pop-panel.position-left > div.poppanel-content.header-panel-menu > div.panel-menu__main > multi-level-navigation.multi-level-navigation > nav.header-panel-menu__wrapper.multi-level-navigation__main > ul.fl-co.header-panel-menu_list.items-container.open"
    ]
  },
  {
    "url": "https://beyours-theme-beauty.myshopify.com",
    "path": "Be Yours/6.9.0.html",
    "scrapedAt": "2023-05-20T00:01:23.208Z",
    "theme": {
      "name": "Be Yours",
      "version": "6.9.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.template-index.loaded > div.transition-body > div#shopify-section-sections--16719829336305__header.shopify-section.shopify-section-group-header-group.shopify-section-header > sticky-header.header-wrapper.header-wrapper--border-bottom.header-transparent > header.header.header--top-center.header--mobile-center.page-width.header-section--padding > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ],
    "confirmedMobileSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.template-index.loaded > div.transition-body > div#shopify-section-sections--16719829336305__header.shopify-section.shopify-section-group-header-group.shopify-section-header > sticky-header.header-wrapper.header-wrapper--border-bottom.header-transparent > header.header.header--top-center.header--mobile-center.page-width.header-section--padding > div.header__left.header__left--localization > header-drawer > details.menu-drawer-container > div#menu-drawer.menu-drawer.motion-reduce > div.menu-drawer__inner-container > div.menu-drawer__navigation-container > nav.menu-drawer__navigation > ul.menu-drawer__menu.list-menu"
    ]
  },
  {
    "url": "https://beyond-theme-4.myshopify.com",
    "path": "Beyond/3.1.1.html",
    "scrapedAt": "2023-05-20T00:01:23.429Z",
    "theme": {
      "name": "Beyond",
      "version": "3.1.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.flexbox-gap > body.template--index.page--beyond-theme-4 > div.layout--viewport > div.layout--main-content > header.layout--header-group > div#shopify-section-sections--16056179064983__header.shopify-section.shopify-section-group-header-group.section--header > header-root.header--root > div.header--top-row > div.header--left-column > div.header--x-menu > x-menu-root.x-menu > ul.x-menu--level-1--container"
    ],
    "confirmedMobileSelectors": [
      "html.js.flexbox-gap > body.template--index.page--beyond-theme-4 > div.layout--viewport > drawer-root.drawer--root > transition-root.drawer--instance:nth-of-type(6) > div.drawer--container > div.mobile-nav > div.mobile-nav--menu > y-menu-root.y-menu > ul.y-menu--level-1--container"
    ]
  },
  {
    "url": "https://blockshop-theme-beauty.myshopify.com",
    "path": "Blockshop/9.1.1.html",
    "scrapedAt": "2023-05-20T00:01:23.726Z",
    "theme": {
      "name": "Blockshop",
      "version": "9.1.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.flexbox-gap.shopify-features__smart-payment-buttons--enabled > body.template--index.page--blockshop-theme-beauty > div.layout--viewport > div.layout--main-content > header.layout--header-group > div#shopify-section-sections--14504813625399__header.shopify-section.shopify-section-group-header-group.section--header > header-root.header--root > div.header--bottom-row > div.header--menu > x-menu-root.x-menu > ul.x-menu--level-1--container"
    ],
    "confirmedMobileSelectors": [
      "html.js.flexbox-gap.shopify-features__smart-payment-buttons--enabled > body.template--index.page--blockshop-theme-beauty > div.layout--viewport > drawer-root.drawer--root > transition-root.drawer--instance:nth-of-type(6) > div.drawer--container > div.mobile-nav--menu > y-menu-root.y-menu > ul.y-menu--level-1--container"
    ]
  },
  {
    "url": "https://blum-mondo.myshopify.com",
    "path": "Blum/1.0.2.html",
    "scrapedAt": "2023-05-20T00:01:23.926Z",
    "theme": {
      "name": "Blum",
      "version": "1.0.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.js-main-body.template-index > div#shopify-section-sections--15552332628107__header.shopify-section.shopify-section-group-header-group.js-section-header.header-wrapper.p-relative.zi-4 > sht-sticky-header > sht-header.js-header.section-header.p-relative > header.header.ctnr.menu--horizontal.logo-position--middle-left.middle-xs.p-relative.zi-4 > div.header__menu.d-flex.fd-column.js-menu-drawer-content > nav.header__nav.js-header-navigation.flex-1.w-100 > ul.main__menu.m-zero.ls-none"
    ]
  },
  {
    "url": "https://spark-theme.myshopify.com",
    "path": "Boost/6.0.0.html",
    "scrapedAt": "2023-05-20T00:01:24.227Z",
    "theme": {
      "name": "Boost",
      "version": "6.0.0",
      "themeStore": true
    },
    "confirmedMobileSelectors": [
      "html.js.supports-cookies > body#boost-a-bold-modern-and-impactful-shopify-theme.template-index.swatch-method-standard.cc-animate-enabled > div.header-group > div#shopify-section-sections--15869509828665__header.shopify-section.shopify-section-group-header-group > div.site-header.docking-header > div.docked-navigation-container.docked-navigation-container--center > div.docked-navigation-container__inner > section.header-navigation.container > nav.navigation__container.page-width > ul.nav.mobile-site-nav"
    ],
    "confirmedDesktopSelectors": [
      "html.js.supports-cookies > body#boost-a-bold-modern-and-impactful-shopify-theme.template-index.swatch-method-standard.cc-animate-enabled > div.header-group > div#shopify-section-sections--15869509828665__header.shopify-section.shopify-section-group-header-group > div.site-header.docking-header > div.docked-navigation-container.docked-navigation-container--center > div.docked-navigation-container__inner > section.header-navigation.container > nav.navigation__container.page-width > ul.nav.site-nav.site-nav--center"
    ]
  },
  {
    "url": "https://broadcast-clean.myshopify.com",
    "path": "Broadcast/5.0.0.html",
    "scrapedAt": "2023-05-20T00:01:24.504Z",
    "theme": {
      "name": "Broadcast",
      "version": "5.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.supports-cookies.iframe > body#broadcast-theme-clean-preset.template-index.grid-classic.aos-initialized.is-loaded > div.container > div.header-sections > div#shopify-section-sections--14608719642688__header.shopify-section.shopify-section-group-group-header.page-header > div.header__wrapper > header.theme__header > div.header__desktop > div.header__desktop__upper.header__desktop__upper--reverse > div.header__desktop__bar__c > nav.header__menu"
    ],
    "confirmedMobileSelectors": [
      "html.js.no-touch.supports-cookies.iframe > body#broadcast-theme-clean-preset.template-index.grid-classic.aos-initialized.is-loaded > div.container > div.header-sections > div#shopify-section-sections--14608719642688__header.shopify-section.shopify-section-group-group-header.page-header > div.header__wrapper > nav#header-menu.drawer.drawer--header > div.drawer__inner > div.drawer__body > div.drawer__content > div.drawer__menu"
    ]
  },
  {
    "url": "https://bullet1-openthinking.myshopify.com",
    "path": "Bullet/4.0.0.html",
    "scrapedAt": "2023-05-20T00:01:24.701Z",
    "theme": {
      "name": "Bullet",
      "version": "4.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.t-index.ip--none.hpsticky > div#app > div#shopify-section-sections--16648453849330__header.shopify-section.shopify-section-group-group-header.main-header > header#header > x-grid#header-grid > x-cell.menulink.large-only > nav > ul.inline.large-only"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.t-index.ip--none.hpsticky > div#app > div#shopify-section-sections--16648453849330__header.shopify-section.shopify-section-group-group-header.main-header > section#mobmenu > div.mobnav > nav > x-grid.bordi.menus"
    ]
  },
  {
    "url": "https://california-theme-generic.myshopify.com",
    "path": "California/9.7.0.html",
    "scrapedAt": "2023-05-20T00:01:24.936Z",
    "theme": {
      "name": "California",
      "version": "9.7.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body#california.template-index.centered.align-left.sticky-header.loaded.no-outlines > div#shopify-section-header.shopify-section.section-header > div.header > div.inner > div.content > div.left > div.menu > div.nav"
    ],
    "confirmedMobileSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body#california.template-index.centered.align-left.sticky-header.loaded.no-outlines > div#shopify-section-header.shopify-section.section-header > div.header > div.inner > div.side-nav-section > div.side-nav > div.nav > ul.main"
    ]
  },
  {
    "url": "https://canopy-theme-glow.myshopify.com",
    "path": "Canopy/5.0.0.html",
    "scrapedAt": "2023-05-20T00:01:25.220Z",
    "theme": {
      "name": "Canopy",
      "version": "5.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.cc-animate-enabled.scrolled-top > div#page-wrap > div#page-wrap-inner > div#page-wrap-content > div#shopify-section-header.shopify-section.section-header > div.header-container > div.page-header.layout-center.using-compact-mobile-logo > div.container.nav-container > div.logo-nav > nav.main-nav.cf.desktop.align-center"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.template-index.cc-animate-enabled.scrolled-top > nav#mobile-nav > div.inner > div > nav > ul.mobile-nav-menu.plain"
    ]
  },
  {
    "url": "https://capital-theme-berlin.myshopify.com",
    "path": "Capital/32.0.0.html",
    "scrapedAt": "2023-05-20T00:01:25.431Z",
    "theme": {
      "name": "Capital",
      "version": "32.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports.flexbox.csstransforms3d > body.template-index.js-focus-visible.using-mouse > div#main-body.slideout-panel.slideout-panel-right > div#shopify-section-sections--14779254439972__header.shopify-section.shopify-section-group-header-group > header.main-header.no-border > div.main-navigation-wrapper.main-navigation-wrapper--center"
    ],
    "confirmedMobileSelectors": [
      "html.js.supports.flexbox.csstransforms3d > body.template-index.js-focus-visible.using-mouse > div#main-body.slideout-panel.slideout-panel-right > div#shopify-section-sections--14779254439972__header.shopify-section.shopify-section-group-header-group > header.main-header.no-border > div.main-navigation-wrapper.navigation-mobile > nav.main-navigation > ul.navigation-list"
    ]
  },
  {
    "url": "https://cascade-preset-1.myshopify.com",
    "path": "Cascade/3.0.2.html",
    "scrapedAt": "2023-05-20T00:01:25.664Z",
    "theme": {
      "name": "Cascade",
      "version": "3.0.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.theme-ctas-are-theme-buttons.theme-buttons-style-1 > div#shopify-section-header.shopify-section > section#header > div.font-main.normal-case.text-scheme-text.bg-scheme-background.grid.gap-x-4.grid-cols-[minmax(min-content,_1fr)_auto_minmax(min-content,_1fr)].md:grid-cols-[minmax(min-content,_1fr)_auto_minmax(min-content,_1fr)].py-4.px-5.lg:px-10.motion-reduce:transition-none > div.w-full.flex.justify-start.items-center.md:order-none > div.hidden.md:block.js-enabled.w-full > nav > ul.flex.justify-start.items-center.flex-wrap.max-w-full.-mx-2.-my-1"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.theme-ctas-are-theme-buttons.theme-buttons-style-1 > div#modals-leftDrawer.fixed.inset-0.z-110 > div#left-drawer-slot.relative.w-11/12.md:w-7/12.lg:w-5/12.px-5.lg:px-10.h-full.bg-scheme-background.text-scheme-text.mr-auto.overflow-y-auto > div.sidebar-nav.py-6 > div > ul.mt-8"
    ]
  },
  {
    "url": "https://champion-theme-flash.myshopify.com",
    "path": "Champion/1.0.0.html",
    "scrapedAt": "2023-05-20T00:01:25.929Z",
    "theme": {
      "name": "Champion",
      "version": "1.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.capitalize-buttons > header#shopify-section-sections--17863737180454__header.shopify-section.shopify-section-group-header-group.shopify-section--header > loess-header.section.header.header--transparent.block.color.color-default-with-accent-1 > div.container > div.header-wrapper.header-wrapper--collapse-menu-on-tablet > div.header-top.header-top--center-inline > nav.header-menu > ul.menu-list"
    ],
    "confirmedMobileSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.capitalize-buttons > header#shopify-section-sections--17863737180454__header.shopify-section.shopify-section-group-header-group.shopify-section--header > loess-drawer#SideBarMenu.drawer.block.color.color-inverse > div.drawer__inner > div.drawer__content > nav > ul.drawer-menu"
    ]
  },
  {
    "url": "https://chord-warm.myshopify.com",
    "path": "Chord/3.1.1.html",
    "scrapedAt": "2023-05-20T00:01:26.193Z",
    "theme": {
      "name": "Chord",
      "version": "3.1.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.ChordTheme.Template.Template--index > div#shopify-section-sections--16756003045594__header.shopify-section.shopify-section-group-header-group.shopify-section--header > header#Header.Header.Header--spacingMedium.Header--topCenter > div.Header__MainMenu.HiddenMediumDown > ul.Nav"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.ChordTheme.Template.Template--index > div#shopify-section-menu-drawer.shopify-section.shopify-section--menu-drawer > section#MenuDrawer.MenuDrawer.Drawer.Drawer--start > div.Drawer__Body > nav.MenuDrawer__Nav.MenuDrawer__Nav--primary > div#MenuDrawerAccordion.Accordion"
    ]
  },
  {
    "url": "https://theme-colorblock-demo.myshopify.com",
    "path": "Dawn/4.0.0.html",
    "scrapedAt": "2023-05-20T00:01:26.385Z",
    "theme": {
      "name": "Dawn",
      "version": "4.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > div.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > div.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > header-drawer > details#Details-menu-drawer-container.menu-drawer-container > div#menu-drawer.gradient.menu-drawer.motion-reduce > div.menu-drawer__inner-container > div.menu-drawer__navigation-container > nav.menu-drawer__navigation"
    ]
  },
  {
    "url": "https://colors-theme-generic.myshopify.com",
    "path": "Colors/9.6.0.html",
    "scrapedAt": "2023-05-20T00:01:26.690Z",
    "theme": {
      "name": "Colors",
      "version": "9.6.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.shopify-features__smart-payment-buttons--enabled > body#colors-theme.template-index.loaded.no-outlines.shaped > div#shopify-section-header.shopify-section.section-header > div.header.sticky.no-padding.collapsed.show-background.color-body-bg-is-white > div.relative > div.nav.main-nav.normal > ul.root"
    ],
    "confirmedMobileSelectors": [
      "html.shopify-features__smart-payment-buttons--enabled > body#colors-theme.template-index.loaded.no-outlines.shaped > div#shopify-section-header.shopify-section.section-header > div.nav.side-nav > div.inner > div.menu > ul.root"
    ]
  },
  {
    "url": "https://bundle-theme-demo-home.myshopify.com",
    "path": "Combine/2.1.0.html",
    "scrapedAt": "2023-05-20T00:01:26.900Z",
    "theme": {
      "name": "Combine",
      "version": "2.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html#html.no-js > body#bundle-theme-demo-home.template-index.no-touchevents.header-loaded > div#shopify-section-sections--18063045394750__header.shopify-section.shopify-section-group-header-group.site-header-container.mount-header.mount-css-slider > main-header#site-header.site-header.site-header--border.site-header--alignment-left.site-header--absolute.site-header--absolute-show-border > div.header-container.header-container--bottom.no-header-blocks > div.header__bottom.container--large > div.site-nav.style--classic > div.site-nav-container > nav > ul.link-list"
    ],
    "confirmedMobileSelectors": [
      "html#html.no-js > body#bundle-theme-demo-home.template-index.no-touchevents.header-loaded > div#shopify-section-sections--18063045394750__header.shopify-section.shopify-section-group-header-group.site-header-container.mount-header.mount-css-slider > sidebar-drawer#site-menu-sidebar.sidebar.sidebar--right > div.sidebar__body > mobile-navigation > div.site-nav.style--sidebar > div.site-nav-container > nav > ul.link-list"
    ]
  },
  {
    "url": "https://context-theme-chic.myshopify.com",
    "path": "Context/2.2.4.html",
    "scrapedAt": "2023-05-20T00:01:27.174Z",
    "theme": {
      "name": "Context",
      "version": "2.2.4",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.supports-cookies.shopify-features__smart-payment-buttons--enabled.header-transparent > body.template-index > div#root > header.header-container > section#shopify-section-header.shopify-section.header-section > div.w-100.z-5 > div#header.header.header--default.header--transparent.header--no-border > div.header__content.header__content--has-customer-accounts > div.flex.justify-between > nav.header__nav > ul.list.ma0.pa0.lh-copy.nav.nav--depth-1"
    ],
    "confirmedMobileSelectors": [
      "html.supports-cookies.shopify-features__smart-payment-buttons--enabled.header-transparent > body.template-index > div#root > header.header-container > section#shopify-section-header.shopify-section.header-section > div.w-100.z-5 > div.drawer-menu.popover > div.drawer-menu__panel > div.drawer-menu__bottom > div.drawer-menu__all-links > div.drawer-menu__contents > div.drawer-menu__main > ul.drawer-menu__primary-links.drawer-menu-list--0"
    ]
  },
  {
    "url": "https://theme-craft-demo.myshopify.com",
    "path": "Dawn/2.5.0.html",
    "scrapedAt": "2023-05-20T00:01:27.378Z",
    "theme": {
      "name": "Dawn",
      "version": "2.5.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > header-drawer > details#Details-menu-drawer-container.menu-drawer-container > div#menu-drawer.menu-drawer.motion-reduce > div.menu-drawer__inner-container > div.menu-drawer__navigation-container > nav.menu-drawer__navigation > ul.menu-drawer__menu.list-menu"
    ]
  },
  {
    "url": "https://theme-crave-demo.myshopify.com",
    "path": "Dawn/2.5.0.html",
    "scrapedAt": "2023-05-20T00:01:27.650Z",
    "theme": {
      "name": "Dawn",
      "version": "2.5.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > header-drawer > details#Details-menu-drawer-container.menu-drawer-container > div#menu-drawer.menu-drawer.motion-reduce > div.menu-drawer__inner-container > div.menu-drawer__navigation-container > nav.menu-drawer__navigation > ul.menu-drawer__menu.list-menu"
    ]
  },
  {
    "url": "https://creative-theme-chalk.myshopify.com",
    "path": "Creative/4.0.1.html",
    "scrapedAt": "2023-05-20T00:01:28.039Z",
    "theme": {
      "name": "Creative",
      "version": "4.0.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touchevents.fontface.sr.shopify-features__smart-payment-buttons--enabled > body#creative-theme-chalk.template-index.js-theme-loaded.drawer--is-loading > div.page-container > div#shopify-section-sections--16680454619390__header.shopify-section.shopify-section-group-header-group.shopify-section-header.js-section__header > header#top.header.js-header.header--sticky.js-header-sticky.header--scroll.js-header-scroll.header--logo-left.u-flex.u-flex--middle.u-flex--center.header--mega.header--search-enabled.header--transparent.header--has-transparent-divider > div.header-navs.js-heaver-navs.u-clearfix.u-hidden@tab-down > nav.primary-nav.header-navs__items.js-primary-nav"
    ],
    "confirmedMobileSelectors": [
      "html.js.no-touchevents.fontface.sr.shopify-features__smart-payment-buttons--enabled > body#creative-theme-chalk.template-index.js-theme-loaded.drawer--is-loading > div.page-container > div#shopify-section-sections--16680454619390__mobile-drawer.shopify-section.shopify-section-group-header-group.js-section__mobile-draw > div.mobile-draw.mobile-draw--dark.js-menu-draw.mfp-hide > div.mobile-draw__wrapper > nav.mobile-draw__nav.mobile-nav > ul.mobile-nav__items.o-list-bare"
    ]
  },
  {
    "url": "https://creator-theme-enthusiast.myshopify.com/",
    "path": "Creator/3.2.0.html",
    "scrapedAt": "2023-05-20T00:01:28.286Z",
    "theme": {
      "name": "Creator",
      "version": "3.2.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.primary-button-style--solid.secondary-button-style--outline.mobile-bottom-offset > div#shopify-section-sections--19003721842964__header.shopify-section.shopify-section-group-header-group > site-header.header.header--mobile-bottom.header--desktop-top.header--full-width.header--transparent-ready > div.row.row--no-gutters.row--align-center > div.col-6.col-lg-8 > ul.nav.no-bullets.d-none.d-lg-block.text-center"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.primary-button-style--solid.secondary-button-style--outline.mobile-bottom-offset > div#shopify-section-sections--19003721842964__header.shopify-section.shopify-section-group-header-group > site-header.header.header--mobile-bottom.header--desktop-top.header--full-width.header--transparent-ready > div.row.row--no-gutters.row--align-center > div.col-6.col-lg-8 > div.toggle-menu-wrapper > div.toggle-menu > div.toggle-menu__content > ul.toggle-menu__links.no-bullets.d-lg-none",
      "html.js > body.primary-button-style--solid.secondary-button-style--outline.mobile-bottom-offset > div#shopify-section-sections--19003721842964__header.shopify-section.shopify-section-group-header-group > site-header.header.header--mobile-bottom.header--desktop-top.header--full-width.header--transparent-ready > div.row.row--no-gutters.row--align-center > div.col-6.col-lg-8 > div.toggle-menu-wrapper > div.toggle-menu > div.toggle-menu__content > ul.toggle-menu__links.no-bullets.d-none.d-lg-block"
    ]
  },
  {
    "url": "https://theme-dawn-demo.myshopify.com",
    "path": "Dawn/2.5.0.html",
    "scrapedAt": "2023-05-20T00:01:28.506Z",
    "theme": {
      "name": "Dawn",
      "version": "2.5.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > header-drawer > details#Details-menu-drawer-container.menu-drawer-container > div#menu-drawer.menu-drawer.motion-reduce > div.menu-drawer__inner-container > div.menu-drawer__navigation-container > nav.menu-drawer__navigation > ul.menu-drawer__menu.list-menu"
    ]
  },
  {
    "url": "https://district-theme-demo.myshopify.com",
    "path": "District/4.4.2.html",
    "scrapedAt": "2023-05-20T00:01:28.788Z",
    "theme": {
      "name": "District",
      "version": "4.4.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body#district-shopify-theme-by-style-hatch.font-body.bg-section-background > div#shopify-section-sections--15488225935413__header.shopify-section.shopify-section-group-header-group.section__header > header-section.block > div.header-wrapper.flex.items-center > div.flex.items-center.w-full.max-w-screen.mx-auto > header.header.relative.w-full > div.header-secondary > nav.header-secondary__navigation > ul.header-secondary__menu.header-menu--uppercase.header-menu.list-menu"
    ],
    "confirmedMobileSelectors": [
      "html.js > body#district-shopify-theme-by-style-hatch.font-body.bg-section-background > div#shopify-section-sections--15488225935413__header-top.shopify-section.shopify-section-group-header-group.section__header-top > header-top-section.block > menu-drawer#MenuDrawer > div.menu-drawer.font-navigation.flex.flex-col.fixed.left-0.inset-y-0.w-full.max-w-sm.h-screen.bg-primary-secondary-background.overflow-y-auto.z-20 > nav.menu-drawer__navigation > ul.menu-drawer__menu.drawer-menu.list-menu",
      "html.js > body#district-shopify-theme-by-style-hatch.font-body.bg-section-background > div#shopify-section-sections--15488225935413__header.shopify-section.shopify-section-group-header-group.section__header > header-section.block > menu-drawer#MenuDrawerHeader > div.menu-drawer.font-navigation.flex.flex-col.fixed.left-0.inset-y-0.w-full.max-w-sm.h-screen.bg-primary-secondary-background.overflow-y-auto.z-20 > nav.menu-drawer__navigation > ul.menu-drawer__menu.drawer-menu.list-menu"
    ]
  },
  {
    "url": "https://drop-theme-countdown-demo.myshopify.com",
    "path": "Drop/3.2.0.html",
    "scrapedAt": "2023-05-20T00:01:29.023Z",
    "theme": {
      "name": "Drop",
      "version": "3.2.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-no-cookies.shopify-features__smart-payment-buttons--enabled > body#drop-a-premium-fashion-shopify-theme.template-index.js-slideout-toggle-wrapper.js-modal-toggle-wrapper.animation--active.animation-type--fade.animation-text--active.animation-text-type--fade.section-fade-in > main.site-wrap > div#shopify-section-sections--16789752479987__header.shopify-section.shopify-section-group-header-group.js-site-header > header.section-header.header-section.no-section-animation.header__over-content--false > section.section-header__main-bar.main-bar.w100.sm-hide.js-theme-header.stickynav > div.grid__wrapper.block-layout > article.header-block__nav-wrapper.span-12.v-center.a-center > div.navigation > ul.header__navigation.mb0.inline-block"
    ],
    "confirmedMobileSelectors": [
      "html.js.supports-no-cookies.shopify-features__smart-payment-buttons--enabled > body#drop-a-premium-fashion-shopify-theme.template-index.js-slideout-toggle-wrapper.js-modal-toggle-wrapper.animation--active.animation-type--fade.animation-text--active.animation-text-type--fade.section-fade-in > aside#slideout-mobile-navigation.slideout.slideout__drawer-left > div#shopify-section-mobile-navigation.shopify-section > div.mobile-nav__wrapper.no-section-animation > div.mobile-nav__menu-blocks.pt6.grid__wrapper.narrow > div.mobile-nav__mobile-menu-wrapper.span-12.auto.relative"
    ]
  },
  {
    "url": "https://editions-theme-spring.myshopify.com",
    "path": "Editions/13.0.0.html",
    "scrapedAt": "2023-05-20T00:01:29.249Z",
    "theme": {
      "name": "Editions",
      "version": "13.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.shopify-features__smart-payment-buttons--enabled > body.template-index > div#shopify-section-sections--14837034778714__header.shopify-section.shopify-section-group-header-group.shopify-section--header > div.site-header-container.site-header-container--sticky > header.site-header.site-header--sticky > div.site-header__wrapper > nav.site-navigation > ul.navigation-desktop"
    ],
    "confirmedMobileSelectors": [
      "html.js.no-touch.shopify-features__smart-payment-buttons--enabled > body.template-index > nav.navigation-mobile > div.navigation-mobile__flyout > ul.mobile-menu.pxu-lia-block"
    ]
  },
  {
    "url": "https://effortless-theme-demo.myshopify.com",
    "path": "Effortless/2.2.0.html",
    "scrapedAt": "2023-05-20T00:01:29.568Z",
    "theme": {
      "name": "Effortless",
      "version": "2.2.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.template--index.template-- > div#shopify-section-header.shopify-section > sticky-header.header-wrapper > header > div.page-width > div.header.header--center-drawer.header--has-menu > div.header-item.header__inline-menu > header-drawer > details.menu-drawer-container > div#menu-drawer.menu-drawer.motion-reduce > div.menu-drawer__inner-container > div.menu-drawer__navigation-container > nav.menu-drawer__navigation"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.template--index.template-- > div#shopify-section-header.shopify-section > sticky-header.header-wrapper > header > div.page-width > div.header.header--center-drawer.header--has-menu > div.header-item.header__inline-menu > header-drawer > details.menu-drawer-container > div#menu-drawer.menu-drawer.motion-reduce > div.menu-drawer__inner-container > div.menu-drawer__navigation-container > nav.menu-drawer__navigation"
    ]
  },
  {
    "url": "https://local-theme-light.myshopify.com",
    "path": "Emerge/6.1.1.html",
    "scrapedAt": "2023-05-20T00:01:29.798Z",
    "theme": {
      "name": "Emerge",
      "version": "6.1.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.flexbox-gap.shopify-features__smart-payment-buttons--enabled > body.template--index.page--shapes > div.layout--viewport > div.layout--main-content > header.layout--header-group > div#shopify-section-sections--14806934323278__header.shopify-section.shopify-section-group-header-group.section--header > header-root.header--root > transition-root.header--container > div.header--left-side > div.header--main-menu > x-menu-root.x-menu > ul.x-menu--level-1--container"
    ],
    "confirmedMobileSelectors": [
      "html.js.flexbox-gap.shopify-features__smart-payment-buttons--enabled > body.template--index.page--shapes > div.layout--viewport > drawer-root.drawer--root > transition-root.drawer--instance:nth-of-type(6) > div.drawer--container > mobile-nav-root.mobile-nav > div.mobile-nav--menu > y-menu-root.y-menu > ul.y-menu--level-1--container"
    ]
  },
  {
    "url": "https://empire-theme-supply.myshopify.com",
    "path": "Empire/9.0.0.html",
    "scrapedAt": "2023-05-20T00:01:30.091Z",
    "theme": {
      "name": "Empire",
      "version": "9.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.shopify-features__smart-payment-buttons--enabled > body.template-index.site-header-sticky > div#shopify-section-sections--14878200922210__header.shopify-section.shopify-section-group-header-group.site-header-wrapper > header.site-header.site-header-nav--open > div#site-header-nav.site-navigation-wrapper.site-navigation--has-actions.site-header--full-width > nav.site-navigation > ul.navmenu.navmenu-depth-1"
    ]
  },
  {
    "url": "https://emporium-theme-fruity.myshopify.com",
    "path": "Emporium/2.1.0.html",
    "scrapedAt": "2023-05-20T00:01:30.301Z",
    "theme": {
      "name": "Emporium",
      "version": "2.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled.js-focus-visible > body.template-index.font-body.font-normal-body.w-1/1 > div#shopify-section-header.shopify-section.behavior-static.scroll-direction-down > header.color-scheme-primary-1.relative > nav > div.color-scheme-primary-1.bg-background.hidden.md:block.select-none > div.box-content.max-w-screen-2xl.mx-auto.px-4.md:px-6.xl:px-8.2xl:px-10 > ce-drop-down-placer > div > ul.-mx-6.md:flex.md:flex-wrap.md:justify-start"
    ]
  },
  {
    "url": "https://enterprise-theme-digital.myshopify.com",
    "path": "Enterprise/1.0.1.html",
    "scrapedAt": "2023-05-20T00:01:30.570Z",
    "theme": {
      "name": "Enterprise",
      "version": "1.0.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [],
    "confirmedMobileSelectors": [
      "html.js > body.cc-animate-enabled.dom-loaded.fixed.dom-loaded-plus-6 > div#shopify-section-sections--18873641992480__header.shopify-section.shopify-section-group-header-group.cc-header.cc-header--sticky > store-header.header.bg-theme-bg.text-theme-text.has-motion > header.header__grid.container.flex.flex-wrap.items-center > main-menu.main-menu.main-menu--left-mob > details.main-menu__disclosure.has-motion > div.main-menu__content.has-motion > nav > ul.main-nav"
    ]
  },
  {
    "url": "https://envy-oslo.myshopify.com",
    "path": "Envy/32.0.0.html",
    "scrapedAt": "2023-05-20T00:01:30.860Z",
    "theme": {
      "name": "Envy",
      "version": "32.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.js.header-wrapper--overlay.unstuck > div.sticky-header-wrapper > div.sticky-header-wrapper__inner > div.sticky-header-menu.d-none.d-lg-block > div#main-navigation-wrapper.main-navigation-wrapper.main-navigation-wrapper--center.mega-menu-wrapper > ul.nav.js.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.js.header-wrapper--overlay.unstuck > div.sticky-header-wrapper > div.sticky-header-wrapper__inner > div.sticky-header-menu.d-none.d-lg-block > div#main-navigation-wrapper.main-navigation-wrapper.main-navigation-wrapper--center.mega-menu-wrapper > ul.nav.no-js.desktop.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.js.header-wrapper--overlay.unstuck > div.sticky-header-wrapper > div.sticky-header-wrapper__inner > div.sticky-header-menu.d-none.d-lg-block > div#main-navigation-wrapper.main-navigation-wrapper.main-navigation-wrapper--center.mega-menu-wrapper > ul.nav.no-js.mobile.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.js.header-wrapper--overlay.unstuck > div.header-menu-wrapper.d-none.d-lg-block > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.main-navigation-wrapper--center.mega-menu-wrapper > ul.nav.js.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.js.header-wrapper--overlay.unstuck > div.header-menu-wrapper.d-none.d-lg-block > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.main-navigation-wrapper--center.mega-menu-wrapper > ul.nav.no-js.desktop.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.js.header-wrapper--overlay.unstuck > div.header-menu-wrapper.d-none.d-lg-block > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.main-navigation-wrapper--center.mega-menu-wrapper > ul.nav.no-js.mobile.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.no-js > nav > div.header-menu-wrapper > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.mega-menu-wrapper > ul.nav.js.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.no-js > nav > div.header-menu-wrapper > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.mega-menu-wrapper > ul.nav.no-js.desktop.nav-pills",
      "html.js > body#envy-theme-oslo.page-title--envy-theme-oslo.template-index.flexbox-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--14629189288002__header.shopify-section.shopify-section-group-header-group > div.header-wrapper.no-js > nav > div.header-menu-wrapper > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.mega-menu-wrapper > ul.nav.no-js.mobile.nav-pills"
    ]
  },
  {
    "url": "https://whileymai-dev-new.myshopify.com",
    "path": "Erickson/3.0.0.html",
    "scrapedAt": "2023-05-20T00:01:31.128Z",
    "theme": {
      "name": "Erickson",
      "version": "3.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-no-cookies.pb-0 > body#index.erickson-theme.page-content > div#shopify-section-sections--16210813845689__header-section.shopify-section.shopify-section-group-header-group.index-home-header > header#sections--16210813845689__header-section.header-global.border-bottom > section.mega-menu.container > nav#navbar.menu.navbar.navbar-expand-lg.megamenu-bg.container.mx-auto.px-0.megamenu-wide > ul.navbar-nav.mx-auto.main-menu"
    ]
  },
  {
    "url": "https://x-breeze.myshopify.com",
    "path": "Eurus/2.0.0.html",
    "scrapedAt": "2023-05-20T00:01:31.413Z",
    "theme": {
      "name": "Eurus",
      "version": "2.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.no-js > body.gradient.scrollbar-body.overflow-x-hidden.text-[0.7875rem].md:text-[0.875rem] > div#shopify-section-sections--18777565823270__header.shopify-section.shopify-section-group-header-group.section-header > div#x-header-container.relative.z-50 > div#sticky-header.shopify-header.transparent-header > div#sticky-header-content.sticky-header-content.w-full.pt-4.lg:pt-2.top-0.pl-5.pr-5.pb-4.md:pb-0.2xl:pl-0.2xl:pr-0.absolute.disable-tranparent-collection.lg:hover:bg-[rgba(var(--background-color-header))] > header.page-width.grid.lg:mx-auto.gap-x-2 > nav.[grid-area:navigation].pb-2.lg:[grid-area:auto].order-3.hidden.header__inline-menu.lg:flex.items-center"
    ]
  },
  {
    "url": "https://expanse-theme-beauty.myshopify.com",
    "path": "Expanse/4.3.4.html",
    "scrapedAt": "2023-05-20T00:01:31.668Z",
    "theme": {
      "name": "Expanse",
      "version": "4.3.4",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.loaded > div#PageContainer.page-container > div.transition-body > div#shopify-section-sections--16027982561457__header.shopify-section.shopify-section-group-header-group.header-section.header-section--overlay > div > div#HeaderWrapper.header-wrapper.header-wrapper--overlay.is-light > header#SiteHeader.site-header > div.site-header__element.site-header__element--top > div.page-width > div.header-layout > div.header-item.header-item--navigation > ul.site-nav.site-navigation.site-navigation--beside.small--hide"
    ]
  },
  {
    "url": "https://naturale-theme.myshopify.com",
    "path": "Expression/7.0.0.html",
    "scrapedAt": "2023-05-20T00:01:31.874Z",
    "theme": {
      "name": "Expression",
      "version": "7.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-cookies > body#expression-ideal-for-promotion-focused-stores-with-large-inventories.template-index > div#shopify-section-header.shopify-section > header.page-width.page-header.section--header > div.page-header--content.container > nav.main-nav-bar > div.mobile-nav-column-outer > div.mobile-nav-column-inner > div.mobile-nav-menu-container.mobile-menu-level-1 > ul.main-nav"
    ]
  },
  {
    "url": "https://fashionopolism-secret-sale.myshopify.com",
    "path": "Fashionopolism/9.1.0.html",
    "scrapedAt": "2023-05-20T00:01:32.155Z",
    "theme": {
      "name": "Fashionopolism",
      "version": "9.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gridlock.template-index.index.theme-features__product-variants--swatches.theme-features__section-title-border--none.theme-features__details-align--center.theme-features__image-hover-transition--true.theme-features__ghost-buttons--false.js-slideout-toggle-wrapper.js-modal-toggle-wrapper > div.site-wrap > div.page-wrap > div#shopify-section-sections--14900048429107__header.shopify-section.shopify-section-group-header-group.js-site-header > theme-header > div.header-section.js-header-section > header.theme-header.stickynav > div#identity.row > nav.navigation.inline-header.js-nav > div#navigation.navigation__maincontainer > ul#nav"
    ]
  },
  {
    "url": "https://fetch-theme-modern.myshopify.com",
    "path": "Fetch/1.1.4.html",
    "scrapedAt": "2023-05-20T00:01:32.395Z",
    "theme": {
      "name": "Fetch",
      "version": "1.1.4",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.loaded > div#PageContainer.page-container > div.transition-body > div#shopify-section-sections--18940378775833__header.shopify-section.shopify-section-group-header-group.header-section > div > div#HeaderWrapper.header-wrapper > header#SiteHeader.site-header > div.site-header__element.site-header__element--top > div.page-width > div.header-layout > div.header-item.header-item--navigation > ul.site-nav.site-navigation.site-navigation--beside.small--hide"
    ]
  },
  {
    "url": "https://flow-queenstown.myshopify.com",
    "path": "Flow/31.0.8.html",
    "scrapedAt": "2023-05-20T00:01:32.614Z",
    "theme": {
      "name": "Flow",
      "version": "31.0.8",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body#flow-theme-queenstown.template-index.page-fade.images-aspect-ratio.loaded > div#PageContainer > div#shopify-section-sections--14761014132806__header.shopify-section.shopify-section-group-header-group.header-section.sticky-header > div.header-section--wrapper.overlay-header-wrapper > header.site-header.medium--hide.small--hide.overlay-header.overlay-logo > div.site-header__wrapper.site-header__wrapper--logo-center.site-header__wrapper--with-menu > div.site-header__wrapper__left > div#top_links_wrapper.js.site-header__nav.top-links > ul#AccessibleNav.site-nav.mega-menu-wrapper.js"
    ]
  },
  {
    "url": "https://focal-theme-carbon.myshopify.com",
    "path": "Focal/8.1.0.html",
    "scrapedAt": "2023-05-20T00:01:32.953Z",
    "theme": {
      "name": "Focal",
      "version": "8.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.no-focus-outline.features--image-zoom > div#shopify-section-header.shopify-section.shopify-section--header > store-header.header > div.container > div.header__wrapper > nav.header__inline-navigation"
    ]
  },
  {
    "url": "https://foodie-theme-coffee.myshopify.com",
    "path": "Foodie/4.1.0.html",
    "scrapedAt": "2023-05-20T00:01:33.304Z",
    "theme": {
      "name": "Foodie",
      "version": "4.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-no-cookies > body#foodie-shopify-theme.template-index.js-slideout-toggle-wrapper.js-modal-toggle-wrapper.fade.section-fade-in > main.site-wrap > div#shopify-section-sections--16109095092395__header.shopify-section.shopify-section-group-header-group.js-site-header > header.section-header.header-section.no-section-animation > section.section-header__main-bar.main-bar.w100.devices-hide.js-theme-header.stickynav > div.grid__wrapper.inline-layout > article.header-inline__nav-wrapper.span-4.auto.v-center.a-left > div.navigation > ul.header__navigation.mb0.inline-block"
    ]
  },
  {
    "url": "https://forge-theme-demo.myshopify.com",
    "path": "Forge/2.2.0.html",
    "scrapedAt": "2023-05-20T00:01:33.562Z",
    "theme": {
      "name": "Forge",
      "version": "2.2.0",
      "themeStore": false
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-no-cookies > body#forge-shopify-theme.template-index.js-slideout-toggle-wrapper.js-modal-toggle-wrapper.animation--active.animation-type--fade.animation-text--active.animation-text-type--fadeInUp > main.site-wrap > div#shopify-section-sections--16763909898473__header.shopify-section.shopify-section-group-header-group > header.section-header.header-section.no-section-animation > section.section-header__main-bar.main-bar.w100.devices-hide.js-theme-header.stickynav.js-stickynav > div.grid__wrapper.inline-layout > article.header-inline__nav-wrapper.span-4.auto.v-center.a-center > div.navigation > ul#main-nav.navigation__menu.tablet-hide.sm-hide"
    ]
  },
  {
    "url": "https://archer-themes.myshopify.com",
    "path": "Frame/2.2.2.html",
    "scrapedAt": "2023-05-20T00:01:33.800Z",
    "theme": {
      "name": "Frame",
      "version": "2.2.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.svg.flexbox.csstransforms > body.template-index.hasHover > div#shopify-section-header.shopify-section > sticky-header.header-wrapper > header.header.header--top-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://fresh-theme-sweet.myshopify.com",
    "path": "Fresh/32.0.0.html",
    "scrapedAt": "2023-05-20T00:01:34.081Z",
    "theme": {
      "name": "Fresh",
      "version": "32.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body#fresh-theme-sweet.page-title--fresh-theme-sweet.template-index.flexbox-wrapper > div#PageContainer.main-body-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--16026532348095__header.shopify-section.shopify-section-group-header-group > div#theme-section-header.header-wrapper.logo-placement--center.overlay--active.unstuck.header-wrapper--overlay > div.sticky-header-wrapper > div.sticky-header-wrapper__inner > div.sticky-desktop-menu.d-none.d-lg-block > div.header-menu-wrapper.d-none.d-lg-block > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.mega-menu-wrapper > ul.nav.nav-pills",
      "html.js.shopify-features__smart-payment-buttons--enabled > body#fresh-theme-sweet.page-title--fresh-theme-sweet.template-index.flexbox-wrapper > div#PageContainer.main-body-wrapper > div#main-body.slideout-panel.slideout-panel-left.slideout-panel-right > div#shopify-section-sections--16026532348095__header.shopify-section.shopify-section-group-header-group > div#theme-section-header.header-wrapper.logo-placement--center.overlay--active.unstuck.header-wrapper--overlay > div.header-row > div.header-menu-wrapper.d-none.d-lg-block > div.main-navigation-wrapper-main > div#main-navigation-wrapper.main-navigation-wrapper.mega-menu-wrapper > ul.nav.nav-pills"
    ]
  },
  {
    "url": "https://utd-theme-2.myshopify.com",
    "path": "Gain/1.0.0.html",
    "scrapedAt": "2023-05-20T00:01:34.339Z",
    "theme": {
      "name": "Gain",
      "version": "1.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.shopify-features__smart-payment-buttons--enabled > body.template-index > div#shopify-section-sections--18320264233252__header.shopify-section.shopify-section-group-header-group-with-cart-drawer.header-section > header.header.header--bottom-border.js-header > div.header__container > div.header__menu > nav.header-menu > ul.header-menu__list.header-menu__list--main"
    ]
  },
  {
    "url": "https://galleria-tech.myshopify.com",
    "path": "Galleria/3.0.15.html",
    "scrapedAt": "2023-05-20T00:01:34.569Z",
    "theme": {
      "name": "Galleria",
      "version": "3.0.15",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body > div#shopify-section-main-header.shopify-section.shopify-section--no-animation > main-header#MainHeader.#main-header.block.@text-size:md.@overlap:dark.@overlap > div.#main-header-inner > div.#main-nav-container > div#main-header-mainNav.#main-nav-wrapper.hide-mobile > main-nav.#main-nav.@text-size:md > ul.#main-nav-menu"
    ]
  },
  {
    "url": "https://grid-theme-bright.myshopify.com",
    "path": "Grid/6.0.0.html",
    "scrapedAt": "2023-05-20T00:01:34.770Z",
    "theme": {
      "name": "Grid",
      "version": "6.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.shopify-features__smart-payment-buttons--enabled.js.no-touch.cssanimations.csstransforms.csstransitions.svg.inlinesvg.cookies.bgsizecover.csscalc.placeholder > body.template-index.template-suffix- > div#shopify-section-sections--14840845697105__header.shopify-section.shopify-section-group-header-group > section.header.header-layout-compact-left.header-content-width > header.main-header > div.header-main-content > div.navigation-wrapper.navigation--loaded > nav.navigation.navigation-desktop.navigation-has-mega-nav"
    ]
  },
  {
    "url": "https://habitat-main.myshopify.com",
    "path": "Habitat/2.0.2.html",
    "scrapedAt": "2023-05-20T00:01:34.959Z",
    "theme": {
      "name": "Habitat",
      "version": "2.0.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.animations-true.button-uppercase-true.navigation-uppercase-false.product-title-uppercase-false.template-index.header-sticky--active > div#wrapper > div#shopify-section-sections--15799275225280__header.shopify-section.shopify-section-group-header-group.header-section > theme-header#header.header.header-sticky--active.style1.header--shadow-none > div.row.expanded > div.small-12.columns > full-menu.full-menu > ul.thb-full-menu"
    ]
  },
  {
    "url": "https://handmade-demo.myshopify.com",
    "path": "Handmade/2.0.0.html",
    "scrapedAt": "2023-05-20T00:01:35.218Z",
    "theme": {
      "name": "Handmade",
      "version": "2.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index > div#shopify-section-sections--16059895709893__header.shopify-section.shopify-section-group-header-group.shopify-section-header > sticky-header.header-wrapper.color-background-1 > header.header.header--center.container.container--header.header--has-menu > div.container > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://highlight-theme.myshopify.com",
    "path": "Highlight/3.0.1.html",
    "scrapedAt": "2023-05-20T00:01:35.455Z",
    "theme": {
      "name": "Highlight",
      "version": "3.0.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "skip"
    ]
  },
  {
    "url": "https://icon-shopify-theme.myshopify.com",
    "path": "Icon/9.1.0.html",
    "scrapedAt": "2023-05-20T00:01:35.731Z",
    "theme": {
      "name": "Icon",
      "version": "9.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gridlock.template-index.js-slideout-toggle-wrapper.js-modal-toggle-wrapper.theme-features__secondary-color-not-black--false.theme-features__product-variants--swatches.theme-features__image-flip--enabled.theme-features__sold-out-icon--enabled.theme-features__sale-icon--enabled.theme-features__new-icon--enabled.theme-features__section-titles--none.theme-features__section-title-align--center.theme-features__details-align--center.theme-features__rounded-buttons--disabled.theme-features__zoom-effect--enabled.theme-features__icon-position--top_right.theme-features__icon-shape--rectangle > div.site-wrap > div#shopify-section-sections--14532379213906__header.shopify-section.shopify-section-group-header-group > theme-header > header.header-section > div#navigation > div.row > div.nav-container.grid__wrapper.inline > nav.navigation.header-navigation.span-5.auto > ul#main-nav.navigation__menu"
    ]
  },
  {
    "url": "https://impact-theme-sound.myshopify.com",
    "path": "Impact/4.3.1.html",
    "scrapedAt": "2023-05-20T00:01:35.988Z",
    "theme": {
      "name": "Impact",
      "version": "4.3.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.native-share--disabled.shopify-features__smart-payment-buttons--enabled > body.page-transition.zoom-image--enabled > header#shopify-section-sections--16731742961914__header.shopify-section.shopify-section-group-header-group.shopify-section--header > height-observer > store-header.header > div.header__wrapper > div.header__main-nav > div.header__icon-list > nav.header__link-list.justify-center.wrap > ul.contents"
    ]
  },
  {
    "url": "https://impulse-theme-fashion.myshopify.com",
    "path": "Impulse/7.3.4.html",
    "scrapedAt": "2023-05-20T00:01:36.232Z",
    "theme": {
      "name": "Impulse",
      "version": "7.3.4",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index > div#PageContainer.page-container > div.transition-body > div#shopify-section-sections--14565180506170__header.shopify-section.shopify-section-group-header-group > div > div.header-sticky-wrapper > div#HeaderWrapper.header-wrapper > div#StickyHeaderWrap > header#SiteHeader.site-header > div.page-width > div.header-layout.header-layout--center-split > div.header-item.header-item--logo-split > div.header-item.header-item--split-right > ul.site-nav.site-navigation.small--hide"
    ]
  },
  {
    "url": "https://influence-theme.myshopify.com",
    "path": "Influence/3.0.0.html",
    "scrapedAt": "2023-05-20T00:01:36.509Z",
    "theme": {
      "name": "Influence",
      "version": "3.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.max-w-full.overflow-x-hidden.!h-auto.shopify-features__smart-payment-buttons--enabled > body.template-index.bg-page.text-base.font-body.max-w-full.overflow-x-hidden.!h-auto > div#shopify-section-sections--16874698539222__header.shopify-section.shopify-section-group-header-group.relative > header-main > header.grid.py-3.px-4.lg:px-5.xl:px-6.lg:py-0.md:gap-[1rem].items-center.bg-page.text-body.relative.border-b.border-b-border-opacity-10 > div#main-navigation.invisible.lg:visible.lg:h-full.flex.flex-col.items-start.lg:items-center.absolute.bottom-0.left-0.right-0.translate-y-full.opacity-0.lg:opacity-100.z-[101].pb-4.lg:pb-0.lg:static.lg:transform-none.bg-page.main-navigation > ul.lg:h-full.inline-flex.flex-col.lg:flex-row.flex-wrap.w-full.px-4.lg:px-0"
    ]
  },
  {
    "url": "https://ira-theme-active.myshopify.com",
    "path": "Ira/4.7.0.html",
    "scrapedAt": "2023-05-20T00:01:36.704Z",
    "theme": {
      "name": "Ira",
      "version": "4.7.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js-focus-visible > body.template-index.show-borders > div.page > div#shopify-section-header.shopify-section.header__outer-wrapper > header.header.header--inline.header--logo--left.header--transparent-home.header--has-accounts > div.header__links > ul.header__links-list.fs-body-base"
    ]
  },
  {
    "url": "https://king-theme-v3.myshopify.com",
    "path": "Kingdom/5.0.0.html",
    "scrapedAt": "2023-05-20T00:01:36.977Z",
    "theme": {
      "name": "Kingdom",
      "version": "5.0.0",
      "themeStore": true
    }
  },
  {
    "url": "https://label-theme-record-2.myshopify.com",
    "path": "Label/3.0.3.html",
    "scrapedAt": "2023-05-20T00:01:37.215Z",
    "theme": {
      "name": "Label",
      "version": "3.0.3",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-cookies.shopify-features__smart-payment-buttons--enabled > body#records.template-index.font-body > div#shopify-section-header.shopify-section.section-site-header.relative > header.site-header.section-x-padding.w-full.text-white-text.absolute.z-20 > div#headerBorderWrap.headerBorderWrap.border-b-theme-width.border-transparent > div#headerContainer.z-10 > div.py-4.lg:py-8 > div.flex.justify-between.items-center > div.flex.flex-grow.w-1/3.justify-start.items-center > div.hidden.lg:block > nav > ul.-mx-4.flex.flex-wrap.justify-start.items-center.type-navigation.text-base"
    ]
  },
  {
    "url": "https://launch-theme-cool.myshopify.com",
    "path": "Launch/8.0.0.html",
    "scrapedAt": "2023-05-20T00:01:37.448Z",
    "theme": {
      "name": "Launch",
      "version": "8.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.hydrated > body.template-index.has-slideshow-full-window.has-goal-expired.slide-color-light > div#shopify-section-sections--15088694820887__header.shopify-section.shopify-section-group-header-group.shopify-section--header > div.header.higher-than-slideshow > div.main-header-wrapper > div.main-header > div.header-tools > nav#header-navigation.navigation"
    ]
  },
  {
    "url": "https://local-theme-light-demo.myshopify.com",
    "path": "Local/2.1.0.html",
    "scrapedAt": "2023-05-20T00:01:37.719Z",
    "theme": {
      "name": "Local",
      "version": "2.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.no-js.shopify-features__smart-payment-buttons--enabled > body#local-shopify-theme.no-touchevents.template-index > div#shopify-section-sections--15174145409085__header.shopify-section.shopify-section-group-header-group.site-header-container.mount-header > main-header#site-header.site-header > div.header-container.header-container--bottom.show-header-actions-on-mobile > div.header__bottom.container--large > scrollable-navigation.header-links > div.site-nav.style--classic > div.site-nav-container > nav > ul.link-list"
    ]
  },
  {
    "url": "https://loft-theme-demo-nashville.myshopify.com",
    "path": "Loft/2.3.0.html",
    "scrapedAt": "2023-05-20T00:01:37.951Z",
    "theme": {
      "name": "Loft",
      "version": "2.3.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.hydrated > body#loft-theme.template-index > article.header__section-wrapper > div#shopify-section-header.shopify-section.section-header > div > header#header.site-header.site-header--top.nav-bar.card-shadow > div.header__wrapper.header__wrapper--left > div.header__nav.header__nav--left.medium-down--hide > nav.js__desktop--nav > ul#AccessibleNav.site-nav.mega-menu.multinav"
    ]
  },
  {
    "url": "https://lorenza-theme-chic.myshopify.com",
    "path": "Lorenza/5.6.0.html",
    "scrapedAt": "2023-05-20T00:01:38.221Z",
    "theme": {
      "name": "Lorenza",
      "version": "5.6.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.header-transparent > body.template-index.secondary_button-style-bordered > header.header-container > div#shopify-section-header.shopify-section.header-section > section.w-100.z-5.first-section-is-full-width > div#header.header.header--default.header--alignment-left.header--position-inline.header--content-normal.header--style-is-icon.header--has-mobile-search-icon.header--transparent.animation.animation--header > div.header__content > div.header__content-inner.flex.justify-between.w-100 > nav.header__nav"
    ]
  },
  {
    "url": "https://maker-theme-luna.myshopify.com",
    "path": "Maker/8.1.1.html",
    "scrapedAt": "2023-05-20T00:01:38.511Z",
    "theme": {
      "name": "Maker",
      "version": "8.1.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.flexbox-gap.shopify-features__smart-payment-buttons--enabled > body.template--index.page--maker-theme-luna > div.layout--viewport > div.layout--main-content > header.layout--header-group > div#shopify-section-sections--16077326581917__header.shopify-section.shopify-section-group-header-group.section--header > header-root.header--root > div.header--container > div.header--left-side > x-menu-root.x-menu > ul.x-menu--level-1--container"
    ]
  },
  {
    "url": "https://mandolin-neat.myshopify.com",
    "path": "Mandolin/2.4.0.html",
    "scrapedAt": "2023-05-20T00:01:38.740Z",
    "theme": {
      "name": "Mandolin",
      "version": "2.4.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.MandolinTheme.Template.Template--index > div#shopify-section-sections--16732953510103__header.shopify-section.shopify-section-group-header-group.shopify-section--header > header#Header.Header.Header--spacingMedium.Header--transparent.Header--transparentInHeaderGroup > div.Header__Main.Container.Container--fluid > div.Header__MainMenu.HiddenMediumDown > ul.Nav"
    ]
  },
  {
    "url": "https://marble-theme-demo.myshopify.com",
    "path": "Marble/1.3.3.html",
    "scrapedAt": "2023-05-20T00:01:39.079Z",
    "theme": {
      "name": "Marble",
      "version": "1.3.3",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template > div#shopify-section-sections--16054133522629__header.shopify-section.shopify-section-group-header-group.shopify-section-header > sticky-header.header.header--logo-center.header--dropdown-animation-elastic.header--sticky.color-style-2.header--has-logo > div.container.container--fullwidth > div.header__inner > nav.header__nav.small-hide.medium-hide > ul.header__nav-items.list-unstyled"
    ]
  },
  {
    "url": "https://flamingo-theme.myshopify.com",
    "path": "Masonry/5.0.0.html",
    "scrapedAt": "2023-05-20T00:01:39.282Z",
    "theme": {
      "name": "Masonry",
      "version": "5.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": []
  },
  {
    "url": "https://mavon-demo.myshopify.com",
    "path": "Mavon/1.2.0.html",
    "scrapedAt": "2023-05-20T00:01:39.532Z",
    "theme": {
      "name": "Mavon",
      "version": "1.2.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body > header#shopify-section-sections--18787314729258__header.shopify-section.shopify-section-group-header-group > div#shopify__header__section.header.header__area.transparent--header > div.header_bottom.header__sticky.transparent_header_color.middle_left > div.container > div.header__inner.row > nav.header__menu.col.d-md-none.justify-content-center > ul.header__menu_ul"
    ]
  },
  {
    "url": "https://minion-theme-vertical.myshopify.com",
    "path": "Minion/2.2.1.html",
    "scrapedAt": "2023-05-20T00:01:39.766Z",
    "theme": {
      "name": "Minion",
      "version": "2.2.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.dom-loaded > body > div#shopify-section-sections--16667434123496__header.shopify-section.shopify-section-group-header-group.section-header > sticky-header.display-block > header > div.header__desktop > div.header-layout-vertical.page-width > div.header.menu-to-right > nav.list-menu.menu--animation-underline > ul.unstyle-ul.list-menu--inline"
    ]
  },
  {
    "url": "https://mode-theme-orbit.myshopify.com",
    "path": "Mode/3.0.0.html",
    "scrapedAt": "2023-05-20T00:01:40.043Z",
    "theme": {
      "name": "Mode",
      "version": "3.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.template-index.swatch-method-standard.swatch-style-icon_square.image-load-anim-enabled.cc-animate-enabled > div#shopify-section-header.shopify-section.section-header > div.wide-container.cc-animate-init.-in.cc-animate-complete > div#pageheader.pageheader.pageheader--layout-inline-menu-center.pageheader--layout-inline-permitted.pageheader--sticky.card.card--header > div.logo-area > div.logo-area__left > div.logo-area__left__inner > div.navigation.navigation--desktop"
    ]
  },
  {
    "url": "https://mayfair-theme.myshopify.com",
    "path": "Modular/3.1.1.html",
    "scrapedAt": "2023-05-20T00:01:40.291Z",
    "theme": {
      "name": "Modular",
      "version": "3.1.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.iframe > body#modular-theme-mayfair.template-index.allow-text-animations.allow-grid-animations.allow-image-animations > div.page-wrap > div#shopify-section-header.shopify-section.shopify-section-header > header.site-header.header--is-standard.header--logo_center_links_left > div.container > div.row > div.header-fix-cont > div.header-fix-cont-inner > nav.nav-standard.nav-main"
    ]
  },
  {
    "url": "https://aberne.myshopify.com",
    "path": "Modules/1.1.0.html",
    "scrapedAt": "2023-05-20T00:01:40.480Z",
    "theme": {
      "name": "Modules",
      "version": "1.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.shopify-features__smart-payment-buttons--enabled > body > div#shopify-section-header.shopify-section > div#headerWrap > header#headerBar.square.headerBorderBottom > div.flexAlignCenter.headerContentWrap > nav.mainNav"
    ]
  },
  {
    "url": "https://mojave-theme.myshopify.com",
    "path": "Mojave/2.0.6.html",
    "scrapedAt": "2023-05-20T00:01:40.781Z",
    "theme": {
      "name": "Mojave",
      "version": "2.0.6",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template.template--index.template--default > div#shopify-section-sections--16714402595037__header.shopify-section.shopify-section-group-header-group.section--header > sticky-header.header-wrapper.header.header--logo-center.header--border-bottom.header--has-menu > header.header__wrapper > div.container > div.header__inner > nav.header__nav > ul.header__nav__list.list-unstyled"
    ]
  },
  {
    "url": "https://momentum-theme-demo-tyres.myshopify.com",
    "path": "Momentum/3.0.0.html",
    "scrapedAt": "2023-05-20T00:01:41.172Z",
    "theme": {
      "name": "Momentum",
      "version": "3.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.relative.bg-page.text-base.font-body.font-body-weight.font-body-style.overflow-x-hidden > section.block.sticky-header.relative > div#shopify-section-sections--16724852703462__navigation.shopify-section.shopify-section-group-header-group.relative > div.bg-page.text-body > armada-navigation > div#main-navigation.overflow-x-hidden.overflow-y-auto.invisible.lg:visible.lg:min-h-0.lg:h-full.flex.flex-col.items-start.lg:items-center.absolute.bottom-0.left-0.right-0.translate-y-full.opacity-0.lg:opacity-100.z-[101].pb-xl.lg:pb-0.lg:static.lg:transform-none.bg-page.main-navigation"
    ]
  },
  {
    "url": "https://the-mono-theme.myshopify.com",
    "path": "Mono/1.0.7.html",
    "scrapedAt": "2023-05-20T00:01:41.395Z",
    "theme": {
      "name": "Mono",
      "version": "1.0.7",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.template-index > div#shopify-section-sections--16733218472180__header.shopify-section.shopify-section-group-header-group.section-header > sticky-header.header-wrapper.gradient > header.header.header--top-left.page-width-tablet.header--has-menu > nav.header__inline-menu > ul#SiteNav.site-nav.list--inline"
    ]
  },
  {
    "url": "https://motion-theme-adventure.myshopify.com",
    "path": "Motion/9.0.0.html",
    "scrapedAt": "2023-05-20T00:01:41.614Z",
    "theme": {
      "name": "Motion",
      "version": "9.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.template-index.loaded > div#PageContainer.page-container > div.transition-body > div#shopify-section-header.shopify-section > div > div#HeaderWrapper.header-wrapper.header-wrapper--overlay.is-light > div#StickyHeaderWrap > header#SiteHeader.site-header > div.page-width > div.header-layout.header-layout--left-center > div.header-item.header-item--navigation.text-center > ul.site-nav.site-navigation.medium-down--hide"
    ]
  },
  {
    "url": "https://mr-parker.myshopify.com",
    "path": "Mr Parker/9.1.0.html",
    "scrapedAt": "2023-05-20T00:01:41.827Z",
    "theme": {
      "name": "Mr Parker",
      "version": "9.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gridlock.ultra_wide.template-index.index.theme-features__header-border-style--solid.theme-features__header-horizontal-alignment--bottom.theme-features__header-border-weight--3.theme-features__header-border-width--10.theme-features__header-edges--none.theme-features__h2-size--26.theme-features__header-vertical-alignment--center.theme-features__rounded-buttons--enabled.theme-features__display-options--image-switch.theme-features__product-align--center.theme-features__product-border--disabled.theme-features__product-info--sizes.theme-features__price-bold--disabled.theme-features__product-icon-position--top-left.theme-features__ultra-wide--enabled.js-slideout-toggle-wrapper.js-modal-toggle-wrapper > main.site-wrap > div.js-header-group > div#shopify-section-sections--15197147365410__header.shopify-section.shopify-section-group-header-group.js-site-header > theme-header > header.header__wrapper.inline_left.js-theme-header.stickynav > nav.header__nav-container.hover-color.js-nav > div.header__nav-below.grid__wrapper.device-hide > div.span-8.a-center.auto.v-center > ul.header__nav__list.inline__wrapper.nav"
    ]
  },
  {
    "url": "https://north-original.myshopify.com",
    "path": "North/1.9.7.html",
    "scrapedAt": "2023-05-20T00:01:42.054Z",
    "theme": {
      "name": "North",
      "version": "1.9.7",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.button-uppercase--false > div#wrapper.open > div#shopify-section-sections--14752103628885__header.shopify-section.shopify-section-group-header-group.header-section > header.header.style1.header--shadow-none.light-title.fixed > div.row.align-middle > div.small-12.columns > div.header-grid > div.show-for-large > nav.menu-holder > ul.thb-full-menu.uppercase-false"
    ]
  },
  {
    "url": "https://theme-origin-demo.myshopify.com",
    "path": "Dawn/7.0.1.html",
    "scrapedAt": "2023-05-20T00:01:42.306Z",
    "theme": {
      "name": "Dawn",
      "version": "7.0.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.gradient > main#MainContent.content-for-layout.focus-none > section#shopify-section-template--16487782875445__featured_collection.shopify-section.section > div.color-background-1.isolate.gradient > div.collection.section-template--16487782875445__featured_collection-padding.collection--full-width > slider-component.slider-mobile-gutter.slider-component-full-width.slider-component-desktop > ul#Slider-template--16487782875445__featured_collection.grid.product-grid.contains-card.contains-card--product.grid--5-col-desktop.grid--2-col-tablet-down.slider.slider--desktop.slider--tablet.grid--peek"
    ]
  },
  {
    "url": "https://pacific-theme-bold.myshopify.com",
    "path": "Pacific/6.0.0.html",
    "scrapedAt": "2023-05-20T00:01:42.554Z",
    "theme": {
      "name": "Pacific",
      "version": "6.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.shopify-features__smart-payment-buttons--enabled > body.sidebar-disabled.template-index.main-header-sticky > div#shopify-section-sections--14891563417651__header.shopify-section.shopify-section-group-header-group.section-header > div > div.main-header-wrapper > div.mobile-nav-wrapper > div.site-mobile-nav > nav.mobile-nav-content > ul.navmenu.navmenu-depth-1"
    ]
  },
  {
    "url": "https://palo-alto-theme-vibrant.myshopify.com",
    "path": "Palo Alto/5.0.0.html",
    "scrapedAt": "2023-05-20T00:01:42.834Z",
    "theme": {
      "name": "Palo Alto",
      "version": "5.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.is-loaded > body#palo-alto-theme-vibrant.template-index.body--rounded-corners.aos-initialized.palette--light.no-outline.hide-header > div#shopify-section-sections--18868559020310__header.shopify-section.shopify-section-group-group-header.shopify-section-header > header#SiteHeader.site-header.site-header--fixed.site-header--nav-left.site-header--transparent.site-header--has-logo.site-header--has-border > div.wrapper.aos-init.aos-animate > nav#NavStandard.nav.nav--default.nav--weight-bold > div.menu__items"
    ]
  },
  {
    "url": "https://paperthemedemo2.myshopify.com",
    "path": "Paper/5.1.0.html",
    "scrapedAt": "2023-05-20T00:01:43.063Z",
    "theme": {
      "name": "Paper",
      "version": "5.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.min-h-[100vh] > body.min-h-[100vh].break-words.index > header.z-30.dynamic.sticky.top-0.left-0.right-0.animation-300 > div#shopify-section-sections--16747559616745__theme_header.shopify-section.shopify-section-group-header-group > nav.border--b-width.color__bg-body.color__text.color__border-divider-1 > div.relative > div.md:flex.items-stretch.justify-between.hidden.window--wide.flex-wrap > div.flex.flex-wrap.items-center.type__body.w-full"
    ]
  },
  {
    "url": "https://parallax-theme-aspen.myshopify.com",
    "path": "Parallax/6.0.0.html",
    "scrapedAt": "2023-05-20T00:01:43.297Z",
    "theme": {
      "name": "Parallax",
      "version": "6.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.mediaqueries.no-touchevents > body.index.feature_image > div#mm-0.mm-page.mm-slideout > div#shopify-section-sections--14979479601231__header.shopify-section.shopify-section-group-header-group.shopify-section--header.feature_image > div.header.header-dropdown-position--below_parent.header-background--false.header-transparency--false.header-text-shadow--false.sticky-header--true.mm-fixed-top.is-absolute.animated.fadeIn > section.section > div.container.dropdown__wrapper > div.five-sixths.columns.nav.mobile_hidden > ul.header__navigation.menu.center"
    ]
  },
  {
    "url": "https://pipeline-theme-fashion.myshopify.com",
    "path": "Pipeline/7.0.2.html",
    "scrapedAt": "2023-05-20T00:01:43.592Z",
    "theme": {
      "name": "Pipeline",
      "version": "7.0.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.aos-initialized > body#pipeline-fashion.template-index.theme-animate-hover > div#shopify-section-sections--16811992580312__header.shopify-section.shopify-section-group-group-header > div.header__wrapper > header.theme__header > div.header__inner > div.wrapper--full > div.header__desktop.header__desktop--menu_center > div.header__desktop__bar__c > nav.header__menu > div.header__menu__inner"
    ]
  },
  {
    "url": "https://portland-demo-heartbeat.myshopify.com",
    "path": "Portland/2.0.0.html",
    "scrapedAt": "2023-05-20T00:01:43.847Z",
    "theme": {
      "name": "Portland",
      "version": "2.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.body-template-index > div#shopify-section-sections--18942783258898__header.shopify-section.shopify-section-group-header-group.shopify-section-header > sticky-header.header-wrapper > header.header.header--center.container.container--header.header--has-menu > nav.header__inline-menu.header__inline-menu--js > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://prestige-theme-allure.myshopify.com",
    "path": "Prestige/7.3.0.html",
    "scrapedAt": "2023-05-20T00:01:44.092Z",
    "theme": {
      "name": "Prestige",
      "version": "7.3.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.features--button-transition.features--zoom-image > header#shopify-section-sections--14544586014783__header.shopify-section.shopify-section-group-header-group.shopify-section--header > height-observer > x-header.header > nav.header__primary-nav > ul.contents.unstyled-list.md-max:hidden"
    ]
  },
  {
    "url": "https://thunderbolt-providence.myshopify.com",
    "path": "Providence/5.10.2.html",
    "scrapedAt": "2023-05-20T00:01:44.279Z",
    "theme": {
      "name": "Providence",
      "version": "5.10.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.index.thunderbolt.js.flexbox.flexboxlegacy.canvas.canvastext.webgl.no-touch.geolocation.postmessage.websqldatabase.indexeddb.hashchange.history.draganddrop.websockets.rgba.hsla.multiplebgs.backgroundsize.borderimage.borderradius.boxshadow.textshadow.opacity.cssanimations.csscolumns.cssgradients.cssreflections.csstransforms.csstransforms3d.csstransitions.fontface.generatedcontent.video.audio.localstorage.sessionstorage.webworkers.no-applicationcache.svg.inlinesvg.smil.svgclippaths > body > header#shopify-section-header.shopify-section > div.column-screen > div#app-header.sticky-on > div#app-lower-header > div.column-max > nav.menu.text-center"
    ]
  },
  {
    "url": "https://theme-publisher-demo.myshopify.com",
    "path": "Dawn/7.0.1.html",
    "scrapedAt": "2023-05-20T00:01:44.519Z",
    "theme": {
      "name": "Dawn",
      "version": "7.0.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.gradient > main#MainContent.content-for-layout.focus-none > section#shopify-section-template--16487782875445__featured_collection.shopify-section.section > div.color-background-1.isolate.gradient > div.collection.section-template--16487782875445__featured_collection-padding.collection--full-width > slider-component.slider-mobile-gutter.slider-component-full-width.slider-component-desktop > ul#Slider-template--16487782875445__featured_collection.grid.product-grid.contains-card.contains-card--product.grid--5-col-desktop.grid--2-col-tablet-down.slider.slider--desktop.slider--tablet.grid--peek"
    ]
  },
  {
    "url": "https://pursuit-outdoor.myshopify.com",
    "path": "Pursuit/1.0.html",
    "scrapedAt": "2023-05-20T00:01:44.768Z",
    "theme": {
      "name": "Pursuit",
      "version": "1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index > div#shopify-section-header.shopify-section > div > header.site-header.logo--inline.enable_emphasize_category_menu > div.hide_site_header__mobile_nav.grid.grid--no-gutters.site-header__mobile-nav > nav#AccessibleNav.grid__item.medium-up--ten-twelfths.small--hide > div.navigation_wrapper > ul.nav-bar__linklist.list--unstyled.main_nav-bar_linklist"
    ]
  },
  {
    "url": "https://reformation-main.myshopify.com",
    "path": "Reformation/1.5.4.html",
    "scrapedAt": "2023-05-20T00:01:45.036Z",
    "theme": {
      "name": "Reformation",
      "version": "1.5.4",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.animations-true.button-uppercase-true.navigation-uppercase-true.product-title-uppercase-true.template-index > div#wrapper > div#shopify-section-sections--16216397316245__header.shopify-section.shopify-section-group-header-group.header-section > header#header.header.style3.header--shadow-small.transparent--true.header-sticky--active > div.row.expanded > div.small-12.columns > full-menu.full-menu > ul.thb-full-menu"
    ]
  },
  {
    "url": "https://theme-refresh-demo.myshopify.com",
    "path": "Dawn/5.0.0.html",
    "scrapedAt": "2023-05-20T00:01:45.289Z",
    "theme": {
      "name": "Dawn",
      "version": "5.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-inverse.gradient > header.header.header--top-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://responsive-theme-london.myshopify.com",
    "path": "Responsive/9.0.0.html",
    "scrapedAt": "2023-05-20T00:01:45.529Z",
    "theme": {
      "name": "Responsive",
      "version": "9.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch > body.index.promo_banner-show > div#shopify-section-sections--14845371252826__header.shopify-section.shopify-section-group-header-group.shopify-section--header > section.section > div.container.content.header-container > div.one-whole.column > div#nav.nav-align--center.nav-border--solid.nav-separator--solid > ul#menu.js-navigation.menu-navigation.disclosure--enabled.menu-desktop"
    ]
  },
  {
    "url": "https://retina-theme-melbourne.myshopify.com",
    "path": "Retina/7.0.0.html",
    "scrapedAt": "2023-05-20T00:01:45.779Z",
    "theme": {
      "name": "Retina",
      "version": "7.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.index.banner-present--true > div#shopify-section-sections--14889254125666__header.shopify-section.shopify-section-group-header-group.site-header__outer-wrapper.site-header__outer-wrapper--transparent.site-header__outer-wrapper--loaded > header.site-header > div.site-header__wrapper.site-header__wrapper--logo-center > nav.site-header__navigation > ul.main-nav"
    ]
  },
  {
    "url": "https://theme-ride-demo.myshopify.com",
    "path": "Ride/1.0.0.html",
    "scrapedAt": "2023-05-20T00:01:46.026Z",
    "theme": {
      "name": "Ride",
      "version": "1.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--middle-left.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://roam-theme-solo.myshopify.com",
    "path": "Roam/3.0.0.html",
    "scrapedAt": "2023-05-20T00:01:46.282Z",
    "theme": {
      "name": "Roam",
      "version": "3.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.page-template-index.isDesktop > div#shopify-section-sections--17505497448734__header.shopify-section.shopify-section-group-header-group.site-main.site-header > header.container.site-header-wrapper > nav.site-navigation"
    ]
  },
  {
    "url": "https://sahara-theme.myshopify.com",
    "path": "Sahara/1.0.9.html",
    "scrapedAt": "2023-05-20T00:01:46.538Z",
    "theme": {
      "name": "Sahara",
      "version": "1.0.9",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template.template--index.template-theme--sahara > div#shopify-section-sections--19113630171451__header.shopify-section.shopify-section-group-header-group.section--header > header#header.header.js-header.is-transparent.is-sticky.section-sections--19113630171451__header > div.container.container--fullwidth > div.header__inner > nav.header__nav.small-hide.medium-hide.svg-color-inherit.js-nav > ul.header__nav-items.list-unstyled"
    ]
  },
  {
    "url": "https://theme-sense-demo.myshopify.com",
    "path": "Dawn/2.5.0.html",
    "scrapedAt": "2023-05-20T00:01:46.766Z",
    "theme": {
      "name": "Dawn",
      "version": "2.5.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--top-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://shapes-theme-skincare.myshopify.com",
    "path": "Shapes/2.0.0.html",
    "scrapedAt": "2023-05-20T00:01:47.028Z",
    "theme": {
      "name": "Shapes",
      "version": "2.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body > div#shopify-section-sections--15812949246133__header.shopify-section.shopify-section-group-header-group.section-site-header.relative.z-40.has-no-height > header.site-header.w-full.text-scheme-text.absolute.top-0.left-0.right-0.z-20.border-b-section.bg-transparent.border-transparent.transition-[background-color,border-color].ease-in-out.duration-200 > div#headerBorderWrap.headerBorderWrap > div#headerContainer.z-10 > div.py-2.lg:py-0.px-section.overflow-hidden > div.flex.justify-between.items-center > div.flex.flex-grow.w-1/3.justify-start.items-stretch > div.hidden.lg:block > nav"
    ]
  },
  {
    "url": "https://showcase-theme-mila.myshopify.com",
    "path": "Showcase/6.0.0.html",
    "scrapedAt": "2023-05-20T00:01:47.245Z",
    "theme": {
      "name": "Showcase",
      "version": "6.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-transforms > body.page-mila.template-index.animation-speed-medium.cc-animate-enabled.nav-transparent.showing-announcement.header-section-overlap.use-alt-logo > div#shopify-section-header.shopify-section > div > div#site-control.site-control.inline.icons.nav-inline-desktop.fixed.has-announcement.alt-logo-when-active.cc-animate-init.-in.cc-animate-complete > div.links.site-control__inner > div.site-control__inline-links > div.nav-row.multi-level-nav.reveal-on-hover > div.tier-1 > ul"
    ]
  },
  {
    "url": "https://showtime-home.myshopify.com",
    "path": "ShowTime/7.10.0.html",
    "scrapedAt": "2023-05-20T00:01:47.552Z",
    "theme": {
      "name": "ShowTime",
      "version": "7.10.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body > cart-provider > section#shopify-section-g_header.shopify-section > div#mainHeaderg_header.#header.@sticky.shadow-3 > div.#header-main > div.#container.@width:wide > div.#header-main-inner > div.#header-primary-nav.mobile-hidden > main-navigation.#main-navigation.@position:primary > ul.#main-navigation-list"
    ]
  },
  {
    "url": "https://spark-theme-chic.myshopify.com",
    "path": "Spark/2.11.0.html",
    "scrapedAt": "2023-05-20T00:01:47.774Z",
    "theme": {
      "name": "Spark",
      "version": "2.11.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.shopify-features__smart-payment-buttons--enabled > body.template-index.header-sticky > div.page > div#shopify-section-header.shopify-section.header__outer-wrapper > header.header.header--inline.header--center.header--navigation-inline.header--transparent-home > div.header__inner > div.header__left > nav.header__links > ul.header__links-list"
    ]
  },
  {
    "url": "https://cuber-theme.myshopify.com",
    "path": "Split/4.0.3.html",
    "scrapedAt": "2023-05-20T00:01:48.032Z",
    "theme": {
      "name": "Split",
      "version": "4.0.3",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.no-js > body#collections.no-touchevents.template-list-collections > div#shopify-section-sections--14761392865365__header.shopify-section.shopify-section-group-header-group.mount-header > main-header#site-header.site-header.desktop-view--classic > div#site-nav--desktop.site-nav.style--classic > div.site-nav-container.portable--hide > nav.primary-menu > ul.link-list > li#menu-item-collections.has-submenu > ul#SiteNavLabel-collections-classic.submenu.mega-menu > div.submenu-holder > div.submenu-masonry.with-promotion",
      "html.no-js > body#collections.no-touchevents.template-list-collections > sidebar-drawer#site-nav--mobile.site-nav.style--sidebar > div#site-navigation.site-nav-container > div.site-nav-container-last > div.top > nav.primary-menu > ul.link-list > li#menu-item-collections.has-submenu > ul#SiteNavLabel-collections-sidebar.submenu.mega-menu > div.submenu-holder > div.submenu-masonry.without-promotion"
    ]
  },
  {
    "url": "https://theme-spotlight-demo.myshopify.com",
    "path": "Spotlight/8.0.0.html",
    "scrapedAt": "2023-05-20T00:01:48.244Z",
    "theme": {
      "name": "Spotlight",
      "version": "8.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient > div#shopify-section-sections--15582238801967__header.shopify-section.shopify-section-group-header-group.section-header > sticky-header.header-wrapper.color-background-1.gradient.header-wrapper--border-bottom > header.header.header--middle-left.header--mobile-center.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline > ul#meteor-desktop-nav.DesktopNavigation"
    ]
  },
  {
    "url": "https://startup-theme-home.myshopify.com/",
    "path": "Startup/12.0.0.html",
    "scrapedAt": "2023-05-20T00:01:48.464Z",
    "theme": {
      "name": "Startup",
      "version": "12.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.no-touch.js.flexbox.cssanimations.csstransitions.svg.csscalc > body.template-index > div#shopify-section-sections--14595241050174__header.shopify-section.shopify-section-group-header-group.main-header-section > nav.drawer-nav > div.drawer-nav__flyout > ul.drawer-menu__tier-1-menu"
    ]
  },
  {
    "url": "https://stiletto-theme-vogue.myshopify.com",
    "path": "Stiletto/2.0.1.html",
    "scrapedAt": "2023-05-20T00:01:48.729Z",
    "theme": {
      "name": "Stiletto",
      "version": "2.0.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.do-anim.sticky-header-enabled > body.template-index.header-transparent.quick-search-position-left > div.page > div#shopify-section-sections--16262203179157__header.shopify-section.shopify-section-group-header-group.header__outer-wrapper > header.header.header--layout-logo-center-nav-below.header--has-logo.header--transparent.header--has-transparent-logo.header--has-accounts.header--has-secondary-menu.header--has-social-links.header--has-country-or-locale > div.header__inner > div.header__row.header__row-desktop.lower.three-segment > div.header__links-primary-scroll-container.scroll-container-initialized > div > nav.header__links.header__links-primary > ul.header__links-list.fs-navigation-base"
    ]
  },
  {
    "url": "https://stockholm-demo.myshopify.com",
    "path": "Stockholm/2.0.0.html",
    "scrapedAt": "2023-05-20T00:01:48.967Z",
    "theme": {
      "name": "Stockholm",
      "version": "2.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body > div#shopify-section-sections--15102982979607__header.shopify-section.shopify-section-group-header-group.shopify-section-header > sticky-header.header-wrapper.header-wrapper--border-bottom > header.header.header--top-center.container.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://stockmart-modern.myshopify.com",
    "path": "Stockmart/1.0.0.html",
    "scrapedAt": "2023-05-20T00:01:49.200Z",
    "theme": {
      "name": "Stockmart",
      "version": "1.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index > div#shopify-section-sections--17920095355199__header.shopify-section.shopify-section-group-header-group.shopify-section-header > sticky-header.header-wrapper > header.header.header--bottom-menu.header--has-menu > div.header__bottom > div.header__bottom-inner.container > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://story-theme-demo.myshopify.com",
    "path": "Story/4.0.0.html",
    "scrapedAt": "2023-05-20T00:01:49.414Z",
    "theme": {
      "name": "Story",
      "version": "4.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-cookies > body#story-theme-demo.template-index.decoration-none > div#shopify-section-sections--16752165028073__header.shopify-section.shopify-section-group-group-header > div.header__wrapper > header.theme__header > div > div.header__desktop > div.header__desktop__upper > div.wrapper > div.header__desktop-inner > div.header__desktop__bar__c > nav.header__menu > div.header__menu__inner"
    ]
  },
  {
    "url": "https://streamline-theme-core.myshopify.com",
    "path": "Streamline/6.1.0.html",
    "scrapedAt": "2023-05-20T00:01:49.650Z",
    "theme": {
      "name": "Streamline",
      "version": "6.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.loaded > div.root > div#PageContainer.page-container > div.transition-body > div#shopify-section-header.shopify-section > div > div.header-wrapper.header-wrapper--overlay.is-light > header.site-header > div.page-width > div.header-layout.header-layout--left-center.header-layout--mobile-logo-only > div.header-item.header-item--navigation.text-center.small--hide > ul.site-nav.site-navigation.small--hide"
    ]
  },
  {
    "url": "https://theme-studio-demo.myshopify.com",
    "path": "Dawn/3.0.0.html",
    "scrapedAt": "2023-05-20T00:01:49.846Z",
    "theme": {
      "name": "Dawn",
      "version": "3.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--middle-left.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://sunrise-theme.myshopify.com",
    "path": "Sunrise/11.02.01.html",
    "scrapedAt": "2023-05-20T00:01:50.084Z",
    "theme": {
      "name": "Sunrise",
      "version": "11.02.01",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body#index.two-column > div#site-wrap > header#header > div#shopify-section-header.shopify-section > div.site-width > nav.top-menu.hide-mobile.clearfix"
    ]
  },
  {
    "url": "https://chantilly.myshopify.com",
    "path": "Symmetry/6.0.2.html",
    "scrapedAt": "2023-05-20T00:01:50.367Z",
    "theme": {
      "name": "Symmetry",
      "version": "6.0.2",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.swatch-method-standard.swatch-style-icon_circle.cc-animate-enabled > div#shopify-section-header.shopify-section.section-header > div.cc-animate-init.-in.cc-animate-complete > div#pageheader.pageheader.pageheader--layout-inline-menu-left.pageheader--transparent-permitted.pageheader--transparent.pageheader--sticky.pageheader--layout-inline-permitted > div.logo-area.container.container--no-max > div.logo-area__left > div.logo-area__left__inner > div.navigation.navigation--left > div.navigation__tier-1-container > ul.navigation__tier-1",
      "html.js > body.template-index.swatch-method-standard.swatch-style-icon_circle.cc-animate-enabled > div#shopify-section-header.shopify-section.section-header > div.cc-animate-init.-in.cc-animate-complete > div#main-nav.desktop-only > div.navigation.navigation--main > div.navigation__tier-1-container > ul.navigation__tier-1"
    ]
  },
  {
    "url": "https://taiga-demo-fashion.myshopify.com",
    "path": "Taiga/1.2.0.html",
    "scrapedAt": "2023-05-20T00:01:50.592Z",
    "theme": {
      "name": "Taiga",
      "version": "1.2.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.template-index.sticky-header-initialized.sticky-header-scroll > body.woolman > div#shopify-section-sections--15769601474716__header.shopify-section.shopify-section-group-header-group.site-header.section-in-view > header#MainHeader.header.is-light-background.logo-center__menu-left > div.header-content > div.header-item.--left > nav.header-shortlinks"
    ]
  },
  {
    "url": "https://tailor-theme-cotton.myshopify.com",
    "path": "Tailor/2.0.0-pre.0.html",
    "scrapedAt": "2023-05-20T00:01:50.838Z",
    "theme": {
      "name": "Tailor",
      "version": "2.0.0-pre.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touch.shopify-features__smart-payment-buttons--enabled > body.template-index > div#shopify-section-sections--16009838821564__header.shopify-section.shopify-section-group-header-group.section-header > section#72980d6b-645c-4d51-9646-fb489711625c.header.header--nav-position-left-left > section-wrapper > header.header__header > div.header__wrapper > div.header__controls.header__controls--first > nav#bbd740fc-43f5-40fb-8cdc-7f99380f12d0.nav-desktop.header__controls--first-navigation"
    ]
  },
  {
    "url": "https://theme-taste-demo.myshopify.com",
    "path": "Dawn/3.0.0.html",
    "scrapedAt": "2023-05-20T00:01:51.057Z",
    "theme": {
      "name": "Dawn",
      "version": "3.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.gradient > div#shopify-section-header.shopify-section.section-header > sticky-header.header-wrapper.color-background-1.gradient > header.header.header--middle-left.page-width.header--has-menu > nav.header__inline-menu > ul.list-menu.list-menu--inline"
    ]
  },
  {
    "url": "https://testament.myshopify.com",
    "path": "Testament/11.0.0.html",
    "scrapedAt": "2023-05-20T00:01:51.318Z",
    "theme": {
      "name": "Testament",
      "version": "11.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gridlock.template-index.index.js-slideout-toggle-wrapper.js-modal-toggle-wrapper.product-variant-type--swatches.theme-image-effect.theme-buttons-curved.theme-image-hover > div.site-wrap > div.page-wrap > div#header-group.header-group > div#shopify-section-sections--15630073987124__header.shopify-section.shopify-section-group-header-group.js-site-header > theme-header > div.header-section.js-header > div.js-header-wrapper.header-wrapper.nav__option-full > nav.navigation.js-navigation > ul#main-nav.navigation__menu.tablet-hide.sm-hide"
    ]
  },
  {
    "url": "https://upscale-theme-gem.myshopify.com",
    "path": "Upscale/1.0.0.html",
    "scrapedAt": "2023-05-20T00:01:51.503Z",
    "theme": {
      "name": "Upscale",
      "version": "1.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body > header#shopify-section-header.shopify-section > loess-header.section.header.block.color.color-default-with-accent-1.header--transparent > div.container > div.header-wrapper.header-wrapper--collapse-menu-on-tablet > div.header-top.header-top--left-center > nav.header-menu > ul.menu-list.menu-list--centered"
    ]
  },
  {
    "url": "https://rutherford-romaguera2611.myshopify.com",
    "path": "Vantage/10.0.0.html",
    "scrapedAt": "2023-05-20T00:01:51.767Z",
    "theme": {
      "name": "Vantage",
      "version": "10.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-js.supports-no-touch.supports-csstransforms.supports-csstransforms3d.supports-fontface > body.gridlock.index.template-index.js-slideout-toggle-wrapper.js-modal-toggle-wrapper.theme-features__section-titles--bottom-only-short.theme-features__image-ratio--as-is.theme-features__grid-text-alignment--center.theme-features__product-variants--swatches.theme-features__color-swatch-style--circle.theme-features__ajax-cart-method--drawer.theme-features__upcase-nav--false.theme-features__button-shape--rounded > main.site-wrap > div#wrapper.site-wrap__container > div#shopify-section-sections--14794421665877__header.shopify-section.shopify-section-group-header-group.js-site-header > div.header-section.header__wrapper.full-width-false.block-layout-true.inline-layout-false.cart-icon-bag > div#header-wrapper.header__main-wrapper.device-hide > ul#main-nav.span-12.auto.nav.header__main-nav.header__nav__list.js-theme-header.stickynav"
    ]
  },
  {
    "url": "https://venue-theme-morning.myshopify.com",
    "path": "Venue/9.0.0.html",
    "scrapedAt": "2023-05-20T00:01:52.093Z",
    "theme": {
      "name": "Venue",
      "version": "9.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.no-touchevents.fontface.sr.shopify-features__smart-payment-buttons--enabled > body#venue-theme-morning.template-index.js-theme-loaded.drawer--is-loading > div.page-container > div#shopify-section-sections--15054983462960__header.shopify-section.shopify-section-group-header-group.shopify-section-header.js-section__header > header#top.header.js-header.header--sticky.js-header-sticky.header--scroll.js-header-scroll.header--left.u-flex.u-flex--middle.u-flex--center.header--mega.header--search-enabled.header--transparent.header--has-transparent-divider > div.header-navs.js-heaver-navs.u-clearfix.u-hidden@tab-down > nav.primary-nav.header-navs__items.js-primary-nav"
    ]
  },
  {
    "url": "https://viola-theme.myshopify.com",
    "path": "Viola/1.0.3.html",
    "scrapedAt": "2023-05-20T00:01:52.366Z",
    "theme": {
      "name": "Viola",
      "version": "1.0.3",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.gradient.template-index > div#shopify-section-sections--15838450581696__header.shopify-section.shopify-section-group-header-group.section-header > sticky-header.header-wrapper.color-background-1.gradient > div.color-background-2.gradient.wbmenuup.header__inline-menu > div.page-width.wbmenubtm > nav.wbsimplemenuxs"
    ]
  },
  {
    "url": "https://vision-main.myshopify.com",
    "path": "Vision/1.0.3.html",
    "scrapedAt": "2023-05-20T00:01:52.570Z",
    "theme": {
      "name": "Vision",
      "version": "1.0.3",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.animations-true.button-uppercase-false.navigation-uppercase-false.product-card-spacing-medium.article-card-spacing-large.template-index.header-sticky--active > div#wrapper > div#shopify-section-sections--17918040670490__header.shopify-section.shopify-section-group-header-group.header-section > theme-header#header.header.style5.header--shadow-small.transparent--false.header-sticky--active > div.header--inner > full-menu.full-menu > ul.thb-full-menu"
    ]
  },
  {
    "url": "https://warehouse-theme-metal.myshopify.com",
    "path": "Warehouse/3.1.0.html",
    "scrapedAt": "2023-05-20T00:01:52.849Z",
    "theme": {
      "name": "Warehouse",
      "version": "3.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.shopify-features__smart-payment-buttons--enabled > body.warehouse--v1.features--animate-zoom.template-index > div#shopify-section-header.shopify-section.shopify-section__header > section > nav.nav-bar > div.nav-bar__inner > div.container > ul.nav-bar__linklist.list--unstyled"
    ]
  },
  {
    "url": "https://whisk-theme-soft.myshopify.com",
    "path": "Whisk/4.0.1.html",
    "scrapedAt": "2023-05-20T00:01:53.123Z",
    "theme": {
      "name": "Whisk",
      "version": "4.0.1",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.page-layout.body--template-index.theme-style--soft > div.group--header > header#shopify-section-sections--16723679641836__header.shopify-section.shopify-section-group-header-group.section--site-header.motion-reduce > sticky-header#site-header.site-header.site-header--transparent > div.site-header__container.space--viewport-sides.site-header__container--middle-left.site-header__container--has-menu.site-header__container--accounts-enabled > nav.site-header__inline-menu > ul.site-header__inline-menu-list.list--unstyled"
    ]
  },
  {
    "url": "https://xtra-warehouse.myshopify.com",
    "path": "Xtra/3.1.0.html",
    "scrapedAt": "2023-05-20T00:01:53.383Z",
    "theme": {
      "name": "Xtra",
      "version": "3.1.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.t1sn.search-compact-is-centered.has-mobile-visible-search.has-long-nav.t1sh-mobile.search-compact-handle.no-mobile.has-sticky-nav.cookie-on > body.template-index > div#root > div#shopify-section-sections--16819566182646__header.shopify-section.shopify-section-group-header-group.shopify-section-header.has-mobile-visible-search.hide-btn-mobile > div#header-outer > nav#nav-bar.text-justify.has-menu-bar > ul"
    ]
  },
  {
    "url": "https://yuva-theme-amaze.myshopify.com",
    "path": "Yuva/7.0.0.html",
    "scrapedAt": "2023-05-20T00:01:53.615Z",
    "theme": {
      "name": "Yuva",
      "version": "7.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js.supports-js.supports-no-touch.supports-csstransforms.supports-csstransforms3d.supports-fontface > body.template_index.breadcrumb-false.theme-layout-rounded.header2.announcement-open > div.body-wrapper > div.wrapper > div#shopify-section-sections--18909547069733__header.shopify-section.shopify-section-group-header-group.shopify-section-main-header.transparent-header-true > header.header > div.top-header.header_2.logo-center > div.nav__header.nav_2 > div.container > div.navbar.navbar-expand-md > ul.list-unstyled.navbar-nav.list-menu--inline"
    ]
  },
  {
    "url": "https://zest-fleek.myshopify.com",
    "path": "Zest/5.0.0.html",
    "scrapedAt": "2023-05-20T00:01:53.892Z",
    "theme": {
      "name": "Zest",
      "version": "5.0.0",
      "themeStore": true
    },
    "confirmedDesktopSelectors": [
      "html.js > body.template-index.index-.mobile-sticky-bar-enabled.header-sticky-enabled > div#shopify-section-sections--18641117315376__header.shopify-section.shopify-section-group-header-group.f-section-header > sticky-header.site-header__wrapper > header.site-header.site-header--design-2 > div.container > div.site-header__inner.flex.site-header__mobile-logo--center > div.site-header__left.site-header__menu.hidden.md:flex > nav.f-site-nav.md-down:hidden.f-site-nav--space-md > ul.f-site-nav__list.list-none"
    ],
    "confirmedMobileSelectors": [
      "html.js > body.template-index.index-.mobile-sticky-bar-enabled.header-sticky-enabled > drawer-component#Drawer-MobileNav.f-drawer.f-drawer--left.f-drawer-mobile-nav > div.f-drawer__content.focus-inset > div.scroll-container > div#Mobile-Nav.f-mobile-nav > div.f-mobile-nav__inner > ul.list-none"
    ]
  }
]

