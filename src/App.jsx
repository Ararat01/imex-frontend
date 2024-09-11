import "./App.scss";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Main } from "./pages/Main/Main.jsx";
import { Login } from "./pages/Login/Login.jsx";
import { Reg } from "./pages/Reg/Reg.jsx";
import { Mypage } from "./pages/Mypage/Mypage.jsx";
import { CreateProd } from "./pages/CreateProd/CreateProd.jsx";
import { ProductPage } from "./pages/ProductPage/ProductPage.jsx";
import "./i18n";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/:ln/:categoryHr" element={<Main />} />
          <Route path="/:ln" element={<Main />} />
          <Route path="/" element={<Navigate to={"/hy"} />} />
          <Route path="/:ln/log/" element={<Login />} />
          <Route path="/:ln/reg/" element={<Reg />} />
          <Route path="/:ln/mypage/" element={<Mypage />} />
          <Route path="/:ln/mypage/create/:id" element={<CreateProd />} />
          <Route path="/:ln/product/:id" element={<ProductPage />} />
          <Route
            path="/:ln/:categoryHr/product/:id"
            element={<ProductPage />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
