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

  function chunkArray<T>(arr: T[], size: number): T[][] {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  }

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
        {/* Hero Section */}
        <section className="relative">
          <img src={team.hero} alt="Background" className="absolute inset-0 w-full h-full object-cover z-0 opacity-70" />
          <img src={team.hero} alt="Foreground" className="relative z-10 mx-auto h-full object-contain" />

          <div className="md:absolute md:top-1/2 md:-translate-y-[20%] md:left-[calc(50%-560px)] relative z-20 flex justify-center md:block mt-[-4.5rem] mb-6 md:mt-0 md:mb-0">
            <img src={team.profileImage} alt={team.name} className="w-36 h-36 md:w-56 md:h-56 rounded-full border-4 border-white shadow-lg object-cover" />
          </div>

          <div className="relative z-10 bg-white py-6 px-4 md:px-8 mt-[-36px]">
            <div className="max-w-5xl mx-auto flex items-center justify-between gap-6">
              <div className="flex items-center gap-6 pl-20">
                <div className="w-36 hidden md:block" />
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{team.name}</h1>
                  <p className="text-sm text-gray-500">NMLS#{team.nmls}</p>
                  <p className="text-sm mt-1 text-gray-700">
                    <a href={`mailto:${team.email}`} className="hover:underline">{team.email}</a> • {team.phone}
                  </p>
                  <p className="text-sm text-gray-700">{team.address}</p>
                </div>
              </div>
              <div className="pr-6">
                <button className="bg-gold text-white font-bold px-6 py-2 rounded-full">Apply</button>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mt-10 border-b border-gray-200 text-center">
          <div className="inline-flex space-x-12">
            <button onClick={() => setActiveTab('about')} className={`pb-2 ${activeTab === 'about' ? 'border-b-4 border-gold font-semibold' : 'text-gray-500'}`}>About</button>
            <button onClick={() => setActiveTab('contact')} className={`pb-2 ${activeTab === 'contact' ? 'border-b-4 border-gold font-semibold' : 'text-gray-500'}`}>Contact</button>
          </div>
        </section>

        {activeTab === 'about' ? (
          <section className="bg-gray-50 py-16 px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
              <div className="col-span-2 flex flex-col gap-8">
                {/* About */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <h2 className="text-2xl font-bold mb-4">About</h2>
                  <div className={`text-sm text-gray-700 leading-relaxed transition-all duration-300 ease-in-out ${showMore ? 'max-h-[800px]' : 'max-h-[160px] overflow-hidden'}`}>
                    <p>Lock It Lending Houston, a proud member of the Swift Home Loans Inc. family, is your trusted partner...</p>
                    <p>At Lock It Lending, we lock in your future with unwavering support and expertise in the world of home financing...</p>
                    <p>That’s why we go above and beyond to provide an exceptional and personalized experience...</p>
                  </div>
                  <div className="mt-4 flex justify-center">
                    <button onClick={() => setShowMore(prev => !prev)} className="px-4 py-2 border rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100">
                      {showMore ? 'Show Less ▲' : 'Show More ▼'}
                    </button>
                  </div>
                </div>

                {/* Meet the Team */}
                <div className="bg-white p-6 rounded-xl shadow">
                  <h2 className="text-3xl font-bold text-center mb-6">Meet {team.name.split(' - ')[1]}</h2>

                  <div className="relative max-w-full overflow-hidden">
                    <div
                      ref={sliderRef}
                      className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth gap-6 px-4 no-scrollbar"
                      onScroll={(e) => {
                        const el = e.currentTarget;
                        const pageWidth = el.offsetWidth;
                        const current = Math.round(el.scrollLeft / pageWidth);
                        setCurrentPage(current);
                      }}
                    >
                      {chunkArray(team.members, 3).map((chunk, idx) => (
                        <div
                          key={idx}
                          className="flex snap-start shrink-0 w-full justify-center gap-6"
                        >
                          {chunk.map((member) => (
                            <div
                              key={member.name}
                              className="w-[250px] bg-white rounded-xl shadow text-center p-6 transition-transform duration-300 hover:scale-105"
                            >
                              <img src={member.image} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover" />
                              <h3 className="font-bold text-lg">{member.name}</h3>
                              <p className="text-sm text-gold font-medium">{member.title}</p>
                              <p className="text-sm text-gray-500">NMLS {member.nmls}</p>
                              <p className="text-sm text-gray-700">{member.phone}</p>
                              <p className="text-sm text-gray-700">{member.email}</p>
                            </div>
                          ))}
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
                </div>
              </div>

              {/* Review */}
              <div className="bg-white p-6 rounded-xl shadow">
                <h2 className="text-2xl font-bold mb-4">Review</h2>
                <p className="text-yellow-400 mb-2">★★★★★ 516</p>
                <p className="text-sm text-gray-700">
                  “I used Lock It Lending for my recent mortgage loan to purchase a townhouse...”<br />
                  <span className="text-xs text-gray-500">– by Michi T, 1 week ago</span>
                </p>
                <button className="text-sm text-gold mt-4">See More Reviews →</button>
              </div>
            </div>
          </section>
        ) : (
          <section className="bg-gray-50 py-16 px-4">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow">
              <h2 className="text-2xl font-bold text-center mb-6">Got Question?</h2>
              <p className="text-sm text-center text-gray-600 mb-6">Let us help so you can get one step closer to getting your home</p>
              <form className="space-y-4">
                <input className="w-full p-3 border rounded-lg" placeholder="First Name" />
                <input className="w-full p-3 border rounded-lg" placeholder="Last Name" />
                <input className="w-full p-3 border rounded-lg" placeholder="Email" />
                <input className="w-full p-3 border rounded-lg" placeholder="Phone Number" />
                <label className="text-xs text-gray-500 flex items-start space-x-2">
                  <input type="checkbox" className="mt-1" />
                  <span>By pressing “Submit” you are agreeing to receive a quote through the email provided...</span>
                </label>
                <button type="submit" className="w-full bg-gold text-white font-bold py-2 rounded-full">SUBMIT</button>
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