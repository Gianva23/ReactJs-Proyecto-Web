import { Helmet } from "react-helmet";

function Home() {
    return (
        <>
            <Helmet>
                <title>Inicio | E-commerce</title>
                <meta name="description" content="Bienvenido a nuestro E-commerce. Comprá productos con los mejores precios y calidad." />
            </Helmet>
            <h1>Bienvenido al E-commerce</h1>
        </>
    );
}

export default Home