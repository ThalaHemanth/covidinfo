import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useApiContext } from '../contexts/api';
import useDidMount from '../hooks/mount';

/*
    a timer that triggers when the search is activated.
    after 3 seconds it checks the searchdata if there is no data then setnosearchresults to true
    and reset the timer.

    useEffect hook with set timeout with searchTimeout state;
    start dont care the hook.
    search starts then triggers the hook.
    check if the search is active.
    perform the operation.
 */

export default function Navbar() {
  const history = useHistory();
  const { searchFN, clearSearch } = useApiContext();
  const [searchPlaceholder, setSearchPlaceholder] = useState('');
  const [hideNav, setHideNav] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const isFirstRender = useDidMount();
  useEffect(() => {
    const search = async () => {
      if (searchTerm.length <= 0) {
        history.push('/nosearchresults');
      }
      await searchFN(searchTerm, location.pathname);
      history.push('/search');
    };
    if (isFirstRender) {
    } else {
      const timerId = setTimeout(() => {
        search();
      }, 2000);
      return () => clearTimeout(timerId);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (
      location.pathname === '/search' ||
      location.pathname === '/nosearchresults' ||
      location.pathname === '/links'
    ) {
      setHideNav(true);
    } else {
      setHideNav(false);
    }
    location.pathname === '/remdesivir'
      ? setSearchPlaceholder('Search States')
      : setSearchPlaceholder('Search Resources');
  }, [location.pathname, hideNav]);

  const links = [
    {
      name: 'Remdesivir',
      path: '/remdesivir',
    },
    {
      name: 'All Resources',
      path: '/',
    },
    {
      name: 'Links',
      path: '/links',
    },
    // {
    //   name: 'Tweet Feed',
    //   path: '/tweets',
    // },
  ];

  return (
    <div
      className={`h-16 sticky bg-white w-full flex flex-row shadow-md  items-center `}
    >
      <div className="font-custom text-3xl text-covidOrange ml-4 px-3 py-3">
        <NavLink to="/" strict>
          Covid Help
        </NavLink>
      </div>
      <p className="-mx-1 py-5">🇮🇳</p>
      <div className="w-3/6 m-auto h-16 flex flex-row items-center justify-center">
        {links.map((link) => {
          return (
            <NavLink
              exact
              className="font-custom font-medium bg-white py-1  px-2"
              activeClassName="border-b-2 border-covidOrange"
              key={link.name}
              to={link.path}
              strict
            >
              {link.name}
            </NavLink>
          );
        })}
      </div>
      <div
        className={`h-2/4 w-48 rounded-sm mr-16 border border-gray-200 flex flex-row items-center ${
          hideNav ? 'hidden' : ''
        }`}
      >
        <input
          className="h-full w-full p-2 text-sm bg-gray-100 outline-none font-medium focus:border-none"
          type="text"
          name="search"
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
          }}
          placeholder={searchPlaceholder}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="gray"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>
    </div>
  );
}

/*
 * main div with flex dir row shadow bg white
 * div for header
 * div for links {
 *   display flex
 *   flex dir row
 *   define width and height and align items center, justify space evenly or between
 *  }
 * */
