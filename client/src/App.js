import axios from 'axios';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Landing from '../src/pages/Landing';
import Map from '../src/pages/Map';

function App() {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}`, {
        withCredentials: true,
      })
      .then(res => {
        console.log('나는 클라다');
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/map" element={<Map />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
