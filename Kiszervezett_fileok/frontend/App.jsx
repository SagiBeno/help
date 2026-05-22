import './App.css';
import { Routes, Route } from 'react-router-dom';
import MyMenu from './Components/MyMenu';
import '@radix-ui/themes/styles.css';
import Home from './Pages/Home';
import Attractions from './Pages/Attractions';
import SearchResult from './Pages/SearchResult';

function App() {
 
  return (
    <>
      <MyMenu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cities/:id' element={<Attractions />} />
        <Route path='/search/:searchedWord' element={<SearchResult />} />
      </Routes>
    </>
  )
}

export default App
