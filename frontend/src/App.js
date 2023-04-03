import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Page404 from "./pages/Page404";
import Donors from "./pages/donor/Donors";
import AddTrip from './pages/donor/AddDonor';
import EditDonor from './pages/donor/editDonor';
import DonorDetails from './pages/donor/donorDetails';
import DeleteDonorConfirmation from './pages/donor/DeleteDonor';
import Reports from './pages/reports/reports';
import NumberOfDoctors from './pages/reports/numberOfDoctors';

function App() {  
  return (
    <>
  <BrowserRouter>
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route path="donors/">
        <Route path="add/" element={<AddTrip />} />
        <Route path=":donorId/" element={<DonorDetails />} />
        <Route path=":donorId/edit/" element={<EditDonor />} />
        <Route path=":donorId/delete/" element={<DeleteDonorConfirmation />} />
      <Route index element={<Donors />}/>

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
