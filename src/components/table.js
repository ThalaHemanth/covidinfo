export const Table = ({ data }) => {
  function renderTableHeaders() {
    let headers;
    headers = data ? Object.keys(data[0]).map((key) => key) : [];
    // headers = headers[0];
    return (
      <tr>
        {headers?.map((header, index) => {
          return (
            <th
              key={index}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {header}
            </th>
          );
        })}
      </tr>
    );
  }
  return data?.length ? (
    <>
      <div className="bg-gray-200 py-6">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <table className="min-w-full divide-y-2 divide-gray-200">
                    <thead className="bg-gray-50">{renderTableHeaders()}</thead>
                    <tbody data-todo-x-max="2">
                      {data?.map((row) => {
                        return (
                          <tr
                            className="bg-white"
                            data-todo-x-description="Odd row"
                          >
                            {Object.values(row).map((col, i) => {
                              return (
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                  {col}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>loading,,,</div>
  );
};
