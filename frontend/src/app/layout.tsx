import { Outfit } from "next/font/google";
import "./globals.css";
import { Sidebar, Header } from "@/components/layout";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

export const metadata = {
  title: "Client Manager SaaS",
  description: "A premium client management solution",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} antialiased h-screen overflow-hidden flex bg-[var(--bg-warm)]`}>
        {/* Global Sidebar - Fixed Left */}
        <Sidebar />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full gap-4 py-6 pr-6 overflow-hidden relative">

          {/* Global Header - Fixed Top Right (Visually) */}
          <div className="absolute top-6 right-6 z-50">
            <Header />
          </div>

          {/* Page Specific Content */}
          <div className="flex-1 overflow-hidden flex flex-col relative w-full h-full pt-1">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
