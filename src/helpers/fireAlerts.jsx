import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const dispararAlerta = (usuario = '') => {
    console.log('USUARIO DE ALERTA', usuario)
    const MySwal = withReactContent(Swal)
    if(usuario === ''){

        MySwal.fire({
        title: <p>Se capturo la cara. Espere un momento, se esta localizando tu usuario.</p>,
        icon: 'success',
        timer: 3000,
        })

    }
}

export const dipararAlertaExito = (usuario) => {
    console.log('ALERTA EXITO:',usuario);
    const MySwal = withReactContent(Swal)
    MySwal.fire({
        title: <p>{`Bienvenido: ${usuario.usuario} tu cuenta estará habilitada hasta el final de turno Fiabilidad: ${100-(usuario.distance*100)}%`}</p>,
        icon: 'success',
        timer: 7000,
    })
}