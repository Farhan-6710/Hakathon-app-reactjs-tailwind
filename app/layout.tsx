import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout"; // Import the client component

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Hackathon Organiser App",
  description: "A simple UI for Hackathon Organiser App",
  icons: {
    icon: "/images/favicon.ico", // Path to your favicon
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
