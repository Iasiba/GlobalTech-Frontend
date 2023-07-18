

import React, { useState } from 'react';
import axios from 'axios';
import ExcelJS from 'exceljs';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const ExcelEditor = ({ task }) => {
  const BackendAddress = useSelector(state => state.BackendAddress)

  const [excelData, setExcelData] = useState(null);
  const [imageData, setImageData] = useState(null);

  const handleDownload = async () => {
    try {
      const response = await axios.get('http://192.168.0.155:8000/public/chapters/OT Logy.xlsx', { responseType: 'arraybuffer' });
      const data = new Uint8Array(response.data);
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(data);
      const worksheet = workbook.getWorksheet(1);
      const jsonData = worksheet.getSheetValues();
      setExcelData(jsonData);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
    }
  };

  const getImageData = async () => {
    try {
      const response = await axios.get(`http://${BackendAddress}/public/chapters/Logo.png`, { responseType: 'arraybuffer' });
      const data = new Uint8Array(response.data);
      setImageData(data);
    } catch (error) {
      console.error('Error al obtener la imagen:', error);
    }
  };
  const handleSave = async () => {
    if (excelData) {
      //console.log(excelData, 'para guardar el archivo');
      // Realiza aquí cualquier manipulación o edición del contenido del archivo Excel


      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet('Hoja1');
      //worksheet.addRows(excelData);

      //LOGY
      worksheet.mergeCells('B1:E1');
      const COMPANYNAME = worksheet.getCell('B1:E1');
      COMPANYNAME.value = 'LOGY'
      COMPANYNAME.font = { bold: true, size: 50 };


      // Agregar imagen a la celda combinada A1:F1
      const imageId = workbook.addImage({
        buffer: imageData,
        extension: 'png',
      });
      worksheet.addImage(imageId, 'B1:E1');


      //PROJECT
      const PROJECT = worksheet.getCell(`A4`);
      PROJECT.value = 'PROYECTO'
      const PROJECTNAME = worksheet.getCell(`B4`);
      PROJECTNAME.value = task.room.project.name
      //APPLICANT
      const APPLICANT = worksheet.getCell(`A5`);
      APPLICANT.value = 'SOLICITANTE'
      const APPLICANTNAME = worksheet.getCell(`B5`);
      APPLICANTNAME.value = task.room.project.name
      //EMAIL
      const EMAIL = worksheet.getCell(`A6`);
      EMAIL.value = 'CORREO ELECTRÓNICO'
      const EMAILNAME = worksheet.getCell(`B6`);
      EMAILNAME.value = task.room.project.name

      //PHONE
      const PHONE = worksheet.getCell(`E5`);
      PHONE.value = 'TELÉFONO'
      const PHONENUMBER = worksheet.getCell(`F5`);
      PHONENUMBER.value = task.room.project.name
      //ORDERDATE
      const ORDERDATE = worksheet.getCell(`E6`);
      ORDERDATE.value = 'FECHA DE SOLICITUD'
      const ORDERDATENUMBER = worksheet.getCell(`F6`);
      ORDERDATENUMBER.value = task.createdAt.substring(0, 10)
      //ORDERDATE
      const DATEDELIVERY = worksheet.getCell(`A7`);
      DATEDELIVERY.value = 'FECHA PROMETIDA'
      const DATEDELIVERYNUMBER = worksheet.getCell(`B7`);
      DATEDELIVERYNUMBER.value = task.executionDate
      //EXECUTIONDATE
      const tiempoTranscurrido = Date.now();
      const hoy = new Date(tiempoTranscurrido);
      const EXECUTIONDATE = worksheet.getCell(`E7`);
      EXECUTIONDATE.value = 'FECHA DE ENTREGA'
      const EXECUTIONDATENUMBER = worksheet.getCell(`F7`);
      EXECUTIONDATENUMBER.value = hoy.toISOString().substring(0, 10); // "2020-06-13T18:30:00.000Z"
      //encabezado en negrita
      for (let i = 2; i < 9; i++) {
        const cellA = worksheet.getCell(`A${i}`);
        cellA.font = { bold: true };
        const cellE = worksheet.getCell(`E${i}`);
        cellE.font = { bold: true };
      }
      //JOBREQUESTED
      const JOBREQUESTED = worksheet.getCell(`A9`);
      JOBREQUESTED.value = 'TRABAJO SOLICITADO'
      JOBREQUESTED.font = { bold: true };
      //tarea
      worksheet.mergeCells('B9:F9');
      const TASK = worksheet.getCell('B9F9');
      const TASKDESCRIPTION = worksheet.getCell(`B9`);
      TASKDESCRIPTION.value = task.description





      //FORMATO DE TABLA
      let Indice = 11
      for (Indice; Indice < 11 + task.activities.length + 2; Indice++) {
        worksheet.mergeCells(`A${Indice}:E${Indice}`);
      }
      //ENCABEZADO TABLA ACTIVIDADES
      const DESCRIPTIONSWORK = worksheet.getCell('A11:E11');
      DESCRIPTIONSWORK.value = 'DESCRIPCCION LABORAL'
      DESCRIPTIONSWORK.font = { bold: true };
      const TOTALPRICESWORK = worksheet.getCell('F11');
      TOTALPRICESWORK.value = 'IMPORTE'
      TOTALPRICESWORK.font = { bold: true };
      //LLENADO DE ACTIVIDADES
      for (let i = 0; i < task.activities.length; i++) {
        for (let j = 1; j < 6; j++) {
          const cell = worksheet.getCell(`A${12 + i}`);
          cell.value = task.activities[i].createdAt + ' ' + task.activities[i].description;
        }
      }
      // TOTAL DE MANO DE OBRA
      const iActivitiesCost = worksheet.getCell(`A${Indice - 1}`);
      iActivitiesCost.value = 'TOTAL DE MANO DE OBRA'
      iActivitiesCost.font = { bold: true };








      Indice++
      //Material
      //ENCABEZADO MATERIAL
      const MATERIAL = worksheet.getCell(`A${Indice}B${Indice}`);
      MATERIAL.value = 'MATERIAL'
      MATERIAL.font = { bold: true };
      const AMOUNT = worksheet.getCell(`D${Indice}`);
      AMOUNT.value = 'CANTIDAD'
      AMOUNT.font = { bold: true };
      const UNITARYPRICE = worksheet.getCell(`E${Indice}`);
      UNITARYPRICE.value = 'PRECIO UNITARIO'
      UNITARYPRICE.font = { bold: true };
      const TOTALPRICESMATERIAL = worksheet.getCell(`F${Indice}`);
      TOTALPRICESMATERIAL.value = 'IMPORTE'
      TOTALPRICESMATERIAL.font = { bold: true };

      const IndiceMaterialEnd = Indice + 1 + (task.materials ? task.materials.length : 0)
      for (Indice; Indice < IndiceMaterialEnd; Indice++) {
        worksheet.mergeCells(`A${Indice}:C${Indice}`);
      }
      //TOTAL MATERIAL
      worksheet.mergeCells(`A${Indice}:E${Indice}`);
      const TOTALMATERIAL = worksheet.getCell(`A${Indice}:E${Indice}`);
      TOTALMATERIAL.value = 'TOTAL DE MATERIAL'
      TOTALMATERIAL.font = { bold: true };
      //FIRMA
      worksheet.mergeCells(`B${Indice + 5}:E${Indice + 5}`);
      const SIGNATUR = worksheet.getCell(`B${Indice + 5}:E${Indice + 5}`);
      SIGNATUR.border = {
        bottom: { style: 'thin', color: { argb: '000000' } },
      };
      worksheet.mergeCells(`C${Indice + 6}:D${Indice + 6}`);
      const SIGNATURE = worksheet.getCell(`C${Indice + 6}:D${Indice + 6}`);
      SIGNATURE.value = 'FIRMA'
      // Asignar ancho específico a las columnas A Dy E
      worksheet.getColumn('A').width = 20;
      worksheet.getColumn('B').width = 20;
      worksheet.getColumn('C').width = 0;
      worksheet.getColumn('D').width = 10;
      worksheet.getColumn('E').width = 20;
      worksheet.getColumn('F').width = 20;

      // Ajustar texto al tamaño de la celda y ajustar altura de fila
      worksheet.eachRow({ includeEmpty: true }, (row, rowIndex) => {
        let maxCellHeight = 0;
        row.eachCell({ includeEmpty: true }, (cell) => {
          cell.alignment = {
            wrapText: true, // Permite que el texto se ajuste al tamaño de la celda
            vertical: 'middle', // Alineación vertical al centro
          };
          const cellText = cell.value ? cell.value.toString() : '';
          const lettersAmount = cellText.length;
          const font = cell.font;
          const charWidth = font ? font.size * 0.6 : 10; // Estimación del ancho máximo de una letra en píxeles
          const cellWidth = cell.width;
          let heightMultiplier = (charWidth * lettersAmount) / cellWidth;
          if (heightMultiplier < 1) {
            heightMultiplier = 1;
          }
          const defaultRowHeight = worksheet.properties.defaultRowHeight;
          const cellHeight = defaultRowHeight * heightMultiplier;
          cell.height = cellHeight;
          maxCellHeight = Math.max(maxCellHeight, cellHeight);
        });
        worksheet.getRow(rowIndex).height = maxCellHeight;
      });



      //Logy
      COMPANYNAME.alignment = { horizontal: 'center' };
      //Actividades
      DESCRIPTIONSWORK.alignment = { horizontal: 'center' };
      TOTALPRICESWORK.alignment = { horizontal: 'center' };
      //tarea

      TASK.alignment = {
        vertical: 'middle',
      };
      //Materiales
      MATERIAL.alignment = { horizontal: 'center' };
      AMOUNT.alignment = { horizontal: 'center' };
      UNITARYPRICE.alignment = { horizontal: 'center' };
      TOTALPRICESMATERIAL.alignment = { horizontal: 'center' };
      //firma

      SIGNATURE.alignment = { horizontal: 'center' };
      SIGNATURE.font = { bold: true };;

      // Guarda el archivo Excel modificado
      const buffer = await workbook.xlsx.writeBuffer();
      const data = new Blob([buffer], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(data);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'archivo_modificado.xlsx');
      link.click();
    }
  };
  useEffect(() => {
    // Llama a la función para obtener la imagen cuando se monte el componente
    handleDownload()
    getImageData();
  }, []);
  return (
    <p className='items materialItemsWidth' onClick={handleSave}>Guardar Excel</p>

  );
};

export default ExcelEditor;

