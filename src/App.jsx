import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BucketList from './pages/BucketList';
import Navbar from './components/Navbar';
import './App.css';

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/bucketlist' element={<BucketList />} />
      </Routes>
    </>
  );
};

export default App;
