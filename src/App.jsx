import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import CoffeeList from './pages/CoffeeList';
import AppLayout from './layout/AppLayout';

function App() {


  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<CoffeeList />} />
            <Route path="/favorites" element={<h1>Favorites</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;
