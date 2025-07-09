import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import { 
  Homepage, 
  JourneyStart, 
  CareerJourney, 
  QuizPage, 
  ResultPage 
} from './components';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/journey/:career" element={<JourneyStart />} />
          <Route path="/career/:career" element={<CareerJourney />} />
          <Route path="/quiz/:career/:step" element={<QuizPage />} />
          <Route path="/result/:career" element={<ResultPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;