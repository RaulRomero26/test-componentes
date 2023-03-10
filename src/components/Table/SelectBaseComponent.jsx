import React, { useState } from 'react'
import { TableDecider } from './TableDecider';
import { TableHolder } from './TableHolder';
 
export const SelectBaseComponent = ({base}) => {

    const [baseSelect, setBaseSelect] = useState(' ')

    const handleChange = (event) => {
        console.log(event.target.value)
        setBaseSelect(event.target.value);
      };

    switch (base) {
        case 'SARAI REMISIONES':
       
        return (
            <>
                <div className="container">
                    <div className="row mt-5 mb-5">
                        <div className="col-md-12">
                            <h3 className="mt-4">SELECCIONE EL TIPO DE INFORMACIÓN A BUSCAR DE {base}:</h3>
                        </div>
                        <div className="col-md-12">
                            <select className="form-select" aria-label="Default select example"
                                onChange={handleChange}
                            >
                                <option value=" ">SELECCIONE UNA OPCIÓN</option>
                                <option value="Detenido: Datos Personales">DETENIDO: DATOS PERSONALES</option>
                                <option value="Detenido: Media Filiacion">DETENIDO: MEDIA FILIACION</option>
                                <option value="Detenido: Contactos">DETENIDO: CONTACTOS</option>
                            </select>
                        </div>
                    </div>
                </div>

                {
                    ( baseSelect != " " ) 
                        ? <TableDecider lugar={baseSelect}/>
                        : <TableHolder />
                }
            </>
            
        )
    
        default:
            break;
    }

}