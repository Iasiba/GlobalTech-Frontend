import React, { useState } from 'react';
import './fileUploader.css'
import axios from 'axios';
import getConfig from '../../utils/getConfig';

const fileUploader = ({ url, uploadKey,onImageUpload }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [Message, setMessage] = useState('');

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        try {
            const response = await uploadImageToServer(file);
        } catch (error) { }
        setSelectedImage(URL.createObjectURL(file));
        setTimeout(() => {
            setSelectedImage(null);
            
        }, 5000);
    }

    const uploadImageToServer = (file) => {
        const Data = new FormData()
        Data.append(uploadKey, file)
        axios.post(url, Data, getConfig())
            .then(
                () => {
                    setMessage('Se subio correctamente la imagen')
                    setTimeout(() => {
                        setMessage('');
                        onImageUpload();
                    }, 5000);
                }
            ).catch(
                () => {
                    setMessage('Algo salió mal. Inténtelo de nuevo.')
                    setTimeout(() => {
                        setMessage('');
                    }, 5000);
                }
            )
    }

    return (
        <div className="image-uploader">
            {Message && <div className="error-message">{Message}</div>}
            <input type="file" accept="image/*" onChange={handleImageUpload} id="upload-input" />
            <label htmlFor="upload-input">Seleccionar imagen</label>
            {selectedImage && <img src={selectedImage} alt="Selected" />}
        </div>
    );
};

export default fileUploader;