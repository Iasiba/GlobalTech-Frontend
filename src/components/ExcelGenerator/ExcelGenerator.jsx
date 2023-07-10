import React from 'react';
import * as XLSX from 'xlsx';
import './ExcelGenerator.css'
const ExcelGenerator = ({ data }) => {
  const workbook = XLSX.utils.book_new();

  function EstructuringMaterialsData() {
    let res = [
      ['Material', 'Modelo', 'Color', 'Cantidad', 'Instalado', 'Area', 'Entregado', 'Recibio', 'Espera']
    ]
    data.materials.map(
      material => res.push(
        [
          material.name,
          material.model,
          material.color,
          material.amount,
          material.installed ? 'si' : 'no',
          material.area,
          material.delivered ? 'si' : 'no',
          material.receiverName,
          material.onHold ? 'si' : 'no'
        ]
      )
    )
    return res
  }
  function EstructuringAccountsData() {
    let res = [['Sistema', 'Usuario', 'Contraseña', 'Direccion Web']]
    data.accounts.map(
      account => res.push(
        [
          account.software,
          account.user,
          account.password,
          account.directionIp === '0.0.0.0' ? '' : account.directionIp
        ]
      )
    )
    return res
  }
  function EstructuringTasksData() {
    let res = [['Fecha', 'Area', 'Tarea']]
    data.rooms.map(
      room => room.tasks.map(
        task => res.push(
          [
            task.executionDate,
            room.name,
            task.description
          ]
        )
      )
    )
    return res
  }
  function EstructuringActivitiesData() {
    let res = [['Fecha', 'Tarea', 'Descripcion', 'Observacion']]
    data.rooms.map(
      room => room.tasks.map(
        task => task.activities.map(
          activity => res.push(
            [
              activity.createdAt,
              task.description,
              activity.description,
              activity.observation
            ]

          )
        )
      )
    )
    return res
  }
  const exportToExcel = () => {
    const Material = EstructuringMaterialsData()
    const worksheetMaterial = XLSX.utils.aoa_to_sheet(Material);
    XLSX.utils.book_append_sheet(workbook, worksheetMaterial, 'Materiales');

    const Account = EstructuringAccountsData()
    const worksheetAccount = XLSX.utils.aoa_to_sheet(Account);
    XLSX.utils.book_append_sheet(workbook, worksheetAccount, 'Cuentas');

    const Task = EstructuringTasksData()
    const worksheetTask = XLSX.utils.aoa_to_sheet(Task);
    XLSX.utils.book_append_sheet(workbook, worksheetTask, 'Tareas');

    const Activities = EstructuringActivitiesData()
    const worksheetActivities = XLSX.utils.aoa_to_sheet(Activities);
    XLSX.utils.book_append_sheet(workbook, worksheetActivities, 'Actividades');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    saveExcelFile(excelBuffer, `${data.name}.xlsx`);
  };

  const saveExcelFile = (buffer, fileName) => {
    const data = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <p className='items materialItemsWidth ExcelGenerator' onClick={exportToExcel}>Exportar Excel</p>
  );
};
{/*<div className='ExcelGenerator'>
  </div>*/}

export default ExcelGenerator;//*/

/*
import React from 'react';
import * as XLSX from 'xlsx';

class ExcelGenerator extends React.Component {
  exportToExcel = () => {
    const data = [
      ['Nombre', 'Edad', 'Email'],
      ['John Doe', 30, 'johndoe@example.com'],
      ['Jane Smith', 28, 'janesmith@example.com'],
      ['Bob Johnson', 35, 'bobjohnson@example.com']
    ];

    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet 1');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    this.saveExcelFile(excelBuffer, 'example.xlsx');
  };

  saveExcelFile = (buffer, fileName) => {
    const data = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(data);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  render() {
    return (
      <div>
        <button onClick={this.exportToExcel}>Exportar a Excel</button>
      </div>
    );
  }
}

export default ExcelGenerator;//*/