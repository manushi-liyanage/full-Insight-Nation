// import { Outlet, Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// function Layout() {
//   const { user, logout } = useAuth();

//   return (
//     <>
//       <nav className="flex gap-4 px-6 py-4 bg-white shadow mb-4">
//         <Link to="/countries" className="text-blue-600 font-semibold">Home</Link>
//         {!user ? (
//           <>
//             <Link to="/login" className="text-blue-600 font-semibold">Login</Link>
//             <Link to="/signup" className="text-blue-600 font-semibold">Sign Up</Link>
//           </>
//         ) : (
//           <>
//             <span className="text-gray-700">Welcome, {user.email}</span>
//             <Link to="/favorites" className="text-blue-600 font-semibold">Favorites</Link>
//             <button onClick={logout} className="text-red-600 font-semibold">Logout</button>
//           </>
//         )}
//       </nav>

//       <main className="px-4">
//         <Outlet />
//       </main>
//     </>
//   );
// }

// export default Layout;


import { Outlet, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Layout() {
  const { user, logout } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Link 
                to="/countries" 
                className="text-blue-600 hover:text-blue-800 font-bold text-lg mr-6"
              >
                Home
              </Link>
              
              <div className="flex space-x-4">
                {!user ? (
                  <>
                    <Link 
                      to="/login" 
                      className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Login
                    </Link>
                    <Link 
                      to="/signup" 
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Sign Up
                    </Link>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/favorites" 
                      className="text-gray-600 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                    >
                      {/* <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg> */}
                      Favorites
                    </Link>
                    <button 
                      onClick={logout} 
                      className="text-gray-600 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {user && (
              <div className="flex items-center">
                <div className="bg-gray-100 rounded-full h-8 w-8 flex items-center justify-center mr-2">
                  <span className="text-gray-700 font-medium text-sm">
                    {user.email.charAt(0).toUpperCase()}
                  </span>
                </div>
                <span className="text-gray-700 text-sm hidden md:block">
                  {user.email}
                </span>
              </div>
            )}
          </div>
        </div>
      </nav>
      
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
      
      <footer className="bg-white border-t border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Insight Nations
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;