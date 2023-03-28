import { useState, createContext } from "react";

const DataContext = createContext()

export const DataProvider = ({ children }) => {
    const [squares, setSquares] = useState(Array(9).fill(null))
    const [isPlayer1Next, setIsPlayer1Next] = useState(true)
    const [player1Color, setPlayer1Color] = useState(null)    
    const [player2Color, setPlayer2Color] = useState(null)  
    const [xColor, setXColor] = useState("red")
    const [oColor, setOColor] = useState("blue")
    const [isSeries, setIsSeries] = useState(false)
    const [numberOfMatches, setNumberOfMatches] = useState(2)
    const [matchNumber, setMatchNumber] = useState(0)
    const [winDecider, setWinDecider] = useState(0)
    const [tableData, setTableData] = useState([
        {"match": 1, "winner": ""},
        {"match": 2, "winner": ""},
        {"match": 3, "winner": ""},
        {"match": 4, "winner": ""},
        {"match": 5, "winner": ""},
        {"match": 6, "winner": ""},
        {"match": 7, "winner": ""},
        {"match": 8, "winner": ""},
        {"match": 9, "winner": ""},
        {"match": 10, "winner": ""},
    ])

    const options = [
        { value: "#FF0000", label: "Red" },
        { value: "#FFAE00", label: "Orange" },
        { value: "#FFF700", label: "Yellow" },
        { value: "#BBFF00", label: "Lime" },
        { value: "#15FF00", label: "Green" },
        { value: "#00FFD0", label: "Aquamarine" },
        { value: "#2200FF", label: "Blue" },
        { value: "#FF0088", label: "Magenta" },
        { value: "#8000FF", label: "Violet" },

    ]

    const declareWinner = () => {
        const winningCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]
        for (let i = 0; i < winningCombos.length; i++) {
            const [a, b, c] = winningCombos[i];
            if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) return squares[a]
        }
        let flag = 0;
        for(let i = 0; i < squares.length; i++) {
            if(squares[i] === null) {
                flag = 1;
                break;
            }
        }
        if(flag === 0) return 'T'
        return null
    }

    const statusColor = () => {
        const winner = declareWinner()
        if(winner && winner !== "T") {
            if(isPlayer1Next) return oColor
            return xColor
        }
        return "aqua";
    }

    const handleClick = (e, index) => {
        e.preventDefault()
        if (squares[index] || declareWinner()) return
        const newSquares = squares.slice()
        if (isPlayer1Next) {
            newSquares[index] = 'X'
        } else {
            newSquares[index] = 'O'
        }
        setSquares(newSquares)
        setIsPlayer1Next(!isPlayer1Next)
    }

    return (
        <DataContext.Provider value={{
            squares, setSquares,
            isPlayer1Next, setIsPlayer1Next,
            handleClick,
            declareWinner,
            player1Color, setPlayer1Color,
            player2Color, setPlayer2Color,
            options,
            xColor, setXColor,
            oColor, setOColor,
            statusColor,
            isSeries, setIsSeries,
            numberOfMatches, setNumberOfMatches,
            winDecider, setWinDecider,
            tableData, setTableData,
            matchNumber, setMatchNumber,
        }}>
            {children}
        </DataContext.Provider>
    );
}

export default DataContext