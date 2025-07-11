import { Navigate } from "react-router-dom";
import { CarritoContext } from "../contexts/CarritoContext.jsx";
import CarritoCard from "./CarritoCard.jsx";
import '../Styles/Cart.css'
import { dispararSweetBasico } from "../assets/SweetAlert.js";
import Swal from 'sweetalert2';
import { useContext, useEffect, useState } from "react";
import { useAuthContext } from "../contexts/AuthContext.jsx";
import { BsTrash } from "react-icons/bs";
import { Helmet } from "react-helmet";

function Cart() {
    const {user} =useAuthContext();
    const { productosCarrito, vaciarCarrito, borrarProductoCarrito } = useContext(CarritoContext);
    console.log("Productos: " + productosCarrito)

    const total = productosCarrito.reduce(
        (subTotal, producto) => subTotal + producto.price * producto.cantidad, 0
    )

    function funcionDisparadora(id){
        borrarProductoCarrito(id)
    }
    
    function funcionDisparadora2(){
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Se eliminarán todos los productos del carrito",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, vaciar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                vaciarCarrito();
                Swal.fire("Carrito vaciado", "", "success");
            }
        });
    }

    console.log("Total: " + total)

    if(!user){
        return(
            <Navigate to="/login" replace/>
        )
    }

    return(
        <>
        <Helmet>
            <title>Carrito | E-commerce</title>
            <meta name="description" content="Carrito del E-commerce." />
        </Helmet>
        <div className="carrito-conteiner">
            <div className="carrito-titulos" >
                <h2>Carrito</h2>
            </div>
            {productosCarrito.length > 0 ? productosCarrito.map((producto) => (
                <CarritoCard 
                    producto={producto}
                    funcionDisparadora={funcionDisparadora}
                />
            ))
            : <p>Carrito vacio</p>}
            {total > 0 ? 
            <>
                <div className="card-total">
                    <h3>Total: </h3>
                    <span className="card-total-precio">{total.toFixed(2)}$</span>
                    <button onClick={() => {dispararSweetBasico("Pago realizado","success","true"),vaciarCarrito()}}>Pagar</button>
                </div>
                <div className="container-boton-vaciar">
                    <button className="boton-vaciar" onClick={funcionDisparadora2}><BsTrash/> Vaciar carrito</button>
                </div>
            </>: <></>}
        </div>
        </>
    )
}

export default Cart;