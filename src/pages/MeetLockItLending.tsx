import React from 'react';
import { useCanonical } from '../hooks/useCanonical';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import { teamMembers } from '../data/teamData';

const MeetLockItLending = () => {
  // Sort team members by last name in reverse alphabetical order
  const sortedTeamMembers = [...teamMembers].sort((a, b) => {
    const lastNameA = a.name.split(' ').slice(-1)[0].toLowerCase();
    const lastNameB = b.name.split(' ').slice(-1)[0].toLowerCase();
    return lastNameB.localeCompare(lastNameA);
  });
  useCanonical('https://www.lockitlending.com/meet-lock-it-lending');
  return (
    <>
      <div className="font-sans">
        <Header />
        <main>
          <section className="bg-gray-50 py-24 px-8">
            <h2 className="text-6xl font-bold text-center mb-10">Meet The Team</h2>
            <p className="text-center text-gray-600 text-2xl max-w-3xl mx-auto mb-16">
              Get to Know the skilled individuals who make Lock It Lending possible
            </p>
            <div className="max-w-7xl mx-auto grid gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
              {sortedTeamMembers.map(member => (
                <Link to={`/team-member/${member.slug}`} key={member.slug}>
                  <div className="w-full max-w-md mx-auto rounded-3xl shadow-xl border border-gray-300 p-10 text-center hover:shadow-2xl transition-all flex flex-col items-center h-[450px]">
                    {/* Avatar */}
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-40 h-40 sm:w-44 sm:h-44 rounded-full object-cover mb-6 object-top"
                    />

                    {/* Name */}
                    <h3 className="text-2xl font-semibold text-gray-900 mb-1">{member.name}</h3>

                    {/* Title */}
                    <p className="text-gold font-semibold text-lg mb-2">{member.title}</p>

                    {/* Contact Info */}
                    <div className="flex flex-col gap-1 text-gray-600 text-md mb-6 flex-1 justify-center">
                      {member.nmls && <p className="text-gray-500">NMLS {member.nmls}</p>}
                      {member.phone && <p>{member.phone}</p>}
                      {member.email && <p className="break-words">{member.email}</p>}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MeetLockItLending;
