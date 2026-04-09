import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import OurValues from './pages/OurValues';
import HowItWorks from './pages/HowItWorks';
import WhereSupportGoes from './pages/WhereSupportGoes';
import YourContribution from './pages/YourContribution';
import Contact from './pages/Contact';
import AdditionalSupport from './pages/AdditionalSupport';
import OurPartners from './pages/OurPartners';
import Podcast from './pages/Podcast';
import DiabetesInfo from './pages/DiabetesInfo';
import Blog from './pages/Blog';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/our-values" element={<OurValues />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/where-support-goes" element={<WhereSupportGoes />} />
          <Route path="/your-contribution" element={<YourContribution />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/additional-support" element={<AdditionalSupport />} />
          <Route path="/our-partners" element={<OurPartners />} />
          <Route path="/podcast" element={<Podcast />} />
          <Route path="/diabetes-info" element={<DiabetesInfo />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
