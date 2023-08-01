import { Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools'

import './App.css'
import useAuth from './hooks/useAuth';
import RequireAuth from './AuthGuard/requireAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const location = useLocation();

  // const { userProfile } = useAuth()

  // AUTHENTICATION
  const Register = Loadable(lazy(() => import('./pages/auth/register')));
  const Login = Loadable(lazy(() => import('./pages/auth/login')));

  //DASHBOARD
  const Sidebar = Loadable(lazy(() => import('./components/sidebar/sidebar')))
  const Home = Loadable(lazy(() => import('./pages/dashboard')))
  const Settings = Loadable(lazy(() => import('./pages/settings')))
  const Profile = Loadable(lazy(() => import('./pages/profile')))
  // const Products = Loadable(lazy(() => import('./pages/products')))
  const Category = Loadable(lazy(() => import('./pages/category')))
  const Categories = Loadable(lazy(() => import('./pages/categories')))
  const EditCategory = Loadable(lazy(() => import('./pages/editCategory')))


  //MERCHANTS
  const MerchantProducts = Loadable(lazy(() => import('./pages/merchantProducts')))


  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Sidebar />}>

          <Route index element={<Home />} />
          {/* <Route element={<RequireAuth accountType={"admin"} />}>
          </Route> */}
          {/* <Route element={<RequireAuth accountType={"merchant"} />}>
            <Route index element={<p className='text-black bg-red-400'> Merchant</p>} />
          </Route> */}


          <Route element={<RequireAuth accountType={"merchant"} />}>

            <Route path="products" element={<MerchantProducts />} />
            {/* <Route path="products" element={<Products />} />
            <Route path="products/:preview" element={<Products />} /> */}
          </Route>
          <Route element={<RequireAuth accountType={"admin"} />}>

            <Route path="category" element={<Category />} />
            <Route path="categories" element={<Categories />} />
            <Route path="category/:edit" element={<EditCategory />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="reports" element={<p className='text-black'>Reports</p>} />

          <Route path="profile" element={<Profile />} />

        </Route>
        <Route path='login' element={<Login />} />
        <Route path='login/merchant' element={<Login />} />
        <Route path='register' element={<Register />} />
        {/* <Route path='*' element={<Navigate to="/" state={{ from: location }} replace />} /> */}

      </Routes>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;