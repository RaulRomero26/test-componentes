// Our table component
import React from 'react'
import { useTable, useFilters, useGlobalFilter, usePagination } from 'react-table'

import { GlobalFilter, DefaultColumnFilter, SelectColumnFilter, SliderColumnFilter, NumberRangeColumnFilter, fuzzyTextFilterFn } from './helpers/filters'
import { dataToExcel } from './helpers/dataToExcel';

import './tabla.css';



export function Table({ columns, data }) {

    const exportExcel = (data) => {
        console.log('data a excel',data)
        dataToExcel(data);

    }

    const filterTypes = React.useMemo(
        () => ({
        // Add a new fuzzyTextFilterFn filter type.
        fuzzyText: fuzzyTextFilterFn,
        // Or, override the default text filter to use
        // "startWith"
        text: (rows, id, filterValue) => {
            return rows.filter(row => {
            const rowValue = row.values[id]
            return rowValue !== undefined
                ? String(rowValue)
                    .toLowerCase()
                    .startsWith(String(filterValue).toLowerCase())
                : true
            })
        },
        }),
        []
    )

    const defaultColumn = React.useMemo(
        () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter,
        }),
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,//para paginar hay que cambiar en vez de row a page
        prepareRow,
        state,
        visibleColumns,
        preGlobalFilteredRows,
        setGlobalFilter,
        // The rest of these things are super handy, too ;)
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: {
            pageIndex,
            pageSize,
            sortBy,
            groupBy,
            expanded,
            filters,
            selectedRowIds,
        },
    } = useTable(
        {
        columns,
        data,
        defaultColumn, // Be sure to pass the defaultColumn option
        filterTypes,
        },
        useFilters, // useFilters!
        useGlobalFilter, // useGlobalFilter!
        usePagination// usa la paginacion
    )

  // We don't want to render all of the rows for this example, so cap
  // it for this use case
  //const firstPageRows = rows

  /* --- --- --- ACA PUEDES ACCEDER A LOS RENGLONES FILTRADOS PARA POSTERIOR EXPORTACION --- --- ---
    FALTA TRATAR LA INFORMACION YA QUE REGRESA UN OBJETO UTILIZADO PARA EL REACT TABLE 
    en esa variable remisiones esta ubicada la informacion de dicha tabla en objeto json.
    pa posterior generar el componente de excel y si hace falta informacion hacer el llamado al backend
    en busca de mas ifnrmación.
     -----------------------------------------------------------------------------------------------*/
  let remisiones = preGlobalFilteredRows.map(row => row.values)
  //console.log('previa a excel :', remisiones)
  return (
        <>
         <div className="row">
            <div className="col-md-12">
                <button
                    onClick={() => exportExcel(remisiones)}
                    className='btn btn-success'
                >
                    Exportar Excel
                </button>
            </div>
         </div>
         <div className="outer-wrapper">
            <div className='table-wrapper'>
                <table {...getTableProps()} className="table table-bordered table-hover me-3" >
                    <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>
                            {column.render('Header')}
                            {/* Render the columns filter UI */}
                            <div>{column.canFilter ? column.render('Filter') : null}</div>
                            </th>
                        ))}
                        </tr>
                    ))}
                    <tr>
                        <th
                        colSpan={visibleColumns.length}
                        style={{
                            textAlign: 'left',
                        }}
                        >
                        <GlobalFilter
                            preGlobalFilteredRows={preGlobalFilteredRows}
                            globalFilter={state.globalFilter}
                            setGlobalFilter={setGlobalFilter}
                        />
                        </th>
                    </tr>
                    </thead>
                    <tbody {...getTableBodyProps()}>
                    {page.map((row, i) => {
                        prepareRow(row)
                        return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => {
                            return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                        )
                    })}
                    </tbody>
                </table>
            </div>
         </div>

        <div className="pagination row">
            <div className="col-md-2">
                <button className="btn btn-outline-primary" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                {'<<'}
                </button>{' '}
                <button className="btn btn-outline-primary" onClick={() => previousPage()} disabled={!canPreviousPage}>
                {'<'}
                </button>{' '}
                <button className="btn btn-outline-primary" onClick={() => nextPage()} disabled={!canNextPage}>
                {'>'}
                </button>{' '}
                <button className="btn btn-outline-primary" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                {'>>'}
                </button>{' '}
            </div>
            <div className="col-md-2">
                <span>
                Página {' '}
                <strong>
                    {pageIndex + 1} de {pageOptions.length}
                </strong>{' '}
                </span>
            </div>
            <div className="col-md-2">
                <span>
                | Ir a la Página:{' '}
                <input
                    className="form-control input-sm"
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    gotoPage(page)
                    }}
                    style={{ width: '100px' }}
                />
                </span>{' '}
            </div>

            <div className="col-md-6">
                <select
                className="form-control input-sm"
                value={pageSize}
                onChange={e => {
                    setPageSize(Number(e.target.value))
                }}
                >
                {[10, 20, 30, 40, 50].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                    Mostrar {pageSize}
                    </option>
                ))}
                </select>
            </div>
            
        </div>

        <br />
        <div>
            <pre>
                <br />
                <code>{JSON.stringify(state.filters, null, 2)}</code>
            </pre>
        </div>
        </>
    )
}
