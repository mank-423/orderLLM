import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ChatSection from './Components/ChatSection/ChatSection'
import Login from './Components/Auth/Login'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/order' element={<ChatSection />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
