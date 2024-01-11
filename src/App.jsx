import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import ConverterPage from "./pages/Converter";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='' element={<ConverterPage />} />

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </Router>
  );
};

export default App;
