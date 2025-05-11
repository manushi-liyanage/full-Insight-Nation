


// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';

// function CountryList() {
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedRegion, setSelectedRegion] = useState("");
//   const [selectedLanguage, setSelectedLanguage] = useState("");

//   // Fetch countries depending on filters
//   useEffect(() => {
//     const fetchCountries = async () => {
//       setLoading(true);
//       try {
//         let endpoint = "https://restcountries.com/v3.1/all";

//         if (searchTerm) {
//           endpoint = `https://restcountries.com/v3.1/name/${searchTerm}`;
//         } else if (selectedRegion) {
//           endpoint = `https://restcountries.com/v3.1/region/${selectedRegion}`;
//         }

//         const res = await axios.get(endpoint);
//         setCountries(res.data);
//       } catch (err) {
//         console.error("Error fetching countries", err);
//         setCountries([]); // Reset if not found
//       } finally {
//         setLoading(false);
//       }
//     };

//     const delay = setTimeout(fetchCountries, 500); // Debounce
//     return () => clearTimeout(delay);
//   }, [searchTerm, selectedRegion]);

//   // Unique regions/languages (from all countries initially)
//   const [allCountries, setAllCountries] = useState([]);
//   useEffect(() => {
//     axios.get("https://restcountries.com/v3.1/all").then(res => setAllCountries(res.data));
//   }, []);
//   const regions = [...new Set(allCountries.map(c => c.region).filter(Boolean))];
//   const allLanguages = allCountries.flatMap(c => c.languages ? Object.values(c.languages) : []);
//   const languages = [...new Set(allLanguages)].sort();

//   // Filter by language (client-side)
//   const filteredCountries = countries.filter((country) => {
//     const matchesLanguage =
//       selectedLanguage === "" ||
//       (country.languages && Object.values(country.languages).includes(selectedLanguage));
//     return matchesLanguage;
//   });

//   if (loading)
//     return <p className="text-center mt-10 text-gray-600">Loading countries...</p>;

//   return (
//     <>
//       <div className='text-center mt-6'>
//         <h1 className="text-3xl font-bold text-blue-700 mb-6">REST Countries App 🌍</h1>
//       </div>

//       <div className="p-4">
//         {/* Filters */}
//         <div className="flex flex-col gap-4 md:flex-row justify-center mb-6">
//           <input
//             type="text"
//             placeholder="Search for a country..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="border px-4 py-2 rounded shadow w-full max-w-md"
//           />

//           <select
//             value={selectedRegion}
//             onChange={(e) => setSelectedRegion(e.target.value)}
//             className="border px-4 py-2 rounded shadow w-full max-w-xs"
//           >
//             <option value="">All Regions</option>
//             {regions.map((region) => (
//               <option key={region} value={region}>{region}</option>
//             ))}
//           </select>

//           <select
//             value={selectedLanguage}
//             onChange={(e) => setSelectedLanguage(e.target.value)}
//             className="border px-4 py-2 rounded shadow w-full max-w-xs"
//           >
//             <option value="">All Languages</option>
//             {languages.map((lang) => (
//               <option key={lang} value={lang}>{lang}</option>
//             ))}
//           </select>
//         </div>

//         {/* Country Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//           {filteredCountries.map((country) => (
//             <Link to={`/country/${country.cca3}`} key={country.cca3}>
//               <div className="border p-4 rounded shadow hover:shadow-lg transition">
//                 <img
//                   src={country.flags.svg}
//                   alt={country.name.common}
//                   className="w-full h-40 object-cover rounded mb-4"
//                 />
//                 <h2 className="text-xl font-semibold">{country.name.common}</h2>
//                 <p><strong>Capital:</strong> {country.capital?.[0]}</p>
//                 <p><strong>Region:</strong> {country.region}</p>
//                 <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
//                 <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// }

// export default CountryList;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Link } from 'react-router-dom';

// function CountryList() {
//   const [countries, setCountries] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedRegion, setSelectedRegion] = useState("");
//   const [selectedLanguage, setSelectedLanguage] = useState("");

//   // Fetch countries depending on filters
//   useEffect(() => {
//     const fetchCountries = async () => {
//       setLoading(true);
//       try {
//         let endpoint = "https://restcountries.com/v3.1/all";

