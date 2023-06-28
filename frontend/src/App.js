import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

//pages
import HomePage from './pages/Home';
import EquipmentsPage from './pages/EquipmentsPage';
import BookingPage from './pages/BookingPage';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const { state } = useAuthContext();
  const user = state.user;

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/equipments"
              element={user ? <EquipmentsPage /> : <Navigate to="/login" />}
            /><Route
              path="/booking"
              element={user ? <BookingPage /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
