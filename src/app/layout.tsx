import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import Header from "@/components/header/header";
import { auth0 } from "@/lib/auth0";
import { ThemeProvider } from "@/components/theme/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Books with Wilda",
  description: "Share and discover your favorite books",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Get the session if available for client-side hydration
  const session = await auth0.getSession();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Auth0Provider user={session?.user}>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                {children}
              </main>
              <footer className="border-t py-6 md:py-8">
                <div className="container flex flex-col items-center justify-center gap-4 text-center">
                  <p className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} Books with Wilda. All rights reserved.
                  </p>
                </div>
              </footer>
            </div>
          </Auth0Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
