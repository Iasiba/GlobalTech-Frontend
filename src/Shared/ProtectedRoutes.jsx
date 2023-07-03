/*import React from 'react'
import { Navigate, Outlet, Route } from 'react-router-dom'
import NavBar from '../components/navBar/navBar'
import HomeScreen from '../components/home/home'
import Accounts from '../components/accounts/accounts'
import Activities from '../components/activities/activities'
import MyHome from '../components/home/MyHome'
import UserList from '../components/users/userList'
import MenuUser from '../components/menuUser/menuUser'
import Tasks from '../components/tasks/tasks'
import Projects from '../components/projects/projects'
import Inventaries from '../components/inventaries/inventaries'
import Users from '../components/users/users'
import MyAccount from '../components/myAccounts/myAccounts'
import MenuPlus from '../components/menuPlus/menuPlus'
import Materials from '../components/materials/materials'
import Notes from '../components/notes/notes'
import Rooms from '../components/rooms/rooms'
import Backups from '../components/backups/backups'
import Programming from '../components/programming/programming'

const ProtectedRoutes = () => {

  const token = localStorage.getItem("token")

  if (token) {
    return (
      <>
        <NavBar />
        <Route path="/" element={<HomeScreen />} />
        <Route path='/myHome' element={<MyHome />} />
        <Route path="/userMenu" element={<MenuUser />} />
        <Route path="/plusMenu" element={<MenuPlus />} />
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/Rooms" element={<Rooms />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/inventaries" element={<Inventaries />} />
        <Route path="/materials" element={<Materials />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/backups" element={<Backups />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/users" element={<Users />} />
        <Route path='/userList' element={<UserList />} />
        <Route path="/programming" element={<Programming />} />
        <Outlet />
      </>
    )
  } else {
    return <Navigate to='/login' />
  }

}

export default ProtectedRoutes*/

import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import NavBar from '../components/navBar/navBar';
import HomeScreen from '../components/home/home';
import Accounts from '../components/accounts/accounts';
import Activities from '../components/activities/activities';
import MyHome from '../components/home/MyHome';
import UserList from '../components/users/userList';
import MenuUser from '../components/menuUser/menuUser';
import Tasks from '../components/tasks/tasks';
import Projects from '../components/projects/projects';
import Inventaries from '../components/inventaries/inventaries';
import Users from '../components/users/users';
import MyAccount from '../components/myAccounts/myAccounts';
import MenuPlus from '../components/menuPlus/menuPlus';
import Materials from '../components/materials/materials';
import Notes from '../components/notes/notes';
import Rooms from '../components/rooms/rooms';
import Backups from '../components/backups/backups';
import Programming from '../components/programming/programming';

const ProtectedRoutes = () => {
  const token = localStorage.getItem('token');

  if (token) {
    return (
      <>
        <NavBar />
        <Outlet />
      </>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoutes;
