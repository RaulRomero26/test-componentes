import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import axios from 'axios';

export const Lector = () => {
  const [headers, setHeaders] = useState([]);
  const [columnCategories, setColumnCategories] = useState({});
  const [insertCommands, setInsertCommands] = useState([]);
  const [jsonData, setJsonData] = useState('');
  const [fullTextQueries, setFullTextQueries] = useState([]);
  const [tableName, setTableName] = useState('');
  const [parsedData, setParsedData] = useState(null); // Nuevo estado para almacenar los datos analizados

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const data = reader.result;
      const workbook = XLSX.read(data, { type: 'binary' });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const parsedData = XLSX.utils.sheet_to_csv(sheet);
      const results = Papa.parse(parsedData, { header: true });

      if (results && results.meta && results.meta.fields) {
        setHeaders(results.meta.fields);
        setParsedData(results); // Almacena los resultados analizados en el estado
        // Llama a la función para generar los comandos de inserción con los datos del archivo
        generateInsertCommands(results.data);
      }
    };

    reader.readAsBinaryString(file);
  };

  const generateInsertCommands = (data) => {
    if (!tableName.trim()) {
      console.error('El nombre de la tabla está en blanco');
      return;
    }
  
    const commands = data.map((row) => {
      const values = Object.keys(row).map((key) => `'${row[key]}'`).join(', ');
      return `INSERT INTO ${tableName} (${Object.keys(row).join(', ')}) VALUES (${values});`;
    });
    setInsertCommands(commands);
  };
  

  const handleCategoryChange = (e, header) => {
    const newColumnCategories = { ...columnCategories };
    newColumnCategories[header] = e.target.value;
    setColumnCategories(newColumnCategories);
  };

  const generateJsonData = async () => {
    const rowData = {};
    headers.forEach(header => {
      rowData[header] = columnCategories[header] || '';
    });
    setJsonData(JSON.stringify(rowData, null, 2));
  
    // Llamar a la función para generar los comandos de inserción con los datos del archivo
    generateInsertCommands(parsedData.data);
  
    // Llamar a la función para crear tabla e índices después de generar el JSON
    await createTableAndIndexes();
  
    // Llamar a la función para generar las consultas FT después de generar el JSON
    await generateFullTextQueries();
  };

  const generateFullTextQueries = async () => {
    const queries = [];
    const categoriesMap = {};

    // Agrupar las columnas por categoría
    headers.forEach(header => {
      const category = columnCategories[header];
      if (category) {
        if (!categoriesMap[category]) {
          categoriesMap[category] = [];
        }
        categoriesMap[category].push(header);
      }
    });

    // Generar las consultas de índice de texto completo
    Object.keys(categoriesMap).forEach(category => {
      const columns = categoriesMap[category].join('_');
      const query = `ALTER TABLE ${tableName} ADD FULLTEXT INDEX ft_${columns} (${categoriesMap[category].join(', ')});`;
      queries.push(query);
    });

    // Establecer las consultas generadas en el estado
    setFullTextQueries(queries);
  };

  const createTableAndIndexes = async () => {
    try {
      // Validar que tableName no esté en blanco
      if (!tableName.trim()) {
        console.error('El nombre de la tabla está en blanco');
        return;
      }

      const responseCreateTable = await axios.post('http://172.18.10.71:9090/api/generador/crear_tabla', {
        headers: headers,
        tableName: tableName
      });

      console.log('Respuesta de creación de tabla:', responseCreateTable.data);
      if (responseCreateTable.data) {
        console.log('comandos de insert ', insertCommands)
        const responseInsertCommands = await axios.post('http://172.18.10.71:9090/api/generador/insertar_datos', {
          tableName: tableName,
          headers: headers,
          data: parsedData.data // Enviar los datos parseados al backend
        });

        console.log('Respuesta de inserción de datos:', responseInsertCommands.data);

        const responseFullTextQueries = await axios.post('http://172.18.10.71:9090/api/generador/crear_indices_fulltext', {
          tableName: tableName,
          headers: headers,
          columnCategories: Object.values(columnCategories).filter(Boolean) // Enviar las columnas con categorías no vacías al backend
        });

        console.log('Respuesta de creación de índices FULLTEXT:', responseFullTextQueries.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileUpload} />
      <div>
        <h2>Encabezados del archivo:</h2>
        <ul>
          {headers.map((header, index) => (
            <li key={index}>
              {header}
              <select onChange={(e) => handleCategoryChange(e, header)}>
                <option value="">Seleccione categoría</option>
                <option value="nombre">Nombre</option>
                <option value="telefono">Teléfono</option>
                <option value="direccion">Dirección</option>
                <option value="alias">Alias</option>
                <option value="miscelaneo">Misceláneo</option>
              </select>
            </li>
          ))}
        </ul>
        <h2>Comandos de inserción SQL:</h2>
        <ul>
          {insertCommands.map((command, index) => (
            <li key={index}>{command}</li>
          ))}
        </ul>
        <input
          type="text"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
          placeholder="Ingrese el nombre de la tabla"
        />
        <button onClick={generateJsonData}>Generar JSON y ejecutar acciones</button>
        <h2>JSON generado:</h2>
        <pre>{jsonData}</pre>
        <h2>Consultas FT generadas:</h2>
        <ul>
          {fullTextQueries.map((query, index) => (
            <li key={index}>{query}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
