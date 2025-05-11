// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function CountryDetails() {
//   const { code } = useParams();
//   const [country, setCountry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [borderCountries, setBorderCountries] = useState([]);
//   const [isFavorite, setIsFavorite] = useState(false);

//   // Fetch country + borders
//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`https://restcountries.com/v3.1/alpha/${code}`)
//       .then((response) => {
//         const countryData = response.data[0];
//         setCountry(countryData);
//         setLoading(false);

//         if (countryData.borders && countryData.borders.length > 0) {
//           axios
//             .get(`https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(",")}`)
//             .then((res) => {
//               setBorderCountries(res.data.map((c) => c.name.common));
//             });
//         } else {
//           setBorderCountries([]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching country details", error);
//         setLoading(false);
//       });
//   }, [code]);

//   // Check favorite status from backend
//   useEffect(() => {
//     axios
//       .get(`/api/isFav/${code}`, { withCredentials: true })
//       .then((res) => setIsFavorite(res.data.isFav))
//       .catch((err) => {
//         console.error("Error checking favorite status:", err);
//         setIsFavorite(false);
//       });
//   }, [code]);

//   const toggleFavorite = () => {
//     if (isFavorite) {
//       axios
//         .delete(`/api/removeFav/${code}`, { withCredentials: true })
//         .then(() => setIsFavorite(false))
//         .catch((err) => console.error("Failed to remove favorite:", err));
//     } else {
//       axios
//         .post("/api/addFav", { countryCode: code }, { withCredentials: true })
//         .then(() => setIsFavorite(true))
//         .catch((err) => console.error("Failed to add favorite:", err));
//     }
//   };

//   if (loading) return <p className="text-center mt-10">Loading country details...</p>;
//   if (!country) return <p className="text-center mt-10 text-red-600">Country not found.</p>;

//   const nativeName = country.name.nativeName
//     ? Object.values(country.name.nativeName)[0].common
//     : country.name.common;

//   const currencies = country.currencies
//     ? Object.values(country.currencies).map((curr) => `${curr.name} (${curr.symbol})`).join(", ")
//     : "N/A";

//   const dialingCode =
//     country.idd?.root && country.idd?.suffixes
//       ? `${country.idd.root}${country.idd.suffixes[0]}`
//       : "N/A";

//   const translations = country.translations
//     ? Object.entries(country.translations).slice(0, 5).map(([lang, val]) => `${lang}: ${val.common}`).join(", ")
//     : "N/A";

//   return (
//     <div className="max-w-5xl mx-auto p-6">
//       <Link to="/countries" className="text-blue-600 underline mb-6 inline-block">← Back to Home</Link>

//       <div className="text-center">
//         <h2 className="text-4xl font-bold mb-2">{country.name.common}</h2>
//         <p className="text-lg text-gray-600 mb-4">{nativeName}</p>
//         <img src={country.flags.svg} alt={country.name.common} className="w-64 mx-auto mb-4 rounded shadow" />

//         <button
//           onClick={toggleFavorite}
//           className={`px-4 py-2 mt-2 rounded shadow text-white ${
//             isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
//           }`}
//         >
//           {isFavorite ? "★ Remove from Favorites" : "☆ Add to Favorites"}
//         </button>
//       </div>

//       <div className="grid md:grid-cols-2 gap-6 mt-8">
//         {/* General Info */}
//         <div className="bg-white rounded-lg shadow p-5">
//           <h3 className="text-2xl font-semibold mb-3">General Info</h3>
//           <p><strong>Capital:</strong> {country.capital?.[0]}</p>
//           <p><strong>Region:</strong> {country.region}</p>
//           <p><strong>Subregion:</strong> {country.subregion}</p>
//           <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
//           <p><strong>Area:</strong> {country.area?.toLocaleString()} km²</p>
//         </div>

//         {/* Government & Culture */}
//         <div className="bg-white rounded-lg shadow p-5">
//           <h3 className="text-2xl font-semibold mb-3">Government & Culture</h3>
//           <p><strong>Independent:</strong> {country.independent ? "Yes" : "No"}</p>
//           <p><strong>Start of Week:</strong> {country.startOfWeek}</p>
//           <p><strong>Currency:</strong> {currencies}</p>
//           <p><strong>Dialing Code:</strong> {dialingCode}</p>
//           <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
//         </div>

