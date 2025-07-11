import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { crearUsuario, loginEmailPass } from '../auth/firebase';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { useNavigate } from 'react-router-dom';
import '../Styles/Form.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Helmet } from "react-helmet";

function Login() {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [password, setPassword] = useState('');
    const { login, user, logout, admin} = useAuthContext();
    const [show, setShow] = useState(true);

    function registrarUsuario (e) {
        e.preventDefault();
        crearUsuario(usuario, password).then((user) => {
            login(usuario);
            dispararSweetBasico("Logeo exitoso", "", "success", "Confirmar")
        }).catch((error) => {
            if(error.code == "auth/invalid-credential"){
                toast.error("Email no valido");
            }if(error.code == "auth/weak-password"){
                toast.error("Contraseña pobre");
            }if(error.code == "auth/email-already-in-use"){
                toast.error("Email en uso");
            }
        })
    }

    function iniciarSesionEmailPass (e) {
        e.preventDefault();
        loginEmailPass(usuario, password).then((user) => {
            login(usuario);
            dispararSweetBasico("Logeo exitoso", "success");
            navigate("/productos");
        }).catch((error) => {
            if(error.code == "auth/invalid-credential"){
                toast.error("Error");
            }
        })
    }

    function handleShow (e) {
        e.preventDefault();
        setShow(!show)
    }

    const handleSubmit2 = (e) => {
        logout();
    }

    if(user || admin){
        return(
            <>
            <Helmet>
                <title>Mi cuenta | E-commerce</title>
                <meta name="description" content="Opciones y configuracion de cuenta" />
            </Helmet>
            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit2}>
                    <h2>Bienvenido</h2>
                    <button type="submit">Cerrar sesión</button>
                </form>
            </div>
            </>
        )
    }if(!user && show){
        return(
            <>
            <Helmet>
                <title>Iniciar sesión | E-commerce</title>
                <meta name="description" content="Iniciar sesión E-commerce" />
            </Helmet>
            <div className="auth-container">
                <form className="auth-form" onSubmit={iniciarSesionEmailPass}>
                    <h2>Iniciar sesión</h2>
                    <div className='container-relleno'>
                        <label>Email</label>
                        <input
                        type="text"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        />
                    </div>
                    <div className='container-relleno'>
                        <label>Contraseña</label>
                        <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <>
                        <button type="submit">Iniciar sesión</button>
                        <ToastContainer />
                    </>
                </form>
                <button className="auth-toggle" onClick={handleShow}>¿No tenés cuenta? Registrarse</button>
            </div>
            </>
        )
    }if(!user && !show){
        return(
            <>
            <Helmet>
                <title>Registrarse | E-commerce</title>
                <meta name="description" content="¿No tenés cuenta? Registrarse con email" />
            </Helmet>
            <div className="auth-container">
            <form className="auth-form" onSubmit={registrarUsuario}>
                <h2>Registrarse</h2>
                <div className='container-relleno'>
                    <label>Email</label>
                    <input
                        type="text"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                    />
                </div>
                <div className='container-relleno'>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <>
                    <button type="submit">Registrarse</button>
                    <ToastContainer />
                </>
            </form>
            <button className="auth-toggle" onClick={handleShow}>¿Ya tenes cuenta? Iniciar Sesión</button>
            </div>
            </>
        )
    }
}
export default Login;