import { Link } from 'react-router-dom';
import { links } from '../../extras/links';

export default function Links() {
  return (
    <div className="flex flex-col justify-center items-center h-max mt-16">
      <h1 className="text-4xl text-gray-500">Helpful Resources</h1>
      <div className="flex flex-row flex-wrap w-3/4  mt-16">
        {links.map((link) => {
          return (
            <div className="h-max w-max bg-gray-300 text-gray-700 text-xl my-6 mx-3 p-2">
              <a href={`https://${link.name}`} target="_blank">
                {link.name}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
