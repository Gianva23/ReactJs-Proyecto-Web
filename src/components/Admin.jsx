import { Navigate, Link } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext.jsx'
import '../Styles/Admin.css'
function Admin() {
    const {admin} = useAuthContext();
    if(!admin){
        return(
            <Navigate to="/login" replace/>
        )
    }

    return(
        <div>
            <div className='auth-container'>
                <h3 className='nota'>Bienvenido</h3>
                <div className='seleccion-btn'>
                    <Link to={"/productos"}><button className='buttom-detail'>Editar/Eliminar Producto</button></Link>
                    <Link to={"/admin/agregarproducto"}><button className='buttom-detail'>Agregar Producto</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Admin;