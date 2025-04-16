import { React } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DetailForm from './form/DetailsForm';


function App() {

  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DetailForm />} />
      </Routes>
    </Router>
  );
}

export default App
