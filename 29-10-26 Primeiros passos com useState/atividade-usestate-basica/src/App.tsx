import { useState } from "react";
import "./App.css";

function App() {
  function Contador() {
    const [contador, setContador] = useState(0);

    function aumentar() {
      // Escreva aqui a atualização do contador.
      setContador(contador+1)
    }
    
    return (
      <div>
        <p>Valor atual: {contador}</p>
        <button onClick={aumentar}>Aumentar</button>
      </div>
      
    );
  }
  
  

  return <>
    <Contador/>
  </>;

}

export default App;
