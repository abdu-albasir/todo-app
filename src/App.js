import React from 'react';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <nav>
          <Link to="/">Главная</Link> * <Link to="/about">О нас</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
