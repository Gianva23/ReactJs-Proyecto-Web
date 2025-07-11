import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import '../Styles/ProductDetail.css'
import { dispararSweetOpciones } from "../assets/SweetAlert";
import { CarritoContext } from "../contexts/CarritoContext";
import { useAuthContext } from "../contexts/AuthContext";
import { useProductosContext } from "../contexts/ProductosContext";
import { IoCartSharp } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { FaTrashCan } from "react-icons/fa6";
import { Helmet } from "react-helmet";

function ProductoDetail({}) {
    const navegar = useNavigate();
    const {admin} = useAuthContext();
    const {agregarAlCarrito} = useContext(CarritoContext);
    const {productoEncontrado, obtenerProducto, eliminarProducto} = useProductosContext();

    const { id } = useParams();
    const [cantidad, setCantidad] = useState(1);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    console.log(id)

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

    function funcionCarrito() {
        if (cantidad < 1) return;
        agregarAlCarrito({ ...productoEncontrado, cantidad });
        dispararSweetOpciones(navegar);
    }

    function sumarContador() {
        setCantidad(cantidad + 1);
    }

    function restarContador() {
        if (cantidad > 1) setCantidad(cantidad - 1);
    }

    function dispararEliminar(){
        eliminarProducto(id).then(() => {
            navegar("/productos")
        }).catch((error) => {
            dispararSweetBasico("Hubo un problema al agregar el producto", error, "error", "Cerrar")
        })
    }

    if (cargando) return <p>Cargando producto...</p>;
    if (error) return <p>{error}</p>;
    if (!productoEncontrado) return null;

    return (
        <>
        <Helmet>
        <title>{productoEncontrado.name} | E-commerce</title>
        <meta name="description" content={`Comprá ${productoEncontrado.name} por solo ${productoEncontrado.price}$ - ${productoEncontrado.description}`}/>
        </Helmet>
        <div className="detalle-container">
            <img className="detalle-imagen" src={productoEncontrado.imagen} alt={productoEncontrado.name} />
            <div className="detalle-info">
                <span className="detail-name">{productoEncontrado.name}</span>
                <div className="detalle-descripcion">
                    <h3>Descripcion:</h3>
                    <p>{productoEncontrado.description}</p>
                </div>
                <div className="detalle-precio">
                    <h3>Precio:</h3>
                    <p className="precio-monto">{productoEncontrado.price} $</p>
                </div>
                {admin ?(
                    <div className="detalle-botones-admin">
                        <Link to={"/admin/editarProducto/" + id}> <button className="btn-accion editar">Editar producto <CiEdit /></button></Link>
                        <button className="btn-accion eliminar" onClick={dispararEliminar} >Eliminar Producto <FaTrashCan /></button>
                    </div>
                ):(
                    <div className="detalle-botones-user">
                        <div className="detalle-contador">
                            <button className="btn-contador" onClick={restarContador}>-</button>
                            <span className="cantidad-numero">{cantidad}</span>
                            <button className="btn-contador" onClick={sumarContador}>+</button>
                        </div>
                        <button onClick={funcionCarrito} className="btn-accion agregar">Agregar al carrito <IoCartSharp /></button>
                    </div>
                )}
            </div>
        </div>
        </>
    );
}

export default ProductoDetail;
