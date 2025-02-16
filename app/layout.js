import { Inter } from "next/font/google";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "./globals.css";
import { ViewTransitions } from 'next-view-transitions';
import { AuthProvider } from '@/context/authContext'; // Import the AuthProvider

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "cardcraft",
  description: "a card memory game.",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang='en'>
        <body className={inter.className}>
          <AuthProvider>
            <Header />
            {children}
            <Footer />
          </AuthProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
