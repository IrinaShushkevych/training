import { Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import LoginForm from './components/LoginForm'
import PrivetRoute from './components/PrivetRoute/PrivetRoute'
import PublicRoute from './components/PublicRoute/PublicRoute'
import RegisterForm from './components/RegisterForm'
import Tabs from './components/Tabs'
import Home from './view/Home'
import Learning from './view/Learning'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route
            path="/trainer/*"
            element={<PrivetRoute element={<Tabs />} redirectTo="/login" />}
          />
          <Route
            path="/learning/*"
            element={<PrivetRoute element={<Learning />} redirectTo="/login" />}
          />
          <Route
            path="/login"
            element={
              <PublicRoute element={<LoginForm />} redirectTo="/" restricted />
            }
          />
          <Route
            path="/register"
            element={<PublicRoute element={<RegisterForm />} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
