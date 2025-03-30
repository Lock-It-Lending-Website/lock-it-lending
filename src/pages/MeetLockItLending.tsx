import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import HeroSection from '../components/HeroSection';
import { teamMembers, teamGroups } from '../data/teamData';

const MeetLockItLending = () => {
  return (
    <div className="font-sans">
      <Header />
      <main>
        <HeroSection
          title="Meet The Lock It Lending"
          highlight="Family"
          description="Get to Know the Skilled Individuals Who Make Locking in Your Mortgage Simple, Fast, and Hassle-Free."
          image={`${process.env.PUBLIC_URL}/LIL-Meet-The-Family-2024.png`}
        />

        <section className="bg-gray-50 py-16 px-4">
          <h2 className="text-4xl font-bold text-center mb-6">Meet The Team</h2>
          <p className="text-center text-gray-600 max-w-xl mx-auto mb-12">
            Meet the individuals who make Lock It Lending Possible
          </p>
          <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map(member => (
              <div key={member.name} className="bg-white rounded-2xl shadow-md p-6 text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                <p className="text-gold font-medium text-sm">{member.title}</p>
                <p className="text-sm text-gray-500">NMLS {member.nmls}</p>
                <p className="text-sm text-gray-700 mt-1">{member.phone}</p>
                <p className="text-sm text-gray-700 mb-4">{member.email}</p>
                <div className="flex justify-center gap-4">
                  <i className="fab fa-facebook text-gold"></i>
                  <i className="fab fa-linkedin text-gold"></i>
                  <i className="fab fa-instagram text-gold"></i>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white py-16 px-4">
          <h2 className="text-4xl font-bold text-center mb-6">Our Teams</h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-10">
            Lock It Lending has several branches across the country to help you with your mortgage
            needs. Our experienced loan officers are ready to assist you in finding the perfect
            mortgage for your dream home.
          </p>
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamGroups.map(team => (
              <div key={team.name} className="rounded-xl overflow-hidden shadow-md relative group">
                <img src={team.image} alt={team.name} className="w-full h-64 object-cover" />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4">
                  <h3 className="font-bold text-lg">{team.name}</h3>
                  <p className="text-sm">Visit Team Page →</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default MeetLockItLending;
