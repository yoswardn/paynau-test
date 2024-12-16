import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';  // Importamos el componente ProtectedRoute
import Layout from './components/layout/Layout';
import PersonPage from './pages/PersonPage';
import LoginPage from './pages/LoginPage';
import NotFound from './pages/NotFound';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';


function App() {

  return (
    <Router>
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NotFound />} />

         <Route
          path="/persons"
          element={
            <ProtectedRoute>
              <Layout>
                <PersonPage /> 
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
