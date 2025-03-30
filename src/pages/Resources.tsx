import React from 'react';
import HeroSection from '../components/HeroSection';
import { resourcesData } from '../data/resourcesData';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function ResourcesPage() {
  return (
    <div>
      <Header />
      <HeroSection
        title="Resources To Help"
        highlight="You"
        description="From loan programs, market updates, to everything in between– the mortgage industry has a lot of moving parts. We pride ourselves on bringing educational resources to our clients regardless of your experience or knowledge of the mortgage process."
        image={`${process.env.PUBLIC_URL}/Lock-It-Lending-Resources.png`}
      />

      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {resourcesData.map(({ slug, title, author, readTime, date, thumbnailUrl, excerpt, tags }) => (
          <Link key={slug} to={`/resources/${slug}`}>
            <a className="block bg-white shadow rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <img src={thumbnailUrl} alt={title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map((tag) => (
                    <span key={tag} className="bg-gold text-white text-xs font-semibold px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mb-1">
                  {author} • {readTime}
                </p>
                <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{excerpt}</p>
                <p className="text-xs text-gray-400 mt-2">{date}</p>
              </div>
            </a>
          </Link>
        ))}
      </section>
      <Footer />
    </div>
  );
}