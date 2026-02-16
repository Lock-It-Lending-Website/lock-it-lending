const base = `${process.env.PUBLIC_URL}`;

export type TeamSlug = 'vortex' | 'allstars';

export type TeamGroup = {
  slug: TeamSlug;
  name: string;
  image: string;
  hero: string;
  heroBlur: string;
  profileImage: string;
  email: string;
  phone: string;
  address: string;
  nmls?: string;
  about?: string;
  reviews?: {
    stars: number;
    text: string;
    name: string;
    timestamp?: string;
  }[];
};

export const teamGroups: Record<TeamSlug, TeamGroup> = {
  vortex: {
    slug: 'vortex',
    name: 'Lock It Lending - Vortex',
    image: `${base}/Lock-It-Lending-Home1.png`,
    hero: `${base}/Lock-It-Lending-Loan-Programs.png`,
    heroBlur: `${base}/Lock-It-Lending-Home1.png`,
    profileImage: `${base}/team/Kenton-Wilson.png`,
    email: 'info@lockitlending.com',
    phone: '(866) 400-6789',
    address: '11111 Richmond Ave, Suite 250, Houston TX 77082, USA',
    nmls: '2075228',
    about: `Lock It Lending Houston, a proud member of the Swift Home Loans Inc. family, is your trusted partner on the journey to homeownership.
With a commitment to excellence and a passion for personalized service, we specialize in making your mortgage dreams a reality.
Our team of experienced professionals, backed by cutting-edge technology and a dedication to transparency, ensures that you find the right mortgage solution tailored to your needs.

At Lock It Lending, we lock in your future with unwavering support and expertise in the world of home financing.
Let us be the key to unlocking your homeownership goals.
At Lock It Lending, we understand that obtaining a mortgage is not merely a transaction; it’s a significant life milestone.

That’s why we go above and beyond to provide an exceptional and personalized experience.
Our team of seasoned mortgage experts possesses a deep understanding of the ever-evolving mortgage landscape, and we are equipped with the latest tools and technologies to navigate it seamlessly.`,
    reviews: [
      {
        stars: 5,
        name: 'D Hayden',
        text: `Absolutely Fantastic!!!
      ●Rate, ●Service, ●Professionalism ●Perseverance.
      I cannot sing the praises of Lock It Lending enough, especially of Luke Robers and Ayesha Khan!
      I had six mortgage lenders pitching for my business, and I let all of them compete with one another, until Lock It Lending was the last man standing. Their competitors just could not match their offer (and not for the want of trying)!
      Luke, the young, gentle giant, was with me for 6 whole months, through offers, rejections, more offers, acceptance - followed by hiccups, all the way to the very end, He always made himself available, be it to answer questions or revise his offer based on the market. He was there even after passing the baton on to the very capable and charming Ayesh - who does not take 'no' for an answer, and gets the job done!
      I HIGHLY, HIGHLY RECOMMEND them!!!`,
        timestamp: 'just now',
      },
    ],
  },
  allstars: {
    slug: 'allstars',
    name: 'Lock It Lending - All Stars',
    image: `${base}/allstars.png`,
    hero: `${base}/allstars-banner1.jpg`,
    heroBlur: `${base}/allstars-banner1.jpg`,
    profileImage: `${base}/team/Hanh-Dao.png`,
    email: 'info@lockitlending.com',
    phone: '(866) 400-6789',
    address: '11111 Richmond Ave, Suite 250, Houston TX 77082, USA',
    nmls: '1306378',
    about: `Lock It Lending Houston, a proud member of the Swift Home Loans Inc. family, is your trusted partner on the journey to homeownership.
With a commitment to excellence and a passion for personalized service, we specialize in making your mortgage dreams a reality.
Our team of experienced professionals, backed by cutting-edge technology and a dedication to transparency, ensures that you find the right mortgage solution tailored to your needs.

At Lock It Lending, we lock in your future with unwavering support and expertise in the world of home financing.
Let us be the key to unlocking your homeownership goals.
At Lock It Lending, we understand that obtaining a mortgage is not merely a transaction; it’s a significant life milestone.

That’s why we go above and beyond to provide an exceptional and personalized experience.
Our team of seasoned mortgage experts possesses a deep understanding of the ever-evolving mortgage landscape, and we are equipped with the latest tools and technologies to navigate it seamlessly.`,
    reviews: [
      {
        stars: 5,
        name: 'james hulsey',
        text: `We recently worked with Lock it Lending to secure a mortgage for our new home in South Carolina, and we couldn’t be more satisfied with the experience. As a bilingual couple, it was incredibly important for us to have someone who could help us navigate the often confusing mortgage process in both English and Vietnamese. Lock it Lending went above and beyond to make sure we felt comfortable and understood every step of the way.

        A huge thank you to Phillips Nguyen, who was an absolute pleasure to work with. He was always available to answer our questions, no matter how many we had, and he made sure to explain everything in detail, especially for my wife, who felt much more confident with his support. Phillips' professionalism and patience made all the difference for us.

        We’d also like to express our appreciation to Hanh Dao, who kept us updated daily on mortgage and refinance rates. Her timely and consistent communication ensured we were always in the loop and helped us lock in the best rate possible.

        Overall, the team at Lock it Lending made our home-buying experience seamless and stress-free. Their bilingual services, helpful advice, and ongoing support exceeded our expectations. We highly recommend them to anyone in need of mortgage services, especially if you're looking for a team that truly cares about meeting the unique needs of their clients.`,
        timestamp: 'a week ago',
      },
    ],
  },
};

