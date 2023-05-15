import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import Donors from "./pages/donor/Donors";
import AddDonor from './pages/donor/AddDonor';
import EditDonor from './pages/donor/editDonor';
import DonorDetails from './pages/donor/donorDetails';
import DeleteDonorConfirmation from './pages/donor/DeleteDonor';
import Doctors from './pages/doctor/Doctors';
import AddDoctor from './pages/doctor/AddDoctor';
import EditDoctor from './pages/doctor/editDoctor';
import DeleteDoctorConfirmation from './pages/doctor/DeleteDoctor';
import DoctorDetails from './pages/doctor/doctorDetails';
import Reports from './pages/reports/reports';
import NumberOfDoctors from './pages/reports/numberOfDoctors';
import Clinics from './pages/clinic/Clinics';
import AddClinic from './pages/clinic/AddClinic';
import ClinicDetails from './pages/clinic/clinicDetails';
import EditClinic from './pages/clinic/editClinic';
import DeleteClinicConfirmation from './pages/clinic/DeleteClinic';
import BloodBags from './pages/bloodbags/BloodBags';
import BloodBagDetails from './pages/bloodbags/bloodbagDetails';
import AddBloodBag from './pages/bloodbags/AddBloodBag';
import DeleteBloodBagConfirmation from './pages/bloodbags/DeleteBloodBag';
import EditBloodBag from './pages/bloodbags/editBloodBag';
import 'react-toastify/dist/ReactToastify.css';


function App() {  
  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route path="donors/">
        <Route path="add/" element={<AddDonor />} />
        <Route path=":donorId/" element={<DonorDetails />} />
        <Route path=":donorId/edit/" element={<EditDonor />} />
        <Route path=":donorId/delete/" element={<DeleteDonorConfirmation />} />
      <Route index element={<Donors />}/>

      </Route>

      <Route path="doctors/">
        <Route path="add/" element={<AddDoctor />} />
        <Route path=":doctorId/" element={<DoctorDetails />} />
        <Route path=":doctorId/edit/" element={<EditDoctor />} />
        <Route path=":doctorId/delete/" element={<DeleteDoctorConfirmation />} />
      <Route index element={<Doctors />}/>

      </Route>

      <Route path='clinics/'>
      <Route path="add/" element={<AddClinic />} />
      <Route path=":clinicId/" element={<ClinicDetails />} />
      <Route path=":clinicId/edit/" element={<EditClinic />} />
      <Route path=":clinicId/delete/" element={<DeleteClinicConfirmation />} />

      <Route index element={<Clinics />}/>
      </Route>

      <Route path='bloodbags/'>
      <Route path="add/" element={<AddBloodBag />} />
      <Route path=":bloodbagId/" element={<BloodBagDetails />} />
      <Route path=":bloodbagId/delete/" element={<DeleteBloodBagConfirmation />} />
      <Route path=":bloodbagId/edit/" element={<EditBloodBag />} />

      <Route index element={<BloodBags/>}></Route>

      </Route>

      <Route path='reports/'>
        <Route index element={<Reports />}/>
        <Route path="number-of-doctors-in-clinics/" element={<NumberOfDoctors />} />
        


      </Route>

      <Route path="*" element={<Page404 />} />
    </Route>
  </Routes>
  </BrowserRouter>
  </>
  );
}

export default App;
