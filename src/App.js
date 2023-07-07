import { Route, Routes, useParams } from 'react-router-dom';
import Sidebar from './components/sidebar/sidebar';
// import Settings from './pages/settings';
import './App.css'
import Settings from './pages/settings';
import Profile from './pages/profile';
function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Sidebar />}>
          <Route index element={<p>hi shere</p>} />
          <Route path="settings" element={<Settings />} />
          <Route path="reports" element={<p>Reports</p>} />
          <Route path="products" element={<p>products</p>} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;