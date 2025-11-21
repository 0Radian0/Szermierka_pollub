import { Routes, Route } from "react-router-dom";
import './App.css';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import '@fortawesome/fontawesome-free/css/all.min.css';

// Strony
import Login from './pages/Login/Login';
import Register from './pages/Register';
import UsersPanel from './pages/UsersPanel';
import TrainingsPanel from "./pages/TrainingsPanel";
import PaymentsPanel from "./pages/PaymentsPanel";
import ChangePassword from "./components/ChangePassword";
import ChangeDescription from "./components/ChangeDescription";
import FrontPage from "./pages/FrontPage";
import NotFound from "./components/NotFound";

// Ochrona
import AdminRoute from "./components/AdminRoute";
import LoggedUsersRoute from "./components/LoggedUsersRoute";

// Elementy globalne
import TopBar from "./components/TopBar";
import Header from "./components/Header";
import NavMenu from "./components/NavMenu";
import Menu from "./components/Menu";

// Style
//import './assets/styles/Style_main/style_responsive_480.css';
//import './assets/styles/Style_main/style_responsive_1024.css';
//import './assets/styles/Style_main/style_responsive_884.css';
//import './assets/styles/Style_main/style.css';
//import './assets/styles/Style_sub/style_g.css';
import './assets/styles/Style_sub/style_login.css';
//import './assets/styles/Style_sub/style_register.css';

function App() {
return ( <div className="App">


  {/* ELEMENTY WIDOCZNE NA KAŻDEJ STRONIE */}
  <TopBar />
  <Header />
  <NavMenu />


  {/* ZMIENIAJĄCY SIĘ CONTENT */}
  <Routes>
    <Route path="/" element={<Login />} /> {/* POPRAWA: domyślna strona logowania */}


    <Route path="/register" element={<Register />} />

    <Route path="/UsersPanel" element={<AdminRoute><UsersPanel /></AdminRoute>} />
    <Route path="/frontPage" element={<LoggedUsersRoute><FrontPage /></LoggedUsersRoute>} />
    <Route path="/changePassword" element={<LoggedUsersRoute><ChangePassword /></LoggedUsersRoute>} />
    <Route path="/changeDescription" element={<LoggedUsersRoute><ChangeDescription /></LoggedUsersRoute>} />
    <Route path="/trainingsPanel" element={<LoggedUsersRoute><TrainingsPanel /></LoggedUsersRoute>} />
    <Route path="/payments" element={<LoggedUsersRoute><PaymentsPanel /></LoggedUsersRoute>} />

    <Route path="/*" element={<NotFound />} />
  </Routes>

</div>


);
}

export default App;
