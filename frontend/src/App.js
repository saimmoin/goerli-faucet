import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Donate from './Donate';
import WithDraw from './WithDraw';

function App() {
  return (
<BrowserRouter>
      <Routes>
        <Route path="/donate" element={<Donate />}>
        </Route>
        <Route path="/" element={<WithDraw />}>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;