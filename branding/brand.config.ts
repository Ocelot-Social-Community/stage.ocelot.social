// stage.ocelot.social brand on the runtime branding mechanism (replaces branding/constants/*.js).
//
// Authored in TypeScript against @ocelot-social/branding: `defineBranding` type-checks these
// overrides against the branding schema (BrandingOverrides). A wrong key or value type FAILS the
// build — the config cannot drift from the framework contract. Only values that differ from the
// framework defaults are set (sparse override); everything else falls back to vanilla.
//
// Content layout (one served assets folder — dynamically bound at runtime, NOT copied into the
// image): assets/ = images (logos, favicon, icon), html/ = static page HTML per locale,
// locales/ = i18n string overrides (none for stage yet). All paths below are RELATIVE to the
// served base; the build/runtime namespaces them to /branding/stage/… (collision-free).
//
// NOT here: e-mails (SUPPORT_EMAIL / MODERATION_EMAIL / *_LINK) are ENV → set in the deployment env.
import { defineBranding, type LinkPageKey } from '@ocelot-social/branding'

// The 8 static legal pages, per page per locale, from html/<locale>/<file>.html.
const HTML_FILE: Partial<Record<LinkPageKey, string>> = {
  organization: 'organization',
  donate: 'donate',
  imprint: 'imprint',
  termsAndConditions: 'terms-and-conditions',
  codeOfConduct: 'code-of-conduct',
  dataPrivacy: 'data-privacy',
  faq: 'faq',
  support: 'support',
}
const html = Object.fromEntries(
  Object.entries(HTML_FILE).map(([page, file]) => [
    page,
    { de: `html/de/${file}.html`, en: `html/en/${file}.html` },
  ]),
)

export default defineBranding({
  about: {
    description: 'Staging branding for ocelot.social, operated by busFaktor e.V.',
    license: {
      logosReusable: true,
      colorsReusable: true,
      note: 'ocelot.social is open source — logos and colours may be reused under the project license.',
    },
  },
  metadata: {
    // Without this the staging brand inherits the framework default 'ocelot.social' — which is also
    // the name of the vanilla configuration it is meant to be distinguished from, so both read
    // identically wherever brands are listed (admin Branding tab, composition sources).
    applicationName: 'stage.ocelot.social',
    applicationDescription: 'Ocelot Social Community',
    organizationName: 'busFaktor e.V.',
    organizationJurisdiction: 'Deutschland',
  },
  group: {
    // stricter than the default (3): require a longer group description.
    descriptionMinLength: 10,
  },
  links: {
    pages: {
      donate: { externalLink: { url: 'https://busfaktor.org/en/spenden', target: '_blank' } },
      imprint: { externalLink: { url: 'http://ocelot.social/en/impressum', target: '_blank' } },
    },
    // stage swaps the order of the last two (imprint before support).
    footerOrder: [
      'organization',
      'termsAndConditions',
      'codeOfConduct',
      'dataPrivacy',
      'faq',
      'donate',
      'imprint',
      'support',
    ],
  },
  // All content paths are ROOT-relative (assets/…, html/…); the multi-brand build namespaces them
  // to /branding/stage/… (collision-free) and serves the folder dynamically — no image copy.
  logos: {
    headerPath: 'assets/logo-horizontal.svg',
    headerMobilePath: 'assets/logo-horizontal.svg',
    signupPath: 'assets/logo-squared.svg',
    welcomePath: 'assets/logo-squared.svg',
    logoutPath: 'assets/logo-squared.svg',
    passwordResetPath: 'assets/logo-squared.svg',
  },
  assets: {
    css: [],
    html,
    favicon: 'assets/favicon.ico',
  },
})
