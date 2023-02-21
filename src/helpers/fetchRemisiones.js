

export const fetchRemisiones = async () => {

    try {
       
        const url = `http://172.18.10.71:9090/api/base/remisiones`
        const respuesta = await fetch(url);
        const {data} = await respuesta.json();
        console.log('HELPER: ',data)
        return data;
    } catch (error) {
        console.log(error)
    }
}