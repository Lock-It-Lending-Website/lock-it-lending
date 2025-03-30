import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Purchase from './pages/Purchase';
import Refinance from './pages/Refinance';
import LoanPrograms from './pages/LoanProgram';
import MeetLockItLending from './pages/MeetLockItLending';
import Reviews from './pages/Review';
import Glossary from './pages/Glossary';
import Resources from './pages/Resources';
import Rates from './pages/Rates';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/purchase" element={<Purchase />} />
      <Route path="/refinance" element={<Refinance />} />
      <Route path="/loan-programs" element={<LoanPrograms />} />
      <Route path="/meet-lock-it-lending" element={<MeetLockItLending />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/glossary" element={<Glossary />} />
      <Route path="/resources" element={<Resources />} />
      <Route path="/rates" element={<Rates />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;
