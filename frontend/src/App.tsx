import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatSection from './Pages/ChatSection/ChatSection';
import Login from './Pages/Auth/Login';
import Landing from './Pages/Landing';
import Dashboard from './Pages/Dashboard/Dashboard';

const App = () => {
  // This used for protected route
  // const storedUser = localStorage.getItem('user');
  // const user = storedUser ? JSON.parse(storedUser) : null;
  // const token = user?.token;

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Landing />} />
          <Route path='/auth' element={<Login />} />
          <Route path='/order' element={<ChatSection />}/>
          <Route path='/admin' element={<Dashboard />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
