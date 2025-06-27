import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { ToolyLogo } from './logos/tooly'

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
        <ToolyLogo />
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
