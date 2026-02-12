import './App.css'
import Perfil from './components/Perfil/Perfil'

function App() {
  
  return (
    
    <div id='App'>

      <Perfil />

      <div className='perfil'>
        <img src="https://placehold.co/200x200" alt="" />
        <p>@Seu Nome</p>
      </div>

      <div className='switvh'>
        Botão switch
      </div>

      <div className='links'></div>
      <div className='socialLinks'></div>
      <div className='rodape'></div>
    </div>
  )
}

export default App
