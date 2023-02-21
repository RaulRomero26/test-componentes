//primero de react

import { useEffect, useState,useCallback } from 'react';
//hooks
import { useFetch } from './hooks/useFetch';
//import { TableConFiltro } from './TableConFiltro';
import { TableConstructor } from './TableConstructor';
//bliotecas y/o componentes de terceros


export const TableDecider = ({lugar}) => {

    let url = '';
   
    //llamar la data con un el hook useFetch
    switch (lugar) {
        case 'datospersonales':
            url = `http://172.18.10.71:9090/api/base/datos-personales-detenidos`;
           
            break;
        case 'detenidomediafiliacion':
            url = `http://172.18.10.71:9090/api/base/detenido-media-filiacion`;

            break;
        default:
            break;

    }


    const { dataR, isLoading, hasError } = useFetch(url)
    console.log({dataR,isLoading,hasError});
    return (
        <>  
            <div className="container">
    
                <div className="row">
                    <div className="col-md-12">
                        <h3>Tabla de {lugar}</h3>
                        <hr />
                    </div>
                </div>
    
                <div className="row">
                    <div className="col-md-12">
    
                    {
                        (!isLoading) && <TableConstructor lugar={lugar} datos={dataR.data}/>
                    }
                        
                    </div>
                </div>
    
            </div>
            
        </>
        )

}