//         {/* Location & Borders */}
//         <div className="bg-white rounded-lg shadow p-5">
//           <h3 className="text-2xl font-semibold mb-3">Location & Borders</h3>
//           <p><strong>Timezones:</strong> {country.timezones.join(", ")}</p>
//           <p><strong>Borders:</strong> {borderCountries.length > 0 ? borderCountries.join(", ") : "None"}</p>
//           <p>
//             <strong>Google Maps:</strong>{" "}
//             <a href={country.maps.googleMaps} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
//               View Map
//             </a>
//           </p>
//         </div>

//         {/* Translations */}
//         <div className="bg-white rounded-lg shadow p-5">
//           <h3 className="text-2xl font-semibold mb-3">Translations</h3>
//           <p>{translations}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CountryDetails;


// import { useParams, Link } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function CountryDetails() {
//   const { code } = useParams();
//   const [country, setCountry] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [borderCountries, setBorderCountries] = useState([]);
//   const [isFavorite, setIsFavorite] = useState(false);

//   // Fetch country + borders
//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`https://restcountries.com/v3.1/alpha/${code}`)
//       .then((response) => {
//         const countryData = response.data[0];
//         setCountry(countryData);
//         setLoading(false);

//         if (countryData.borders && countryData.borders.length > 0) {
//           axios
//             .get(`https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(",")}`)
//             .then((res) => {
//               setBorderCountries(res.data.map((c) => c.name.common));
//             });
//         } else {
//           setBorderCountries([]);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching country details", error);
//         setLoading(false);
//       });
//   }, [code]);

//   // Check favorite status from backend
//   useEffect(() => {
//     axios
//       .get(`/api/isFav/${code}`, { withCredentials: true })
//       .then((res) => setIsFavorite(res.data.isFav))
//       .catch((err) => {
//         console.error("Error checking favorite status:", err);
//         setIsFavorite(false);
//       });
//   }, [code]);

//   const toggleFavorite = () => {
//     if (isFavorite) {
//       axios
//         .delete(`/api/removeFav/${code}`, { withCredentials: true })
//         .then(() => setIsFavorite(false))
//         .catch((err) => console.error("Failed to remove favorite:", err));
//     } else {
//       axios
//         .post("/api/addFav", { countryCode: code }, { withCredentials: true })
//         .then(() => setIsFavorite(true))
//         .catch((err) => console.error("Failed to add favorite:", err));
//     }
//   };

//   if (loading) return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <div className="animate-pulse flex flex-col items-center">
//         <div className="w-32 h-32 bg-gray-200 rounded-full mb-4"></div>
//         <div className="h-4 w-48 bg-gray-200 rounded mb-3"></div>
//         <div className="h-3 w-64 bg-gray-200 rounded"></div>
//       </div>
//     </div>
//   );
  
//   if (!country) return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-50">
//       <div className="text-center p-8 bg-white rounded-lg shadow-md">
//         <p className="text-2xl font-bold text-red-600 mb-4">Country not found</p>
//         <Link to="/countries" className="text-blue-600 hover:text-blue-800 transition-colors font-medium">
//           Return to Countries List
//         </Link>
//       </div>
//     </div>
//   );

//   const nativeName = country.name.nativeName
//     ? Object.values(country.name.nativeName)[0].common
//     : country.name.common;

//   const currencies = country.currencies
//     ? Object.values(country.currencies).map((curr) => `${curr.name} (${curr.symbol})`).join(", ")
//     : "N/A";

//   const dialingCode =
//     country.idd?.root && country.idd?.suffixes
//       ? `${country.idd.root}${country.idd.suffixes[0]}`
//       : "N/A";

