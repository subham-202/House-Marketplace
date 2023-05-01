import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Explore from "./Pages/Explore";
import Navbar from "./Components/Navbar";
 
import Offers from "./Pages/Offers";
import Profile from "./Pages/Profile";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import ForgotPassword from "./Pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./Components/PrivateRoute";
import Category from "./Pages/Category";
import CreateListsing from "./Pages/CreateListing";
import Listing from "./Pages/Listing";
import Contact from "./Pages/Contact";
function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Explore/>}/>
        <Route path="/offers" element={<Offers/>}/>
          <Route path="/Category/:categoryName" element={<Category/>}/>
        <Route path="/profile" element={<PrivateRoute/>}>
            <Route path="/profile" element={<Profile />}/>
        </Route>
        <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/create-listing" element={<CreateListsing />} />
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
          <Route path="/Contact/:landlordId" element={<Contact />}/>
        <Route path="/category/:categoryName/:listingId" element={<Listing/>}/>
      </Routes>
      <Navbar/>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;
