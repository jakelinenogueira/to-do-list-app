import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.scss'; 

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
