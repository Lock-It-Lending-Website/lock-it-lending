import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { glossaryData } from '../data/glossaryData';

export default function GlossaryTermPage() {
  const { slug } = useParams<{ slug: string }>();
  const termData = glossaryData.find(term => term.slug === slug);

  if (!termData) {
    return (
      <div className="bg-[#f9fbfc] font-sans min-h-screen">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-red-600">Term not found</h1>
          <p className="mt-4 text-gray-600">
            Please return to the glossary and select a valid term.
          </p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-[#f9fbfc] font-sans text-black min-h-screen">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-16">
        {/* Breadcrumbs */}
        <div className="text-sm text-[#D6A849] font-medium mb-4 space-x-1">
          <a href="/" className="hover:underline">
            Home
          </a>
          <span>{'>'}</span>
          <a href="/glossary" className="hover:underline">
            Glossary
          </a>
          <span>{'>'}</span>
          <span className="text-black">{termData.term}</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl font-bold text-[#D6A849] mb-8">{termData.term}</h1>

        {/* Video */}
        {termData.videoUrl && (
          <div className="mb-8 w-full">
            <div className="aspect-[16/9] w-full">
              <iframe
                className="w-full h-full rounded-md shadow-md"
                src={termData.videoUrl.replace('watch?v=', 'embed/')}
                title={`What is ${termData.term}?`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Explanation */}
        <p className="text-[17px] text-gray-800 leading-7 font-medium">
          {termData.explanation || 'No explanation available at the moment.'}
        </p>
      </main>

      {/* Footer with darker bg */}
      <div className="bg-[#f1f2f3]">
        <Footer />
      </div>
    </div>
  );
}
