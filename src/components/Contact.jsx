import { Helmet } from "react-helmet";
import "../Styles/Form.css"
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

function Contact(){
    const [formData, setFormData] = useState({
        nombre: "",
        email: "",
        mensaje: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev,[name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Mensaje enviado:", formData);
        toast.success("Consulta enviada");
    };
    return(
        <>
            <Helmet>
                <title>Contacto | E-commerce</title>
                <meta name="description" content="¿Perdido? Contacto para consultas." />
            </Helmet>
            <div className="auth-container">
                <h2>Contacto</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className='container-relleno'>
                        <label>Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='container-relleno'>
                    <label>Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    </div>
                    <div className='container-relleno'>
                    <label>Mensaje</label>
                    <textarea
                        type="text"
                        id="mensaje"
                        name="mensaje"
                        value={formData.mensaje}
                        onChange={handleChange}
                        required
                        style={{ height: "100px" , width: "200px"}}
                    />
                    </div>

                    <button type="submit">Enviar mensaje</button>
                    <ToastContainer />
                </form>
                </div>
        </>
    )
}

export default Contact;