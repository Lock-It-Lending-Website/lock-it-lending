import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Purchase from './pages/Purchase';
import LoanCalculator from './pages/LoanCalculator';
import Refinance from './pages/Refinance';
import LoanPrograms from './pages/LoanProgram';
import MeetLockItLending from './pages/MeetLockItLending';
import Reviews from './pages/Review';
import Glossary from './pages/Glossary';
import Resources from './pages/Resources';
import Rates from './pages/Rates';
import GlossaryTermPage from './pages/GlossaryTermPage';
import ResourcesPage from './pages/ResourcesPage';
import ThankYou from './pages/ThankYouScreen';
import TeamPage from './pages/TeamPage';
import TeamMemberPage from './pages/TeamMember';
import ApplyForm from './pages/Apply';
import SocialOutreachPage from './pages/SocialOutreach';
import { EmailPolicy, TermsOfUse, PrivacyPolicy } from './pages/Policies';
import { Calculator } from 'lucide-react';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/purchase" element={<Purchase />} />
      <Route path="/loancalculator" element={<LoanCalculator />} />
      <Route path="/socialoutreach" element={<SocialOutreachPage />} />
      <Route path="/refinance" element={<Refinance />} />
      <Route path="/loan-programs" element={<LoanPrograms />} />
      <Route path="/meet-lock-it-lending" element={<MeetLockItLending />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/glossary" element={<Glossary />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/rates" element={<Rates />} />
      <Route path="/team/:teamId" element={<TeamPage />} />
      <Route path="/team-member/:slug" element={<TeamMemberPage />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="*" element={<Navigate to="/" replace />} />
      <Route path="/glossary/:slug" element={<GlossaryTermPage />} />
      <Route path="/resources/:slug" element={<ResourcesPage />} />
      <Route path="/apply" element={<ApplyForm />} />
      <Route path="/email-policy" element={<EmailPolicy />} />
      <Route path="/terms-of-use" element={<TermsOfUse />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
    </Routes>
  );
};

export default App;
