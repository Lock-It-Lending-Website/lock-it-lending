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
        name: 'Hanh Doa',
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
        image: `${base}/team/Ahn-Luu.png`,
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
    name: 'Kenton Wilson',
    title: 'Loan Officer',
    nmls: '#2075228',
    phone: '(361) 454-0819',
    email: 'kenton@lockitlending.com',
    image: `${base}/team/Kenton-Wilson.png`,
    slug: 'kenton-wilson',
    bio: 'Kent is a passionate Mortgage Loan Originator who merges a love for the outdoors with a dedication to building enduring relationships. A recent MBA graduate from the University of Illinois he plans to grow his connections and business here in Texas to help educate consumers on the mortgage industry. Known for connecting deeply with clients and colleagues alike, he thrives on fostering long-lasting bonds with everyone he meets. He also is one of the few people who still enjoy an old fashioned phone call. Beyond the mortgage industry, he finds rejuvenation in exploring the great outdoors, whether hiking scenic trails or enjoying a relaxing day on the water. Outside of work I can be found at home with my 2 small dogs or at a local social with my Fiancé.',
  },
  {
    name: 'Melissa Tubau',
    title: 'Loan Advisor',
    nmls: '#2353523',
    phone: '(281) 582-1291',
    email: 'melissa@lockitlending.com',
    image: `${base}/team/Melissa-Tubau.png`,
    slug: 'melissa-tubau',
    bio: 'I’m Melissa Tubau, one of the Loan Officers at Lock It Lending Houston. I am proud to say that I have been at Lock It Lending Houston since July 26, 2022. My goal is to educate and empower people to take control of their financial lives, so they can create generational wealth for their families. A fact about me is I love learning about Anthropology especially Archeology. Outside of work I enjoy going to car shows and live music events.',
  },
  {
    name: 'Luke Roberts',
    title: 'Loan Officer',
    nmls: '#2131308',
    phone: '(469) 223-0636',
    email: 'luke@lockitlending.com',
    image: `${base}/team/Luke-Robert.png`,
    slug: 'luke-roberts',
  },
  {
    name: 'Jacob Radom',
    title: 'Loan Officer',
    nmls: '#2105851',
    phone: '(325) 203-0498',
    email: 'jacob@lockitlending.com',
    image: `${base}/team/Jacob-Radom.png`,
    slug: 'jacob-radom',
    bio: 'Hi, I’m Jake Radom, and I’m thrilled to be a Senior Retail Loan Officer here at Lock It Lending. My passion is helping clients secure the best possible deals, and I find immense joy in making that happen. I’m dedicated to working hard and going the extra mile to ensure that every client gets the financial solution that’s right for them. I believe in a hands-on approach and am committed to being available around the clock to offer expert guidance and support. I know that navigating the loan process can be daunting, and I’m here to make it as smooth and rewarding as possible. Whether you’re a first-time homebuyer or looking to refinance, my goal is to provide a seamless experience and build lasting relationships based on trust and satisfaction. When you work with me, you can expect dedication, personalized service, and a commitment to your success.',
  },
  {
    name: 'Robert Neonan',
    title: 'Loan Officer',
    nmls: '#2234945',
    phone: '(325) 320-4025',
    email: 'rob@lockitlending.com',
    image: `${base}/team/Robert-Noonan.png`,
    slug: 'robert-noonan',
    bio: 'With 5 years of experience as a dedicated mortgage loan officer, I’m passionate about helping clients achieve their homeownership dreams. I understand that securing a mortgage is one of the most significant financial decisions you’ll make, and I’m here to provide expert guidance tailored to your unique needs. From first-time homebuyers to those refinancing, I offer personalized service, competitive rates, and clear communication throughout the entire process. My goal is to make your mortgage experience smooth, stress-free, and successful. Let’s work together to turn your homeownership dreams into reality.',
  },
  {
    name: 'Danielle Murray',
    title: 'Loan Processor',
    phone: '(325) 320-7363',
    email: 'danielle@lockitlending.com',
    image: `${base}/team/Danielle-Murray.png`,
    slug: 'danielle-murray',
    bio: 'I’m thrilled to be joining Lock It Lending and starting this new chapter in Houston. With a background in banking, human resources, real estate, and underwriting, I bring a well-rounded perspective to my role within the company. My passion lies in helping people achieve their dream of homeownership, and I’m eager to use my experience to guide clients through the process. I’m looking forward to growing with Lock It Lending and contributing to its success in this dynamic market.',
  },
  {
    name: 'Ann Luu',
    title: 'Loan Officer',
    nmls: '#2106451',
    phone: '(832) 794-3753',
    email: 'ann@lockitlending.com',
    image: `${base}/team/Ahn-Luu.png`,
    slug: 'ann-luu',
    bio: 'I’m Ann Luu, one of the Loan Officers at Lock It Lending Houston. I am proud to say that I have been at Lock It Lending Houston since August 31, 2022. My goal is to become a Mortgage Loan Professor at the company. In my opinion, learning mortgage is tough, but teaching it is tougher. Fun fact about myself is my learning style. I’m a visual learner, not one for reading. This ignites my passion for creating an easy-to-follow materials for our team.',
  },
  {
    name: 'Laura Hidalgo',
    title: 'Loan Officer',
    nmls: '#2166347',
    phone: '(325) 320-4127',
    email: 'laura@lockitlending.com',
    image: `${base}/team/Laura-Hidalgo.png`,
    slug: 'laura-hidalgo',
  },
  {
    name: 'Alexander Hatherley',
    title: 'Loan Processor',
    phone: '(281) 203-5459',
    email: 'alexander@lockitlending.com',
    image: `${base}/team/Alexander-Hatherley.png`,
    slug: 'alexander-hatherley',
    bio: 'Hello, I am Alex Hatherley. I am a mortgage processor looking to help make dreams come true. Prior to lock it lending I was a mortgage underwriter for years. I want to bring that knowledge to the processing side of the table and make it as easy as possible for borrowers to get into their home. A fun fact about me is that I am an avid traveler. My personal favorite vacations are cruises!',
  },
  {
    name: 'Lyn Ha',
    title: 'Loan Officer',
    nmls: '#2106544',
    phone: '(832) 790-0254',
    email: 'lynha@lockitlending.com',
    image: `${base}/team/Lyn-Ha.png`,
    slug: 'lyn-ha',
    bio: 'I’m Lyn Ha, one of the Loan Officers at Lock It Lending Houston. I am proud to say that I have been at Lock It Lending Houston since August 31, 2022. Provide financial guidance and advice to clients to help them make informed decisions regarding mortgage options, interest rates, and loan terms that best suit their needs and financial situation. A unique fact about me is that I work hard and play harder.',
  },
  {
    name: 'Henry Do',
    title: 'Loan Officer',
    nmls: '#2051860',
    phone: '(832) 985-3601',
    email: 'henry@lockitlending.com',
    image: `${base}/team/Henry-Do.png`,
    slug: 'henry-do',
    bio: 'With nearly a decade of experience in the mortgage industry and a track record of leading the nation in closed loans over the past few years, I’ve recently relocated from Michigan to the Houston area with my family. This move marks an exciting new chapter for me and presents a unique opportunity to contribute to the growth and success of Lock It Lending. I’m eager to leverage my extensive expertise to support clients and help them navigate their home financing needs in the vibrant Houston market.',
  },
  {
    name: 'Hanh Doa',
    title: 'Loan Officer',
    nmls: '#2304364',
    phone: '(281) 203-4489',
    email: 'hanh@lockitlending.com',
    image: `${base}/team/Hanh-Dao.png`,
    slug: 'hanh-doa',
    bio: 'I’m Hanh Dao, one of the Branch Managers at Lock It Lending Houston. I am proud to say that I have been at Lock It Lending Houston since August 31, 2022. My goal is to empower every loan officer at Lock It Lending to close at least 10 loans monthly, establishing us as a household name in the mortgage industry. I love surrounding myself with positive, successful, and kind people.',
  },
  {
    name: 'Brett Bridges',
    title: 'Loan Officer',
    nmls: '#2341386',
    phone: '(281) 204-3474',
    email: 'brett@lockitlending.com',
    image: `${base}/team/Brett-Bridge.png`,
    slug: 'brett-bridges',
  },
];
