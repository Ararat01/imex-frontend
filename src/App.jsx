import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "./pages/Main/Main";
import { Login } from "./pages/Login/Login";
import { Reg } from "./pages/Reg/Reg";
import { Mypage } from "./pages/Mypage/Mypage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="log/" element={<Login />} />
          <Route path="reg/" element={<Reg />} />
          <Route path="mypage/" element={<Mypage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
