import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TakeQueuePage from "./pages/TakeQueuePage";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/dashboard/Dashboard";
import PanggilAntrianPage from "./pages/dashboard/PanggilAntrianPage";
import DashboardLayout from "./pages/dashboard/layout";
import ListQueuePage from "./pages/ListQueuePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TakeQueuePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="list-antrian" element={<ListQueuePage />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<DashboardPage />} />
          {/* Child Routes */}
          <Route path="panggil-antrian" element={<PanggilAntrianPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
