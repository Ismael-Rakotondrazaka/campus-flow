import type { NuxtConfig } from 'nuxt/schema';

import tailwindcss from '@tailwindcss/vite';

const makeLocaleFiles = (locale: string) =>
  [
    'admin',
    'app',
    'auth',
    'common',
    'dashboard',
    'dates',
    'errors',
    'footer',
    'forms',
    'header',
    'home',
    'housingApplication',
    'joinCommunity',
    'legal',
    'maintenance',
    'renewal',
    'resident',
    'sider',
    'users',
  ].map(name => `${locale}/${name}.json`);

const i18nLocaleCodes = ['en', 'fr'] as const;

const appLayoutRouteRules = {
  '/admin/housing-application/**': { appLayout: 'housing-application' },
  '/admin/maintenance/**': { appLayout: 'maintenance' },
  '/admin/renewal/**': { appLayout: 'renewal' },
  '/admin/root/**': { appLayout: 'root' },
  '/resident/**': { appLayout: 'resident' },
} as const;

/** i18n `prefix` strategy prepends `/en`, `/fr`, etc. - route rules must match. */
function withLocalePrefixedRouteRules(
  rules: typeof appLayoutRouteRules,
  locales: readonly string[]
) {
  return Object.fromEntries(
    Object.entries(rules).flatMap(([path, rule]) =>
      locales.map(locale => [`/${locale}${path}`, rule])
    )
  );
}

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

  fonts: {
    families: [
      { name: 'DM Sans', provider: 'google' },
      { name: 'Playfair Display', provider: 'google' },
    ],
  },

  i18n: {
    defaultLocale: 'fr',
    experimental: {
      localeDetector: './localeDetector.ts',
    },
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        files: makeLocaleFiles('en'),
        iso: 'en-GB',
        name: 'English',
      },
      {
        code: 'fr',
        files: makeLocaleFiles('fr'),
        iso: 'fr-FR',
        name: 'Français',
      },
    ],
    strategy: 'prefix',
    vueI18n: './i18n.config.ts',
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
    '@pinia/nuxt',
    '@pinia/colada-nuxt',
    '@nuxtjs/leaflet',
    'nuxt-auth-utils',
    'nuxt-zod-i18n',
    '@nuxtjs/i18n',
    'nuxt-authorization',
  ],

  robots: {
    allow: '*',
    disallow: ['/admin/*'],
  },

  routeRules: withLocalePrefixedRouteRules(
    appLayoutRouteRules,
    i18nLocaleCodes
  ),

  runtimeConfig: {
    brevo: {
      apiKey: '', // NUXT_BREVO_API_KEY
    },
    public: {
      appUrl: process.env.NUXT_PUBLIC_APP_URL || 'http://localhost:3000',
      appVersion: process.env.NUXT_PUBLIC_APP_VERSION || 'latest',
    },
    s3: {
      accessKey: '', // NUXT_S3_ACCESS_KEY
      host: '', // NUXT_S3_HOST
      region: '', // NUXT_S3_REGION
      secretKey: '', // NUXT_S3_SECRET_KEY
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
    defaultLocale: 'fr',
    description:
      'Gérez votre logement étudiant à la Cité Universitaire Lumièrebourg' +
      ' | candidatures, renouvellements et maintenance en ligne.',
    name: 'Campus Flow',
    url: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },

  sitemap: {
    sitemaps: {
      announcements: {
        sources: ['/api/__sitemap__/announcements'],
      },
      pages: {
        includeAppSources: true,
      },
    },
  },

  typescript: {
    tsConfig: {
      exclude: ['shared/types/database.ts', 'prisma/generated/**'],
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

  zodI18n: {
    /**
     * Since we choose to use 'en' and 'fr' as locales' code,
     * we have to tell zodI18n to use those codes instead of the default ones.
     */
    localeCodesMapping: {
      'en-GB': 'en',
      'fr-FR': 'fr',
    },
  },
});
