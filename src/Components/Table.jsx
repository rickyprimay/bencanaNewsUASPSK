import React from "react";

const Table = ({ data, columns, actions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border-collapse">
        <thead className="bg-teal-600 text-white">
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-4 py-2">
                {col.header}
              </th>
            ))}
            {actions && <th className="px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex} className="border px-4 py-2">
                  {col.render ? col.render(item) : item[col.accessor]}
                </td>
              ))}
              {actions && (
                <td className="border px-4 py-2">
                  {actions.map((action, actionIndex) => (
                    <button
                      key={actionIndex}
                      onClick={() => action.onClick(item)}
                      className={`px-4 py-2 rounded-lg ${action.className}`}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
