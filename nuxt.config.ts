import type { NuxtConfig } from 'nuxt/schema';

import tailwindcss from '@tailwindcss/vite';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  components: {
    dirs: [
      {
        global: true,
        path: '~/components/global',
      },
      {
        path: '~/components/common',
        pathPrefix: false,
      },
      '~/components',
      {
        ignore: ['**/*.vue', '**/*.ts'],
        path: '~/features',
      },
    ],
  },

  css: ['~/assets/css/tailwind.css'],

  devtools: { enabled: true },

  experimental: {
    typedPages: true,
  },

  imports: {
    presets: [
      {
        from: '@vueuse/router',
        imports: ['useRouteQuery'],
      },
    ],
  },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/a11y',
    '@nuxt/hints',
    'shadcn-nuxt',
    '@vee-validate/nuxt',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    '@nuxtjs/supabase',
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
  ],

  robots: {
    allow: '*',
    disallow: ['/admin/*'],
  },

  runtimeConfig: {
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000',
      appVersion: process.env.NUXT_PUBLIC_APP_VERSION || 'latest',
    },
  },

  shadcn: {
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui',
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
  },

  site: {
    name: 'Campus Flow',
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },

  sitemap: {
    sitemaps: {
      pages: {
        includeAppSources: true,
      },
    },
  },

  supabase: {
    key: process.env.NUXT_PUBLIC_SUPABASE_KEY || '',
    redirectOptions: {
      callback: '/confirm',
      exclude: [],
      include: undefined,
      login: '/login',
      saveRedirectToCookie: true,
    },
    secretKey: process.env.NUXT_SUPABASE_SECRET_KEY || '',
    types: '#shared/types/database.ts',
    url: process.env.NUXT_PUBLIC_SUPABASE_URL || 'http://localhost:54321',
  },

  typescript: {
    tsConfig: {
      exclude: ['shared/types/database.ts'],
    },
  },

  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      ErrorMessage: 'VeeErrorMessage',
      Field: 'VeeField',
      FieldArray: 'VeeFieldArray',
      Form: 'VeeForm',
    },
  },

  vite: {
    plugins: [
      tailwindcss() as Exclude<NuxtConfig['vite'], undefined>['plugins'],
    ],
  },
});
