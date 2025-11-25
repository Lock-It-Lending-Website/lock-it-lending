import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Purchase from './pages/Purchase';
import AffordabilityCalculator from './pages/AffordabilityCalculator';
import LoanCalculator from './pages/LoanCalculator';
import CalculatorsPage from './pages/CalculatorsPage';
import Refinance from './pages/Refinance';
import LoanPrograms from './pages/LoanProgram';
import MeetLockItLending from './pages/MeetLockItLending';
import WhyLockItLending from './pages/WhyLockItLending';
import Reviews from './pages/Review';
import Glossary from './pages/Glossary';
import Resources from './pages/Resources';
import SocialOutreachPage from './pages/SocialOutreach';
import Careers from './pages/Careers';
import CareersPage from './pages/CareersPage';
import Rates from './pages/Rates';
import GlossaryTermPage from './pages/GlossaryTermPage';
import ResourcesPage from './pages/ResourcesPage';
import ThankYou from './pages/ThankYouScreen';
import TeamPage from './pages/TeamPage';
import TeamMemberPage from './pages/TeamMember';
import ApplyForm from './pages/Apply';
import { EmailPolicy, TermsOfUse, PrivacyPolicy } from './pages/Policies';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/purchase" element={<Purchase />} />
      <Route path="/loan-calculator" element={<LoanCalculator />} />
      <Route path="/affordability-calculator" element={<AffordabilityCalculator />} />
      <Route path="/calculators-page" element={<CalculatorsPage />} />
      <Route path="/social-outreach" element={<SocialOutreachPage />} />
      <Route path="/careers" element={<Careers />} />
      <Route path="/careers/:slug" element={<CareersPage />} />
      <Route path="/refinance" element={<Refinance />} />
      <Route path="/loan-programs" element={<LoanPrograms />} />
      <Route path="/meet-lock-it-lending" element={<MeetLockItLending />} />
      <Route path="/why-lock-it-lending" element={<WhyLockItLending />} />
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
