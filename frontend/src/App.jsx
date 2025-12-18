import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'
import Navbar from './Components/Navbar'
import Translate from './pages/Translate'
function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Translate />} />
          <Route path="*" element={<Translate />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
