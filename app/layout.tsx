import { AuthProvider } from "@/shared/context/AuthContext";
import "./globals.css";
import Navbar from "@/shared/components/NavBar";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ background: "#0f0f0f", color: "#fff", margin: 0 }}>
        <AuthProvider>
          <Navbar />
          <main style={{ paddingTop: 70 }}>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}