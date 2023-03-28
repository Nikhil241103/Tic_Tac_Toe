import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import DataContext from "../context/DataContext";

const Home = () => {
    const navigate = useNavigate()
    const { setIsSeries, setXColor, setOColor } = useContext(DataContext)

    const handleQuickGame = (e) => {
        e.preventDefault()
        setIsSeries(false)
        navigate("/play")
    }

    const handleSeries = (e) => {
        e.preventDefault()
        setIsSeries(true)
        navigate("/series")
    }

    return (
        <div id="home">
            <button onClick={(e) => handleQuickGame(e)}>Quick Game</button>
            <button onClick={(e) => handleSeries(e)}>Series</button>
        </div>
    )
}

export default Home