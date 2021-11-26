import './App.css';
import axios from 'axios';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}`, {
        withCredentials: true,
      })
      .then(res => {
        console.log('나는 클라이언트다');
      })
      .catch(err => console.log(err));
  }, []);
  return <div className="App"></div>;
}

export default App;
