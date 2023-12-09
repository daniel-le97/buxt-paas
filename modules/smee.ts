import { defineNuxtModule } from '@nuxt/kit'
import { refreshCustomTabs } from '@nuxt/devtools-kit'

export default defineNuxtModule({
  setup(options, nuxt) {
    // wait for DevTools to be initialized


    nuxt.hook('devtools:customTabs', async (tabs) => {
      tabs.push({
        // unique identifier
        name: 'smee.io',
        // title to display in the tab
        title: 'smee.io',
        // any icon from Iconify, or a URL to an image
        icon: 'carbon:apps',
        // iframe view
        view: {
          type: 'iframe',
          src: 'https://smee.io/2CheYVHetZe4ROm',
        },
      })
    })

    refreshCustomTabs()
  },
})
