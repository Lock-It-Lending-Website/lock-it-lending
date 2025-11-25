import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Meta } from 'react-head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { careersData } from '../data/careersData'; // Assuming this correctly imports your data

export default function SingleCareerPage() {
  const { slug } = useParams<{ slug: string }>();
  const career = careersData.find(item => item.slug === slug);

  if (!career) {
    return (
      <>
        <Meta>
          <link rel="canonical" href="https://www.lockitlending.com/careers" />
        </Meta>
        <div className="bg-[#f9fbfc] font-sans min-h-screen">
          <Header />
          <main className="max-w-4xl mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl font-bold text-red-600">Career Not Found</h1>
            <p className="mt-4 text-gray-600">The career you are looking for does not exist.</p>
            <Link
              to="/careers"
              className="inline-block bg-gold text-white text-md px-8 py-3 mt-10 rounded-full font-semibold shadow hover:opacity-90"
            >
              Back to Careers
            </Link>
          </main>
          <Footer />
        </div>
      </>
    );
  }

  const canonicalUrl = `https://www.lockitlending.com/careers/${slug}`;

  return (
    <>
      <Meta>
        <link rel="canonical" href={canonicalUrl} />
      </Meta>
      <div className="bg-gray-50 font-sans min-h-screen">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl mx-auto pt-20 pb-20">
          {/*Title*/}
          <h1 className="text-4xl font-bold text-gray-900 mb-6">{career.title}</h1>
          {/*Subtitle*/}
          <p className="text-md text-gray-700 whitespace-pre-line leading-loose">
            {career.subtitle}
          </p>

          <p className="text-lg font-bold text-gray-700 my-10">
            Please email your resume to HR@lockitlending.com
          </p>
          {/*<a
          href="mailto:HR@lockitlending.com"
          className="inline-block bg-gold text-white text-md px-8 py-3 mt-10 rounded-full font-semibold shadow hover:opacity-90"
        >
          Apply
        </a> */}
          <p className="text-lg font-bold text-gray-700 my-10">About Us</p>
          {/*Summary*/}
          {career.summary && (
            <div
              className="prose max-w-none [&_h1]:text-4xl [&_h2]:text-2xl [&_h3]:text-xl"
              dangerouslySetInnerHTML={{ __html: career.summary }}
            />
          )}
          {/* What You'll Do — render only if not hidden */}
          {career.responsibilities && !career.hideResponsibilitiesTitle && (
            <p className="text-lg font-bold text-gray-700 my-10">What You'll Do</p>
          )}
          {career.responsibilities && (
            <div
              className="text-md text-gray-700 prose max-w-none [&_h1]:text-4xl [&_h2]:text-2xl [&_h3]:text-xl"
              dangerouslySetInnerHTML={{ __html: career.responsibilities }}
            />
          )}
          <p className="text-lg font-bold text-gray-700 my-10">What You'll Bring</p>
          {career.qualifications && (
            <div
              className="text-md text-gray-700 prose max-w-none [&_h1]:text-4xl [&_h2]:text-2xl [&_h3]:text-xl"
              dangerouslySetInnerHTML={{ __html: career.qualifications }}
            />
          )}
          <p className="text-lg font-bold text-gray-700 my-10">Benefits</p>
          {career.benefits && (
            <div
              className="text-md text-gray-700 prose max-w-none [&_h1]:text-4xl [&_h2]:text-2xl [&_h3]:text-xl"
              dangerouslySetInnerHTML={{ __html: career.benefits }}
            />
          )}
          <p className="text-lg font-bold text-gray-700 my-10">Additional Details</p>
          {career.additionalDetail && (
            <div
              className="text-md text-gray-700 prose max-w-none [&_h1]:text-4xl [&_h2]:text-2xl [&_h3]:text-xl"
              dangerouslySetInnerHTML={{ __html: career.additionalDetail }}
            />
          )}
          {career.content && (
            <div
              className="text-md text-gray-700 mt-10 prose max-w-none [&_h1]:text-4xl [&_h2]:text-2xl [&_h3]:text-xl"
              dangerouslySetInnerHTML={{ __html: career.content }}
            />
          )}
        </main>
        <Footer />
      </div>
    </>
  );
}
