import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools'

import './App.css'

const LoadingScreen = () => (<p>loading</p>)
const Loadable = (Component) => (props) => {
  // const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );
};

function App() {
  // AUTHENTICATION
  const Register = Loadable(lazy(() => import('./pages/auth/register')));
  const Login = Loadable(lazy(() => import('./pages/auth/login')));

  //DASHBOARD
  const Sidebar = Loadable(lazy(() => import('./components/sidebar/sidebar')))
  const Home = Loadable(lazy(() => import('./pages/dashboard')))
  const Settings = Loadable(lazy(() => import('./pages/settings')))
  const Profile = Loadable(lazy(() => import('./pages/profile')))
  const Products = Loadable(lazy(() => import('./pages/products')))
  const Category = Loadable(lazy(() => import('./pages/category')))
  const EditCategory = Loadable(lazy(() => import('./pages/editCategory')))


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Sidebar />}>
          <Route index element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="reports" element={<p>Reports</p>} />
          <Route path="products" element={<Products />} />
          <Route path="products/:preview" element={<Products />} />
          <Route path="profile" element={<Profile />} />
          <Route path="category" element={<Category />} />
          <Route path="category/:edit" element={<EditCategory />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />

    </div>
  );
}

export default App;