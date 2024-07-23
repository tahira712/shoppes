import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from '../src/Pages/HomePage'; 
import { Header } from './Components/Header';
import Footer from './Components/Footer';
import Details from './Pages/Details';
import Review from './Components/Review';
const App = () => {
  return (
    < ><Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/products/:id/description" element={<Details />}></Route>
        <Route path="/products/:id/review" element={<Details />}></Route>
      </Routes>
      <Footer />
    </Router>
    </>
    
  );
};

export default App;
