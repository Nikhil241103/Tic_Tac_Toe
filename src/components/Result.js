import { useTable } from "react-table";
import { useMemo } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";

function Result() {
    const navigate = useNavigate()
    const {
        setSquares,
        setIsPlayer1Next,
        setMatchNumber,
        tableData,
        numberOfMatches, setNumberOfMatches,
        winDecider, setWinDecider,
    } = useContext(DataContext)
    const requiredTableData = tableData.sort(function (a, b) { return a.match < b.match ? -1 : 1; }).slice(0, numberOfMatches);
    const data = useMemo(() => requiredTableData, []);
    const columns = useMemo(
        () => [
            {
                Header: "Match Number",
                accessor: "match",
            },
            {
                Header: "Winner",
                accessor: "winner",
            },
        ], [requiredTableData]);

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

    const onClickHome = (e) => {
        e.preventDefault();
        setSquares(Array(9).fill(null))
        setIsPlayer1Next(true)
        setMatchNumber(0)
        setWinDecider(0)
        setNumberOfMatches(2)
        navigate("/", { replace: true });
    }

    return (
        <div id="table-container">
            <h1 className="result">Winner: {winDecider > 0 ? "Player 2" : "Player 1"}</h1>
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps()}>
                                    {column.render("Header")}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <button onClick={(e) => onClickHome(e)}>Home</button>
        </div>
    );
}

export default Result;