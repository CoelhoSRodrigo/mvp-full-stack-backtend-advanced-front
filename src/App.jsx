import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import './App.css'
import Topbar from './components/topBar'
import DogSelectionPage from './pages/DogSelectionPage'
import KennelPage from './pages/KennelPage'

function App() {
  const Layout = () => (
    <>
      <Topbar />
      <Outlet />
    </>
  )

  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" exact Component={DogSelectionPage} />
            <Route path="/kennel" Component={KennelPage} />
          </Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
