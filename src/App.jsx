import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Main } from "./pages/Main/Main.jsx";
import { Login } from "./pages/Login/Login.jsx";
import { Reg } from "./pages/Reg/Reg.jsx";
import { Mypage } from "./pages/Mypage/Mypage.jsx";
import { CreateProd } from "./pages/CreateProd/CreateProd.jsx";
import { ProductPage } from "./pages/ProductPage/ProductPage.jsx";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="log/" element={<Login />} />
          <Route path="reg/" element={<Reg />} />
          <Route path="mypage/" element={<Mypage />} />
          <Route path="mypage/create/:id" element={<CreateProd />} />
          <Route path="product/:id" element={<ProductPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
