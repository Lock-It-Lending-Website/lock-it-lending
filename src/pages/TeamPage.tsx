import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { teamData } from '../data/teamData';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TeamPage = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();

  const normalizedId = (teamId || '').toLowerCase().trim();
  const team = teamData[normalizedId];

  const [activeTab, setActiveTab] = useState<'about' | 'contact'>('about');
  const [showMore, setShowMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const [contactData, setContactData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    consent: false,
  });

  const handleChange = (field: string, value: string | boolean) => {
    setContactData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, consent } = contactData;
    if (!firstName || !lastName || !email || !phone || !consent) {
      alert('Please fill out all fields and agree to the consent checkbox.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...contactData, formType: `question` }),
      });

      if (response.ok) {
        navigate('/thank-you');
        setContactData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          consent: false,
        });
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Form submit failed:', err);
      alert('Something went wrong. Please try again.');
    }
  };

  function chunkArray<T>(arr: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  }

  const pages = team ? chunkArray(team.members, 3) : [];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || team?.members.length < 2) return;

    let isDown = false;
    let startX: number, scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    };

    const handleMouseLeave = () => (isDown = false);
    const handleMouseUp = () => (isDown = false);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 1.5;
      slider.scrollLeft = scrollLeft - walk;
    };

    slider.addEventListener('mousedown', handleMouseDown);
    slider.addEventListener('mouseleave', handleMouseLeave);
    slider.addEventListener('mouseup', handleMouseUp);
    slider.addEventListener('mousemove', handleMouseMove);

    return () => {
      slider.removeEventListener('mousedown', handleMouseDown);
      slider.removeEventListener('mouseleave', handleMouseLeave);
      slider.removeEventListener('mouseup', handleMouseUp);
      slider.removeEventListener('mousemove', handleMouseMove);
    };
  }, [team?.members]);

  if (!team) return <div className="text-center py-10">Team not found</div>;

  const totalReviews = team.slug === 'vortex' || team.slug === 'allstars' ? 516 : 225;

  return (
    <div className="font-sans">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[240px] overflow-hidden">
          <img
            src={team.heroBlur}
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover z-0 opacity-70"
          />
          <img
            src={team.hero}
            alt="Foreground"
            className="relative z-10 mx-auto h-full object-contain"
          />
        </section>

        {/* Info */}
        <section className="bg-white pt-12 pb-6 px-4 md:px-8 z-10 relative">
          <div className="max-w-5xl mx-auto flex items-start gap-6">
            <div className="relative z-30 -mt-[120px]">
              <img
                src={team.profileImage}
                alt={team.name}
                className="w-36 h-36 md:w-56 md:h-56 rounded-full border-4 border-white shadow-lg object-contain bg-white p-2"
              />
            </div>
            <div className="flex flex-1 justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{team.name}</h1>
                <p className="text-sm text-gray-500">NMLS#{team.nmls}</p>
                <p className="text-sm mt-1 text-gray-700">
                  <Link to={`mailto:${team.email}`} className="hover:underline">
                    {team.email}
                  </Link>{' '}
                  • {team.phone}
                </p>
                <p className="text-sm text-gray-700">{team.address}</p>
              </div>
              <div className="pr-2 pt-1">
                <button className="bg-gold text-white font-bold px-6 py-2 rounded-full">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mt-10 border-b border-gray-200 text-center">
          <div className="inline-flex space-x-12">
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-2 ${activeTab === 'about' ? 'border-b-4 border-gold font-semibold' : 'text-gray-500'}`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`pb-2 ${activeTab === 'contact' ? 'border-b-4 border-gold font-semibold' : 'text-gray-500'}`}
            >
              Contact
            </button>
          </div>
        </section>

        {activeTab === 'about' ? (
          <section className="bg-gray-50 py-16 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
              {/* Left: About & Team */}
              <div className="col-span-2 flex flex-col gap-8">
                <div className="bg-white p-6 rounded-xl shadow">
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <div
                    className={`text-sm text-gray-700 leading-relaxed transition-all duration-300 ease-in-out ${showMore ? 'max-h-[160px] overflow-hidden' : 'max-h-[800px]'}`}
                  >
                    <p className="whitespace-pre-line">{team.about}</p>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => setShowMore(prev => !prev)}
                      className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      {showMore ? 'Show More ▼' : 'Show Less ▲'}
                    </button>
                  </div>
                </div>

                {/* Team */}
                <div className="relative max-w-full overflow-hidden">
                  <div
                    ref={sliderRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 px-4 no-scrollbar"
                    onScroll={e => {
                      const el = e.currentTarget;
                      const pageWidth = el.offsetWidth;
                      const current = Math.round(el.scrollLeft / pageWidth);
                      setCurrentPage(current);
                    }}
                  >
                    {pages.map((group, idx) => (
                      <div
                        key={idx}
                        className="flex snap-start gap-6 shrink-0 w-full justify-center"
                      >
                        {group.map(member => (
                          <div
                            key={member.name}
                            className="flex flex-col items-center w-[250px] h-[400px] bg-white rounded-xl shadow overflow-hidden"
                          >
                            <div className="h-[280px] bg-gold flex items-center justify-center">
                              <img
                                src={member.image}
                                alt={member.name}
                                className="h-full object-contain"
                              />
                            </div>
                            <div className="flex flex-col justify-between text-center p-4 flex-1">
                              <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                              <p className="text-sm text-gold font-medium">{member.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4 space-x-2">
                    {pages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-3 h-3 rounded-full ${currentPage === idx ? 'bg-gold' : 'bg-gold/30'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Reviews */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-2">Review</h2>
                <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm mb-1">
                  {'★★★★★'} <span className="text-black font-semibold">{totalReviews}</span>
                </div>
                <p className="text-sm text-gray-700 mb-4">
                  Read from our 5 star Google reviews, where our valued clients share their
                  experiences and satisfaction with Lock It Lending – Team{' '}
                  {team.name.split('-').pop()?.trim()}’s exceptional service.
                </p>
                {team.reviews?.map((review, i) => (
                  <div key={i} className="mb-6">
                    <p className="text-black font-bold text-sm mb-1">
                      ★★★★★ <span className="font-semibold text-gray-900">by {review.name}</span>
                    </p>
                    <p className="text-sm text-gray-700 mb-1">{review.text}</p>
                    {review.timestamp && (
                      <p className="text-xs text-yellow-600 italic">{review.timestamp}</p>
                    )}
                  </div>
                ))}
                <div className="text-center">
                  <Link
                    to="https://www.google.com/search?q=lock+it+lending+houston#lrd=0x8640c35d2a7a4eab:0xb5736063dbda6db6,1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold font-semibold hover:underline text-sm"
                  >
                    See More Reviews →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-gray-50 py-16 px-4">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
              <h2 className="text-2xl font-bold text-center mb-6">Got Question?</h2>
              <p className="text-sm text-center text-gray-600 mb-6">
                Let us help so you can get one step closer to getting your home
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  className="w-full p-3 border rounded-lg"
                  placeholder="First Name"
                  value={contactData.firstName}
                  onChange={e => handleChange('firstName', e.target.value)}
                />
                <input
                  className="w-full p-3 border rounded-lg"
                  placeholder="Last Name"
                  value={contactData.lastName}
                  onChange={e => handleChange('lastName', e.target.value)}
                />
                <input
                  className="w-full p-3 border rounded-lg"
                  placeholder="Email"
                  type="email"
                  value={contactData.email}
                  onChange={e => handleChange('email', e.target.value)}
                />
                <input
                  className="w-full p-3 border rounded-lg"
                  placeholder="Phone Number"
                  type="tel"
                  value={contactData.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                />
                <label className="text-xs text-gray-500 flex items-start space-x-2">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={contactData.consent}
                    onChange={e => handleChange('consent', e.target.checked)}
                  />
                  <span>
                    By pressing “Submit” you agree to receive a quote and texts per our Terms,
                    Privacy, and Email Policy. Message frequency varies. Message/data rates may
                    apply. Reply STOP to opt out.
                  </span>
                </label>
                <button
                  type="submit"
                  className="w-full bg-gold text-white font-bold py-2 rounded-full"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;
