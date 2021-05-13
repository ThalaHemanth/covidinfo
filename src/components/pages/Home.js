import { Suspense, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { Table } from '../table';

import { useApiContext } from '../../contexts/api';

import { NEXT, PREV } from '../../constants/constants';

function Container(props) {
  return (
    <div className="max-h-screen max-w-max bg-gray-200 min-h-screen min-w-full">
      {props.children}
    </div>
  );
}

const Loading = () => <div>Loading</div>;

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
        <div className="mt-6" />
        <Table data={tableData} />
        <div className="flex flex-row bg-yellow-500">
          <button onClick={() => turnPage(PREV)}>Prev</button>
          <pre>
            Showing
            {currentPage}
            of
            {totalPages}
          </pre>
          <button onClick={() => turnPage(NEXT)}>Next</button>
          <Link to={location.pathname === '/' ? '/remdesivir' : '/'}>
            Click
          </Link>
        </div>
      </Container>
    </>
  );
}
