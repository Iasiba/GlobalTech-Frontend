/*
import React, { useState } from 'react'
import './myAccounts.css'
import AxiosGetHook from '../../hooks/axiosGetHook'
import { useNavigate } from 'react-router-dom'
import { setVisibleUser } from './../../store/slices/NewsVisibleSlice'
import { useDispatch } from 'react-redux'
import { setItem } from '../../store/slices/ItemSlice'
import { setArea } from '../../store/slices/AreaSlice'
import { useEffect } from 'react'
import FileUploader from '../fileUploader/fileUploader'
import getConfig from '../../utils/getConfig'
import axios from 'axios'
const myAccounts = () => {
  const dispatch = useDispatch()

  const navigate = useNavigate()
  const [VisibleInputImageProfile, setVisibleInputImageProfile] = useState(false)
  const [Me, setMe] = useState('')
  //const Me = Me.data?.data
  useEffect(() => initial(), [VisibleInputImageProfile])
  function initial() {
    axios.get('http://192.168.0.253:8000/api/v1/users/me', getConfig())
      .then((res) => setMe(res.data))
    dispatch(setArea("Mi Cuenta"))
  }
  const handleImageUpload = () => {
    setVisibleInputImageProfile(false);
  };
  return (
    <>
      {Me && <div className='content myAccount'>
        <i
          className='bx bxs-pencil editMyAccount'
          onClick={
            () => {
              dispatch(setItem(Me))
              navigate('/NewUser')
              {
                //,dispatch(setVisibleUser(true))
              }
            }
          }
        ></i>
        <aside className='image'>
          <img
            className='profileImage'
            src={
              Me.profileImage ?
                Me.profileImage : "https://www.w3schools.com/css/paris.jpg"
            }
            alt=""
          />
          <i
            className='bx bxs-pencil editMyImageProfile'
            onClick={
              () => {
                setVisibleInputImageProfile(!VisibleInputImageProfile)
              }
            }
          ></i>
        </aside>
*/
{
  /*
    <div
      className='ScreenFull'
    >
      <section
        className='UploadImageProgile'
      >
        <i
          className='bx bx-x-circle close'
          onClick={
            () => {
              setVisibleInputImageProfile(false)
            }
          }
        ></i>
        <aside className='createGrid'>
          <label className='necessary'>Cargar Imagen:</label>
          <input
            type="file"
          />
 
        </aside>
        <button
          onClick={
            () => {
              setVisibleInputImageProfile(false)
              uploadProfileImage()
            }
          }
        >
          {'Cargar'}
        </button>
      </section>
    </div>
  */
}
/*
        {
          VisibleInputImageProfile &&
          <FileUploader
            onImageUpload={handleImageUpload}
            url={"http://192.168.0.253:8000/api/v1/users/me/profile-img"}
            uploadKey={"profile_img"}
          />
        }
        <p>{Me.id && Me.firstName}  {Me.id && Me.lastName}</p>
        <p>Email: {Me.id && Me.email}</p>
        <p>Celular: {Me.id && Me.phone}</p>
        <p>Fecha de nacimiento: {Me.id && Me.birthdayDate}</p>
        <p>Direccion: {Me.id && Me.address}</p>
      </div>}
    </>
  )
}

export default myAccounts*/







import React, { useState, useEffect } from 'react';
import './myAccounts.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import FileUploader from '../fileUploader/fileUploader';
import { setVisibleUser } from './../../store/slices/NewsVisibleSlice';
import { setItem } from '../../store/slices/ItemSlice';
import { setArea } from '../../store/slices/AreaSlice';
import getConfig from '../../utils/getConfig';

const MyAccounts = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BackendAddress = useSelector(state => state.BackendAddress)
  const [visibleInputImageProfile, setVisibleInputImageProfile] = useState(false);
  const [Me, setMe] = useState('');

  useEffect(() => {
    initial();
  }, [visibleInputImageProfile]);

  const initial = () => {
    axios.get(`http://${BackendAddress}/api/v1/users/me`, getConfig())
      .then((res) => setMe(res.data));
    dispatch(setArea("Mi Cuenta"));
  };

  const handleImageUpload = () => {
    setVisibleInputImageProfile(false);
  };

  const editAccount = () => {
    dispatch(setItem(Me));
    navigate('/NewUser');
  };


  return (
    <>
      {Me && (
        <div className='content myAccount'>
          <i className='bx bxs-pencil editMyAccount' onClick={editAccount}></i>
          {Me.profileImage && <aside className='image'>
            <img
              className='profileImage'
              src={Me.profileImage ? Me.profileImage : ""}
              alt=""
            />
            <i
              className='bx bxs-pencil editMyImageProfile'
              onClick={() => setVisibleInputImageProfile(!visibleInputImageProfile)}
            ></i>
          </aside>}

          {(!Me.profileImage || visibleInputImageProfile) && (
            <FileUploader
              onImageUpload={handleImageUpload}
              url={`http://${BackendAddress}/api/v1/users/me/profile-img`}
              uploadKey={"profile_img"}
            />
          )}

          <p><b>{Me.id && `${Me.firstName} ${Me.lastName}`}</b></p>
          <p><b>Email:</b> {Me.id && Me.email}</p>
          {Me.phone && <p><b>Celular:</b> {Me.id && Me.phone}</p>}
          {Me.birthdayDate && <p><b>Fecha de nacimiento:</b> {Me.id && Me.birthdayDate}</p>}
          {Me.address && <p><b>Direccion:</b> {Me.id && Me.address}</p>}
        </div>
      )}
    </>
  );
};

export default MyAccounts;
