import { useState } from "react";
import "./App.css";
import Link from "./components/Link/Link";
import Perfil from "./components/Perfil/Perfil";
import Rodape from "./components/Rodape/Rodape";
import SocialLink from "./components/SocialLink/SocialLink";
import Switch from "./components/Switch/Switch";
import foto from "./assets/perfilLucas.jpg";

function App() {
  const [isLight, setIsLight] = useState(true);

  const troca = () => {
    setIsLight(!isLight);
  };

  return (
    <div id="App" className={isLight ? "light" : ""}>
      <Perfil fotoPerfil={foto}>Lucas Ricci</Perfil>

      <Switch troca={troca} isLight={isLight} />

      <div id="Link">
        <ul>
          <Link url={"https://www.youtube.com/"}>Inscreva-se</Link>
          <Link url={"https://open.spotify.com/intl-pt"}>Minha playlist</Link>
          <Link url={"https://acaidabarra.com.br/"}>Me pague um Açai!</Link>
          <Link url={"https://www.figma.com/"}>Conheça o Curso DEV</Link>
        </ul>
      </div>

      <div id="SocialLinks">
        <SocialLink url={"https://github.com"} icon={"logo-github"} />
        <SocialLink url={"https://instagram.com"} icon={"logo-instagram"} />
        <SocialLink url={"https://youtube.com"} icon={"logo-youtube"} />
        <SocialLink url={"https://br.linkedin.com/"} icon={"logo-linkedin"} />
      </div>
      <Rodape>ProfCastello</Rodape>
    </div>
  );
}

export default App;
