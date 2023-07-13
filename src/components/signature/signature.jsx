/*import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './signature.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { useState } from 'react';
const SignatureCapture = ({ activityId }) => {
    const BackendAddress = useSelector(state => state.BackendAddress)
    const [Receiver, setReceiver] = useState('')
    const signatureRef = useRef();
    const handleClear = () => {
        signatureRef.current.clear();
    };

    const handleSave = () => {
        const signatureData = signatureRef.current.toDataURL();
        // Aquí puedes hacer algo con la imagen de la firma, como enviarla al servidor
        // Crear un objeto FormData
        const formData = new FormData();
        formData.append('signature', signatureData);
        formData.append('receiver', Receiver);

        console.log(signatureData)

        axios.post(`http://${BackendAddress}/api/v1/activities/${activityId}/signature`, formData, getConfig())
            .then(response => response)
            .then(res => {
                // Hacer algo con la respuesta del servidor, si es necesario
                console.log(res);
            })
            .catch(error => {
                // Manejar errores en la solicitud
                console.log(error);
            });

    };

    return (
        <div>
            <SignatureCanvas
                ref={signatureRef}
                canvasProps={{ width: 300, height: 150, className: 'signature-canvas' }}
            />
            <div>
                <label onClick={handleClear}>Borrar</label>
                <label onClick={handleSave}>Guardar</label>
            </div>
            <div className='createGrid'>
                <label className='necessary'>Recibió:</label>
                <input
                    autoComplete='off'
                    placeholder='Nombre de quien recibio el trabajo'
                    maxLength="255"
                    onChange={e => setReceiver(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SignatureCapture;*/

/*
import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './signature.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { useState } from 'react';

const SignatureCapture = ({ activityId }) => {
  const BackendAddress = useSelector((state) => state.BackendAddress);
  const [Receiver, setReceiver] = useState('');
  const signatureRef = useRef();

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const handleSave = () => {
    const signatureData = signatureRef.current.toDataURL('image/png'); // Cambiado a formato JPEG
    console.log(signatureData)

    const formData = new FormData();
    formData.append('signature', signatureData);
    formData.append('receiver', Receiver);

    axios
      .post(
        `http://${BackendAddress}/api/v1/activities/${activityId}/signature`,
        formData,
        getConfig()
      )
      .then((response) => response)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{ width: 300, height: 150, className: 'signature-canvas' }}
      />
      <div>
        <label onClick={handleClear}>Borrar</label>
        <label onClick={handleSave}>Guardar</label>
      </div>
      <div className="createGrid">
        <label className="necessary">Recibió:</label>
        <input
          autoComplete="off"
          placeholder="Nombre de quien recibió el trabajo"
          maxLength="255"
          onChange={(e) => setReceiver(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SignatureCapture;

*/


import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import './signature.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import getConfig from '../../utils/getConfig';

const SignatureCapture = ({ activityId }) => {
  const BackendAddress = useSelector((state) => state.BackendAddress);
  const [Receiver, setReceiver] = useState('');
  const signatureRef = useRef();

  const handleClear = () => {
    signatureRef.current.clear();
  };

  const handleSave = () => {
    const signatureData = signatureRef.current.toDataURL('image/png');
    const base64Data = signatureData.replace(/^data:image\/png;base64,/, '');
    //console.log(signatureData, base64Data)
    const signatureFile = dataURLtoFile(signatureData, 'signature.png');

    const formData = new FormData();
    formData.append('signature', signatureFile);
    formData.append('receiver', Receiver);

    axios
      .post(
        `http://${BackendAddress}/api/v1/activities/${activityId}/signature`,
        formData,
        getConfig()
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const dataURLtoFile = (dataURL, filename) => {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  return (
    <div>
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{ width: 300, height: 150, className: 'signature-canvas' }}
      />
      <div>
        <label onClick={handleClear}>Borrar</label>
        <label onClick={handleSave}>Guardar</label>
      </div>
      <div className="createGrid">
        <label className="necessary">Recibió:</label>
        <input
          autoComplete="off"
          placeholder="Nombre de quien recibió el trabajo"
          maxLength="255"
          onChange={(e) => setReceiver(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SignatureCapture;
