import type { Metadata } from 'next';

import './app.scss';

export const metadata: Metadata = {
  title: 'Hi',
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>
          <div id="app">
            {children}
          </div>
      </body>
    </html>
  );
}
