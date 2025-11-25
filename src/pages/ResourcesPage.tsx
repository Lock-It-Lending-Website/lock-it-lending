import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Meta } from 'react-head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { resourcesData } from '../data/resourcesData';

export default function ResourceArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = resourcesData.find(item => item.slug === slug);

  if (!article) {
    return (
      <>
        <Meta>
          <link rel="canonical" href="https://www.lockitlending.com/resources" />
        </Meta>

        <div className="bg-gray-50 font-sans min-h-screen">
          <Header />
          <main className="max-w-4xl mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold text-red-600">Article not found</h1>
            <p className="mt-4 text-gray-600">
              Please return to the resources page and select a valid article.
            </p>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  const canonicalUrl = `https://www.lockitlending.com/resources/${slug}`;

  return (
    <>
      <Meta>
        <link rel="canonical" href={canonicalUrl} />
      </Meta>
      <div className="bg-[#f9fbfc] font-sans text-black min-h-screen">
        <Header />
        <main className="max-w-5xl mx-auto px-4 py-16">
          {/* Breadcrumbs */}
          <div className="text-sm text-[#D6A849]  font-medium mb-4 space-x-1">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span>{'>'}</span>
            <Link to="/resources" className="hover:underline">
              Resources
            </Link>
            <span>{'>'}</span>
            <span className="text-black">{article.title}</span>
          </div>

          {/* Title */}
          <h1 className="font-bold mb-6 break-words text-[clamp(2rem,5vw,3rem)] leading-[1.1]">
            {article.title}
          </h1>
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="bg-[#D6A849] text-white text-sm px-3 py-1 rounded-full font-semibold">
              {article.author}
            </span>
            {article.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-[#D6A849] text-white text-sm px-3 py-1 rounded-full font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Date + Read Time */}
          <p className="text-sm text-gray-600 mb-6 font-medium">
            Published on{' '}
            {new Date(`${article.date}T00:00:00`).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}{' '}
            • Read Time: {article.readTime}
          </p>

          {/* Thumbnail Image */}
          <div className="rounded-2xl overflow-hidden shadow-md mb-8">
            {/* <img src={article.thumbnailUrl} alt={article.title} className="w-full object-cover" /> */}
            {article.mediaType === 'video' && article.mediaUrl ? (
              <div className="w-full h-[500px]">
                <iframe
                  src={article.mediaUrl}
                  className="w-full h-full"
                  title={article.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <img
                src={article.mediaUrl || article.thumbnailUrl}
                alt={article.title}
                className="w-full object-cover"
              />
            )}
          </div>

          {/* Content */}

          {article.content && (
            <div
              className="prose max-w-none mt-10 [&_h1]:text-4xl [&_h2]:text-2xl [&_h3]:text-xl"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}
        </main>

        {/* Footer with lighter background */}
        <div className="bg-[#f1f2f3]">
          <Footer />
        </div>
      </div>
    </>
  );
}
