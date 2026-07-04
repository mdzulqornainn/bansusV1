//import MaintenancePage from "@/components/auth/maintenance";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { theme } from "@/lib/theme";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Badan Khusus",
    default: "Badan Khusus",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <div className={`min-h-screen ${theme.root_background}`}>
          {children}
        </div>
      </body>
    </html>
  );
}
// export default function RootLayout() {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.variable} antialiased`}>
//         <div className="min-h-screen bg-gradient-to-br from-black via-yellow-900 to-black">
//           <MaintenancePage />
//         </div>
//       </body>
//     </html>
//   );
// }
