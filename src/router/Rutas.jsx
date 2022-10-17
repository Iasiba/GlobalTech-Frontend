import React from 'react'

import { Routes, Route } from 'react-router-dom'
import HomeScreen from '../components/home/home'
import Accounts from '../components/accounts/accounts'
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
//import Accounts from '../components/accounts/accounts'
const Rutas = () => {
    return (

        <Routes>
            <Route path='/login' element={<Login />} />
            <Route element={<ProtectedRoutes/>}>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/userMenu" element={<MenuUser />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/materials" element={<Materials />} />
                <Route path="/inventaries" element={<Inventaries />} />
                <Route path="/users" element={<Users />} />
                <Route path="/myAccount" element={<MyAccount />} />
                <Route path="/plusMenu" element={<MenuPlus />} />
                <Route path="/accounts" element={<Accounts />} />
            </Route>
            {/*
            <Route path="/product/:id" element={<h2>product:id</h2>} />
            <Route path="/shop/:id" element={<h2>shop:id</h2>}/>*/}
        </Routes>
    )
}

export default Rutas