import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { teamMembers } from '../data/teamData';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TeamMemberPage = () => {
  const { slug } = useParams();
  const member = teamMembers.find(m => m.slug === slug);

  if (!member) return <div>Team member not found.</div>;

  return (
    <>
      <Header />
      <main className="bg-gray-50">
        {/* Top: Hero layout */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2">
          {/* Left: Image on gold bg */}
          <div className="p-6 md:p-12 flex items-center justify-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-full max-w-md object-cover rounded-xl shadow-md"
            />
          </div>

          {/* Right: Info */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <nav className="text-sm text-gray-500 mb-2">
              <Link to="/" className="hover:underline">
                Home
              </Link>{' '}
              &gt;{' '}
              <Link to="/meet-lock-it-lending" className="hover:underline">
                Portfolio
              </Link>{' '}
              &gt; {member.name}
            </nav>
            <h1 className="text-4xl font-bold text-black mb-1">{member.name}</h1>
            <p className="text-gray-600 font-semibold">{member.title}</p>
            {member.nmls && (
              <p className="text-sm font-semibold mt-2 text-gray-700">NMLS {member.nmls}</p>
            )}

            <div className="mt-4 space-y-1 text-sm text-gray-700">
              <p>📞 {member.phone}</p>
              <p>
                ✉️{' '}
                <a href={`mailto:${member.email}`} className="text-gold font-semibold">
                  {member.email}
                </a>
              </p>
            </div>

            <p className="mt-6 text-gray-800 leading-relaxed">{member.bio}</p>

            <div className="flex gap-4 mt-6 text-gold text-xl">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-instagram"></i>
            </div>
          </div>
        </section>

        {/* CTA bar */}
        <section className="bg-gold py-12 px-6 md:px-16">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-center justify-between text-center md:text-left gap-6">
            <div className="flex-1">
              <h2 className="text-2xl md:text-3xl font-bold text-black mb-1">Ready to apply?</h2>
              <p className="text-xl md:text-2xl font-bold text-white">
                Get started with {member.name} today!
              </p>
            </div>
            <div className="flex-none">
              <Link
                to={`/apply?applyTo=${encodeURIComponent(member.name)}`}
                className="bg-white text-gold px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition text-base md:text-lg"
              >
                Apply
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default TeamMemberPage;