export type teamVideos = {
  id: string;
  title: string;
  videoSrc: string; // e.g. "/videos/kenton/clip1.mp4"
  thumbnailSrc?: string; // optional image thumbnail (recommended)
};

export type TeamMember = {
  name: string;
  title: string;
  nmls?: string;
  phone: string;
  email: string;
  image: string;
  slug: string;
  team: TeamSlug;
  bio?: string;
  applyLink?: string;
  applyLinkEs?: string;
  hideCtaBanner?: boolean;
  videoUrl?: string; // Optional video URL for team members
  clips?: teamVideos[];
};

export const teamMembers: TeamMember[] = [
  // All Stars
  {
    name: 'Ann Luu',
    title: 'Loan Advisor',
    nmls: '#2008554',
    phone: '(832) 850-4098',
    email: 'ann@lockitlending.com',
    image: `${base}/team/Ann-Luu.png`,
    slug: 'ann-luu',
    team: 'allstars',
    bio: '',
    applyLink: 'https://swifthomeloans.my1003app.com/2008554/register?time=1770666471785',
    applyLinkEs:
      'https://swifthomeloans.my1003app.com/2008554/register?POSAppLanguage=ES&time=1770666478323',
    videoUrl: 'https://www.youtube.com/embed/TsZf7ZCPeks',
  },
  {
    name: 'Lyn Ha',
    title: 'Loan Advisor',
    nmls: '#2051826',
    phone: '(832) 779-8844',
    email: 'lyn@lockitlending.com',
    image: `${base}/team/Lyn-Ha.png`,
    slug: 'lyn-ha',
    team: 'allstars',
    bio: '',
    applyLink: 'https://swifthomeloans.my1003app.com/2051826/register?time=1770666763467',
    applyLinkEs: 'https://swifthomeloans.my1003app.com/2051826/register?POSAppLanguage=ES',
    videoUrl: 'https://www.youtube.com/embed/p1ka9yrrCEc',
  },
  {
    name: 'Kaden Nguyen',
    title: 'Loan Advisor',
    nmls: '#2117639',
    phone: '(832) 856-2758',
    email: 'kaden@lockitlending.com',
    image: `${base}/team/Kaden-Nguyen.jpg`,
    slug: 'kaden-nguyen',
    team: 'allstars',
    bio: '',
    applyLink: 'https://swifthomeloans.my1003app.com/2117639/register?time=1770666881165',
    applyLinkEs:
      'https://swifthomeloans.my1003app.com/2117639/register?POSAppLanguage=ES&time=1770666889613',
    videoUrl: 'https://www.youtube.com/embed/fAZDxq-ya58',
  },
  {
    name: 'Kevin Huynh',
    title: 'Loan Advisor',
    nmls: '#2441459',
    phone: '(346) 248-4567',
    email: 'kevin@lockitlending.com',
    image: `${base}/team/Kevin-Huynh.png`,
    slug: 'kevin-huynh',
    team: 'allstars',
    bio: '',
    applyLink: 'https://swifthomeloans.my1003app.com/2441459/register?time=1770667090675',
    applyLinkEs:
      'https://swifthomeloans.my1003app.com/2441459/register?POSAppLanguage=ES&time=1770667095166',
    videoUrl: 'https://www.youtube.com/embed/YHWsOOt8Vxk',
    clips: [
      {
        id: 'video-1',
        title: 'What is HELOC?',
        videoSrc: '/videos/kevin/Kevin - HELOC.mp4',
        thumbnailSrc: '/video thumbnails/kevin/heloc.png',
      },
    ],
  },
  {
    name: 'Hanh Dao',
    title: 'Branch Manager',
    nmls: '#1406378',
    phone: '(832) 850-4078',
    email: 'hanh@lockitlending.com',
    image: `${base}/team/Hanh-Dao.png`,
    slug: 'hanh-dao',
    team: 'allstars',
    bio: '',
    applyLink: 'https://swifthomeloans.my1003app.com/1406378/register',
    applyLinkEs: 'https://swifthomeloans.my1003app.com/1406378/register?POSAppLanguage=ES',
  },
  {
    name: 'Annie Tran',
    title: 'Loan Officer Assistant',
    nmls: '',
    phone: '(254) 454-4303',
    email: 'annie@lockitlending.com',
    image: `${base}/team/Annie-Tran.jpg`,
    slug: 'annie-tran',
    team: 'allstars',
    bio: '',
    hideCtaBanner: true,
  },
  // Vortex
  {
    name: 'Robert Noonan',
    title: 'Trainer and HR Specialist',
    nmls: '#2265817',
    phone: '(325) 308-4305',
    email: 'robert@lockitlending.com',
    image: `${base}/team/Robert-Noonan.png`,
    slug: 'robert-noonan',
    team: 'vortex',
    bio: '',
    hideCtaBanner: true,
  },
  {
    name: 'Kenton Wilson',
    title: 'Loan Officer',
    nmls: '#2600652',
    phone: '(361) 454-0819',
    email: 'kenton@lockitlending.com',
    image: `${base}/team/Kenton-Wilson.png`,
    slug: 'kenton-wilson',
    team: 'vortex',
    bio: '',
    applyLink: 'https://swifthomeloans.my1003app.com/2600652/register',
    applyLinkEs:
      'https://swifthomeloans.my1003app.com/2600652/register?POSAppLanguage=ES&time=1770667000316',
    videoUrl: 'https://www.youtube.com/embed/pIcVfMKGZyI',
    clips: [
      {
        id: 'video-1',
        title: 'VA loans Explained',
        videoSrc: '/videos/kenton/Kent - VA loan.mp4',
        thumbnailSrc: '/video thumbnails/Kenton/va-loans.png',
      },
      {
        id: 'video-2',
        title: 'FHA Loan Revised',
        videoSrc: '/videos/kenton/Kent - FHA Loan revised.mp4',
        thumbnailSrc: '/video thumbnails/Kenton/size tiktok.png',
      },
    ],
  },
  {
    name: 'Jake Radom',
    title: 'Senior Loan Officer',
    nmls: '#2359662',
    phone: '(325) 335-0420',
    email: 'jacob.ra@lockitlending.com',
    image: `${base}/team/Jake-Radom.png`,
    slug: 'jake-radom',
    team: 'vortex',
    bio: '',
    applyLink: 'https://swifthomeloans.my1003app.com/2359662/register?time=1770667235987',
    applyLinkEs:
      'https://swifthomeloans.my1003app.com/2359662/register?POSAppLanguage=ES&time=1770667251308',
    videoUrl: 'https://www.youtube.com/embed/ZbooO2xyYzM',
    clips: [
      {
        id: 'video-1',
        title: 'Home Equity Line of Credit',
        videoSrc: '/videos/jake/Jake-heloc.mp4',
        thumbnailSrc: '/video thumbnails/jake/jake-heloc.png',
      },
    ],
  },
  {
    name: 'Maria Vazquez',
    title: 'Independent Loan Officer',
    nmls: '#2661107',
    phone: '(832) 762-4052',
    email: 'maria.v@lockitlending.com',
    image: `${base}/team/Maria-Vazquez.png`,
    slug: 'maria-vazquez',
    team: 'vortex',
    bio: '',
    applyLink: 'https://swifthomeloans.my1003app.com/2661107/register?time=1770669282868',
    applyLinkEs:
      'https://swifthomeloans.my1003app.com/2661107/register?POSAppLanguage=ES&time=1770669282868',
    videoUrl: 'https://www.youtube.com/embed/ytFRk5XO8q4',
    clips: [
      {
        id: 'video-1',
        title: 'Interés Explicado',
        videoSrc: '/videos/maria/Maria - Interest.mp4',
        thumbnailSrc: '/video thumbnails/maria/maria-interest.png',
      },
      {
        id: 'video-2',
        title: 'Temporada de Impuestos',
        videoSrc: '/videos/maria/Maria x Valeria.mp4',
        thumbnailSrc: '/video thumbnails/maria/mariaxvaleria.png',
      },
    ],
  },
  {
    name: 'Celene Ngo',
    title: 'Independent Loan Officer',
    nmls: '#1053510',
    phone: '(714) 417-4004',
    email: 'celene.n@lockitlending.com',
    image: `${base}/team/celene ngo web size.jpg`,
    slug: 'celene-ngo',
    team: 'vortex',
    bio: '',
    applyLink: 'https://swifthomeloans.my1003app.com/1053510/register?time=1770669068023',
    applyLinkEs:
      'https://swifthomeloans.my1003app.com/2661107/register?POSAppLanguage=ES&time=1770669282868',
  },
  {
    name: 'Beatrice Fleming',
    title: 'Loan Officer Assistant',
    email: 'beatrice.f@lockitlending.com',
    phone: '(901) 302-8080',
    image: `${base}/team/Beatrice Fleming web size.jpg`,
    slug: 'beatrice-fleming',
    team: 'vortex',
    hideCtaBanner: true,
  },
  {
    name: 'Aron Padierna',
    title: 'Loan Officer',
    email: 'aron.p@lockitlending.com',
    phone: '(281) 666-2913',
    nmls: '#2535426',
    image: `${base}/team/Aron-Padierna.png`,
    slug: 'aron-padierna',
    team: 'vortex',
    applyLink: 'https://swifthomeloans.my1003app.com/2535426/register?time=1770666763330',
    applyLinkEs:
      'https://swifthomeloans.my1003app.com/2535426/register?POSAppLanguage=ES&time=1770666711433',
    videoUrl: 'https://www.youtube.com/embed/kJSh7LOiJpw',
    clips: [
      {
        id: 'video-1',
        title: 'Shopping Around',
        videoSrc: '/videos/aron/Aron-Shopping around, we beat t.mp4',
        thumbnailSrc: '/video thumbnails/aron/Aron-shoppingaround.png',
      },
      {
        id: 'video-2',
        title: 'Cómo Restablecer Tu Crédito',
        videoSrc: '/videos/aron/Aron video.mp4',
        thumbnailSrc: '/video thumbnails/aron/Aron-securedcreditcards.png',
      },
      {
        id: 'video-3',
        title: 'Préstamos FHA vs. Préstamos Convencionales',
        videoSrc: '/videos/aron/Aron - FHA or Conventional Loan.mp4',
        thumbnailSrc: '/video thumbnails/aron/fha-conventional.png',
      },
    ],
  },
  {
    name: 'Alex Hatherley',
    title: 'Loan Processor',
    email: 'alexander@lockitlending.com',
    phone: '(830) 241-5459',
    image: `${base}/team/Alex-Hatherley.png`,
    slug: 'alex-hatherley',
    team: 'vortex',
    hideCtaBanner: true,
  },
  {
    name: 'Gabriel Melgar',
    title: 'Junior Loan Advisor',
    email: 'gabriel.m@lockitlending.com',
    phone: '(469) 933-0878',
    nmls: '#2389416',
    image: `${base}/team/Gabriel Melgar websize.png`,
    slug: 'gabriel-melgar',
    team: 'vortex',
    hideCtaBanner: true,
  },
  {
    name: 'Courtney Meekins',
    title: 'Retail Loan Officer',
    email: 'courtney.m@lockitlending.com',
    phone: '(346) 474-6555',
    nmls: '#2721865',
    image: `${base}/team/Courtney Meekins websize.jpg`,
    slug: 'courtney-meekins',
    team: 'vortex',
    applyLink: 'https://swifthomeloans.my1003app.com/2721865/register?time=1770668428084',
    applyLinkEs:
      'https://swifthomeloans.my1003app.com/2721865/register?POSAppLanguage=ES&time=1770668435477',
    videoUrl: 'https://www.youtube.com/embed/fkJ7yrK7tpw',
  },
  {
    name: 'Valeria Laverde',
    title: 'Independent Loan Officer',
    email: 'valeria.l@lockitlending.com',
    phone: '(713) 836-9785',
    nmls: '#2571960',
    image: `${base}/team/Valeria Laverde web size.jpg`,
    slug: 'valeria-laverde',
    team: 'vortex',
    applyLink: 'https://swifthomeloans.my1003app.com/2571960/register?time=1762804691282',
    applyLinkEs:
      'https://swifthomeloans.my1003app.com/2571960/register?POSAppLanguage=ES&time=1762805984194',
    clips: [
      {
        id: 'video-1',
        title: 'Fannie Mae Explicado',
        videoSrc: '/videos/valeria/Valeria - Fannie Mae.mp4',
        thumbnailSrc: '/video thumbnails/valeria/valeria-fanniemae.png',
      },
      {
        id: 'video-2',
        title: 'Home Loan Myths',
        videoSrc: '/videos/valeria/Valeria 2.mp4',
        thumbnailSrc: '/video thumbnails/valeria/valeria-homeloanmyths.png',
      },
      {
        id: 'video-3',
        title: 'Puntaje de Crédito',
        videoSrc: '/videos/valeria/Valerina - Credit Score.mp4',
        thumbnailSrc: '/video thumbnails/valeria/valeria-interestandcredit.png',
      },
    ],
  },

  {
    name: 'Ayesha Khan',
    title: 'Loan Processor',
    email: 'ayesha@lockitlending.com',
    phone: '(281) 612-4306',
    image: `${base}/team/Ayesha-Khan.jpg`,
    slug: 'ayesha-khan',
    team: 'vortex',
    hideCtaBanner: true,
    videoUrl: 'https://www.youtube.com/embed/YaL4VzfaG5I',
  },
  {
    name: 'Charlene White',
    title: 'Independent Loan Officer',
    nmls: '#2246521',
    email: 'charlene.w@lockitlending.com',
    phone: '(346) 688-9110',
    image: `${base}/team/Charlene-White.jpg`,
    slug: 'Charlene-White',
    team: 'vortex',
    applyLink: 'https://swifthomeloans.my1003app.com/2246521/register?time=1770659850155',
    clips: [
      {
        id: 'video-1',
        title: 'How to Buy a Home Before 2025',
        videoSrc: '/videos/charlene/Charlene - buying home end of 2025.mp4',
        thumbnailSrc: '/video thumbnails/charlene/Charlene-buyinghome2025.png',
      },
      {
        id: 'video-2',
        title: 'DSCR Loans Explained',
        videoSrc: '/videos/charlene/Charlene - DSCR loan.mp4',
        thumbnailSrc: '/video thumbnails/charlene/Charlene-DSCRloan.png',
      },
    ],
  },
  {
    name: 'Melinda Mazzola',
    title: 'Loan Processor',
    email: 'Melinda.m@lockitlending.com',
    phone: '(832) 639-3869',
    image: `${base}/team/Melinda Mazzola web size.png`,
    slug: 'Melinda-Mazzola',
    team: 'vortex',
    hideCtaBanner: true,
  },
  {
    name: 'Ana Rodriguez',
    title: 'Independent Loan Officer',
    nmls: '#1705055',
    email: 'ana.r@lockitlending.com',
    phone: '(346) 714-5077',
    image: `${base}/team/Ana-Rodriguez.jpg`,
    slug: 'Ana-Rodriguez',
    team: 'vortex',
    applyLink: 'https://swifthomeloans.my1003app.com/1705055/register?time=1770657884254',
    applyLinkEs:
      'https://swifthomeloans.my1003app.com/1705055/register?POSAppLanguage=ES&time=1770657895904',
  },
  {
    name: 'Jason Quick',
    title: 'Mortgage Recruiter',
    email: 'Jason.q@lockitlending.com',
    phone: '(832) 626-2199',
    image: `${base}/team/Jason Quick.jpg`,
    slug: 'Jason-Quick',
    team: 'vortex',
    hideCtaBanner: true,
  },
  {
    name: 'Laura Hidalgo',
    title: 'Talent Acquisition Specialist',
    email: 'laura.h@lockitlending.com',
    phone: '(346) 589-8657',
    image: `${base}/team/Laura-Hidalgo.jpg`,
    slug: 'Laura-Hidalgo',
    team: 'vortex',
    hideCtaBanner: true,
  },
  {
    name: 'Christopher Plaza',
    title: 'Independent Loan Officer',
    nmls: '#1223176',
    email: 'christopher.p@lockitlending.com',
    phone: '(713) 647-1791',
    image: `${base}/team/Christopher Plaza.jpg`,
    slug: 'Christopher-Plaza',
    team: 'vortex',
    applyLink: 'https://swifthomeloans.my1003app.com/1223176/register',
    applyLinkEs:
      'https://swifthomeloans.my1003app.com/1223176/register?POSAppLanguage=ES&time=1770663898930',
    videoUrl: 'https://www.youtube.com/embed/9fEkILWq83c',
  },
  {
    name: 'Miguel Gomez',
    title: 'Independent Loan Officer',
    nmls: '#1715476',
    email: 'miguel.g@lockitlending.com',
    phone: '(832) 588-1226',
    image: `${base}/team/Miguel Gomez websize.jpg`,
    slug: 'Miguel-Gomez',
    team: 'vortex',
    applyLink: 'https://swifthomeloans.my1003app.com/1715476/register?time=1770662794162',
    applyLinkEs:
      'https://swifthomeloans.my1003app.com/1715476/register?POSAppLanguage=ES&time=1770662930833',
  },
];
