import { Route, Routes, } from 'react-router-dom';
import { Suspense, lazy, } from 'react';
import { ReactQueryDevtools } from 'react-query/devtools'

import RequireAuth from './AuthGuard/requireAuth';
import { ToastContainer } from 'react-toastify';
import LogOut from './components/logout';
import NotFound from './pages/notFound';
import 'react-toastify/dist/ReactToastify.css';



import { ReactComponent as LoginLogo } from './pages/auth/register/loginLogo.svg';
import useAuth from './hooks/useAuth';
import './App.css'

const LoadingScreen = () => (<section className='w-screen h-screen flex justify-center items-center'><LoginLogo /></section>)
const Loadable = (Component) => (props) => {


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
  const Category = Loadable(lazy(() => import('./pages/category')))
  const Categories = Loadable(lazy(() => import('./pages/categories')))
  const EditCategory = Loadable(lazy(() => import('./pages/editCategory')))


  //MERCHANTS
  const MerchantProducts = Loadable(lazy(() => import('./pages/merchantProducts')))
  const Orders = Loadable(lazy(() => import('./pages/orders')))


  const { userProfile } = useAuth()

  return (
    <div className="App">

      <Routes>
        <Route path='/' element={<Sidebar />}>

          <Route index element={<Home />} />


          <Route element={<RequireAuth accountType={"merchant"} />}>

            <Route path="products" element={<MerchantProducts />} />
            <Route path="orders" element={<Orders />} />
          </Route>
          <Route element={<RequireAuth accountType={"admin"} />}>

            <Route path="category" element={<Category />} />
            <Route path="categories" element={<Categories />} />
            <Route path="category/edit" element={<EditCategory />} />
          </Route>
          <Route path="settings" element={<Settings />} />
          <Route path="reports" element={<p className='text-black'>Reports</p>} />

          <Route path="profile" element={<Profile />} />

        </Route>
        {
          !userProfile && (
            <>
              <Route path='login' element={<Login />} />
              <Route path='login/merchant' element={<Login />} />
              <Route path='register' element={<Register />} />
            </>
          )
        }
        {/* <Route path='*' element={<Navigate to="/" state={{ from: location }} replace />} /> */}
        <Route path='*' element={<NotFound />} />

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
      <LogOut />
    </div>
  );
}

export default App;