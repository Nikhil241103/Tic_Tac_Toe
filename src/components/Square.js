import { useContext } from "react";
import DataContext from "../context/DataContext";

const Square = ({ className, value, index }) => {
  const { handleClick, xColor, oColor } = useContext(DataContext)

  return (
    <button
      className={className}
	    style={{ color: value === 'X' ? xColor : oColor }}
      onClick={(e) => handleClick(e, index)}
    >{value}</button>
  )
}

export default Square