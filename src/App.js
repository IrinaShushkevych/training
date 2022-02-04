import { Navigate, Route, Routes } from "react-router-dom";
import "./App.scss";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import Tabs from "./components/Tabs";
import Home from "./view/Home";
import Learning from "./view/Learning";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="/training/*" element={<Tabs />} />
          <Route path="/learning/*" element={<Learning />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
