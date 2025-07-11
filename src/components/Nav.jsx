import { NavLink } from 'react-router-dom'
import '../Styles/Nav.css'
import { useContext } from "react";
import { CarritoContext} from "../contexts/CarritoContext";
import { useAuthContext } from '../contexts/AuthContext';

function Nav() {
    const {productosCarrito} = useContext(CarritoContext);
    const {admin} = useAuthContext();
    return (  
        <div>
            <nav className='nav-container'>  
                <ul className='nav-list'>  
                    <li><NavLink to="/" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Inicio</NavLink></li>  
                    <li><NavLink to="/productos" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Productos</NavLink></li>   
                    <li><NavLink to="/nosotros" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Nosotros</NavLink></li>  
                    <li><NavLink to="/contacto" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Contacto</NavLink></li>  
                    {admin ? <li><NavLink to="/admin" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Admin</NavLink></li> 
                    : <li><NavLink to="/carrito" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Carrito{productosCarrito.length > 0 && (<span className="cart-info">{productosCarrito.length}</span>)}</NavLink></li>}
                    <li><NavLink to="/login" className={({ isActive }) => isActive ? "nav-link active" : "nav-link"}>Login</NavLink></li>
                </ul>
            </nav>
        </div>
    );  
}

export default Nav;