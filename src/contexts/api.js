import { useEffect, createContext, useState, useContext } from 'react';
import axios from 'axios';
import useSWR from 'swr';

const ApiContext = createContext({
  currentData: [],
  rem: [],
  city: [],
  searchFN: (searchTerm, route) => {},
  clearSearch: () => {},
  searchData: [],
  noSearchResults: false,
});

export function ApiProvider(props) {
  const [currentData, setCurrentData] = useState([]);

  const [noSearchResults, setNoSearchResults] = useState(false);

  const [searchData, setSearchData] = useState([]);

  const [rem, setRem] = useState([]);
  const [city, setCity] = useState([]);

  const fetcher = (args) => axios.get(args).then((res) => res.data);
  const { data: remdesivirData, error1 } = useSWR(
    'https://covid-help-backend.vercel.app/api/rem',
    fetcher
  );
  const { data: cityWiseData, error2 } = useSWR(
    'https://covid-help-backend.vercel.app/api/city',
    fetcher
  );

  useEffect(() => {
    setRem(remdesivirData?.data);
    setCity(cityWiseData?.data);
  }, [rem, city, searchData]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchData.length === 0) {
        setNoSearchResults(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [searchData]);

  function clearSearch() {
    setSearchData([]);
  }

  function searchFN(searchTerm, route) {
    console.log('Entered function SearchFN');
    return new Promise((resolve) => {
      if (searchTerm === '') {
        setSearchData([]);
        resolve(true);
      }
      if (route === '/') {
        let arr1 = cityWiseData?.data.filter((item) =>
          item.necessity
            .toLowerCase()
            .trim()
            .includes(searchTerm.toLowerCase().trim())
        );
        if (arr1.length) {
          setSearchData(arr1);
          resolve(true);
        } else {
          setSearchData([]);
          resolve(true);
        }
      }
      if (route === '/remdesivir') {
        let arr1 = remdesivirData?.data.filter((item) =>
          item.state
            .toLowerCase()
            .trim()
            .includes(searchTerm.toLowerCase().trim())
        );

        if (arr1.length) {
          setSearchData(arr1);
          resolve(true);
        } else {
          setSearchData([]);
          resolve(true);
        }
      }
    });
  }

  return (
    <ApiContext.Provider
      value={{
        currentData: currentData,
        rem: remdesivirData,
        city: cityWiseData,
        searchData: searchData,
        searchFN: searchFN,
        clearSearch: clearSearch,
        noSearchResults: noSearchResults,
      }}
    >
      {!cityWiseData && !remdesivirData ? (
        <div> Loading!!!!!</div>
      ) : (
        props.children
      )}
    </ApiContext.Provider>
  );
}

export const useApiContext = () => useContext(ApiContext);
