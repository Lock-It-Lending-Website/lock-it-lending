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
      <main className="max-w-4xl mx-auto p-6 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8 bg-white shadow-lg rounded-xl p-6">
          <img
            src={member.image}
            alt={member.name}
            className="w-48 h-48 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold">{member.name}</h1>
            <p className="text-gold font-medium">{member.title}</p>
            <p className="text-sm text-gray-600">NMLS #{member.nmls}</p>
            <p className="mt-2 text-sm text-gray-700">{member.phone}</p>
            <p className="text-sm text-gray-700">{member.email}</p>
            <p className="mt-4 text-gray-800">{member.bio}</p>

            <div className="flex gap-4 mt-4 text-gold text-xl">
              <i className="fab fa-facebook"></i>
              <i className="fab fa-linkedin"></i>
              <i className="fab fa-instagram"></i>
            </div>

            <Link
              to={`/apply?applyTo=${encodeURIComponent(member.name)}`}
              className="inline-block mt-6 bg-gold text-white px-6 py-2 rounded hover:bg-yellow-600 font-semibold"
            >
              Apply
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TeamMemberPage;
