import { Edit } from './pages/Edit';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';

function App() {
  return (
    <div className='flex items-center justify-center h-screen w-screen'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </div>
  );
}

export default App;
