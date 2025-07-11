import { Helmet } from "react-helmet";
import '../Styles/About.css'

function About() { 
  return (
    <>
      <Helmet>
          <title>Sobre nosotros | E-commerce</title>
          <meta name="description" content="Mas sobre nosotros. E-commerce" />
      </Helmet>
      <div className="about-container">
        <h1>Sobre Nosotros</h1>
        <p>
          Bienvenido a nuestra tienda online. Somos un equipo apasionado por la tecnología, la innovación y el buen servicio.
        </p>
        <p>
          Este proyecto nació con una idea simple: hacer que comprar productos online sea fácil, rápido y agradable. Nos dedicamos a ofrecer productos de calidad, con una atención cercana y transparente.
        </p>
        <p>
          Cada detalle del sitio fue pensado para que encuentres lo que buscás sin complicaciones. Desde el catálogo de productos hasta el sistema de pagos y la atención postventa, nuestro objetivo es que tengas una excelente experiencia.
        </p>
        <p>
          Nos importa cada cliente, cada compra y cada opinión. Por eso, siempre estamos mejorando y escuchando tus sugerencias.
        </p>
        <p>
          Gracias por confiar en nosotros. Este es solo el comienzo.
        </p>
      </div>
    </>
  );
}
  
export default About;