//   const translations = country.translations
//     ? Object.entries(country.translations).slice(0, 5).map(([lang, val]) => `${lang}: ${val.common}`).join(", ")
//     : "N/A";

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 sm:px-6">
//       <div className="max-w-5xl mx-auto">
//         {/* Back Button */}
//         <Link 
//           to="/countries" 
//           className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-sm mb-8 hover:bg-blue-50 transition-colors group"
//         >
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
//             <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
//           </svg>
//           Back to Countries
//         </Link>

//         {/* Country Header */}
//         <div className="bg-white rounded-xl shadow-lg p-8 mb-8 text-center relative overflow-hidden">
//           <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{ backgroundImage: `url(${country.flags.svg})` }}></div>
//           <div className="relative z-10">
//             <h1 className="text-5xl font-extrabold text-gray-800 mb-2">{country.name.common}</h1>
//             <p className="text-xl text-gray-500 mb-6">{nativeName}</p>
            
//             <div className="flex justify-center mb-6">
//               <img 
//                 src={country.flags.svg} 
//                 alt={`Flag of ${country.name.common}`} 
//                 className="h-48 rounded-lg shadow-md object-cover" 
//               />
//             </div>
            
//             <button
//               onClick={toggleFavorite}
//               className={`inline-flex items-center px-5 py-3 rounded-full shadow-md transition-all transform hover:scale-105 font-semibold ${
//                 isFavorite 
//                   ? "bg-red-500 hover:bg-red-600 text-white" 
//                   : "bg-white text-gray-800 border-2 border-gray-200 hover:border-blue-500"
//               }`}
//             >
//               <span className="mr-2 text-xl">{isFavorite ? "★" : "☆"}</span>
//               {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
//             </button>
//           </div>
//         </div>

//         {/* Information Grid */}
//         <div className="grid md:grid-cols-2 gap-8">
//           {/* General Info */}
//           <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//             <div className="border-b border-gray-100 bg-blue-50 px-6 py-4">
//               <h3 className="text-2xl font-bold text-blue-800">General Information</h3>
//             </div>
//             <div className="p-6 space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 font-medium">Capital</span>
//                 <span className="font-semibold">{country.capital?.[0] || "N/A"}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 font-medium">Region</span>
//                 <span className="font-semibold">{country.region || "N/A"}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 font-medium">Subregion</span>
//                 <span className="font-semibold">{country.subregion || "N/A"}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 font-medium">Population</span>
//                 <span className="font-semibold">{country.population.toLocaleString()}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 font-medium">Area</span>
//                 <span className="font-semibold">{country.area?.toLocaleString() || "N/A"} km²</span>
//               </div>
//             </div>
//           </div>

//           {/* Government & Culture */}
//           <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//             <div className="border-b border-gray-100 bg-blue-50 px-6 py-4">
//               <h3 className="text-2xl font-bold text-blue-800">Government & Culture</h3>
//             </div>
//             <div className="p-6 space-y-3">
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 font-medium">Independent</span>
//                 <span className="font-semibold">{country.independent ? "Yes" : "No"}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 font-medium">Start of Week</span>
//                 <span className="font-semibold capitalize">{country.startOfWeek || "N/A"}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 font-medium">Currency</span>
//                 <span className="font-semibold">{currencies}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 font-medium">Dialing Code</span>
//                 <span className="font-semibold">{dialingCode}</span>
//               </div>
//               <div className="flex justify-between items-center">
//                 <span className="text-gray-500 font-medium">Languages</span>
//                 <span className="font-semibold">{country.languages ? Object.values(country.languages).join(", ") : "N/A"}</span>
//               </div>
//             </div>
//           </div>

