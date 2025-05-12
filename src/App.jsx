import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import CoffeeList from './pages/CoffeeList';
import AppLayout from './layout/AppLayout';
import CoffeeDetails from './pages/CoffeeDetails';

function App() {


  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<CoffeeList />} />
            <Route path="/specialtycoffees/:id" element={<CoffeeDetails />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
};

export default App;
