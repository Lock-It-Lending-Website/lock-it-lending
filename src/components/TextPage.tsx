import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TextPage = ({ title = 'Page Title', content = '' }) => {
  return (
    <div className="font-sans bg-[#f7fbfd] min-h-screen">
      <Header />
      <main className="py-16 px-6 flex justify-center">
        <div className="w-full max-w-4xl">
          <h1 className="text-5xl font-bold text-gray-900 mb-10">{title}</h1>

          {/* Rich text content */}
          <div
            className="prose prose-xl text-gray-800 marker:text-black max-w-none
            [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mt-8 [&_h1]:mb-4
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-2
            [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-4 [&_h3]:mb-2"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TextPage;
