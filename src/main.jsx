import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
// import { TableDecider } from './TableDecider'
import { SelectBaseComponent } from './SelectBaseComponent'
//import WebcamCapture from './WebcamCapture'



ReactDOM.createRoot(document.getElementById('root')).render(
  //<React.StrictMode>
    <> 
      <div className="contenedor-select-base shadow">
        <SelectBaseComponent  base={'Sarai Remisiones'} />
      </div>
      {/* <TableDecider lugar={'datospersonales'}/>
      <TableDecider lugar={'datospersonales'}/> */}
    </>

  //</React.StrictMode>,
)
