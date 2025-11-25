import React from 'react';
import HeroSection from '../components/HeroSection';
import { Meta } from 'react-head';
import { Link } from 'react-router-dom';
import { careersData } from '../data/careersData';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CareersPage() {
  return (
    <>
      <Meta>
        <link rel="canonical" href="https://www.lockitlending.com/careers" />
      </Meta>
      <div className="font-sans bg-gray-50">
        <Header />
        <HeroSection
          title="Careers That Make an"
          highlight="Impact"
          highlightColor="gold"
          description="Join Lock It Lending and build a meaningful career in the mortgage industry. We're hiring professionals who are passionate about helping others, driving innovation, and growing with a purpose-driven team."
          image={`${process.env.PUBLIC_URL}/careers-page.jpg`}
        />
        <section className="max-w-[1600px] mx-auto px-10 py-28 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {careersData.map(({ slug, title, location, type, status, overview, postedDate }) => (
            <Link
              key={slug}
              to={`/careers/${slug}`}
              className="block bg-white shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-shadow w-full max-w-[550px] mx-auto"
            >
              <div className="flex flex-col space-y-2 p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-snug">{title}</h3>
                <p className="text-md font-bold text-gray-700 line-clamp-2 mb-3">
                  <i className="fa-solid fa-location-dot mr-2" style={{ color: '#cca249' }} />
                  {location}
                </p>
                <p className="text-md text-gray-700 line-clamp-2 mb-3">Status: {status}</p>
                <p className="text-md text-gray-700 line-clamp-2 mb-3">{type}</p>
                <p className="text-md text-gray-700 line-clamp-2 mb-3">Posted Date: {postedDate}</p>
                <p className="text-sm text-gray-500 mb-3 font-medium">{overview}</p>
              </div>
            </Link>
          ))}
        </section>
        <Footer />
      </div>
    </>
  );
}
