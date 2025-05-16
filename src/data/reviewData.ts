export const allReviews = [
  {
    name: 'D Hayden',
    date: 'April 21, 2025',
    image: '/reviews/D Hayden.png',
    text: "Absolutely Fantastic!!! • Rate, • Service, • Professionalism • Perseverance. I cannot sing the praises of Lock It Lending enough, especially of Luke Robers and Ayesha Khan! I had six mortgage lenders pitching for my business, and I let all of them compete with one another, until Lock It Lending was the last man standing. Their competitors just could not match their offer (and not for the want of trying)! Luke, the young, gentle giant, was with me for 6 whole months, through offers, rejections, more offers, acceptance - followed by hiccups, all the way to the very end, He always made himself available, be it to answer questions or revise his offer based on the market. He was there even after passing the baton on to the very capable and charming Ayesh - who does not take 'no' for an answer, and gets the job done! I HIGHLY, HIGHLY RECOMMEND them!!!",
  },
  {
    name: 'Malcolm Gaines',
    date: 'May 2, 2025',
    image: '/reviews/Malcolm Gaines.png',
    text: "Words can't explain how hard they work to get me in my home when no one else could do it they did they deserve a 10",
  },
  {
    name: 'MAURICIO VALDES',
    date: 'April 28, 2025',
    image: '/reviews/MAURICIO VALDES.png',
    text: "Although I represented the seller in this transaction, I was extremely impressed with the buyer's lender. They were efficient, responsive, and kept the process moving smoothly from start to finish. Communication was clear and timely, which made for a stress-free experience on all sides. It's always a pleasure to work with professionals who understand the importance of teamwork in a successful closing. Highly recommend!",
  },
  {
    name: 'Ana Rodriguez',
    date: 'April 15, 2025',
    image: '/reviews/Ana Rodriguez.png',
    text: "Working with Lock-it Lending was an absolute pleasure! From start to finish, the entire team Kent & Ayesha was incredibly helpful, kind, and professional. They made what could have been a stressful process feel smooth and easy. What really stood out to me was how communicative they were—always quick to respond, super informative, and happy to answer any questions I had along the way. I never felt out of the loop, and they went above and beyond to make sure I understood every step. If you're looking for a lending company that truly cares about its clients and delivers top-notch service, I highly recommend Lock-it Lending.",
  },
  {
    name: 'Amy Dolma',
    date: 'April 29, 2025',
    image: '/reviews/Amy Dolma.png',
    text: "Kevin did an extraordinary job guiding me through the loan process! He patiently broke down the calculations, answered all of my questions, and used his expertise to secure the best possible rate. I felt confident and supported every step of the way. A big thank you as well to Philip for his support as part of the team. I highly recommend Kevin if you're looking for a knowledgeable and dedicated loan officer who truly goes above and beyond!",
  },
  {
    name: 'Megan lemons',
    date: 'April 30, 2025',
    image: '/reviews/Megan lemons.png',
    text: "Ayesha was my loan processor and I was beyond impressed and pleased with her work. She made me feel calm and comfortable through this whole process. I truly don't know how I would have gone through this without her! She worked so hard for us and never left us hanging. Even during a stressful situation of buying a house Ayesha made it stress-free for us! Thank you so much Lock it Lending!",
  },
  {
    name: 'Yensi Gutiérrez',
    date: 'May 5, 2025',
    image: '/reviews/Yensi Gutiérrez.png',
    text: 'Nuestra experiencia con Lock It Lending fue maravillosa gracias a su profesionalismo y dedicación todo fluyó de una manera increíble. Mi familia y yo nos sentimos muy felices de haber compartido esta maravillosa experiencia con tan excelente equipo. Mis felicitaciones por su gran trabajo.',
  },
];

export function getShuffledReviews(seed: number, count: number) {
  const shuffled = [...allReviews];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = seed % (i + 1);
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    seed = (seed * 16807) % 2147483647;
  }
  return shuffled.slice(0, count);
}
