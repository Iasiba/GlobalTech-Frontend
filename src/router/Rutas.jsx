import React from 'react'

import { Routes, Route } from 'react-router-dom'
import HomeScreen from '../components/home/home'
import Accounts from '../components/accounts/accounts'
import Activities from '../components/activities/activities'
import MenuUser from '../components/menuUser/menuUser'
import Tasks from '../components/tasks/tasks'
import Projects from '../components/projects/projects'
import Inventaries from '../components/inventaries/inventaries'
import Users from '../components/users/users'
import MyAccount from '../components/myAccounts/myAccounts'
import MenuPlus from '../components/menuPlus/menuPlus'
import Materials from '../components/materials/materials'
import Login from '../components/login/Login'
import ProtectedRoutes from '../Shared/ProtectedRoutes'
import Notes from '../components/notes/notes'
import Rooms from '../components/rooms/rooms'
import Backups from '../components/backups/backups'
import Programming from '../components/programming/programming'
import NewAccount from '../components/accounts/newAccount'
import NewProject from '../components/projects/newProject'
import NewRoom from '../components/rooms/newRoom'
import NewTask from '../components/tasks/newTask'
import NewInventary from '../components/inventaries/newInventary'
import NewMaterial from '../components/materials/newMaterial'
import NewNote from '../components/notes/newNote'
import NewActivity from '../components/activities/newActivity'
import NewRole from '../components/role/newRole'
import NewUser from '../components/users/newUser'
import MyHome from '../components/home/MyHome'
import UserList from '../components/users/userList'
import NewBackup from '../components/backups/newBackup'
const Rutas = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
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
           { /*
            <Route path="/newAccount" element={<NewAccount />} />
            <Route path='/newProject' element={<NewProject />} />
            <Route path='/newRoom' element={<NewRoom />} />
            <Route path='/newTask' element={<NewTask />} />
            <Route path='/newInventary' element={<NewInventary />} />
            <Route path='/newMaterial' element={<NewMaterial />} />
            <Route path='/newNote' element={<NewNote />} />
            <Route path='/newActivity' element={<NewActivity />} />
            <Route path='/newRole' element={<NewRole />} />
            <Route path='/newUser' element={<NewUser />} />
            <Route path='/newBackup' element={<NewBackup />} />
*/}
            <Route element={<ProtectedRoutes />}>
            </Route>
            {/*
            <Route path="/product/:id" element={<h2>product:id</h2>} />
            <Route path="/shop/:id" element={<h2>shop:id</h2>}/>*/}
        </Routes>
    )
}

export default Rutas