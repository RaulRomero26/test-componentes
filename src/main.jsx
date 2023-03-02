import React from 'react'
import ReactDOM from 'react-dom/client'
import { ImageCaption } from './components/ImageZW/imageCaption'
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
          <Picture/>
        </div>  
      </div>
    </>

  //</React.StrictMode>,
)
