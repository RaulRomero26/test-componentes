import * as faceapi from 'face-api.js';

export const loadModels = async () => {
	try {
	  const MODEL_URL = "./models";
	  
	  Promise.all([
		faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
		faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
		faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
	  ]).then(start);
	} catch (error) {
	  console.error(error);
	}
};

export const start = () => {
	console.log('Modelos cargados')
}

export const detectarCaraEnFotoTomada = async () => {
	
	console.log(document.getElementById('imagentomada'));
	let detections = await faceapi.detectAllFaces(document.getElementById('imagentomada')).withFaceLandmarks().withFaceDescriptors()
	return detections;
}

//Transformar la informacion recibida a informacion manejable por el face-api

const loadLabeledImages = async (caras) => {
    
    return Promise.all(
        caras.map(async cara => { //una a  una 
            const descriptions = []
            // una imagen de muestra
            var arrayDesc = cara.descriptor.split('_');
            //arrayDesc.pop();
            descriptions.push(Float32Array.from(arrayDesc)) // guardo los descriptores en un arreglo, puede ser distinto ya con bd
            // revisar que imprime , regresa el nombre y los datos faciales
            return new faceapi.LabeledFaceDescriptors(`Usuario: ${cara.usuario}`, descriptions) 
        
        })
    )
}

export const buscarUsuarioCara = async (caras,caraCapturada) => {
    //trasnformamos la data
    let cincoDistancias = [];
    const labeledFaceDescriptors = await loadLabeledImages(caras); 

    console.log('LINEA 51:', caraCapturada);
    //console.log('LINEA 52:', labeledFaceDescriptors)
    labeledFaceDescriptors.forEach( element =>{
        const distance = faceapi.euclideanDistance(element.descriptors[0], caraCapturada[0].descriptor) //en resized viene la cara que ando buscando
        element.distance = distance;
        element.usuario = element._label;
        cincoDistancias.push(element);
    })
    
    cincoDistancias.sort((a, b) => a.distance > b.distance ? 1 : -1)
    console.log('CINCO DISTANCIAS COMP: ', cincoDistancias)
    cincoDistancias=cincoDistancias.slice(0,3)

    console.log('ENCONTRADO: ',cincoDistancias[0]);

    return cincoDistancias[0];
    
}
