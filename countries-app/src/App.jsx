// import { Routes, Route, Link } from 'react-router-dom';
// import CountryList from './components/CountryList';
// import CountryDetails from './components/CountryDetails';
// import Favorites from './components/Favorites';
// import Login from './components/Login'
// import Signup from './components/Signup'
// import {useAuth} from './context/AuthContext'
// import CoverPage from './components/CoverPage';


// function App() {
//   const { user, logout } = useAuth();
//   return (
//     <div className="p-4">
//       {/* Navbar */}
//         <nav className="flex gap-4 mb-6">
//         <Link to="/" className="text-blue-600 font-semibold">Home</Link>
//         <Link to="/favorites" className="text-blue-600 font-semibold">Favorites</Link>
//         {!user ? (
//           <>
//            {/* <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
//            <Link to="/signup" className="text-blue-600 font-semibold">Sign Up</Link> */}
//           </>
//   ) : (
//           <>
//            <span className="text-gray-700">Welcome, {user.username}</span>
//            <button onClick={logout} className="text-red-600 font-semibold">Logout</button>
//           </>
//   )}
      
//   </nav>

//       {/* Routes */}
       
//       <Routes>
//         <Route path="/" element={<CoverPage />} />
//         <Route path="/countries" element={<CountryList />} />
//         <Route path="/country/:code" element={<CountryDetails />}/>
//         <Route path="/favorites" element={<Favorites />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//       </Routes>
      
//     </div>
//   );
// }

// export default App;
import { Routes, Route } from 'react-router-dom';
import CountryList from './components/CountryList';
import CountryDetails from './components/CountryDetails';
import Favorites from './components/Favorites';
import Login from './components/Login';
import Signup from './components/Signup';
import CoverPage from './components/CoverPage';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      {/* Cover Page (no navbar) */}
      <Route path="/" element={<CoverPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* All other pages use Layout with navbar */}
      <Route element={<Layout />}>
        <Route path="/countries" element={<CountryList />} />
        <Route path="/country/:code" element={<CountryDetails />} />
        <Route path="/favorites" element={<Favorites />} />
       
      </Route>
    </Routes>
  );
}

export default App;
