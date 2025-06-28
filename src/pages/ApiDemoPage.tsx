
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ApiDemo } from '@/components/ApiDemo';

const ApiDemoPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          <ApiDemo />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApiDemoPage;
