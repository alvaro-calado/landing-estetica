import "./globals.css";

export const metadata = {
  title: "Biomedicina estética",
  description: "Procedimentos estéticos premium",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#fff" }}>
        {children}
      </body>
    </html>
  );
}