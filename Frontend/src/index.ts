import React from 'react';
// import ReactDOM from 'react-dom/client';
import ReactDOM from 'react-dom';
import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// FIX FOR DOWNGRADING FROM REACT18 TO REACT17.0.2, THIS IS FOR USING 'recharts' WHICH AT THIS TIME DOES NOT SUPPORT REACT18
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
