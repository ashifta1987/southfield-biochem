import type { Metadata } from "next";
import fs from "node:fs";
import path from "node:path";

export const metadata: Metadata = {
  title: "Southfield Biochem — Private Label, OEM & ODM Glycerin Soap Manufacturer, Kerala",
  description: "Handmade Kerala glycerin and cold-process soap manufacturer. Private label, OEM, ODM and export from Pattambi, Palakkad. ISO 9001, GMP, FDA licensed, every batch lab-tested. MOQ 120 bars for handmade soap.",
  metadataBase: new URL("https://southfieldbiochem.com"),
  openGraph: { title: "Southfield Biochem — Handmade Kerala Glycerin Soap for Your Brand", description: "Private label, OEM, ODM and export glycerin soap manufacturer in Kerala, India.", images: ["/images/pl-original-multipack.jpg"], type: "website" },
};

const css = fs.readFileSync(path.join(process.cwd(), "components", "site.css"), "utf8");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/images/logo.jpg" />
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
