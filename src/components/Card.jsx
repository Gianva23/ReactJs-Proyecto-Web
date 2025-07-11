import { Card as BootstrapCard, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import '../Styles/Products.css'

function Card({ producto }) {
    return (
        <BootstrapCard className="product-card">
            <Row className="g-0 g-md-5 g-lg-5 g-xl-5 g-xxl-5">
                <Col md={4}>
                    <Link to={`/productos/${producto.id}`}>
                        <BootstrapCard.Img className="product-image" src={producto.imagen} alt={producto.name}/>
                    </Link>
                </Col>
                <Col md={8}>
                    <BootstrapCard.Body>
                        <div className="product-detail">
                            <p className="product-name">{producto.name}</p>
                            <div className="product-price">
                                <span className="price-leter">Precio:</span>
                                <span className="price-number">{producto.price}$</span>
                            </div>
                            <Link to={`/productos/${producto.id}`}>
                                <Button className="button-detail" variant="primary">Ver producto</Button>
                            </Link>
                        </div>
                    </BootstrapCard.Body>
                </Col>
            </Row>
        </BootstrapCard>
    );
}

export default Card;