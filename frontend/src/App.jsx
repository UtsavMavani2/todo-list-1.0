// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Dashboard from "./pages/Dashboard";
// import { ProtectedRoute } from "./authMiddleware";

import AuthProvider from "./provider/authProvider";
import Routes from "./routes";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Login />} />
    //     <Route path="/register" element={<Register />} />
    //     {/* <Route path="/dashboard" element={<Dashboard />} /> */}

    //     <Route
    //       path="/dashboard"
    //       element={
    //         <ProtectedRoute>
    //           <Dashboard />
    //         </ProtectedRoute>
    //       }
    //     />
    //   </Routes>
    // </Router>
    <AuthProvider>
      <Routes />
    </AuthProvider>
  );
}

export default App;
