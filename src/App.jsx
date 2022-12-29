import './App.css'
import Rutas from './router/Rutas.jsx'
import NavBar from './components/navBar/navBar'
import Footer from './components/footer/footer'
import NewProject from './components/projects/newProject'
import NewRoom from './components/rooms/newRoom'
import NewTask from './components/tasks/newTask'
import NewActivity from './components/activities/newActivity'
import NewAccount from './components/accounts/newAccount'
import NewInventary from './components/inventaries/newInventary'
import NewMaterial from './components/materials/newMaterial'
import NewBackup from './components/backups/newBackup'
import NewUser from './components/users/newUser'
import NewNote from './components/notes/newNote'
import { useSelector } from 'react-redux'
function App() {
  const NewProjectVisible = useSelector(state => state.NewsVisible)[0]
  const NewRoomVisible = useSelector(state => state.NewsVisible)[1]
  const NewTaskVisible = useSelector(state => state.NewsVisible)[2]
  const NewActivityVisible = useSelector(state => state.NewsVisible)[3]
  const NewAccountVisible = useSelector(state => state.NewsVisible)[4]
  const NewInventaryVisible = useSelector(state => state.NewsVisible)[5]
  const NewMaterialVisible = useSelector(state => state.NewsVisible)[6]
  const NewBackupVisible = useSelector(state => state.NewsVisible)[7]
  const NewNoteVisible = useSelector(state => state.NewsVisible)[8]
  const NewUserVisible = useSelector(state => state.NewsVisible)[9]

  return (
    <div
      className={
        `App ${(
          NewProjectVisible ||
          NewRoomVisible ||
          NewTaskVisible ||
          NewActivityVisible ||
          NewAccountVisible ||
          NewInventaryVisible ||
          NewMaterialVisible ||
          NewBackupVisible ||
          NewUserVisible ||
          NewNoteVisible
        ) && 'overlay'}`
      }
    >
      <NavBar />
      <Rutas />
      {(NewProjectVisible || NewRoomVisible || NewTaskVisible ||
        NewActivityVisible || NewAccountVisible || NewInventaryVisible ||
        NewMaterialVisible || NewBackupVisible || NewUserVisible || NewNoteVisible
      ) && <section className='News'>
          {NewProjectVisible && <NewProject />}
          {NewRoomVisible && <NewRoom />}
          {NewTaskVisible && <NewTask />}
          {NewActivityVisible && <NewActivity />}
          {NewAccountVisible && <NewAccount />}
          {NewInventaryVisible && <NewInventary />}
          {NewMaterialVisible && <NewMaterial />}
          {NewBackupVisible && <NewBackup />}
          {NewNoteVisible && <NewNote />}
          {NewUserVisible && <NewUser />}
        </section>}
      {/*<Footer/>*/}
    </div>
  )
}

export default App
