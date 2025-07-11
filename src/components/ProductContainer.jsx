import { useEffect, useState } from "react"
import Card from './Card'
import '../Styles/Products.css'
import { useProductosContext } from "../contexts/ProductosContext"
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../Styles/Products.css'
import { Helmet } from "react-helmet";

function ProductContainer({}){
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const {productos, obtenerProductos, filtrarProductos} = useProductosContext();
    const productosPorPagina = 8;
    const [paginaActual, setPaginaActual] = useState(1);
    const indiceUltimoProducto = paginaActual * productosPorPagina;
    const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;
    const productosActuales = productos.slice(indicePrimerProducto, indiceUltimoProducto);
    const [filtro, setFiltro] = useState("");

    {useEffect(() => {
        obtenerProductos().then((productos) => {
            setCargando(false);
        }).catch((error) => {
            setError('Problema al cargar los productos');
            setCargando(false);
        })
    }, []);}

    useEffect(() => {
        filtrarProductos(filtro)
    },[filtro]);

    const totalPaginas = Math.ceil(productos.length / productosPorPagina);
    const cambiarPagina = (numeroPagina) => {
        setPaginaActual(numeroPagina);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
    
    if (cargando) {
        return <p>Cargando</p>;
    }else if (error){
        return <p>{error}</p>;
    }else{
        return(
            <div>
                <Helmet>
                    <title>Productos | E-commerce</title>
                    <meta name="description" content="Explorá todos los productos disponibles en nuestra tienda online. Ofertas y novedades todos los días." />
                </Helmet>
                <div className="search-container">
                    <input 
                        type="text"
                        placeholder="Buscar productos..."
                        className="form-control mb-0"
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>

                <Row xs={1} md={1} lg={2}>
                    {productosActuales.length > 0 ? productosActuales.map((producto) => (
                        <Col key={producto.id}>
                            <Card producto={producto}/>
                        </Col>
                    )): <></>}
                </Row>

                <div className="pagination-container">
                    <div className="d-flex justify-content-center my-4 gap-2 flex-wrap">
                        {Array.from({ length: totalPaginas }, (_, index) => (
                        <button
                            key={index + 1}
                            className={`btn pagination-btn ${
                            paginaActual === index + 1 ? "btn-primary active" : "btn-outline-primary"
                            }`}
                            onClick={() => cambiarPagina(index + 1)}
                        >
                            {index + 1}
                        </button>
                        ))}
                    </div>
                </div>
            </div>
        )
    }   
}

export default ProductContainer;

