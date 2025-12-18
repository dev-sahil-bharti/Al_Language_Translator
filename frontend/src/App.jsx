import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Translate from "./pages/Translate";

function App() {
    return (
        <Router>
            <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-950">
                <Routes>
                    <Route path="/" element={<Translate />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
