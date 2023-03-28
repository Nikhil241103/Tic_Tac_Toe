import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import DataContext from "../context/DataContext";

const Mode = () => {
    const {
        player1Color, setPlayer1Color,
        player2Color, setPlayer2Color,
        options,
        setXColor, setOColor,
        setNumberOfMatches,
        setSquares,
        setIsPlayer1Next,
        setMatchNumber,
        setWinDecider,        
    } = useContext(DataContext)
    const navigate = useNavigate()
    let numberOfMatchesList = Array.from({ length: 10 }, (value, index) => {
        return { value: index + 1, label: index + 1 }
    })

    const colorStyles = {
        control: (styles) => ({ ...styles, backgroundColor: "black", color: "aqua" }),
        option: (styles, { data }) => ({ ...styles, backgroundColor: "black", color: data.value, cursor: "pointer" }),
        singleValue: (styles, { data }) => ({ ...styles, color: data.value }),
    }

    const colorStylesList = {
        control: (styles) => ({ ...styles, backgroundColor: "black", color: "aqua" }),
        option: (styles, { data }) => ({ ...styles, backgroundColor: "black", color: "aqua", cursor: "pointer" }),
        singleValue: (styles, { data }) => ({ ...styles, color: "aqua" }),
    }

    const handlePlayer1Color = (e) => {
        setPlayer1Color(e)
        setXColor(e.value)
    }

    const handlePlayer2Color = (e) => {
        setPlayer2Color(e)
        setOColor(e.value)
    }

    const handleSeries = (e) => {
        setNumberOfMatches(e.value)
    }

    const onStartHandle = (e) => {
        e.preventDefault()
        navigate("/play")
    }

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
        <div id="mode">
            <h3 style={{ color: player1Color?.color }}>Player 1</h3>
            <Select
                className="drop-down"
                options={options.filter(option => (option.value !== player2Color?.value && option.value !== player1Color?.value))}
                styles={colorStyles}
                onChange={(e) => handlePlayer1Color(e)}
            />
            <h3 style={{ color: player2Color?.color }}>Player 2</h3>
            <Select
                className="drop-down"
                options={options.filter(option => (option.value !== player2Color?.value && option.value !== player1Color?.value))}
                styles={colorStyles}
                onChange={(e) => handlePlayer2Color(e)}
            />
            <h3>Number of matches</h3>
            <Select
                className="drop-down"
                options={numberOfMatchesList}
                styles={colorStylesList}
                onChange={(e) => handleSeries(e)}
            />
            <section className="buttons">
                <button onClick={(e) => onStartHandle(e)}>Start</button>
                <button onClick={(e) => onClickHome(e)}>Home</button>
            </section>
        </div>
    );
}

export default Mode