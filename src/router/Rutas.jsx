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

const Rutas = () => {
    return (
        <Routes>
            <Route path='/login' element={<Login />} />
                <Route path="/" element={<HomeScreen />} />
                <Route path="/userMenu" element={<MenuUser />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/materials" element={<Materials />} />
                <Route path="/inventaries" element={<Inventaries />} />
                <Route path="/users" element={<Users />} />
                <Route path="/myAccount" element={<MyAccount />} />
                <Route path="/plusMenu" element={<MenuPlus />} />
                <Route path="/accounts" element={<Accounts />} />
                <Route path="/Rooms" element={<Rooms />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/backups" element={<Backups />} />
                <Route path="/programming" element={<Programming />} />

                <Route path="/newAccount" element={<NewAccount />} />

            <Route element={<ProtectedRoutes/>}>
            </Route>
            {/*
            <Route path="/product/:id" element={<h2>product:id</h2>} />
            <Route path="/shop/:id" element={<h2>shop:id</h2>}/>*/}
        </Routes>
    )
}

export default Rutas