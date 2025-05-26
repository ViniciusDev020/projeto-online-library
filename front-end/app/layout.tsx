import React from "react";

export const metadata = {
  title: "Online Library",
  description: "Manage books and authors",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
