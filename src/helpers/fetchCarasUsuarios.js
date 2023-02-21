

export const fetchCarasUsuarios = async () => {

    try {
       
        const url = `http://172.18.10.71:9090/api/caras`
        const respuesta = await fetch(url);
        const {caras} = await respuesta.json();// el = [] es solo para tener el linter de que es un array
        
        const carasUsuarios = caras.map(cara => ({
            uid: cara.id,
            usuario: cara.usuario,
            estado: cara.estado,
            descriptor: cara.descriptor,
        }))
        console.log('cuantos: ',carasUsuarios.length);
    
        return carasUsuarios;
    } catch (error) {
        console.log(error)
    }
}