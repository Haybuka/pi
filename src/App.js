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
  const Dashboard = Loadable(lazy(() => import('./components/sidebar/sidebar')))
  const Settings = Loadable(lazy(() => import('./pages/settings')))
  const Profile = Loadable(lazy(() => import('./pages/profile')))
  const Products = Loadable(lazy(() => import('./pages/products')))
  const Category = Loadable(lazy(() => import('./pages/category')))


  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Dashboard />}>
          <Route index element={<p>hi shere</p>} />
          <Route path="settings" element={<Settings />} />
          <Route path="reports" element={<p>Reports</p>} />
          <Route path="products" element={<Products />} />
          <Route path="profile" element={<Profile />} />
          <Route path="category" element={<Category />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />

      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />

    </div>
  );
}

export default App;