import { DM_Serif_Text, Inter, Manrope } from "next/font/google";
import "./globals.css";
import { readToken } from "@/lib/sanity.api";
import { getSettings } from "@/lib/sanity.client";
import { draftMode } from "next/headers";
import { Header } from "@/components/global/Header";
import clsx from "clsx";

const inter = Inter({ subsets: ["latin"] });

const dm_serif = DM_Serif_Text({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-dm-serif",
  weight: "400",
});
const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["400", "500", "600", "700"],
});

export default async function RootLayout({ children }) {
  const { isEnabled } = draftMode();
  const preview = isEnabled;
  const token = isEnabled ? readToken : undefined;

  const [settings] = await Promise.all([getSettings({ token })]);
  return (
    <html
      lang="no"
      className={clsx(inter.variable, dm_serif.variable, manrope.variable)}
    >
      <body className="bg-white">
        <Header settings={settings} />
        <main id="content">{children}</main>
      </body>
    </html>
  );
}
