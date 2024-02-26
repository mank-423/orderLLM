import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ChatSection from './Components/ChatSection/ChatSection';
import Login from './Components/Auth/Login';

const App = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = user?.token;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/order' element={<ChatSection />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