//         if (searchTerm) {
//           endpoint = `https://restcountries.com/v3.1/name/${searchTerm}`;
//         } else if (selectedRegion) {
//           endpoint = `https://restcountries.com/v3.1/region/${selectedRegion}`;
//         }

//         const res = await axios.get(endpoint);
//         setCountries(res.data);
//       } catch (err) {
//         console.error("Error fetching countries", err);
//         setCountries([]); // Reset if not found
//       } finally {
//         setLoading(false);
//       }
//     };

//     const delay = setTimeout(fetchCountries, 500); // Debounce
//     return () => clearTimeout(delay);
//   }, [searchTerm, selectedRegion]);

//   // Unique regions/languages (from all countries initially)
//   const [allCountries, setAllCountries] = useState([]);
//   useEffect(() => {
//     axios.get("https://restcountries.com/v3.1/all").then(res => setAllCountries(res.data));
//   }, []);
//   const regions = [...new Set(allCountries.map(c => c.region).filter(Boolean))];
//   const allLanguages = allCountries.flatMap(c => c.languages ? Object.values(c.languages) : []);
//   const languages = [...new Set(allLanguages)].sort();

//   // Filter by language (client-side)
//   const filteredCountries = countries.filter((country) => {
//     const matchesLanguage =
//       selectedLanguage === "" ||
//       (country.languages && Object.values(country.languages).includes(selectedLanguage));
//     return matchesLanguage;
//   });

//   if (loading)
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-50">
//         <div className="animate-pulse flex flex-col items-center">
//           <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//           <p className="mt-4 text-lg text-gray-600 font-medium">Loading countries...</p>
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
//       <div className="container mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center py-6">
//           <h1 className="text-4xl font-bold text-blue-700 mb-2">Insight Nations App</h1>
          
         
//           <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
//             Explore countries around the world, their flags, capitals, and more.
//           </p>
//         </div>

//         {/* Filters */}
//         <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">Filter Countries</h2>
//           <div className="flex flex-col gap-4 md:flex-row md:items-center">
//             <div className="flex-1">
//               <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
//               <div className="relative">
//                 <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                   <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                   </svg>
//                 </div>
//                 <input
//                   id="search"
//                   type="text"
//                   placeholder="Search for a country..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="border border-gray-300 pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full transition-colors"
//                 />
//               </div>
//             </div>

//             <div className="md:w-48">
//               <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Region</label>
//               <select
//                 id="region"
//                 value={selectedRegion}
//                 onChange={(e) => setSelectedRegion(e.target.value)}
//                 className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full appearance-none bg-white"
//               >
//                 <option value="">All Regions</option>
//                 {regions.map((region) => (
//                   <option key={region} value={region}>{region}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="md:w-48">
//               <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
//               <select
//                 id="language"
//                 value={selectedLanguage}
//                 onChange={(e) => setSelectedLanguage(e.target.value)}
//                 className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full appearance-none bg-white"
//               >
//                 <option value="">All Languages</option>
//                 {languages.map((lang) => (
//                   <option key={lang} value={lang}>{lang}</option>
//                 ))}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* Results Info */}
//         <div className="mb-6 flex justify-between items-center">
//           <p className="text-gray-600">
//             Showing <span className="font-semibold">{filteredCountries.length}</span> countries
//           </p>
//           {filteredCountries.length === 0 && (
//             <p className="text-amber-600 font-medium">No countries found matching your criteria</p>
//           )}
//         </div>

