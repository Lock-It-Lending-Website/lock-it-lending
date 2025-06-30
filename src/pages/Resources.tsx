import React from 'react';
import HeroSection from '../components/HeroSection';
import { resourcesData } from '../data/resourcesData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function ResourcesPage() {
  return (
    <div className="font-sans bg-[#f7fbfd]">
      <Header />
      <HeroSection
        title="Resources To Help"
        highlight="You"
        highlightColor="gold"
        description="From loan programs, market updates, to everything in between– the mortgage industry has a lot of moving parts. We pride ourselves on bringing educational resources to our clients regardless of your experience or knowledge of the mortgage process."
        image={`${process.env.PUBLIC_URL}/Lock-It-Lending-Resources.png`}
      />

      <section className="max-w-[1600px] mx-auto px-10 py-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {resourcesData.map(
          ({ slug, title, author, readTime, date, thumbnailUrl, excerpt, tags }) => (
            <Link
              key={slug}
              to={`/resources/${slug}`}
              className="block bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow w-full max-w-[550px] mx-auto"
            >
              <img src={thumbnailUrl} alt={title} className="w-full h-55 object-cover" />
              <div className="p-6">
                <div className="flex flex-wrap gap-3 mb-4">
                  {tags.map(tag => (
                    <span
                      key={tag}
                      className="bg-gold text-white text-sm font-semibold px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mb-2 font-medium">
                  {author} • {readTime}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-snug">{title}</h3>
                <p className="text-lg text-gray-700 line-clamp-2 mb-3">{excerpt}</p>
                <p className="text-sm text-gray-400">{date}</p>
              </div>
            </Link>
          )
        )}
      </section>
      <Footer />
    </div>
  );
}
