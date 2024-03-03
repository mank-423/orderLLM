import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatSection from './Pages/ChatSection/ChatSection';
import Login from './Pages/Auth/Login';
import Landing from './Pages/Landing';


const App = () => {
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const token = user?.token;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Landing />} />
          <Route path='/auth' element={<Login />} />
          <Route path='/order' element={<ChatSection />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
