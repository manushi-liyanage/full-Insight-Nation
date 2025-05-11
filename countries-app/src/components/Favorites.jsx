// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";

// function Favorites() {
//   const [favoriteCountries, setFavoriteCountries] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     axios
//       .get("/api/getFav", { withCredentials: true })
//       .then((res) => {
//         const countryCodes = res.data.favourites;

//         if (countryCodes.length === 0) {
//           setFavoriteCountries([]);
//           setLoading(false);
//           return;
//         }

//         // Fetch full country details from public API
//         axios
//           .get(`https://restcountries.com/v3.1/alpha?codes=${countryCodes.join(",")}`)
//           .then((response) => {
//             setFavoriteCountries(response.data);
//             setLoading(false);
//           })
//           .catch((error) => {
//             console.error("Error fetching country data", error);
//             setLoading(false);
//           });
//       })
//       .catch((error) => {
//         console.error("Error fetching favorites from backend", error);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <p className="text-center mt-10">Loading favorites...</p>;

//   if (favoriteCountries.length === 0)
//     return <p className="text-center mt-10 text-gray-600">No favorite countries saved.</p>;

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">🌟 My Favorite Countries</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {favoriteCountries.map((country) => (
//           <Link to={`/country/${country.cca3}`} key={country.cca3}>
//             <div className="border rounded shadow p-4 hover:shadow-lg transition">
//               <img
//                 src={country.flags.svg}
//                 alt={country.name.common}
//                 className="w-full h-40 object-cover rounded mb-3"
//               />
//               <h2 className="text-lg font-semibold">{country.name.common}</h2>
//               <p><strong>Capital:</strong> {country.capital?.[0]}</p>
//               <p><strong>Region:</strong> {country.region}</p>
//               <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Favorites;


import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Favorites() {
  const [favoriteCountries, setFavoriteCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/getFav", { withCredentials: true })
      .then((res) => {
        const countryCodes = res.data.favourites;

        if (countryCodes.length === 0) {
          setFavoriteCountries([]);
          setLoading(false);
          return;
        }

        // Fetch full country details from public API
        axios
          .get(`https://restcountries.com/v3.1/alpha?codes=${countryCodes.join(",")}`)
          .then((response) => {
            setFavoriteCountries(response.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching country data", error);
            setError("Failed to load country details. Please try again later.");
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error("Error fetching favorites from backend", error);
        setError("Failed to load favorites. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-blue-700 font-medium">Loading your favorite countries...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-blue-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="text-red-500 text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <Link 
            to="/countries" 
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Return to Countries
          </Link>
        </div>
      </div>
    );
  }

  if (favoriteCountries.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-blue-50 px-4">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
          <div className="text-blue-500 text-6xl mb-6">✨</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-3">No Favorites Yet</h2>
          <p className="text-gray-600 mb-6">
            You haven't added any countries to your favorites list yet. Explore countries and click the star icon to add them here!
          </p>
          <Link 
            to="/countries" 
            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
          >
            Explore Countries
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header with back link */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
          <Link 
            to="/countries" 
            className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-sm mb-4 sm:mb-0 hover:bg-blue-50 transition-colors group"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Countries
          </Link>
          <h1 className="text-4xl font-bold text-blue-800 flex items-center">
            <span className="mr-3">My Favorite Countries</span>
            <span className="text-yellow-500"></span>
          </h1>
        </div>

        {/* Stats summary */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-4xl font-bold text-blue-600">{favoriteCountries.length}</p>
              <p className="text-gray-500">Total Countries</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-4xl font-bold text-blue-600">
                {new Set(favoriteCountries.map(country => country.region)).size}
              </p>
              <p className="text-gray-500">Regions</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-4xl font-bold text-blue-600">
                {favoriteCountries.reduce((total, country) => total + country.population, 0).toLocaleString()}
              </p>
              <p className="text-gray-500">Total Population</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-4xl font-bold text-blue-600">
                {favoriteCountries.filter(country => country.landlocked).length}
              </p>
              <p className="text-gray-500">Landlocked</p>
            </div>
          </div>
        </div>

        {/* Country grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteCountries.map((country) => (
            <Link 
              to={`/country/${country.cca3}`} 
              key={country.cca3}
              className="block group"
            >
              <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-50 z-10"></div>
                  <img
                    src={country.flags.svg}
                    alt={`Flag of ${country.name.common}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h2 className="text-white text-xl font-bold truncate">{country.name.common}</h2>
                    <p className="text-white text-sm opacity-90">
                      {country.cca3} • {country.region}
                    </p>
                  </div>
                </div>
                <div className="p-4 flex-grow">
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div className="bg-blue-50 p-2 rounded text-center">
                      <p className="text-xs text-blue-500 font-medium">Capital</p>
                      <p className="font-semibold truncate">{country.capital?.[0] || "N/A"}</p>
                    </div>
                    <div className="bg-blue-50 p-2 rounded text-center">
                      <p className="text-xs text-blue-500 font-medium">Population</p>
                      <p className="font-semibold">{(country.population / 1000000).toFixed(1)}M</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {country.currencies && Object.keys(country.currencies).map((curr) => (
                      <span key={curr} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                        {curr}
                      </span>
                    ))}
                    {country.landlocked && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-600 text-xs rounded">
                        Landlocked
                      </span>
                    )}
                    {country.unMember && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                        UN Member
                      </span>
                    )}
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-medium group-hover:underline text-sm">View Details</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Favorites;