import React, { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";

const ApiContext = React.createContext({
  remdesivir: [],
  citywise: [],
  currentPage: 1,
  pages: [],
  totalPages: 0,
  paginationGroup: [],
  pageLimit: 10,
  tableData: [],
  firstIndex: 0,
  lastIndex: 0,
  setTableData_f: () => {},
  setMainData: () => {},
});

export function ApiContextProvider(props) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [tableData, setTableData] = React.useState([]);
  const [remdesivir, setRemdesivir] = React.useState([]);
  const [cityWise, setCityWise] = React.useState([]);
  const [firstIndex, setFirstIndex] = React.useState(0);
  const [lastIndex, setLastIndex] = React.useState(0);
  const [paginationGroup, setPaginationGroup] = React.useState([]);

  const fetcher = (args) => axios.get(args).then((res) => res.data);
  const { data: remdesivirData, error1 } = useSWR(
    "https://covid-help-backend.vercel.app/api/rem",
    fetcher
  );
  const { data: cityWiseData, error2 } = useSWR(
    "https://covid-help-backend.vercel.app/api/city",
    fetcher
  );

  useEffect(() => {
    setRemdesivir(remdesivirData);
    setCityWise(cityWiseData);
  }, [remdesivirData, cityWiseData]);

  function pagination(current, pageLimit) {
    let start = Math.floor((current - 1) / pageLimit) * pageLimit;
    const activePagination = Array.from(pageLimit)
      .fill()
      .map((_, index) => start + index + 1);
    setPaginationGroup(activePagination);
  }

  function setMainData(rem, city) {
    setRemdesivir(rem);
    setCityWise(city);
  }

  function setTableData_f(data) {
    setTableData(data);
  }

  function turnPage(pageNumber = 1, button) {
    if (button) {
      if (button === "prev" && !currentPage <= 1) {
        setCurrentPage(currentPage - 1);
        return;
      }
      if (button === "next" && !currentPage >= totalPages.length) {
        setCurrentPage(currentPage + 1);
        return;
      }
    }
    setCurrentPage(pageNumber);
  }
  return (
    <ApiContext.Provider
      value={{
        remdesivir: remdesivir,
        citywise: cityWise,
        currentPage: currentPage,
        turnPage: turnPage,
        totalPages: totalPages,
        paginationGroup: paginationGroup,
        pagination: pagination,
        setTableData_f: setTableData_f,
        tableData: tableData,
        setMaindata: setMainData,
      }}
    >
      {props.children}
    </ApiContext.Provider>
  );
}

export const useApiContext = () => React.useContext(ApiContext);
