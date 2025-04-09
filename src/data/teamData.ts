const base = `${process.env.PUBLIC_URL}`;

export type TeamMember = {
  name: string;
  title: string;
  nmls?: string;
  phone: string;
  email: string;
  image: string;
  slug?: string;
  bio?: string;
  applyLink?:String;
};

export type TeamGroup = {
  slug: string;
  name: string;
  image: string;
  hero: string;
  heroBlur: string;
  profileImage: string;
  nmls: string;
  email: string;
  phone: string;
  address: string;
  members: TeamMember[];
  about?: string;
  reviews?: {
    stars: number;
    text: string;
    name: string;
    timestamp?: string;
  }[];
};

export const teamData: Record<string, TeamGroup> = {
  vortex: {
    slug: 'vortex',
    name: 'Lock It Lending - Vortex',
    image: `${base}/Lock-It-Lending-Home1.png`,
    hero: `${base}/Lock-It-Lending-Loan-Programs.png`,
    heroBlur: `${base}/Lock-It-Lending-Home1.png`,
    profileImage: `${base}/team/Kenton-Wilson.png`,
    nmls: '',
    email: 'info@lockitlending.com',
    phone: '(866) 400-6789',
    address: '10515 Bellaire Blvd, Suite Z, Houston TX 77072, USA',
    members: [
      {
        name: 'Kenton Wilson',
        title: 'Loan Officer',
        nmls: '#2075228',
        phone: '(361) 454-0819',
        email: 'kenton@lockitlending.com',
        image: `${base}/team/Kenton-Wilson.png`,
      },
      {
        name: 'Robert Noonan',
        title: 'Loan Officer',
        nmls: '#2234945',
        phone: '(325) 320-4025',
        email: 'rob@lockitlending.com',
        image: `${base}/team/Robert-Noonan.png`,
      },
      {
        name: 'Henry Do',
        title: 'Loan Officer',
        nmls: '#2051860',
        phone: '(832) 985-3601',
        email: 'henry@lockitlending.com',
        image: `${base}/team/Henry-Do.png`,
      },
    ],
    about: `
    Lock It Lending Houston, a proud member of the Swift Home Loans Inc. family, is your trusted partner on the journey to homeownership. 
    With a commitment to excellence and a passion for personalized service, we specialize in making your mortgage dreams a reality. 
    Our team of experienced professionals, backed by cutting-edge technology and a dedication to transparency, ensures that you find the right mortgage solution tailored to your needs.

    At Lock It Lending, we lock in your future with unwavering support and expertise in the world of home financing. 
    Let us be the key to unlocking your homeownership goals. 
    At Lock It Lending, we understand that obtaining a mortgage is not merely a transaction; it’s a significant life milestone.

    That’s why we go above and beyond to provide an exceptional and personalized experience. 
    Our team of seasoned mortgage experts possesses a deep understanding of the ever-evolving mortgage landscape, and we are equipped with the latest tools and technologies to navigate it seamlessly.
  `,
    reviews: [
      {
        stars: 5,
        name: 'Michi T',
        text: `I used Lock It Lending for my recent mortgage loan to purchase a townhouse. My Lending Officer was Chris Nguyen & my Loan Processor was Shanatay Blanchard. They were amazing to work with, from the correspondence to the turnaround times for when my questions needed answers; it was great! I was able to purchase my new home within a few months. I would definitely recommend this outstanding team and company. My coworkers even asked me about them and I did not hesitate to give them my recommendation! Thanks again, Lock It Lending!`,
        timestamp: 'a week ago',
      },
    ],
  },
  allstars: {
    slug: 'allstars',
    name: 'Lock It Lending - All Stars',
    image: `${base}/allstars.png`,
    hero: `${base}/allstars-banner.png`,
    heroBlur: `${base}/allstars-banner.png`,
    profileImage: `${base}/team/Hanh-Dao.png`,
    nmls: '1306378',
    email: 'info@lockitlending.com',
    phone: '(866) 400-6789',
    address: '10515 Bellaire Blvd, Suite Z, Houston TX 77072, USA',
    members: [
      {
        name: 'Hanh Dao',
        title: 'Loan Officer',
        nmls: '#2304364',
        phone: '(281) 203-4489',
        email: 'hanh@lockitlending.com',
        image: `${base}/team/Hanh-Dao.png`,
      },
      {
        name: 'Melissa Tubau',
        title: 'Loan Advisor',
        nmls: '#2353523',
        phone: '(281) 582-1291',
        email: 'melissa@lockitlending.com',
        image: `${base}/team/Melissa-Tubau.png`,
      },
      {
        name: 'Ann Luu',
        title: 'Loan Officer',
        nmls: '#2106451',
        phone: '(832) 794-3753',
        email: 'ann@lockitlending.com',
        image: `${base}/team/Ann-Luu.png`,
      },
    ],
    about: `
    Lock It Lending Houston, a proud member of the Swift Home Loans Inc. family, is your trusted partner on the journey to homeownership. 
    With a commitment to excellence and a passion for personalized service, we specialize in making your mortgage dreams a reality. 
    Our team of experienced professionals, backed by cutting-edge technology and a dedication to transparency, ensures that you find the right mortgage solution tailored to your needs.

    At Lock It Lending, we lock in your future with unwavering support and expertise in the world of home financing. 
    Let us be the key to unlocking your homeownership goals. 
    At Lock It Lending, we understand that obtaining a mortgage is not merely a transaction; it’s a significant life milestone.

    That’s why we go above and beyond to provide an exceptional and personalized experience. 
    Our team of seasoned mortgage experts possesses a deep understanding of the ever-evolving mortgage landscape, and we are equipped with the latest tools and technologies to navigate it seamlessly.
  `,
    reviews: [
      {
        stars: 5,
        name: 'Michi T',
        text: `I used Lock It Lending for my recent mortgage loan to purchase a townhouse. My Lending Officer was Chris Nguyen & my Loan Processor was Shanatay Blanchard. They were amazing to work with, from the correspondence to the turnaround times for when my questions needed answers; it was great! I was able to purchase my new home within a few months. I would definitely recommend this outstanding team and company. My coworkers even asked me about them and I did not hesitate to give them my recommendation! Thanks again, Lock It Lending!`,
        timestamp: 'a week ago',
      },
    ],
  },
  apex: {
    slug: 'apex',
    name: 'Lock It Lending - Team APEX',
    image: `${base}/apex.png`,
    hero: `${base}/Apex-banner.png`,
    heroBlur: `${base}/Apex-banner.png`,
    profileImage: `${base}/logo.png`,
    nmls: '2403720',
    email: 'teamapex@lockitlending.com',
    phone: '(888) 870-5625',
    address: '3901 West Walnut Street, Garland TX 75042, USA',
    members: [
      {
        name: 'Ly Nguyen',
        title: 'Loan Officer',
        phone: '',
        email: '',
        image: `${base}/team/Ly-Nguyen.png`,
      },
      {
        name: 'Lesa Luu',
        title: 'Loan Officer',
        phone: '',
        email: '',
        image: `${base}/team/Lesa-Luu.png`,
      },
      {
        name: 'Tyrone Tran',
        title: 'Loan Officer',
        phone: '',
        email: '',
        image: `${base}/team/Tyrone-Tran.png`,
      },
      {
        name: 'Brandon Vo',
        title: 'Loan Officer',
        phone: '',
        email: '',
        image: `${base}/team/Brandon-Vo.png`,
      },
      {
        name: 'Billy Nguyen',
        title: 'Branch Manager',
        phone: '',
        email: '',
        image: `${base}/team/Billy-Nguyen.png`,
      },
      {
        name: 'Troy Ngo',
        title: 'VP of Operations',
        phone: '',
        email: '',
        image: `${base}/team/Troy-Ngo.png`,
      },
      {
        name: 'Yen Nguyen',
        title: 'Loan Officer',
        phone: '',
        email: '',
        image: `${base}/team/Yen-Nguyen.png`,
      },
      {
        name: 'Celine Tran',
        title: 'Loan Officer',
        phone: '',
        email: '',
        image: `${base}/team/Celine-Tran.png`,
      },
    ],
    about: `
      At Lock It Lending, we’re not just mortgage brokers; we’re seasoned professionals with over 18 years of experience. 
      Our mission is simple yet profound: to provide excellence in every aspect of your mortgage journey.

      We believe that the home buying or refinancing process should be more than just a transaction. 
      It’s a significant life event, and we are committed to making it as smooth, stress-free, and personal as possible.
    `,
    reviews: [
      {
        stars: 5,
        name: 'Danny Chuang',
        text: `Hands down the best in the business! Working with Billy, Brandon, Celine, and Hanni was such a great experience. They were so patient and helpful throughout the whole process. I couldn’t ask for anyone better to guide me through the process in the purchase of my first home.`,
        timestamp: 'a week ago',
      },
      {
        stars: 5,
        name: 'Andrew L',
        text: `Brandon & Hanni were great and responsive. Worked hard to adapt to changing interest rates and were very effective. Excellent customer service & always available, even on weekends & after business hours.`,
        timestamp: 'a week ago',
      },
      {
        stars: 5,
        name: 'Anna Nguyen',
        text: `Couldn’t have asked for a better service! This was our first home and the team took the time to explain all the steps of the loan process in detail. They were available 24/7, and responded to all our questions and concerns in a timely manner. Our home buying process went so smoothly all due to their help and we could not have asked for anything better. Definitely recommend their service!!`,
        timestamp: 'a week ago',
      },
    ],
  },
};

