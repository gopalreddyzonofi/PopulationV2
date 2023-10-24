import React, { useEffect, useState } from "react";
import { useTable, useSortBy, useFilters } from "react-table";
import { population, fetchData } from "../api";
import { SummaryCard } from "./summary-card";
import { FooterCard } from "./footer";
import Pagination from "./pagination";

type Column = {
  Header: string;
  accessor: keyof population;
};

const columns: Column[] = [
  {
    Header: "ID",
    accessor: "id",
  },
  {
    Header: "Country",
    accessor: "country",
  },
  {
    Header: "Year",
    accessor: "year",
  },
  {
    Header: "TotalMale",
    accessor: "totalMale",
  },
  {
    Header: "TotalFemale",
    accessor: "totalFemale",
  },
];

export const PopulationGrid = () => {
  const [data, setData] = useState<population[]>([]);
  const [summary, setSummary] = useState({
    avgMalePopulation: 0,
    avgFemalePopulation: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortDirection, setSortDirection] = useState("asc");
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [showSearchText, setShowSearchText] = useState(false);

  const handleSort = (headerText: string) => {
    setPageNumber(1);
    setSortBy(headerText?.toLowerCase());
    setSortDirection(sortDirection === "asc" ? "desc" : "asc");
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
      },

      useFilters,

      useSortBy
    );
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && e.target.value) {
      setSearchTerm(e.target.value);
      loadData();
      searchTerm && setShowSearchText(true);
    }
  };

  const loadData = (clear?: boolean) => {
    fetchData(!clear ? searchTerm : "", sortBy, sortDirection, pageNumber)
      .then((responseData) => {
        setData(responseData.data);
        setSummary({
          avgFemalePopulation:
            responseData.data.reduce((sum, pop) => sum + pop.totalMale, 0) /
            responseData.data.length,
          avgMalePopulation:
            responseData.data.reduce((sum, pop) => sum + pop.totalFemale, 0) /
            responseData.data.length,
        });
        setTotalPages(Math.ceil(responseData.totalCount / 10));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      loadData();
    }, 200);
  }, [sortBy, sortDirection, pageNumber]);

  const clearSearch = () => {
    setSearchTerm("");
    setShowSearchText(false);
    loadData(true);
  };

  return (
    <div className="container" style={{ width: "100%" }}>
      <header className="header">
        <h1>Population Data</h1>
        <div className="summary-container">
          <SummaryCard
            title="Average Total Male"
            value={summary?.avgMalePopulation?.toFixed(2) ?? "0"}
          />
          <SummaryCard
            title="Average Total Female"
            value={summary?.avgFemalePopulation?.toFixed(2) ?? "0"}
          />
        </div>

      </header>

      {loading ? (
        <div className="container-loader">
          <div className="loader"></div>
        </div>
      ) : data?.length === 0 && !searchTerm ? (
        <p style={{ textAlign: "center" }}>No data Available...</p>
      ) : (
        <div className="table-container">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            onKeyDown={handleKeyDown}
            style={{
              padding: "12px 12px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              marginBottom: "20px",
            }}
          />
          {searchTerm && showSearchText && (
            <>
              <button onClick={clearSearch}>Clear Search</button>
              <p>
                Showing results for: <strong>{searchTerm}</strong>
              </p>
            </>
          )}

          <table
            {...getTableProps()}
            style={{ width: "100%", borderCollapse: "collapse" }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  style={{ background: "#F5F5F5" }}
                >
                  {headerGroup.headers.map((column: any) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      style={{
                        borderBottom: "1px solid #e0e0e0",
                        padding: "10px",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      {column.render("Header")}
                      <button onClick={() => handleSort(column.Header)}>
                        <div>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="9.75"
                            height="12"
                            viewBox="0 0 9.75 12"
                          >
                            <path
                              id="icons8-sort"
                              d="M16.264,8.156a.562.562,0,0,0-.777,0l-4.312,4.125a.563.563,0,0,0,.388.969h8.625a.563.563,0,0,0,.389-.969Zm3.924,6.594H11.563a.563.563,0,0,0-.389.969l4.312,4.125a.563.563,0,0,0,.778,0l4.312-4.125a.563.563,0,0,0-.389-.969Z"
                              transform="translate(-11 -8)"
                              fill="#9295a5"
                            />
                          </svg>
                        </div>
                      </button>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row: any) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    style={{ borderBottom: "1px solid #e0e0e0" }}
                  >
                    {row.cells.map((cell: any) => (
                      <td {...cell.getCellProps()} style={{ padding: "10px" }}>
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      <br />

      <Pagination
        currentPage={pageNumber}
        totalPages={totalPages}
        onPageChange={(page) => setPageNumber(page)}
      />
      <br />
      <FooterCard title="HiscoDev" />
    </div>
  );
};
