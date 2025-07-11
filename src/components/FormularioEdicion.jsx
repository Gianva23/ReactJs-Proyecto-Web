import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useProductosContext } from "../contexts/ProductosContext";
import { useAuthContext } from "../contexts/AuthContext";
import '../Styles/Form.css';
import { ToastContainer, toast } from 'react-toastify';

function FormularioEdicion({ }) {
    const navigate = useNavigate();
    const {admin} = useAuthContext();
    const {obtenerProducto, productoEncontrado, editarProducto} = useProductosContext();
    const { id } = useParams();
    const [producto, setProducto] = useState(productoEncontrado);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

        if(!admin){
        return(
            <navigate to="/login" replace/>
        )
    }

    useEffect(() => {
        obtenerProducto(id).then(() => {
        setCargando(false);
        }).catch((error) => {
        if(error == "Producto no encontrado"){
            setError("Producto no encontrado")
        }
        if(error == "Hubo un error al obtener el producto."){
            setError("Hubo un error al obtener el producto.");
        }
        setCargando(false);
        })
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validarForm = validarFormulario();
        if(validarForm == true){
            editarProducto(producto).then((prod) => {
            toast.success("Producto actualizado correctamente");
            navigate("/productos");
        }).catch((error) => {
            alert('Hubo un problema al actualizar el producto. ' + error.message);
        })
        }else{
            dispararSweetBasico("Error en la carga de producto", validarForm, "error", "Cerrar")
        }
    };

    const validarFormulario = () => {
        if (!producto.name.trim()) {
            return("El nombre es obligatorio.")
        }
        if (!producto.price || producto.price <= 0) {
            return("El precio debe ser mayor a 0.")
        }
        console.log(producto.description.trim())
        if (!producto.description.trim() || producto.description.length < 10) {
            return("La descripción debe tener al menos 10 caracteres.")
        }
        if(!producto.imagen.trim()){
            return("La url de la imgaen no debe estar vacía")
        }
        else{
            return true
        }
    }

    return (
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Editar Producto</h2>
            <div className='container-relleno'>
                <label>Nombre </label>
                <input
                type="text"
                name="name"
                value={producto.name || ''}
                onChange={handleChange}
                required
                />
            </div>
            <div className='container-relleno'>
                <label>Imagen </label>
                <input
                type="text" name="imagen" value={producto.imagen} onChange={handleChange} required/>
            </div>
            <div className='container-relleno'>
                <label>Precio </label>
                <input
                type="number"
                name="price"
                value={producto.price || ''}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                />
            </div>
            <div className='container-relleno'>
                <label>Descripción </label>
                <textarea
                name="description"
                value={producto.description || ''}
                onChange={handleChange}
                required
                style={{ height: "100px" }}
                />
            </div>
            <>
                <button type="submit">Actualizar Producto</button>
                <ToastContainer />
            </>
            </form>
        </div>
    );
}

export default FormularioEdicion