//         {/* Country Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredCountries.map((country) => (
//             <Link 
//               to={`/country/${country.cca3}`} 
//               key={country.cca3}
//               className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
//             >
//               <div className="aspect-w-3 aspect-h-2 overflow-hidden">
//                 <img
//                   src={country.flags.svg}
//                   alt={country.name.common}
//                   className="w-full h-48 object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
//                 />
//               </div>
//               <div className="p-5">
//                 <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{country.name.common}</h2>
//                 <div className="mt-3 space-y-1 text-gray-600">
//                   <p className="flex items-start">
//                     <span className="font-medium mr-2 text-gray-700 w-24">Capital:</span>
//                     <span>{country.capital?.[0] || "N/A"}</span>
//                   </p>
//                   <p className="flex items-start">
//                     <span className="font-medium mr-2 text-gray-700 w-24">Region:</span>
//                     <span>{country.region}</span>
//                   </p>
//                   <p className="flex items-start">
//                     <span className="font-medium mr-2 text-gray-700 w-24">Population:</span>
//                     <span>{country.population.toLocaleString()}</span>
//                   </p>
//                   <p className="flex items-start">
//                     <span className="font-medium mr-2 text-gray-700 w-24">Languages:</span>
//                     <span className="truncate">
//                       {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
//                     </span>
//                   </p>
//                 </div>
//                 <div className="mt-4 flex justify-end">
//                   <span className="text-blue-600 text-sm font-medium group-hover:text-blue-800 transition-colors flex items-center">
//                     View details
//                     <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                       <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
//                     </svg>
//                   </span>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>

//         {/* Empty state */}
//         {filteredCountries.length === 0 && !loading && (
//           <div className="mt-10 text-center py-16 bg-white rounded-lg shadow">
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="mt-2 text-lg font-medium text-gray-900">No countries found</h3>
//             <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
//             <div className="mt-6">
//               <button
//                 onClick={() => {
//                   setSearchTerm("");
//                   setSelectedRegion("");
//                   setSelectedLanguage("");
//                 }}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 Reset filters
//               </button>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       <footer className="mt-12 bg-gray-800 text-white py-6">
//         <div className="container mx-auto px-4 text-center">
//           <p className="text-gray-300">
//             REST Countries App | Built with React and Tailwind CSS
//           </p>
//           <p className="text-gray-400 text-sm mt-2">
//             Data provided by <a href="https://restcountries.com/" className="underline hover:text-white transition-colors">RESTCountries API</a>
//           </p>
//         </div>
//       </footer>
//     </div>
//   );
// }

// export default CountryList;


