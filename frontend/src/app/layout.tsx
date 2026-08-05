import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "hayashi's page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
