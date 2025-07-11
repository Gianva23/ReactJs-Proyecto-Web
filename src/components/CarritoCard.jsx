import "../styles/Cart.css"
function CarritoCard({ producto, funcionDisparadora }) {
    function borrarDelCarrito() {
        funcionDisparadora(producto.id);
    }

    return (
        <div className="carrito-card">
            <div className="carrito-info">
                <img className="carrito-imagen" src={producto.imagen} alt={producto.name} />
                <div className="carrito-textos">
                    <h3 className="carrito-textos-nombre">{producto.name}</h3>
                    <p className="carrito-textos-descripcion">{producto.description}</p>
                </div>
            </div>
            <div className="carrito-datos">
                <span><strong>ud: </strong>{producto.cantidad}</span>
                <span><strong>v/u: </strong>{producto.price}$</span>
                <span><strong>Subtotal: </strong>{(producto.cantidad * producto.price).toFixed(2)}$</span>
            </div>

            <button className="boton-elimina" onClick={borrarDelCarrito}>X</button>
        </div>
    );
}


export default CarritoCard
