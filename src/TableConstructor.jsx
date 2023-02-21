import React from 'react'

import { Table } from './Table';

import "babel-polyfill";
import { GlobalFilter, DefaultColumnFilter, SelectColumnFilter, SliderColumnFilter, NumberRangeColumnFilter, fuzzyTextFilterFn,DateRangeColumnFilter, dateBetweenFilterFn } from './helpers/filters'

    // Define a custom filter filter function!
  function filterGreaterThan(rows, id, filterValue) {
    return rows.filter(row => {
        const rowValue = row.values[id]
        return rowValue >= filterValue
    })
    }

// This is an autoRemove method on the filter function that
// when given the new filter value and returns true, the filter
// will be automatically removed. Normally this is just an undefined
// check, but here, we want to remove the filter if it's not a number
filterGreaterThan.autoRemove = val => typeof val !== 'number'

export const TableConstructor = ({lugar, datos}) => {
  console.log('LUGAR: ',lugar,'DATOS: ',datos);
    
    let columns,data;

    switch (lugar) {
      case 'datospersonales':
        columns = React.useMemo(
          () => [
                {
                  Header:'Fecha',
                  accessor:'Fecha_Hora',
                  Filter: DateRangeColumnFilter,
                  filter: dateBetweenFilterFn
                },
                {
                  Header:'Ficha',
                  accessor:'Ficha',
                  filter: 'fuzzyText',
                },
                {
                  Header:'Num. Remisión',
                  accessor:'No_Remision',
                  filter: 'fuzzyText',
                },
                {
                  Header:'Status Remisión',
                  accessor:'Status_Remision',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'Nombre',
                  accessor:'Nombre',
                  filter: 'fuzzyText',
                },
                {
                  Header:'Ap Paterno',
                  accessor:'Ap_Paterno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'Ap Materno',
                  accessor:'Ap_Materno',
                  filter: 'fuzzyText',
                },
                {
                  Header:'CURP',
                  accessor:'CURP',
                  filter: 'fuzzyText',
                },
                {
                  Header:'RFC',
                  accessor:'RFC',
                  filter: 'fuzzyText',
                },
                {
                  Header:'Género',
                  accessor:'Genero',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header: 'Edad De: ',
                  accessor: 'Edad',
                  Filter: NumberRangeColumnFilter,
                  filter: 'between',
                },
                {
                  Header: 'Escolaridad',
                  accessor: 'Escolaridad',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'Lugar Origen',
                  accessor:'Lugar_Origen',
                  filter: 'fuzzyText',
                },
                {
                  Header: 'Estado Civil',
                  accessor: 'Estado_Civil',
                  Filter: SelectColumnFilter,
                  filter: 'equals',
                },
                {
                  Header:'Télefono',
                  accessor:'Telefono',
                  filter: 'fuzzyText',
                },
                {
                  Header:'Email',
                  accessor:'Correo_Electronico',
                  filter: 'fuzzyText',
                },
                {
                  Header:'Ocupación',
                  accessor:'Ocupacion',
                  filter: 'fuzzyText',
                },
          ],[]
        )

        data = React.useMemo(() =>
        datos.Remisiones
        , [])
        
        
        return (
          <Table columns={columns} data={data} />
        )

      case 'detenidomediafiliacion':
          columns = React.useMemo(
            () => [
    
                  {
                    Header:'Ficha',
                    accessor:'Ficha',
                    filter: 'fuzzyText',
                  },
                  {
                    Header:'Num. Remisión',
                    accessor:'No_Remision',
                    filter: 'fuzzyText',
                  },
                  {
                    Header:'Status Remisión',
                    accessor:'Status_Remision',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Nombre',
                    accessor:'Nombre',
                    filter: 'fuzzyText',
                  },
                  {
                    Header:'Ap Paterno',
                    accessor:'Ap_Paterno',
                    filter: 'fuzzyText',
                  },
                  {
                    Header:'Ap Materno',
                    accessor:'Ap_Materno',
                    filter: 'fuzzyText',
                  },
                  {
                    Header:'Género',
                    accessor:'Genero',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header: 'Edad De: ',
                    accessor: 'Edad',
                    Filter: NumberRangeColumnFilter,
                    filter: 'between',
                  },
                  {
                    Header:'Complexión',
                    accessor:'Complexion',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Estatura en cm',
                    accessor:'Estatura_cm',
                    filter: 'fuzzyText',
                  },
                  {
                    Header:'Color Piel',
                    accessor:'Color_Piel',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Forma Cara',
                    accessor:'Forma_Cara',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Pómulos',
                    accessor:'Pomulos',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Cabello',
                    accessor:'Cabello',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Color_Cabello',
                    accessor:'Color_Cabello',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Tam_Cabello',
                    accessor:'Tam_Cabello',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Forma Cabello',
                    accessor:'Forma_Cabello',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Frente',
                    accessor:'Frente',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Cejas',
                    accessor:'Cejas',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Tipo Cejas',
                    accessor:'Tipo_Cejas',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Color Ojos',
                    accessor:'Color Ojos',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Tam Ojos',
                    accessor:'Tam_Ojos',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Forma Ojos',
                    accessor:'Forma_Ojos',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Nariz',
                    accessor:'Nariz',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Tam. Boca',
                    accessor:'Tam_Boca',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Labios',
                    accessor:'Labios',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Menton',
                    accessor:'Menton',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Tam. Orejas',
                    accessor:'Tam_Orejas',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Lobulos',
                    accessor:'Lobulos',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Barba',
                    accessor:'Barba',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Tam. Barba',
                    accessor:'Tam_Barba',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Color Barba',
                    accessor:'Color_Barba',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Bigote',
                    accessor:'Bigote',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Tam. Bigote',
                    accessor:'Tam_Bigote',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
                  {
                    Header:'Color Bigote',
                    accessor:'Color_Bigote',
                    Filter: SelectColumnFilter,
                    filter: 'equals',
                  },
            ],[]
          )
  
          data = React.useMemo(() =>
          datos.Remisiones
          , [])
          
          
          return (
            <Table columns={columns} data={data} />
          )
      
    
      default:
        break;
    }
    



}