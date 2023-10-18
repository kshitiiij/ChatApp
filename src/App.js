import Register from "./Components/register";
import Login from "./Components/login";
import { BrowserRouter as Router,Route,Routes,Navigate } from "react-router-dom";
import Dashboard from "./Components/dashboard";

function App() {
  return (
    <Router>
      <div className="App">
            <Routes>
              <Route path="/" element = {<Navigate to="/login" />} />
              <Route path="/register" element = {<Register/>} />
              <Route path="/login" element = {<Login/>} />
              <Route path="/dashboard" element = {<Dashboard/>} />
            </Routes>
      </div>
    </Router>
  );
}

export default App;
