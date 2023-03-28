import Layout from "./components/Layout";
import Home from "./components/Home";
import Mode from "./components/Mode";
import Board from "./components/Board";
import Result from "./components/Result";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="series" element={<Mode />} />
        <Route path="play" element={<Board />} />
        <Route path="result" element={<Result />} />
      </Route>
    </Routes>
  );
}

export default App;
