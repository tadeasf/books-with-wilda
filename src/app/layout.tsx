import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Auth0Provider } from "@auth0/nextjs-auth0";
import Header from "@/components/header/header";
import { auth0 } from "@/lib/auth0";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Books with Ztracena Cackorka",
  description: "Share and discover your favorite books",
  icons: {
    icon: "/favicon.ico",
  },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Auth0Provider user={session?.user}>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 w-full">
                {children}
              </main>
              <footer className="border-t py-8 mt-auto">
                <div className="container mx-auto max-w-screen-xl px-4 sm:px-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                    <div>
                      <h3 className="font-semibold mb-3">Books with Ztracena Cackorka</h3>
                      <p className="text-sm text-muted-foreground">
                        Share your favorite books and discover new recommendations from our community.
                      </p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Quick Links</h3>
                      <ul className="space-y-2 text-sm">
                        <li><Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link></li>
                        <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">About</Link></li>
                        <li><Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">Dashboard</Link></li>
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Legal</h3>
                      <ul className="space-y-2 text-sm">
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
                      </ul>
                    </div>
                  </div>
                  <div className="border-t mt-8 pt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      &copy; {new Date().getFullYear()} Books with Ztracena Cackorka. All rights reserved.
                    </p>
                  </div>
                </div>
              </footer>
            </div>
          </Auth0Provider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
