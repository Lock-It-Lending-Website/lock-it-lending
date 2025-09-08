export const allReviews = [
  {
    name: 'Douglas Jordan',
    date: 'August 10, 2025',
    image: '/reviews/Douglas.png',
    text: 'We had an opportunity to work with Jay, Kevin, and Phillip on our refinance. They are knowledgeable and easy to work with. Questions were answered in a timely manner. The process was fast and we are very happy with their service. Thank you for your hard work.',
  },
  {
    name: 'Oscar Martinez',
    date: 'August 15, 2025',
    image: '/reviews/Oscar.png',
    text: "Good afternoon, first of all, we want to thank you for helping us buy our house. Thank you because you have a great team and for being kind, attentive, and best of all, excellent work. My family and I want to thank you and send you a big hug. Because when other mortgage companies said no, you told me from day 1 that we were going to make it, thanks to Lock It Lending and especially to Aron's team. Thank you. Take care and blessings. And just as you helped us, we know that you will help many more families.",
  },
  {
    name: 'Josua Contreras',
    date: 'August 21, 2025',
    image: '/reviews/Josua.png',
    text: 'My loan officer Jake Radom and processor Ayesha Khan from Lock It Lending did a great job getting me approved for my first home. They were in constant communication with me, happily answered any questions, and always had my best interests in mind. 10/10 service and would definitely recommend them to anyone in the market for a new home!',
  },
  {
    name: 'Tiffany',
    date: 'August 4, 2025',
    image: '/reviews/Tiffany.png',
    text: "Lock It Lending was amazing to work with! We ended up buying two houses within two months, and honestly, both deals went smoother than we ever imagined. Everything was quick, super organized, and easy to follow — no stress, no surprises. It felt like they had our back the whole time, and that made a huge difference. We're so glad we found them and would 100% recommend Lock It Lending to anyone who wants their loan process to be simple and stress-free.",
  },
  {
    name: 'Maribel',
    date: 'August 8, 2025',
    image: '/reviews/Maribel.png',
    text: 'We would like to thank Maria Torres Vazquez of Lock It Lending for her excellent service and professionalism. From the very beginning, she provided us with attentive, clear, and honest attention, guiding us through the home loan process step by step. Thanks to her dedication, patience and commitment, we were able to make our dream of owning our own home a reality. She was always available to answer any questions and gave us the confidence we needed throughout this important process. We trust Maria completely! If you are looking for someone trustworthy and experienced in the mortgage industry, she is the one for you. Thank you Maria for helping us make this wonderful dream come true! 🏡✨',
  },
  {
    name: 'Kyleigh Taylor',
    date: 'July 12, 2025',
    image: '/reviews/Kyleigh.png',
    text: 'The service at Lock It Lending truly made our First time home buying experience stress-free and easy. We truly believe this experience was because of the immense amount of knowledge and information Lock It Lending provided for us. We are grateful for the seamless process we had and no unexpected issues along the way! Thank you, Lock It Lending!',
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
