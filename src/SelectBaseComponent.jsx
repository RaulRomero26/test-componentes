import React, { useState } from 'react'
import { TableDecider } from './TableDecider';

export const SelectBaseComponent = ({base}) => {

    const [baseSelect, setBaseSelect] = useState()

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
                            <h3>Seleccione el tipo de información a buscar de {base}:</h3>
                        </div>
                        <div className="col-md-12">
                            <select className="form-select" aria-label="Default select example"
                                onChange={handleChange}
                            >
                                <option value="0">Seleccione una Opción</option>
                                <option value="datospersonales">Detenido: Datos Personales</option>
                                <option value="detenidomediafiliacion">Detenido: Media Filiacion</option>
                            </select>
                        </div>
                    </div>
                </div>

                {
                ( baseSelect != "0" ) && <TableDecider lugar={baseSelect}/>
                }
            </>
            
        )
    
        default:
            break;
    }

}