import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import Home from './Home'
import Gallery from './Gallery'
import Error from './Error'
import User from './User'

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements([
      <Route path="/" element={<Home />} />,
      <Route path="/galleries/:id" element={<Gallery />} />,
      <Route path="/users/:userId" element={<User />} />,
      <Route path="*" element={<Error />} />,
    ]),
  )

  return <RouterProvider router={router} />
}

export default App
