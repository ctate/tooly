import './global.css'
import { RootProvider } from 'fumadocs-ui/provider'
import { Geist, Geist_Mono } from 'next/font/google'
import type { ReactNode } from 'react'
import type { Metadata } from 'next'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: {
    default: 'Tooly',
    template: '%s | Tooly',
  },
  description: 'AI-powered tool packages for modern applications',
  icons: {
    icon: [
      {
        media: '(prefers-color-scheme: light)',
        url: '/favicon-light.ico',
        href: '/favicon-light.ico',
      },
      {
        media: '(prefers-color-scheme: dark)',
        url: '/favicon-dark.ico',
        href: '/favicon-dark.ico',
      },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function updateFavicon() {
                  const isDark = document.documentElement.classList.contains('dark') || 
                                window.matchMedia('(prefers-color-scheme: dark)').matches;
                  
                  const favicon = document.querySelector('link[rel="icon"]');
                  if (favicon) {
                    favicon.href = isDark ? '/favicon-dark.ico' : '/favicon-light.ico';
                  }
                }
                
                // Update favicon on theme change
                const observer = new MutationObserver(updateFavicon);
                observer.observe(document.documentElement, { 
                  attributes: true, 
                  attributeFilter: ['class'] 
                });
                
                // Update favicon on system preference change
                window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
                
                // Initial update
                updateFavicon();
              })();
            `,
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen font-sans">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  )
}
