import React from "react";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Gallery from "./components/Gallery";

function App() {
  return (
    <Router>
      <Routes>
  <Route exact path='/'  element={<Gallery/>} />
    </Routes>
    </Router>
    
  
  );
}

export default App;
