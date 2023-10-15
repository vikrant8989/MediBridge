import './App.css';
import { Route, Routes } from "react-router";
import { BrowserRouter } from "react-router-dom"
import Layout from './component/Navbar/Layout';
import Home from './component/Navbar/Home';
import About from './component/Navbar/About';
import Contact from './component/Navbar/Contact';
import Registration from './component/Registration';
import Login from './component/Login/Login';
import Searchdoctor from './component/Doctor/Searchdoctor';
import Doctordashboard from './component/Doctor/Doctordashboard';
import Searchmedicine from './component/Medicine/Searchmedicine';
import Finddoctor from './component/Doctor/Finddoctor';
import Fulldoctordashboard from './component/Doctor/Fulldoctordashboard';
import Searchdoctorbyspz from './component/Doctor/Searchdoctorbyspz';
import Bookappointment from './component/Doctor/Bookappointment';
import Generalpage from './component/Generalpage';
import PrescriptionView from './component/User/PrescriptionView';
import Addprescription from './component/Doctor/Addprescription';
import Logout from './component/Mylogout/Logout';
import Addmedicine from './component/Pharmacy/Addmedicine';
import Viewallmedicine from './component/Pharmacy/Viewallmedicine';
import Searchdoctorbyothers from './component/Doctor/Searchdoctorbyothers';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout />} >
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/login" element={<Login />} />
          <Route path="/search/medicine" element={<Searchmedicine />} />
          <Route path="/doctor/find" element={<Finddoctor />} />
          <Route path="/search/doctor/:problem" element={<Searchdoctor />} />
          <Route path="/search/doctors/:spz" element={<Searchdoctorbyspz />} />
          <Route path="/search/doctor2/:others" element={<Searchdoctorbyothers />} />
          <Route path="/search/doctor/:problem/view/Doctors/:did" element={<Doctordashboard />} />
          <Route path="/search/doctors/:problem/view/Doctors/:did" element={<Doctordashboard />} />
          <Route path="/search/doctor2/:others/view/Doctors/:did" element={<Doctordashboard />} />
          <Route path="/doctor" element={<Fulldoctordashboard />} />
          <Route path="/book/:did" element={<Bookappointment />} />
          <Route path="/login/user" element={<Generalpage />} />
          <Route path="/login/doctor" element={<Generalpage />} />
          <Route path="/login/pharmacy" element={<Generalpage />} />
          <Route path="/viewprescription" element={<PrescriptionView />} />
          <Route path="/addprescription" element={<Addprescription />} /> 
          <Route path="/addmedicine" element={<Addmedicine />} />  
          <Route path="/viewallmed" element={<Viewallmedicine />} />  
          <Route path="/logout" element={<Logout />} />
        
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
