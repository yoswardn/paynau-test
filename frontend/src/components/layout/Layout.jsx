// src/components/Layout.js
import React, { useEffect, useState } from 'react';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar los datos del usuario desde localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        
        if (storedUser && token) {
            setUser(storedUser);
        }
    }, []);

    const handleLogout = () => {
        // Eliminar los datos del usuario y token del localStorage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null); // Actualizar el estado para reflejar que no hay usuario logueado
        navigate('/login'); // Redirigir a la página de login después de hacer logout
    };

    return (
        <div className="layout-wrapper">
            {/* Barra de herramientas con nombre de usuario y logout */}
            <Toolbar className="layout-toolbar" start={leftToolbar(user)} end={rightToolbar(handleLogout)} />

            {/* El contenido principal de las páginas */}
            <div className="layout-main">
                {user ? (
                    children
                ) : (
                    <div>
                        <h2>Debe iniciar sesión para continuar</h2>
                    </div>
                )}
            </div>
        </div>
    );
};

// Función para mostrar el nombre del usuario en la barra de herramientas
const leftToolbar = (user) => {
    return (
        <div className="layout-toolbar-left">
            {user ? (
                <span className="p-text-bold">Hello, {user.name}</span>
            ) : (
                <span className="p-text-bold">No user</span>
            )}
        </div>
    );
};

// Función para la parte derecha de la barra de herramientas (botón de logout)
const rightToolbar = (handleLogout) => {
    return (
        <div className="layout-toolbar-right">
            <Button label="Logout" icon="pi pi-sign-out" onClick={handleLogout} className="p-button-danger" />
        </div>
    );
};

export default Layout;
