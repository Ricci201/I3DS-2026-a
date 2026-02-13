import './App.css'
import Links from './components/Links/Links'
import Perfil from './components/Perfil/Perfil'
import Rodape from './components/Rodape/Rodape'
import SocialLink from './components/SocialLink/SocialLink'

function App() {
  
  return (
    
    <div id="App">
      <Perfil fotoPerfil={"https://placehold.co/100"}>
        Lucas Ricci
      </Perfil>

      <div className="switch">
        Botão switch
      </div>
      
      <ul>
        <Links url={""}>Inscreva-se</Links>
        <Links url={""}>Minha Playlist</Links>
        <Links url={""}>Me Pague um açai</Links>
        <Links url={""}>Conheça o curso</Links>
      </ul>

      <div className="socialLinks">
        <SocialLink url={"https://github.com"} icon={"logo-github"} />
        <SocialLink url={"https://instagram.com"} icon={"logo-instagram"} />
        <SocialLink url={"https://linkedin.com"} icon={"logo-linkedin"} />
        <SocialLink url={"https://youtube.com"} icon={"logo-youtube"} />
      </div>

      <Rodape>Lucas Ricci</Rodape>
    </div>
  )
}

export default App
