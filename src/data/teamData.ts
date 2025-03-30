const base = `${process.env.PUBLIC_URL}`;

export type TeamMember = {
  name: string;
  title: string;
  nmls: string;
  phone: string;
  email: string;
  image: string;
};

export type TeamGroup = {
  name: string;
  image: string;
};

export const teamMembers: TeamMember[] = [
  {
    name: 'Kenton Wilson',
    title: 'Loan Officer',
    nmls: '#2075228',
    phone: '(361) 454-0819',
    email: 'kenton@lockitlending.com',
    image: `${base}/team/Kenton-Wilson.png`,
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
    name: 'Luke Roberts',
    title: 'Loan Officer',
    nmls: '#2131308',
    phone: '(469) 223-0636',
    email: 'luke@lockitlending.com',
    image: `${base}/team/Luke-Robert.png`,
  },
  {
    name: 'Jacob Radom',
    title: 'Loan Officer',
    nmls: '#2105851',
    phone: '(325) 203-0498',
    email: 'jacob@lockitlending.com',
    image: `${base}/team/Jacob-Radom.png`,
  },
  {
    name: 'Robert Neonan',
    title: 'Loan Officer',
    nmls: '#2234945',
    phone: '(325) 320-4025',
    email: 'rob@lockitlending.com',
    image: `${base}/team/Robert-Noonan.png`,
  },
  {
    name: 'Danielle Murray',
    title: 'Loan Processor',
    nmls: '',
    phone: '(325) 320-7363',
    email: 'danielle@lockitlending.com',
    image: `${base}/team/Danielle-Murray.png`,
  },
  {
    name: 'Ann Luu',
    title: 'Loan Officer',
    nmls: '#2106451',
    phone: '(832) 794-3753',
    email: 'ann@lockitlending.com',
    image: `${base}/team/Ahn-Luu.png`,
  },
  {
    name: 'Laura Hidalgo',
    title: 'Loan Officer',
    nmls: '#2166347',
    phone: '(325) 320-4127',
    email: 'laura@lockitlending.com',
    image: `${base}/team/Laura-Hidalgo.png`,
  },
  {
    name: 'Alexander Hatherley',
    title: 'Loan Processor',
    nmls: '',
    phone: '(281) 203-5459',
    email: 'alexander@lockitlending.com',
    image: `${base}/team/Alexander-Hatherley.png`,
  },
  {
    name: 'Lyn Ha',
    title: 'Loan Officer',
    nmls: '#2106544',
    phone: '(832) 790-0254',
    email: 'lynha@lockitlending.com',
    image: `${base}/team/Lyn-Ha.png`,
  },
  {
    name: 'Henry Do',
    title: 'Loan Officer',
    nmls: '#2051860',
    phone: '(832) 985-3601',
    email: 'henry@lockitlending.com',
    image: `${base}/team/Henry-Do.png`,
  },
  {
    name: 'Hanh Doa',
    title: 'Loan Officer',
    nmls: '#2304364',
    phone: '(281) 203-4489',
    email: 'hanh@lockitlending.com',
    image: `${base}/team/Hanh-Dao.png`,
  },
  {
    name: 'Brett Bridges',
    title: 'Loan Officer',
    nmls: '#2341386',
    phone: '(281) 204-3474',
    email: 'brett@lockitlending.com',
    image: `${base}/team/Brett-Bridge.png`,
  },
];

export const teamGroups: TeamGroup[] = [
  {
    name: 'Lock It Lending - Vortex',
    image: `${base}/teams/vortex.jpg`,
  },
  {
    name: 'Lock It Lending - All Stars',
    image: `${base}/teams/allstars.jpg`,
  },
  {
    name: 'Lock It Lending - Team APEX',
    image: `${base}/teams/apex.jpg`,
  },
];
