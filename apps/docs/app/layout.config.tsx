import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared'
import { ToolyLogo } from '@tooly/ui/logos/tooly'

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
        <div className="text-card-foreground">
          <ToolyLogo className="h-6 w-auto" />
        </div>
        Tooly
      </>
    ),
  },
  links: [
    {
      text: 'Docs',
      url: '/docs',
    },
    {
      text: 'GitHub',
      url: 'https://github.com/ctate/tooly',
      external: true,
    },
  ],
}
