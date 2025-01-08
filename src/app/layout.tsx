
import Header from '../components/Header/Header';
import './globals.css'; 

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="layout-container">
          <Header/>
          <main className="main-content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
