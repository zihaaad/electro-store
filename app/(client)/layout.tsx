import type {Metadata} from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {ClerkProvider} from "@clerk/nextjs";
import {Toaster} from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    template: "%s - Electro online store",
    default: "Electro online store",
  },
  description: "Electro online store, Your one stop shop for all your needs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </div>
    </ClerkProvider>
  );
}
