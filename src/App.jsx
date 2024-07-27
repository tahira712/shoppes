import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "../src/Pages/HomePage";
import Footer from "./Components/Footer";
import Details from "./Pages/Details";
import Blog from "./Pages/Blog";
import DetailBlog from "./Pages/DetailBlog";
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import the CSS
// import { SearchProvider } from './Components/SearchContext';
const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/products/:id/description" element={<Details />}></Route>
          <Route path="/products/:id/review" element={<Details />}></Route>
          {/* <Route path="/search" element={<Search />}></Route> */}
          <Route path="/blogs/:id" element={<DetailBlog />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
};
AOS.init();
export default App;
