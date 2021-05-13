export default function MyTable() {
  return (
    <div className="bg-gray-200 py-6">
      <div className="max-w-7xl mx-auto sm:px-6">
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-m-6">
            <div className="py-2 align-middle min-w-full sm:px-6 inline-block">
              <div className="shadow border-gray-200 border-b overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y-2 divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Role
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody data-todo-x-max="2">
                    <tr className="bg-white" data-todo-x-description="Odd row">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        Jane Cooper
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Regional Paradigm Technician
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        jane.cooper@example.com
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Admin
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="/"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
