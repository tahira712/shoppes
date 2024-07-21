import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../src/Pages/HomePage'; 
import { Header } from './Components/Header';
import Footer from './Components/Footer';
import Details from './Pages/Details';
const App = () => {
  return (
    < ><Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<Details />} />
      </Routes>
      <Footer />
    </Router>
    </>
    
  );
};

export default App;
