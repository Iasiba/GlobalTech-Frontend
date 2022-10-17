import './App.css'
import Rutas from './router/Rutas.jsx'
import NavBar from './components/navBar/navBar'
import Footer from './components/footer/footer'
function App() {
  return (
    <div className="App">
      <NavBar/>
      <Rutas/>
      {/*<Footer/>*/}
    </div>
  )
}

export default App
