import './App.css';
import axios from 'axios';
import { useEffect } from 'react';

import Landing from '../src/pages/Landing'

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
    <Landing />
  </div>);
}

export default App;
