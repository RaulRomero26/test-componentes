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
        case 'Sarai Remisiones':
       
        return (
            <>
                <div className="container">
                    <div className="row mt-5 mb-5">
                        <div className="col-md-12">
                            <h3 className="mt-4">Seleccione el tipo de información a buscar de {base}:</h3>
                        </div>
                        <div className="col-md-12">
                            <select className="form-select" aria-label="Default select example"
                                onChange={handleChange}
                            >
                                <option value=" " selected>Seleccione una Opción</option>
                                <option value="Detenido: Datos Personales">Detenido: Datos Personales</option>
                                <option value="Detenido: Media Filiacion">Detenido: Media Filiacion</option>
                                <option value="Detenido: Contactos">Detenido: Contactos</option>
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