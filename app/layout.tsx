import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Header } from "@/components/Header";

// @refresh reset

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Todo",
  description: "Keep track of your day",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <main>
          <Header />
          {children}
        </main>
      </body>
    </html>
  );
}
