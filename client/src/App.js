import {createBrowserRouter,RouterProvider} from 'react-router-dom';


//Importing all the components for route
import Signup from './components/Signup';
import Password from './components/Password'
import Profile from './components/Profile'
import Recovery from './components/Recovery'
import Username from './components/Username'
import PageNotFound from './components/PageNotFound'
import Reset from './components/Reset'
import { Authorization,ProtectRoute } from './middleware/auth'


// Creating Routers object
const router = createBrowserRouter([
  {
    path: "/",
    element: <Username> </Username>
  },
  {
    path: "/signup",
    element: <Signup></Signup>
  },
  {
    path: "/password",
    element: <ProtectRoute><Password/></ProtectRoute>
  },
  {
    path: "/profile",
    element: <Authorization><Profile/></Authorization>
  },
  {
    path: "/recovery",
    element: <Recovery></Recovery>
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>
  },
  {
    path: "/reset",
    element: <Reset></Reset>
  }
])

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