//updated

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [countriesPerPage, setCountriesPerPage] = useState(12);

  // Fetch countries depending on filters
  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        let endpoint = "https://restcountries.com/v3.1/all";

        if (searchTerm) {
          endpoint = `https://restcountries.com/v3.1/name/${searchTerm}`;
        } else if (selectedRegion) {
          endpoint = `https://restcountries.com/v3.1/region/${selectedRegion}`;
        }

        const res = await axios.get(endpoint);
        setCountries(res.data);
        setCurrentPage(1); // Reset to first page when filters change
      } catch (err) {
        console.error("Error fetching countries", err);
        setCountries([]); // Reset if not found
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchCountries, 500); // Debounce
    return () => clearTimeout(delay);
  }, [searchTerm, selectedRegion]);

  // Unique regions/languages (from all countries initially)
  const [allCountries, setAllCountries] = useState([]);
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(res => setAllCountries(res.data));
  }, []);
  const regions = [...new Set(allCountries.map(c => c.region).filter(Boolean))];
  const allLanguages = allCountries.flatMap(c => c.languages ? Object.values(c.languages) : []);
  const languages = [...new Set(allLanguages)].sort();

  // Filter by language (client-side)
  const filteredCountries = countries.filter((country) => {
    const matchesLanguage =
      selectedLanguage === "" ||
      (country.languages && Object.values(country.languages).includes(selectedLanguage));
    return matchesLanguage;
  });

  // Pagination logic
  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);
  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const goToNextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages));
  const goToPrevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-lg text-gray-600 font-medium">Loading countries...</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center py-6">
          <h1 className="text-4xl font-bold text-blue-700 mb-2">Insight Nations App</h1>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            Explore countries around the world, their flags, capitals, and more.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Filter Countries</h2>
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="search"
                  type="text"
                  placeholder="Search for a country..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-300 pl-10 pr-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full transition-colors"
                />
              </div>
            </div>

            <div className="md:w-48">
              <label htmlFor="region" className="block text-sm font-medium text-gray-700 mb-1">Region</label>
              <select
                id="region"
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full appearance-none bg-white"
              >
                <option value="">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>

            <div className="md:w-48">
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">Language</label>
              <select
                id="language"
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full appearance-none bg-white"
              >
                <option value="">All Languages</option>
                {languages.map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Info & Pagination Size Control */}
        <div className="mb-6 flex flex-col sm:flex-row justify-between items-center">
          <div className="flex items-center mb-4 sm:mb-0">
            <p className="text-gray-600">
              Showing <span className="font-semibold">{indexOfFirstCountry + 1}</span>-
              <span className="font-semibold">
                {Math.min(indexOfLastCountry, filteredCountries.length)}
              </span> of <span className="font-semibold">{filteredCountries.length}</span> countries
            </p>
          </div>
          
          <div className="flex items-center">
            <label htmlFor="countriesPerPage" className="text-sm font-medium text-gray-700 mr-2">
              Show:
            </label>
            <select
              id="countriesPerPage"
              value={countriesPerPage}
              onChange={(e) => {
                setCountriesPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing items per page
              }}
              className="border border-gray-300 px-2 py-1 rounded-md text-sm"
            >
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={24}>24</option>
              <option value={48}>48</option>
            </select>
          </div>
        </div>

        {filteredCountries.length === 0 && !loading && (
          <div className="mt-10 text-center py-16 bg-white rounded-lg shadow">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">No countries found</h3>
            <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
            <div className="mt-6">
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedRegion("");
                  setSelectedLanguage("");
                }}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Reset filters
              </button>
            </div>
          </div>
        )}

        {/* Country Cards */}
        {filteredCountries.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {currentCountries.map((country) => (
              <Link 
                to={`/country/${country.cca3}`} 
                key={country.cca3}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-w-3 aspect-h-2 overflow-hidden">
                  <img
                    src={country.flags.svg}
                    alt={country.name.common}
                    className="w-full h-48 object-cover object-center transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h2 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{country.name.common}</h2>
                  <div className="mt-3 space-y-1 text-gray-600">
                    <p className="flex items-start">
                      <span className="font-medium mr-2 text-gray-700 w-24">Capital:</span>
                      <span>{country.capital?.[0] || "N/A"}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="font-medium mr-2 text-gray-700 w-24">Region:</span>
                      <span>{country.region}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="font-medium mr-2 text-gray-700 w-24">Population:</span>
                      <span>{country.population.toLocaleString()}</span>
                    </p>
                    <p className="flex items-start">
                      <span className="font-medium mr-2 text-gray-700 w-24">Languages:</span>
                      <span className="truncate">
                        {country.languages ? Object.values(country.languages).join(", ") : "N/A"}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <span className="text-blue-600 text-sm font-medium group-hover:text-blue-800 transition-colors flex items-center">
                      View details
                      <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {filteredCountries.length > countriesPerPage && (
          <div className="mt-8 flex justify-center">
            <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              {/* Previous Page Button */}
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === 1 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Page Numbers */}
              {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                let pageNumber;
                
                // Logic for showing appropriate page numbers
                if (totalPages <= 5) {
                  // Show all pages if 5 or fewer
                  pageNumber = idx + 1;
                } else if (currentPage <= 3) {
                  // Near the start
                  pageNumber = idx + 1;
                  if (idx === 4) pageNumber = totalPages;
                } else if (currentPage >= totalPages - 2) {
                  // Near the end
                  if (idx === 0) pageNumber = 1;
                  else pageNumber = totalPages - (4 - idx);
                } else {
                  // In the middle
                  pageNumber = currentPage + idx - 2;
                  if (idx === 0) pageNumber = 1;
                  if (idx === 4) pageNumber = totalPages;
                }
                
                // Render ellipsis or page number
                if ((idx === 1 && pageNumber !== 2 && totalPages > 5) || 
                    (idx === 3 && pageNumber !== totalPages - 1 && totalPages > 5)) {
                  return (
                    <span key={`ellipsis-${idx}`} className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                  );
                }
                
                return (
                  <button
                    key={pageNumber}
                    onClick={() => paginate(pageNumber)}
                    className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                      currentPage === pageNumber
                        ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              
              {/* Next Page Button */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                  currentPage === totalPages 
                    ? 'text-gray-300 cursor-not-allowed' 
                    : 'text-gray-500 hover:bg-gray-50'
                }`}
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        )}
      </div>

      
    </div>
  );
}

export default CountryList;