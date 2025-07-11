import Swal from 'sweetalert2'
import 'react-toastify/dist/ReactToastify.css';

export function dispararSweetBasico(title, icon, show) {
  Swal.fire({
    title: title,
    position: 'center',
    icon: icon,
    showConfirmButton: show,
    timer: 1000
  })
}

export function dispararSweetOpciones(navigate){
  Swal.fire({
    title: "Producto agregado",
    icon: "success",
    showCancelButton: true,
    confirmButtonText: "Ir al carrito",
    cancelButtonText: "Seguir comprando",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#3085d6",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      navigate("/carrito");
    }
    else if (result.dismiss === Swal.DismissReason.cancel) {
      navigate("/productos");
    }
  });
}