export const teamMembers: TeamMember[] = [
  {
    name: "Ann Luu",
    title: "Loan Advisor",
    nmls: "#2008554",
    phone: "(832) 850-4098",
    email: "ann@lockitlending.com",
    image: `${base}/team/Ann-Luu.png`,
    slug: "ann-luu",
    applyLink: "https://prod.lendingpad.com/swift-home-loans/pos#/?loid=ff2423e7-8b05-4ae6-bf35-c12e52b0f3c2"
  },
  {
    name: "Lyn Ha",
    title: "Loan Advisor",
    nmls: "#2051826",
    phone: "(832) 779-8844",
    email: "lyn@lockitlending.com",
    image: `${base}/team/Lyn-Ha.png`,
    slug: "lyn-ha",
    applyLink: "https://prod.lendingpad.com/swift-home-loans/pos#/?loid=675c970e-ee12-4ddf-a8a1-f8a7a28d6803"
  },
  {
    name: "Kaden Nguyen",
    title: "Loan Advisor",
    nmls: "#2117639",
    phone: "(832) 856-2758",
    email: "kaden@lockitlending.com",
    image: `${base}/team/Kaden-Nguyen.png`,
    slug: "kaden-nguyen",
    applyLink: "https://prod.lendingpad.com/swift-home-loans/pos#/?loid=7ec8115d-b864-43df-91bf-0d5090c6d167"
  },
  {
    name: "Kevin Huynh",
    title: "Loan Advisor",
    nmls: "#2441459",
    phone: "(346) 248-4567",
    email: "kevin@lockitlending.com",
    image: `${base}/team/Kevin-Huynh.png`,
    slug: "kevin-huynh",
    applyLink: "https://prod.lendingpad.com/swift-home-loans/pos#/?loid=6c1e8c03-c9b4-40d8-abf4-d772f108cccf"
  },
  {
    name: "Melissa Tubau",
    title: "Loan Advisor",
    nmls: "#2353523",
    phone: "(281) 582-1291",
    email: "melissa@lockitlending.com",
    image: `${base}/team/Melissa-Tubau.png`,
    slug: "melissa-tubau",
    applyLink: "https://prod.lendingpad.com/swift-home-loans/pos#/?loid=64c56264-823a-482b-af56-b36605713368"
  },
  {
    name: "Jake Radom",
    title: "Retail Loan Officer",
    nmls: "#2359662",
    phone: "(325) 335-0420",
    email: "jacob.ra@lockitlending.com",
    image: `${base}/team/Jake-Radom.png`,
    slug: "jake-radom",
    applyLink: "https://prod.lendingpad.com/swift-home-loans/pos#/?loid=a5c8ec67-1dc5-4da8-99ac-90cbca54bd6e"
  },
  {
    name: "Kenton Wilson",
    title: "Retail Loan Officer",
    nmls: "#2600652",
    phone: "(361) 454-0819",
    email: "kenton@lockitlending.com",
    image: `${base}/team/Kenton-Wilson.png`,
    slug: "kenton-wilson",
    applyLink: "https://prod.lendingpad.com/swift-home-loans/pos#/?loid=bbe37d90-9957-4ef3-9163-40e27c6cad5c"
  },
  {
    name: "Robert Noonan",
    title: "Retail Loan Officer",
    nmls: "#2265817",
    phone: "(325) 308-4305",
    email: "robert@lockitlending.com",
    image: `${base}/team/Robert-Noonan.png`,
    slug: "robert-noonan",
    applyLink: "https://prod.lendingpad.com/swift-home-loans/pos#/?loid=3b2144c3-c5a1-40c5-8b83-1914a3fcb242"
  },
  {
    name: "Henry Do",
    title: "Retail Loan Officer",
    nmls: "#1863960",
    phone: "(979) 657-5894",
    email: "henry@lockitlending.com",
    image: `${base}/team/Henry-Do.png`,
    slug: "henry-do",
    applyLink: "https://prod.lendingpad.com/swift-home-loans/pos#/?loid=a9dc86dc-cd42-46d2-bd53-3c58b5926340"
  },
  {
    name: "Luke Roberts",
    title: "Retail Loan Officer",
    nmls: "#2630023",
    phone: "(469) 933-0878",
    email: "luke.ro@lockitlending.com",
    image: `${base}/team/Luke-Roberts.png`,
    slug: "luke-roberts"
  },
  {
    name: "Jaime Casablanca",
    title: "Retail Loan Officer",
    nmls: "#2657322",
    phone: "(346) 474-6555",
    email: "jaime.c@lockitlending.com",
    image: `${base}/team/Jaime-Casablanca.png`,
    slug: "jaime-casablanca",
    applyLink: "https://prod.lendingpad.com/swift-home-loans/pos#/?loid=2b9366ca-e8ed-43e7-8b5c-f8ab9c792b57"
  },
  {
    name: "Alishan Lokhandwalla",
    title: "Retail Loan Officer",
    nmls: "#2679262",
    phone: "(281) 694-5850",
    email: "alishan.l@lockitlending.com",
    image: `${base}/team/Alishan-Lokhandwalla.png`,
    slug: "alishan-lokhandwalla",
    applyLink: "https://prod.lendingpad.com/swift-home-loans/pos#/?loid=344f99a0-5255-4d4e-b3bc-cbf89a9c99ca"
  },
  {
    name: "Hanh Dao",
    title: "Branch Manager",
    nmls: "#1406378",
    phone: "(832) 850-4078",
    email: "hanh@lockitlending.com",
    image: `${base}/team/Hanh-Dao.png`,
    slug: "hanh-dao",
    applyLink: "https://prod.lendingpad.com/swift-home-loans/pos#/?loid=a97facd8-45ae-4919-9ff1-c4a8d9743f7e"
  },
  {
    name: "Maria Vazquez",
    title: "Retail Loan Officer",
    nmls: "#2661107",
    phone: "(832) 762-4052",
    email: "maria.v@lockitlending.com",
    image: `${base}/team/Maria-Vazquez.png`,
    slug: "maria-vazquez",
    applyLink: "https://prod.lendingpad.com/swift-home-loans/pos#/?loid=e20d6238-080d-4051-8dcc-d4a826ebbddb"
  },
  {
    name: "Laura Hidalgo",
    title: "Talent Acquistion and Marketing Specialist",
    nmls: "",
    phone: "(832) 916-4537",
    email: "laura.h@lockitlending.com",
    image: `${base}/team/Laura-Hidalgo.png`,
    slug: "laura-hidalgo",
    applyLink: ''
  },
  {
    name: "Aron Padierna",
    title: "Retail Loan Officer Assistant",
    nmls: "",
    phone: "(281) 666-2913",
    email: "aron.p@swifthomeloans.com",
    image: `${base}/team/Aron-Padierna.png`,
    slug: "aron-padierna",
    applyLink: ''
  },
  {
    name: "Ayesha Khan",
    title: "Retail Processor",
    nmls: "",
    phone: "(281) 612-4306",
    email: "ayesha@lockitlending.com",
    image: "${base}/team/Ayesha-Khan.png",
    slug: "ayesha-khan",
    applyLink: ''
  }
];