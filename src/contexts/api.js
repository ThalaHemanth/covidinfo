import { useEffect, createContext, useState, useContext } from 'react';
import axios from 'axios';
import useSWR from 'swr';

const ApiContext = createContext({
  currentData: [],
  rem: [],
  city: [],
  currentPage: 1,
  totalPages: [],
  firstIndex: [],
  lastIndex: [],
  tableData: [],
  turnPage: () => {},
});

export function ApiProvider(props) {
  const [currentData, setCurrentData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

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
  }, [rem, city]);

  return (
    <ApiContext.Provider
      value={{
        currentData: currentData,
        rem: remdesivirData,
        city: cityWiseData,
        totalPages: totalPages,
        firstIndex: firstIndex,
        lastIndex: lastIndex,
        // turnPage: turnPage,
        currentPage: currentPage,
        tableData: tableData,
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
