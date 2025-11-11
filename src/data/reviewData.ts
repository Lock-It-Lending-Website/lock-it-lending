export const allReviews = [
  {
    name: 'T K',
    date: 'November 3, 2025',
    image: '/reviews/T K.png',
    text: 'I recently bought my first home, and I couldn’t have done it without the incredible support from Kaden’s team — Kaden, Nicole, and Jade. From the very beginning, when I started the contract to build my new house, they guided me through every step with care and dedication. They were always available to answer my questions, even on their days off or during holidays. Their communication, professionalism, and attention to detail made the entire process smooth and stress-free. I truly appreciate how much time and effort they put into helping me, and I would highly recommend everyone to work with Kaden’s team if you’re looking for people who genuinely care and go above and beyond for their clients!',
  },
  {
    name: 'Kim Johnson',
    date: 'November 7, 2025',
    image: '/reviews/Kim Johnson.png',
    text: 'As a veteran, I recently refinanced with this company and they made the whole process incredibly smooth. Their team was knowledgeable, responsive, and really took the time to understand my needs. I’m extremely satisfied with the service I received and would highly recommend them to anyone looking to refinance.',
  },
  {
    name: 'Monica Medina',
    date: 'November 9, 2025',
    image: '/reviews/Monica Medina.png',
    text: 'My fiancé and I had an incredible experience working with Lock It Lending. As first-time homebuyers, we were both excited and nervous about the entire process, but Kevin and Phillips made everything smooth and transparent from start to finish. From our very first conversation, they took the time to truly understand our needs. They explained every step clearly, answered all of our questions no matter how small, and made sure we always felt confident in our decision. What stood out most was their dedication to finding us the best possible rate — even during a challenging time with the uncertainty of the government shutdown. Thanks to their hard work and expertise, we were able to close on our first home, and we couldn’t be happier with the outcome. We will always highly recommend Lock It Lending to all of our family, friends, and anyone who is looking to purchase a home. If you’re looking for a team that is knowledgeable, reliable, and genuinely cares about their clients, Kevin and Phillips are the ones to give a call. Thank you again for being part of our journey!',
  },
  {
    name: 'Matthew Glader',
    date: 'October 7, 2025',
    image: '/reviews/Matthew Glader.png',
    text: 'Thank you Lock It Lending for making our second home purchase so simple and smooth. We were very happy with the entire process from start to finish. A special thank you to Lavian and Tran Thai for going above and beyond their time and effort in assisting us along with the process and for their expertise in explaining all questions thoroughly. We’ll definitely come to you again for our future real estate needs. — Tanya Pham and Matthew',
  },
  {
    name: 'Sparkles Jones',
    date: 'October 10, 2025',
    image: '/reviews/Sparkles Jones.png',
    text: 'As first-time homebuyers, we couldn’t have asked for a better experience! Lock It Lending went above and beyond every step of the way. They patiently answered all of our thousand questions, explained every detail, and made sure we felt confident throughout the entire process. What really touched us was how they made our closing day extra special with the most beautiful bouquet of flowers! It truly showed how much they care about their clients. We were beyond grateful for their kindness, professionalism, and personal touch. Highly recommend them to anyone starting their home-buying journey!',
  },
  {
    name: 'Dhika and Fluerbee',
    date: 'October 20, 2025',
    image: '/reviews/Dhika and Fluerbee.png',
    text: 'As a first-time buyer, Lock It Lending helped us a lot with the process of our mortgage. Everything was going smooth and we got approved! Yeaay 🎉👏 They were really doing their best to make it happen. My husband and I really appreciate it. Keep up the good work!',
  },
  {
    name: 'Danny Quach',
    date: 'October 27, 2025',
    image: '/reviews/Danny Quach.png',
    text: 'I had an excellent experience refinancing my home with Lock It Lending, thanks to the amazing team of Kayden and Thao. They secured me a 6.625% interest rate on a $286,000 loan, saving me $395 per month compared to my previous rate. The best part? They rolled all closing costs into the loan, so I paid nothing upfront. The entire process was incredibly fast, taking less than 10 days from start to finish. Kayden and Thao were professional, responsive, and made everything straightforward. I highly recommend Lock It Lending for anyone looking to refinance quickly and save money!',
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
