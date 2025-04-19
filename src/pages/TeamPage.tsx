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

  if (!team) return <div className="text-center py-20 text-xl font-semibold">Team not found</div>;

  const totalReviews = team.slug === 'vortex' || team.slug === 'allstars' ? 516 : 225;

  return (
    <div className="font-sans text-[17px] leading-relaxed text-gray-800">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-[300px] md:h-[380px] overflow-hidden">
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

        {/* Profile Info */}
        <section className="bg-white pt-14 pb-8 px-6 md:px-10 z-10 relative">
          <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start gap-12">
            <div className="-mt-[120px] relative z-30">
              <img
                src={team.profileImage}
                alt={team.name}
                className="w-40 h-40 md:w-60 md:h-60 rounded-full border-4 border-white shadow-lg object-contain bg-white p-2"
              />
            </div>
            <div className="flex-1 flex flex-col md:flex-row justify-between w-full">
              <div className="mb-4 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">{team.name}</h1>
                <p className="text-lg text-gray-600 mt-1">NMLS#{team.nmls}</p>
                <p className="text-base text-gray-700 mt-2">
                  <Link
                    to={`mailto:${team.email}`}
                    className="text-gold font-medium underline hover:text-gold/80"
                  >
                    {team.email}
                  </Link>{' '}
                  • {team.phone}
                </p>
                <p className="text-base mt-1">{team.address}</p>
              </div>
              <div className="md:pt-2">
                <button className="bg-gold hover:bg-yellow-500 text-white font-bold px-6 py-3 rounded-full text-lg shadow-md ">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mt-14 border-b border-gray-300 text-center text-xl font-medium">
          <div className="inline-flex space-x-12">
            <button
              onClick={() => setActiveTab('about')}
              className={`pb-3 ${activeTab === 'about' ? 'border-b-4 border-gold text-gold font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            >
              About
            </button>
            <button
              onClick={() => setActiveTab('contact')}
              className={`pb-3 ${activeTab === 'contact' ? 'border-b-4 border-gold text-gold font-bold' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Contact
            </button>
          </div>
        </section>

        {activeTab === 'about' ? (
          <section className="bg-gray-50 py-16 px-6">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* Left Side */}
              <div className="col-span-2 space-y-10">
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <h2 className="text-3xl font-bold mb-4 text-gray-900">About</h2>
                  <div
                    className={`text-lg text-gray-700 leading-relaxed transition-all duration-300 ${showMore ? 'max-h-[160px] overflow-hidden' : 'max-h-[1000px]'}`}
                  >
                    <p className="whitespace-pre-line">{team.about}</p>
                  </div>
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setShowMore(prev => !prev)}
                      className="px-5 py-2 border rounded-lg text-base font-semibold text-gray-700 hover:bg-gray-100"
                    >
                      {showMore ? 'Show More ▼' : 'Show Less ▲'}
                    </button>
                  </div>
                </div>

                {/* Slider */}
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <div
                    ref={sliderRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 no-scrollbar"
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
                        className="flex snap-start gap-10 shrink-0 min-w-full justify-center px-4 pb-4"
                      >
                        {group.map(member => (
                          <div
                            key={member.name}
                            className="flex flex-col items-center w-[260px] h-[420px] bg-white rounded-xl shadow-[10px_10px_10px_-5px_rgba(0,0,0,0.15)] transition-transform"
                          >
                            <div className="w-full h-[300px] rounded-t-xl overflow-hidden bg-gray-100">
                              <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4 text-center flex flex-col justify-center h-[140px]">
                              <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                              <p className="text-gold font-semibold">{member.title}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4 space-x-3">
                    {pages.map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-4 h-4 rounded-full ${currentPage === idx ? 'bg-gold' : 'bg-gold/30'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Card */}
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold mb-2">Review</h2>
                <div className="flex items-center gap-2 text-yellow-500 font-bold text-lg mb-2">
                  ★★★★★ <span className="text-black">{totalReviews}</span>
                </div>
                <p className="text-gray-700 mb-5">
                  Read from our 5 star Google reviews about Team{' '}
                  {team.name.split('-').pop()?.trim()}’s service.
                </p>
                {team.reviews?.map((review, i) => (
                  <div key={i} className="mb-5">
                    <p className="text-lg text-black font-bold">
                      ★★★★★ <span className="text-gray-900 font-semibold">by {review.name}</span>
                    </p>
                    <p className="text-gray-700">{review.text}</p>
                    {review.timestamp && (
                      <p className="text-xs italic text-yellow-600">{review.timestamp}</p>
                    )}
                  </div>
                ))}
                <div className="text-center">
                  <Link
                    to="https://www.google.com/search?q=lock+it+lending+houston#lrd=0x8640c35d2a7a4eab:0xb5736063dbda6db6,1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gold font-semibold hover:underline"
                  >
                    See More Reviews →
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-gray-50 py-20 px-6">
            <div className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-xl">
              <h2 className="text-3xl font-bold text-center mb-6">Got a Question?</h2>
              <p className="text-center text-gray-600 text-base mb-8">
                Let us help so you can get one step closer to getting your home.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <input
                  className="w-full p-4 border rounded-lg text-base"
                  placeholder="First Name"
                  value={contactData.firstName}
                  onChange={e => handleChange('firstName', e.target.value)}
                />
                <input
                  className="w-full p-4 border rounded-lg text-base"
                  placeholder="Last Name"
                  value={contactData.lastName}
                  onChange={e => handleChange('lastName', e.target.value)}
                />
                <input
                  className="w-full p-4 border rounded-lg text-base"
                  placeholder="Email"
                  type="email"
                  value={contactData.email}
                  onChange={e => handleChange('email', e.target.value)}
                />
                <input
                  className="w-full p-4 border rounded-lg text-base"
                  placeholder="Phone Number"
                  type="tel"
                  value={contactData.phone}
                  onChange={e => handleChange('phone', e.target.value)}
                />
                <label className="flex items-start space-x-3 text-sm text-gray-500">
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
                  className="w-full bg-gold hover:bg-yellow-500 text-white font-bold py-3 rounded-full text-lg shadow-md transition"
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
