export const allReviews = [
  {
    name: 'Joanna Nguyen-Tran',
    date: 'December 18, 2025',
    image: '/reviews/Joana.png',
    text: 'It started off a little rocky, but it all worked out and the service was great. They are really helpful and very reassuring to all your needs. Annie and Ivy were with me during the whole process. I am so thankful they were able to let me get my house!',
  },
  {
    name: 'Samir Vora',
    date: 'December 19, 2025',
    image: '/reviews/Samir Vora.png',
    text: 'Great service and competitive pricing. Highly recommend for any real estate financing needs.',
  },
  {
    name: 'Trang Mai',
    date: 'December 19, 2025',
    image: '/reviews/Trang Mai.png',
    text: 'We had an amazing experience from start to finish. Everything was smooth, professional, and well organized. The quality exceeded our expectations, and the customer service was excellent. Thank you to Ivy and Kevin. Highly recommended for anyone looking for reliability and great results.',
  },
  {
    name: 'Duy Nguyen',
    date: 'January 2, 2026',
    image: '/reviews/Duy Nguyen.png',
    text: 'Lyn and Oliver provided exceptional service throughout our home financing process. Their professionalism, efficiency, and clear communication made the entire experience smooth and stress-free. They worked quickly without sacrificing attention to detail and ensured we were informed and confident at every stage. Thanks to their expertise and dedication, we were able to close on our dream home promptly and seamlessly. We highly recommend Lyn and Oliver to anyone seeking fast, reliable, and professional lending services.',
  },
  {
    name: 'Duy Chau',
    date: 'January 12, 2026',
    image: '/reviews/Duy Chau.png',
    text: 'I had an outstanding experience working with Lockit Lending, and I highly recommend them especially for active duty service members and veterans.\n\nFrom start to finish, Phillips and Lyn Ha and the team were professional, responsive, and genuinely supportive. The staff was extremely knowledgeable about VA loans and took the time to explain every step clearly, which made the entire process smooth and stress-free. They were patient, attentive, and truly cared about helping me succeed, not just closing a deal.\n\nTheir rates were very competitive, the funding process was solid and efficient, and all paperwork was handled thoroughly and accurately. Whenever I had questions or concerns, they were quick to respond and always willing to help. You can tell they are experienced with VA loans and understand the unique needs of military members.\n\nOverall, everything from communication, rates, funding, to customer service was excellent. If you’re active duty, a veteran, or using a VA loan, Lockit Lending is a great choice. I would absolutely work with them again and recommend them to anyone looking for a reliable and trustworthy lender.',
  },
  {
    name: 'Lt Tran',
    date: 'January 13, 2026',
    image: '/reviews/Lt Tran.png',
    text: 'Excellent work done by team of Lyn, Lavian and Zayden. Very satisfied with the rate for refinancing, the process was guided detailed and plan was followed daily. Would highly recommend this team if you want refinance or getting a mortgage',
  },
  {
    name: 'Michael Karkar',
    date: 'January 14, 2026',
    image: '/reviews/Michael Karkar.png',
    text: 'Absolutely outstanding experience from start to finish! The application was quick, the terms were clearly explained, and the funds arrived faster than expected. Customer service was friendly, professional, and answered all my questions. I’ll definitely use lock it lending again and highly recommend them to anyone who needs a loan.',
  },
  {
    name: 'Linh Pham',
    date: 'January 16, 2026',
    image: '/reviews/Linh Pham.png',
    text: 'My experience with Lock-it Lending was fantastic. The entire process went smoothly and was handled with professionalism and care. The team was responsive, knowledgeable, compassionate and made everything easy to understand.\n\nA big thank you to Phillips Nguyen and Ann Luu — they were amazing to work with. They were patient, helpful, and always ready to assists. This team goes above and beyond for their clients, and it shows. I would confidently recommend Lock-it Lending to anyone looking for outstanding service and a team you can genuinely trust.\nThis is my first house and looking forward for second house under their caâe\nWill recommend the team to people I know',
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
