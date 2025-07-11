import React, { useState } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { dispararSweetBasico } from '../assets/SweetAlert';
import { useProductosContext } from '../contexts/ProductosContext';
import '../Styles/Form.css';
import { ToastContainer, toast } from 'react-toastify';

function FormularioProducto({}) {
    const {agregarProducto} = useProductosContext();
    const {admin} = useAuthContext();
    if(!admin){
        return(
            <Navigate to="/login" replace/>
        )
    }
    
    const [errores, setErrores] = useState({});

    const [producto, setProducto] = useState({
        name: '',
        price: '',
        description: '',
        imagen: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProducto({ ...producto, [name]: value });
    };

    const validarFormulario = () => {
        const nuevosErrores = {};
        if (!producto.name.trim()) {
            nuevosErrores.name = 'El nombre es obligatorio.';
        }
        if (!producto.price || producto.price <= 0) {
            nuevosErrores.price = 'El precio debe ser mayor a 0.';
        }
        if (!producto.description.trim() || producto.description.length < 10) {
            nuevosErrores.description = 'La descripción debe tener al menos 10 caracteres.';
        }
        if(!producto.imagen.trim()){
            return("La url de la imgaen no debe estar vacía")
        }
        setErrores(nuevosErrores);

        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validarForm = validarFormulario()
        if (validarForm == true) {
            agregarProducto(producto).then((data) => {
            setProducto({ name: '', price: '', description: '', imagen: ""})
            }).catch((error) => {
                dispararSweetBasico("Hubo un problema al agregar el producto", error, "error", "Cerrar")
            })
        }else{
            dispararSweetBasico("Error en la carga de producto", validarForm, "error", "Cerrar")
        }
    }

    return ( 
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Agregar Producto</h2>
                <div className='container-relleno'>
                    <label>Nombre </label>
                    <input type="text" name="name" value={producto.name} onChange={handleChange} required/>
                </div>
                <div className='container-relleno'>
                    <label>Imagen </label>
                    <input
                    type="text" name="imagen" value={producto.imagen} onChange={handleChange} required/>
                </div>
                <div className='container-relleno'>
                    <label>Precio </label>
                    <input type="number" name="price" value={producto.price} onChange={handleChange} requiredmin="0"/>
                </div>
                <div className='container-relleno'>
                    <label>Descripción </label>
                    <textarea
                        name="description"
                        value={producto.description}
                        onChange={handleChange}
                        required
                        style={{ height: "100px" }}
                    />
                </div>
                <>
                    <button type="submit">Agregar Producto</button>
                    <ToastContainer />
                </>
            </form>
            {errores.name && <p style={{ color: 'red' }}>{errores.name}</p>}
            {errores.price && <p style={{ color: 'red' }}>{errores.price}</p>}
            {errores.description && <p style={{ color: 'red' }}>{errores.description}</p>}
        </div>
    );
}

export default FormularioProducto;