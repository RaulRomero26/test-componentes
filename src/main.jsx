import React from 'react'
import ReactDOM from 'react-dom/client'
import { ImageCaption } from './components/ImageZW/imageCaption'
import { ImageZoom } from './components/ImageZW/ImageZoom'
import { ImageZW } from './components/ImageZW/ImageZW'
import { Picture } from './components/ImageZW/Picture'


import './index.css'
// import { TableDecider } from './TableDecider'
//import { SelectBaseComponent } from './components' // este es el import del componente
//import WebcamCapture from './WebcamCapture' 



ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <> 
      {/* <div className="contenedor-select-base shadow">
        <SelectBaseComponent  base={'SARAI REMISIONES'} /> //recuerda descomentar esto para probar tu componente
      </div> */}
      {/* <TableDecider lugar={'datospersonales'}/>
      <TableDecider lugar={'datospersonales'}/> */}
{/* 
       <ImageZW/>  */}
      {/* <ImageCaption/> */}
      {/* <Picture/> */}
      <div className="row">
        <div className="col-md-4">
          <ImageZoom url={'http://172.18.0.25/sarai/public/files/Remisiones/21641/FotosHuellas/266182/rostro_frente.jpeg'} width={'1000'} height={'700'}/>
        </div>  
      </div>
    </>

  //</React.StrictMode>,
)
