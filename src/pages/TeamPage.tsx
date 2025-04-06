import { useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { teamData } from '../data/teamData';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TeamPage = () => {
  const { teamId } = useParams();
  const normalizedId = (teamId || '').toLowerCase().trim();
  const team = teamData[normalizedId];

  const [activeTab, setActiveTab] = useState<'about' | 'contact'>('about');
  const [showMore, setShowMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || team.members.length < 2) return;

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
  }, [team.members]);

  if (!team) return <div className="text-center py-10">Team not found</div>;

  return (
    <div className="font-sans">
      <Header />
      <main>
        {/* Banner Section */}
        <section className="relative h-[240px] md:h-240px] overflow-hidden">
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

        {/* Info Section */}
        <section className="relative bg-white pt-12 pb-6 px-4 md:px-8 z-10">
          <div className="max-w-5xl mx-auto flex items-start gap-6">
            {/* Floating Avatar to the left, vertically centered across sections */}
            <div className="relative z-30 -mt-[120px]">
              <img
                src={team.profileImage}
                alt={team.name}
                className="w-36 h-36 md:w-56 md:h-56 rounded-full border-4 border-white shadow-lg object-cover"
              />
            </div>

            {/* Text + Apply */}
            <div className="flex flex-1 justify-between items-start">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{team.name}</h1>
                <p className="text-sm text-gray-500">NMLS#{team.nmls}</p>
                <p className="text-sm mt-1 text-gray-700">
                  <a href={`mailto:${team.email}`} className="hover:underline">
                    {team.email}
                  </a>{' '}
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
              <div className="col-span-2 flex flex-col gap-8">
                {/* About */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <div
                    className={`text-sm text-gray-700 leading-relaxed transition-all duration-300 ease-in-out ${showMore ? 'max-h-[800px]' : 'max-h-[160px] overflow-hidden'}`}
                  >
                    <p className="text-sm text-gray-700 whitespace-pre-line">{team.about}</p>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={() => setShowMore(prev => !prev)}
                      className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      {showMore ? 'Show Less ▲' : 'Show More ▼'}
                    </button>
                  </div>
                </div>

                {/* Meet the Team */}
                <div className="relative max-w-full overflow-hidden">
                  <div
                    ref={sliderRef}
                    className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 px-4"
                  >
                    {team.members.map(member => (
                      <div
                        key={member.name}
                        className="flex flex-col items-center w-[250px] shrink-0 snap-start"
                      >
                        <div className="w-full rounded-t-xl bg-gold flex items-center justify-center h-[280px]">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="h-full object-contain"
                          />
                        </div>
                        <div className="bg-white w-full text-center p-4 rounded-b-xl shadow">
                          <h3 className="font-bold text-lg text-gray-900">{member.name}</h3>
                          <p className="text-sm text-gold font-medium">{member.title}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pagination dots */}
                  <div className="flex justify-center mt-4 space-x-2">
                    {Array.from({ length: Math.ceil(team.members.length / 3) }).map((_, idx) => (
                      <div
                        key={idx}
                        className={`w-3 h-3 rounded-full ${currentPage === idx ? 'bg-gold' : 'bg-gold/30'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Review */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <h2 className="text-2xl font-bold mb-4">Review</h2>
                  {team.reviews?.length ? (
                    <>
                      <p className="text-yellow-400 mb-2">★★★★★ {team.reviews.length}</p>
                      {team.reviews.map((review, i) => (
                        <div key={i} className="mb-4">
                          <p className="text-sm text-gray-700">{review.text}</p>
                          <span className="text-xs text-gray-500">
                            – {review.name} {review.timestamp && `(${review.timestamp})`}
                          </span>
                        </div>
                      ))}
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">No reviews available.</p>
                  )}
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
              <form className="space-y-4">
                <input className="w-full p-3 border rounded-lg" placeholder="First Name" />
                <input className="w-full p-3 border rounded-lg" placeholder="Last Name" />
                <input className="w-full p-3 border rounded-lg" placeholder="Email" />
                <input className="w-full p-3 border rounded-lg" placeholder="Phone Number" />
                <label className="text-xs text-gray-500 flex items-start space-x-2">
                  <input type="checkbox" className="mt-1" />
                  <span>
                    By pressing “Submit” you are agreeing to receive a quote through the email
                    provided...
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
