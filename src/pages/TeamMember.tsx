import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { teamMembers } from '../data/teamData';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TeamMemberPage = () => {
  const { slug } = useParams();
  const member = teamMembers.find(m => m.slug === slug);

  if (!member) return <div>Team member not found.</div>;

  const applyLink = member.applyLink || `/apply?applyTo=${encodeURIComponent(member.name)}`;

  return (
    <>
      <Header />
      <main className="bg-[#f7fbfd]">
        {/* Top: Hero layout */}
        <section className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 py-28 px-6 md:px-20 gap-16">
          {/* Left: Profile Image */}
          {/* <div className="flex items-center justify-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-full max-w-[600px] object-cover rounded-[2rem] shadow-2xl border border-gray-200"
            />
          </div> */}
          <div className="flex items-center justify-center w-full">
            {member.videoUrl ? (
              <iframe
                src={member.videoUrl}
                title={member.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full max-w-[400px] h-[700px] rounded-[2rem] shadow-2xl border border-gray-200"
              />
            ) : (
              <img
                src={member.image}
                alt={member.name}
                className="w-full max-w-[600px] object-cover rounded-[2rem] shadow-2xl border border-gray-200"
              />
            )}
          </div>
          

          {/* Right: Info Text */}
          <div className="flex flex-col justify-center text-left">
            <nav className="text-xl text-gray-500 mb-6 font-bold">
              <Link to="/" className="hover:underline text-gold">
                Home
              </Link>{' '}
              &gt;{' '}
              <Link to="/meet-lock-it-lending" className="hover:underline">
                Meet The Team
              </Link>{' '}
              &gt; {member.name}
            </nav>

            <h1 className="text-6xl font-bold text-gray-900 leading-tight mb-3">{member.name}</h1>
            <p className="text-2xl text-gray-500 font-bold mb-2 tracking-wide">{member.title}</p>
            {member.nmls && (
              <p className="text-xl font-bold text-gray-600 mb-4">NMLS {member.nmls}</p>
            )}

            <div className="text-lg text-gray-700 space-y-2 mb-6">
              <p className="flex items-center gap-2">
                <span className="text-gold">📞</span>
                <span className="text-gold font-medium">{member.phone}</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-gold">✉️</span>
                <a href={`mailto:${member.email}`} className="text-gold font-semibold">
                  {member.email}
                </a>
              </p>
            </div>

            {member.bio && (
              <p className="text-xl text-gray-800 leading-relaxed whitespace-pre-line">
                {member.bio}
              </p>
            )}

            <div className="flex gap-6 mt-8 text-gold text-2xl">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>
        </section>

        {/* CTA Bar */}
        <section className="bg-gold py-20 px-6 md:px-16">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-4xl md:text-4xl font-bold text-black mb-2">Ready to apply?</h2>
              <p className="text-4xl md:text-4xl text-white font-bold">
                Get started with {member.name} today!
              </p>
            </div>
            <div>
              <a
                href={String(applyLink)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-gold px-10 py-4 rounded-full font-semibold hover:bg-gray-100 transition text-lg shadow-lg"
              >
                Apply
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TeamMemberPage;
