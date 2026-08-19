import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Updates & Changelog — Gharkilist (घर की लिस्ट)",
  description: "Follow the development journey, version releases, themed app icons support, and features updates of Gharkilist kitchen inventory and grocery manager.",
  keywords: ["gharkilist updates", "gharkilist changelog", "grocery app release notes", "themed icons android", "offline grocery manager"],
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
