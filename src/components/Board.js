import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Square from "./Square";
import DataContext from "../context/DataContext";

const Board = () => {
    const { squares, setSquares,
        isPlayer1Next,
        declareWinner,
        statusColor,
        isSeries,
        numberOfMatches, setNumberOfMatches,
        setWinDecider, winDecider,
        tableData, setTableData,
        matchNumber, setMatchNumber } = useContext(DataContext)
    const [status, setStatus] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        check()
    }, [squares])

    const check = () => {
        const winner = declareWinner()
        if (winner) {
            let newTableData = tableData;
            if (winner === 'T') {
                setStatus("Tie!")
                newTableData[matchNumber] = { ...newTableData[matchNumber], "winner": "Tie" };
                setTableData(newTableData)
            }
            else {
                if (isPlayer1Next) {
                    setStatus("winner: Player 2")
                    setWinDecider(prev => prev + 1)
                    newTableData[matchNumber] = { ...newTableData[matchNumber], "winner": "Player 2" };
                    setTableData(newTableData)
                } else {
                    setStatus("winner: Player 1")
                    setWinDecider(prev => prev - 1)
                    newTableData[matchNumber] = { ...newTableData[matchNumber], "winner": "Player 1" };
                    setTableData(newTableData)
                }
            }
        }
        else setStatus("Next player: " + (isPlayer1Next ? "Player 1" : "Player 2"))
    }

    const reset = (e) => {
        if ((matchNumber + 1) === numberOfMatches) {
            navigate("/result", { replace: true })
        }
        e.preventDefault()
        const newSquares = squares.slice().fill(null)
        setSquares(newSquares)
        setMatchNumber(prev => prev + 1)
    }

    const colorValue = statusColor()

    const onClickHome = (e) => {
        e.preventDefault();
        navigate("/", { replace: true });
    }

    return (
        <div id="container">
            <div id="status" style={{ color: colorValue, borderColor: colorValue }}>{status}</div>
            <div id="board">
                <Square className="square border-right border-bottom" value={squares[0]} index={0} />
                <Square className="square border-right border-bottom" value={squares[1]} index={1} />
                <Square className="square border-bottom" value={squares[2]} index={2} />
                <Square className="square border-right border-bottom" value={squares[3]} index={3} />
                <Square className="square border-right border-bottom" value={squares[4]} index={4} />
                <Square className="square border-bottom" value={squares[5]} index={5} />
                <Square className="square border-right" value={squares[6]} index={6} />
                <Square className="square border-right" value={squares[7]} index={7} />
                <Square className="square " value={squares[8]} index={8} />
            </div>
            <section className="buttons">
                <button className="container-buttons" onClick={(e) => reset(e)} disabled={declareWinner() === null} >
                    {
                        !isSeries ? "New Game"
                            : numberOfMatches !== matchNumber + 1 ? "Next Game" : "View Results"
                    }
                </button>
                <button className="container-buttons" onClick={(e) => onClickHome(e)}>Home</button>
            </section>
        </div>
    )
}

export default Board