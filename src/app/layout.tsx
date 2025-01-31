import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './global.scss'; 
import Header from '../components/Header/Header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <main className="main-content">
                <Header/>
                {children}
              </main>
            </div>
            <div className="col-md-6">
              <div className="image-content">
                <img className="img-fluid" src="/assets/images/list.jpg" alt="cenário"/>
                <p>Created by <a href="https://www.linkedin.com/in/jakeline-nogueira-04b2a314b/" target="_blank" rel="noopener noreferrer">Jakeline Nogueira</a></p>
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
