import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { useSelector } from 'react-redux';
import getConfig from '../../utils/getConfig';
import './ExcelReader.css'

const ExcelReader = ({ inventaryId }) => {
  const BackendAddress = useSelector((state) => state.BackendAddress);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      let res = [];
      jsonData.map((material) => {
        let NewMaterial = {};
        NewMaterial.name = material[0]//material
        NewMaterial.model = material[1]//modelo
        NewMaterial.color = material[2]//color
        NewMaterial.amount = material[3]//cantidad
        NewMaterial.installed = material[4] == 'si' ? true : false//instalado
        NewMaterial.delivered = material[6] == 'si' ? true : false//entregado
        NewMaterial.receiver = material[7]//recibio
        NewMaterial.onHold = material[8] == 'si' ? true : false//espera
        /*
        jsonData[0].map((title) => {
          NewMaterial[title] = material[i];
          i++;
        });
        */
        res.push(NewMaterial);
      });
      res.shift();
      res.map((material) => {
        axios
          .post(`http://${BackendAddress}/api/v1/inventories/${inventaryId}/materials`, material, getConfig())
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      });

      //const data = new Blob([e.target.result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      //saveAs(data, 'archivo.xlsx');
    };

    reader.readAsBinaryString(file);
  };

  {/*< div className = 'ExcelReader' >
    <input type="file" onChange={handleFileUpload} />
  </ >*/ }
  return (
  <div className="excel-uploader">
    <input type="file" onChange={handleFileUpload} id="upload-excel" />
    <label htmlFor="upload-excel">Importar Excel</label>
  </div>
 
  );
};

export default ExcelReader;




/*import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import axios from 'axios';
import { useSelector } from 'react-redux';
import getConfig from '../../utils/getConfig';

class ExcelReader extends React.Component {

  handleFileUpload = (event) => {
    const BackendAddress = useSelector(state => state.BackendAddress)
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const workbook = XLSX.read(e.target.result, { type: 'binary' });
      const sheetName = workbook.SheetNames[0]; // Asigna el nombre de la hoja que deseas leer
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Aquí puedes hacer lo que quieras con los datos del archivo Excel
      //console.log(jsonData,'aaaaaaaaaaaaaaaaa');
      let res = []
      jsonData.map(
        material => {
          let i = 0
          let NewMaterial = {}
          jsonData[0].map(
            title => {
              NewMaterial[title] = material[i]
              i++
            }
          )
          res.push(NewMaterial)
        }
      )
      res.shift()
      console.log(res)
      res.map(
        material => {
          axios.post(`http://${BackendAddress}/api/v1/inventories/${InventoryId}/materials`, material, getConfig())
            .then(res => console.log(res))
            .catch(err=>console.log(err))
        }
      )
      // Guarda el archivo en el cliente
      //const data = new Blob([e.target.result], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      //saveAs(data, 'archivo.xlsx');
    };
    reader.readAsBinaryString(file);
  }

  render() {
    return (
      <div>
        <input type="file" onChange={this.handleFileUpload} />
      </div>
    );
  }
}

export default ExcelReader;*/
