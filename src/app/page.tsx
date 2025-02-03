'use client';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Tasks from '../pages/Tasks/Tasks';


const Page: React.FC = () => {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<Tasks />} />
        </Routes>
      </Router>
    </Layout>
  );
};

export default Page;