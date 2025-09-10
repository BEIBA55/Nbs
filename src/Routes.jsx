import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/common/ScrollToTop';

// Import page components
import Homepage from './pages/Homepage';
import MainPage from './pages/MainPage';
import Schedule from './pages/Schedule';
import EventRegistration from './pages/EventRegistration';
import ExecutiveMBA from './pages/ProgramPage/ExecutiveMBA';
import MBA from './pages/ProgramPage/MBA';
import DBA from './pages/ProgramPage/DBA';
import ExecutiveEducation from './pages/ProgramPage/ExecutiveEducation';
import Accreditations from './pages/Accreditations';
import Partners from './pages/Partners';
import Faculty from './pages/Faculty';
import Administration from './pages/Administration';
import SupportNBS from './pages/SupportNBS';
import News from './pages/News';
import NewsDetail from './pages/News/NewsDetail';
import Graduates from './pages/Graduates';
import Library from './pages/Library';
import SearchResults from './pages/SearchResults';

// Import program pages
import ExecutiveMBACIO from './pages/ProgramPage/ExecutiveMBACIO';
import MiniMBA from './pages/ProgramPage/MiniMBA';
import ExecutiveSessions from './pages/ProgramPage/ExecutiveSessions';
import Trainings from './pages/ProgramPage/Trainings';
import ExecutiveMBANGO from './pages/ProgramPage/ExecutiveMBANGO';
import CorporateClients from './pages/ProgramPage/CorporateClients';
import AdminDashboard from './pages/AdminPanel/Dashboard';
import ApplicationsPanel from './pages/AdminPanel/ApplicationsPanel';
import ProgramsPanel from './pages/AdminPanel/ProgramsPanel';
import ContactApplicationsPanel from './pages/AdminPanel/ContactApplicationsPanel';
import ConsultationPanel from './pages/AdminPanel/ConsultationPanel';

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<MainPage />} />
        <Route path="/events" element={<Schedule />} />
        <Route path="/events/register/:eventId" element={<EventRegistration />} />
        <Route path="/programs/executive-mba" element={<ExecutiveMBA />} />
        <Route path="/programs/mba" element={<MBA />} />
        <Route path="/programs/dba" element={<DBA />} />
        <Route path="/programs/executive-education" element={<ExecutiveEducation />} />
        <Route path="/programs/executive-mba-cio" element={<ExecutiveMBACIO />} />
        <Route path="/programs/mini-mba" element={<MiniMBA />} />
        <Route path="/programs/executive-sessions" element={<ExecutiveSessions />} />
        <Route path="/programs/trainings" element={<Trainings />} />
        <Route path="/programs/executive-mba-ngo" element={<ExecutiveMBANGO />} />
        <Route path="/accreditations" element={<Accreditations />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/faculty" element={<Faculty />} />
        <Route path="/administration" element={<Administration />} />
        <Route path="/support" element={<SupportNBS />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<NewsDetail />} />
        <Route path="/graduates" element={<Graduates />} />
        <Route path="/library" element={<Library />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/corporate-clients" element={<CorporateClients />} />
        <Route path="/manager" element={<AdminDashboard />} />
        <Route path="/manager/applications" element={<ApplicationsPanel />} />
        <Route path="/manager/programs" element={<ProgramsPanel />} />
        <Route path="/manager/contact-applications" element={<ContactApplicationsPanel />} />
        <Route path="/manager/consultations" element={<ConsultationPanel />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
