import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import Header from "./components/Header/Header";
import { Main } from "./pages/Main/Main";
import { Login } from "./pages/Login/Login";
import { Reg } from "./pages/Reg/Reg";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="log/" element={<Login />} />
          <Route path="reg/" element={<Reg />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
