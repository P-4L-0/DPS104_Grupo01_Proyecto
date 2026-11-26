import "./globals.css";
import { IssuesProvider } from "./context/IssuesContext";
import Header from "./components/Header";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <IssuesProvider>
          <Header />
          {children}
        </IssuesProvider>
      </body>
    </html>
  );
}
