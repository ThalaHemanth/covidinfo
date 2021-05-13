import { NavLink } from 'react-router-dom';

export default function Navbar() {
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
    {
      name: 'Tweet Feed',
      path: '/tweets',
    },
  ];
  return (
    <div className="h-16 sticky bg-white w-full flex flex-row shadow-md align-middle">
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
