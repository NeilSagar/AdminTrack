import { Route,Routes,BrowserRouter } from "react-router-dom";

import Navbar from "./components/NavBar";
import './App.css';
import ViewEmployees from "./components/ViewEmployees";
import AddEmployee from "./components/AddEmployee";
import MoreInfo from "./components/MoreInfo";
import EditEmployee from "./components/EditEmployee";
import SignIn from "./components/SignIn";
import PrivateComponent from "./components/PrivateComponent";

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route element={<PrivateComponent/>}>
        <Route path="/" element={<></>}></Route>
        <Route path="/viewEmployees" element={<ViewEmployees></ViewEmployees>}></Route>
        <Route path="/addEmployee" element={<AddEmployee></AddEmployee>}></Route>
        <Route path="/viewEmployees/:empId" element={<MoreInfo></MoreInfo>}></Route>
        <Route path="/editEmployee/:empId" element={<EditEmployee></EditEmployee>}></Route>
        </Route>
        <Route path="/signUp/" element={<SignIn val="0"></SignIn>}></Route>
        <Route path="/logIn/" element={<SignIn val="1"></SignIn>}></Route>
        {/* <Route path="/redirect" element={<RedirectMsg heading="Seems you are lost" msg="Redirecting back to employee page..."></RedirectMsg>}></Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
