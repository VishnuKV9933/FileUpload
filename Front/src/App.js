import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from './Home'
import Download from './Download';


function App() {


  return (
    <BrowserRouter>
  
  <Routes>
  <Route exact path="/" element={<Home/>}/>
    <Route exact path="/download" element={<Download/>}/>
  </Routes>

  </BrowserRouter>
  );
}

export default App;
