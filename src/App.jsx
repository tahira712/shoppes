import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Login from '../src/Pages/Login'; 
import HomePage from '../src/Pages/HomePage'; // Adjust the path as per your project structure

const App = () => {
  return (
    <><Router>
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
    {/* <HomePage/> */}
    </>
    
  );
};

export default App;
