import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <img src="/logos/tooly-logo.svg" alt="Tooly Logo" width="24" height="24" className="shrink-0" />
        Tooly
      </>
    ),
  },
  links: [
    {
      text: 'Packages',
      url: '/docs/packages',
    },
    {
      text: 'Examples',
      url: '/docs/examples',
    },
    {
      text: 'GitHub',
      url: 'https://github.com/ctate/tooly',
      external: true,
    },
  ],
}
