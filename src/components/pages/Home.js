import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Table } from '../table';

import { NEXT, PREV } from '../../constants/constants';

function Container(props) {
  return (
    <div className="max-h-screen max-w-max bg-gray-200 min-h-screen min-w-full">
      {props.children}
    </div>
  );
}

export default function Home(props) {
  const data = props.data?.data;
  const [currentPage, setCurrentPage] = useState(1);
  const [firstIndex, setFirstIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [totalPages, setTotalPages] = useState();
  const pageLimit = 10;

  const location = useLocation();

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(Math.floor(data?.length / pageLimit));
    setFirstIndex(currentPage * pageLimit - pageLimit);
    setLastIndex(currentPage * pageLimit);
    setTableData(data?.slice(firstIndex, lastIndex));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(Math.floor(data?.length / pageLimit));
    setFirstIndex(currentPage * pageLimit - pageLimit);
    setLastIndex(currentPage * pageLimit);
    setTableData(data?.slice(firstIndex, lastIndex));
  }, [location]);

  useEffect(() => {
    setTotalPages(Math.floor(data?.length / pageLimit));
    setFirstIndex(currentPage * pageLimit - pageLimit);
    setLastIndex(currentPage * pageLimit);
    setTableData(data?.slice(firstIndex, lastIndex));
  }, [currentPage, firstIndex, totalPages]);

  function turnPage(button) {
    if (button === PREV) {
      if (currentPage === 1) {
        return;
      }

      setCurrentPage((prevState) => prevState - 1);
    }
    if (button === NEXT) {
      if (currentPage === totalPages) {
        return;
      }
      setCurrentPage((prevState) => prevState + 1);
    }
  }

  return isLoading ? (
    <div>Loading</div>
  ) : (
    <>
      <Container>
        <Table data={tableData} />
        <div className="w-full h-12 bg-gray-200  flex flex-row justify-center -mt-4 pr-14">
          <p className="text-sm text-gray-700 ml-16 mt-2 -mr-2">
            Showing{' '}
            <span className="font-medium">
              {firstIndex === 0 ? 1 : firstIndex}
            </span>{' '}
            to <span className="font-medium">{lastIndex}</span> items of{' '}
            <span className="font-medium">{totalPages}</span> pages
          </p>
          <div className="flex-1 flex  sm:justify-end mb-3">
            <a
              onClick={() => turnPage(PREV)}
              className="inline-flex items-center cursor-pointer  px-5 border border-white text-sm  rounded-md text-white bg-covidOrange"
            >
              Previous
            </a>
            <a
              onClick={() => turnPage(NEXT)}
              className=" ml-3 mr-3 inline-flex items-center px-5 cursor-pointer  border border-white text-sm  rounded-md text-white bg-covidOrange"
            >
              Next
            </a>
          </div>
        </div>
      </Container>
    </>
  );
}