//           {/* Location & Borders */}
//           <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//             <div className="border-b border-gray-100 bg-blue-50 px-6 py-4">
//               <h3 className="text-2xl font-bold text-blue-800">Location & Borders</h3>
//             </div>
//             <div className="p-6 space-y-3">
//               <div className="flex flex-col mb-4">
//                 <span className="text-gray-500 font-medium mb-1">Timezones</span>
//                 <span className="font-semibold text-sm bg-gray-50 p-2 rounded">
//                   {country.timezones.join(", ")}
//                 </span>
//               </div>
//               <div className="flex flex-col mb-4">
//                 <span className="text-gray-500 font-medium mb-1">Borders</span>
//                 {borderCountries.length > 0 ? (
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     {borderCountries.map((border, idx) => (
//                       <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-sm font-medium">
//                         {border}
//                       </span>
//                     ))}
//                   </div>
//                 ) : (
//                   <span className="italic text-gray-500">No bordering countries</span>
//                 )}
//               </div>
//               <div className="pt-2">
//                 <a 
//                   href={country.maps.googleMaps} 
//                   target="_blank" 
//                   rel="noopener noreferrer" 
//                   className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
//                   </svg>
//                   View on Google Maps
//                 </a>
//               </div>
//             </div>
//           </div>

//           {/* Translations */}
//           <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//             <div className="border-b border-gray-100 bg-blue-50 px-6 py-4">
//               <h3 className="text-2xl font-bold text-blue-800">Translations</h3>
//             </div>
//             <div className="p-6">
//               <div className="bg-gray-50 p-4 rounded-lg">
//                 {country.translations ? (
//                   <div className="grid grid-cols-2 gap-2">
//                     {Object.entries(country.translations).slice(0, 8).map(([lang, val], idx) => (
//                       <div key={idx} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-0">
//                         <span className="text-gray-500 uppercase text-sm font-medium">{lang}</span>
//                         <span className="font-semibold text-sm">{val.common}</span>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <p className="italic text-gray-500">No translation data available</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CountryDetails;


//updated 

import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function CountryDetails() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [borderCountries, setBorderCountries] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  // Fetch country + borders
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((response) => {
        const countryData = response.data[0];
        setCountry(countryData);
        setLoading(false);

        if (countryData.borders && countryData.borders.length > 0) {
          axios
            .get(`https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(",")}`)
            .then((res) => {
              setBorderCountries(res.data.map((c) => c.name.common));
            });
        } else {
          setBorderCountries([]);
        }
      })
      .catch((error) => {
        console.error("Error fetching country details", error);
        setLoading(false);
      });
  }, [code]);

  // Check favorite status from backend
  useEffect(() => {
    axios
      .get(`/api/isFav/${code}`, { withCredentials: true })
      .then((res) => setIsFavorite(res.data.isFav))
      .catch((err) => {
        console.error("Error checking favorite status:", err);
        setIsFavorite(false);
      });
  }, [code]);

  const toggleFavorite = () => {
    if (isFavorite) {
      axios
        .delete(`/api/removeFav/${code}`, { withCredentials: true })
        .then(() => setIsFavorite(false))
        .catch((err) => console.error("Failed to remove favorite:", err));
    } else {
      axios
        .post("/api/addFav", { countryCode: code }, { withCredentials: true })
        .then(() => setIsFavorite(true))
        .catch((err) => console.error("Failed to add favorite:", err));
    }
  };

  // Components
  const DataRow = ({ label, value }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
      <span className="text-gray-500 font-medium">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );

  const InfoCard = ({ title, children }) => (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="border-b border-gray-100 bg-blue-50 px-6 py-4">
        <h3 className="text-xl font-bold text-blue-800">{title}</h3>
      </div>
      <div className="p-6">{children}</div>
    </div>
  );

  // Loading State
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="animate-pulse flex flex-col items-center p-8 bg-white rounded-xl shadow-md">
        <div className="w-32 h-6 bg-gray-200 rounded mb-8"></div>
        <div className="w-48 h-32 bg-gray-200 rounded-lg mb-6"></div>
        <div className="w-full space-y-3">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
  
  // Error State
  if (!country) return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="text-center p-8 bg-white rounded-xl shadow-lg max-w-md w-full">
        <div className="inline-flex justify-center items-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="text-2xl font-bold text-gray-800 mb-2">Country not found</p>
        <p className="text-gray-500 mb-6">We couldn't find the country you're looking for.</p>
        <Link 
          to="/countries" 
          className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Return to Countries List
        </Link>
      </div>
    </div>
  );

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0].common
    : country.name.common;

  const currencies = country.currencies
    ? Object.values(country.currencies).map((curr) => `${curr.name} (${curr.symbol})`).join(", ")
    : "N/A";

  const dialingCode =
    country.idd?.root && country.idd?.suffixes
      ? `${country.idd.root}${country.idd.suffixes[0]}`
      : "N/A";

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link 
          to="/countries" 
          className="inline-flex items-center px-4 py-2 bg-white text-blue-600 rounded-lg shadow-sm mb-8 hover:bg-blue-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 group"
          aria-label="Back to countries list"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Countries
        </Link>

        {/* Country Header */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-10 text-center relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-5" 
            style={{ backgroundImage: `url(${country.flags.svg})` }}
            aria-hidden="true"
          ></div>
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 mb-2">{country.name.common}</h1>
            <p className="text-xl text-gray-500 mb-8">{nativeName}</p>
            
            <div className="flex justify-center mb-8">
              <img 
                src={country.flags.svg} 
                alt={`Flag of ${country.name.common}`} 
                className="h-32 sm:h-48 rounded-lg shadow-md object-cover" 
              />
            </div>
            
            <button
              onClick={toggleFavorite}
              className={`inline-flex items-center px-6 py-3 rounded-full shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isFavorite 
                  ? "bg-red-500 hover:bg-red-600 text-white focus:ring-red-500" 
                  : "bg-white text-gray-800 border-2 border-gray-200 hover:border-blue-500 focus:ring-blue-500"
              }`}
              aria-pressed={isFavorite}
            >
              <span className="mr-2 text-xl" aria-hidden="true">{isFavorite ? "★" : "☆"}</span>
              {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* General Info */}
          <InfoCard title="General Information">
            <div className="space-y-2">
              <DataRow label="Capital" value={country.capital?.[0] || "N/A"} />
              <DataRow label="Region" value={country.region || "N/A"} />
              <DataRow label="Subregion" value={country.subregion || "N/A"} />
              <DataRow label="Population" value={country.population.toLocaleString()} />
              <DataRow label="Area" value={`${country.area?.toLocaleString() || "N/A"} km²`} />
            </div>
          </InfoCard>

          {/* Government & Culture */}
          <InfoCard title="Government & Culture">
            <div className="space-y-2">
              <DataRow label="Independent" value={country.independent ? "Yes" : "No"} />
              <DataRow label="Start of Week" value={country.startOfWeek ? country.startOfWeek.charAt(0).toUpperCase() + country.startOfWeek.slice(1) : "N/A"} />
              <DataRow label="Currency" value={currencies} />
              <DataRow label="Dialing Code" value={dialingCode} />
              <DataRow label="Languages" value={country.languages ? Object.values(country.languages).join(", ") : "N/A"} />
            </div>
          </InfoCard>

          {/* Location & Borders */}
          <InfoCard title="Location & Borders">
            <div className="space-y-4">
              <div>
                <h4 className="text-gray-500 font-medium mb-2">Timezones</h4>
                <div className="bg-gray-50 p-3 rounded-lg text-sm">
                  {country.timezones.join(", ")}
                </div>
              </div>
              
              <div>
                <h4 className="text-gray-500 font-medium mb-2">Borders</h4>
                {borderCountries.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {borderCountries.map((border, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                        {border}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="italic text-gray-500">No bordering countries</p>
                )}
              </div>
              
              <div className="pt-2">
                <a 
                  href={country.maps.googleMaps} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="View on Google Maps"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  View on Google Maps
                </a>
              </div>
            </div>
          </InfoCard>

          {/* Translations */}
          <InfoCard title="Translations">
            <div className="bg-gray-50 p-4 rounded-lg">
              {country.translations ? (
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {Object.entries(country.translations).slice(0, 8).map(([lang, val], idx) => (
                    <div key={idx} className="flex justify-between items-center py-1 border-b border-gray-100 last:border-b-0">
                      <span className="text-gray-500 uppercase text-xs font-medium">{lang}</span>
                      <span className="font-medium text-sm text-gray-800">{val.common}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="italic text-gray-500">No translation data available</p>
              )}
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
}

export default CountryDetails;