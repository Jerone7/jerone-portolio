import { Routes, Route } from 'react-router';
import { useLenis } from './hooks/useLenis';
import Navbar from './components/Navbar';
import MainHome from './pages/MainHome';
import ProjectDetails from './pages/ProjectDetails';
import SkillSwapDetails from './pages/SkillSwapDetails';
import PortfolioSiteDetails from './pages/PortfolioSiteDetails';
import Footer from './sections/Footer';

function App() {
  useLenis();

  return (
    <div className="relative">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/project/grocery" element={<ProjectDetails />} />
          <Route path="/project/skillswap" element={<SkillSwapDetails />} />
          <Route path="/project/portfolio" element={<PortfolioSiteDetails />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
