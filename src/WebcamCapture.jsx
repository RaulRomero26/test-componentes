//primero las nativas de react
import { useRef, useEffect, useState } from "react";
//helpers
import { loadModels, detectarCaraEnFotoTomada, buscarUsuarioCara } from "./helpers/loadModelsIA";
import { dispararAlerta, dipararAlertaExito } from "./helpers/fireAlerts";
import { fetchCarasUsuarios } from "./helpers/fetchCarasUsuarios";
//hooks
import { TakePhoto } from "./hooks/useTakePhoto";
//bibliotecas externas propias del componente
import Webcam from "react-webcam";



const WebcamCapture = () => {

	//primero hooks y estados
	const webRef = useRef(null);

	const [ImagenCapturada, setImagenCapturada] = useState('');//imagen base 64
	const [deteccionFoto, setDeteccionFoto] = useState();//imagen procesada y detectada
	const [carasUsuarios, setCarasUsuarios] = useState();
	const [usuarioLocalizado, setUsuarioLocalizado] = useState();
	const [timestamp, setTimestamp] = useState(Date.now()); //para cambiar la imagen cada x tiempo
	const [fotoCambiante, setFotoCambiante] = useState();
	//llamada al hook de para toma de fotos
			
	
	//funciones propias del componente en este caso un fetch para el use effect correspondiente
	const getCaras = async() => {
        const newCaras = await fetchCarasUsuarios();
        setCarasUsuarios(newCaras);
		console.log('carasUsuarios: Estado', carasUsuarios)
    }

	const localizarUsuario = async() => {
		const usuarioLocalizado = await buscarUsuarioCara(carasUsuarios,deteccionFoto);
		setUsuarioLocalizado(usuarioLocalizado);
	}

	//efecto leer los modelos para la IA
	useEffect(() => {
		loadModels();
	  }, []);
	//efector hacer peticion al backend para obtener 
	useEffect(() => {
		getCaras();
	},[])
	//useEffect para mostrar todas las fotos que se van tomando
	useEffect(() => {
		const timer = setInterval(() => {
		  setTimestamp(Date.now());
		   setFotoCambiante(TakePhoto(webRef.current));
		}, 10000);
	
		return () => {
		  clearInterval(timer);
		};
	  }, []);

	//esta funcion dispara todo en orden
	const showImage = async() => {
		setDeteccionFoto(); setUsuarioLocalizado();
		//Captura la foto y la muestra en pantalla
        setImagenCapturada(webRef.current.getScreenshot());
		//se detecta la cara de dicha foto
		setDeteccionFoto(await detectarCaraEnFotoTomada());
		//se dispara la alerta para informar que la foto esta bien
		dispararAlerta();
		//comprar contra que usuario es 
		await localizarUsuario();
		//Se dispara la alerta para informar al usuario que la cuenta ahora esta activa
		setTimeout(() => {
			dipararAlertaExito(usuarioLocalizado)
		}, "1000");
		
	}

	return (
		<>
		
			<div >
				<Webcam ref={webRef} className="mi-hide"/>
				<button
					className="btn btn-primary"
					onClick={showImage}
				>
					Capturar Foto
				</button>
				<br/>
				{/* //<img id="imagentomada" src={fotoCambiante} /> */}
			</div>
		</>
	);

}

export default WebcamCapture
