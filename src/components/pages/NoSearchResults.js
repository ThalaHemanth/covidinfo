import { Link } from 'react-router-dom';

export default function NoSearchResults() {
  return (
    <div className="w-full h-2/5  flex flex-row items-center justify-center">
      <h1 className="h-48 p-16 text-3xl">
        No Results Found{' '}
        <Link
          className="ml-2 -my-1 px-2 py-2 inline-flex items-center  cursor-pointer  border-2 border-covidOrange text-md  rounded-md text-gray-700"
          to="/"
        >
          {' '}
          Go Back
        </Link>
      </h1>
    </div>
  );
}
