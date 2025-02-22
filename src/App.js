import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import "./styles.css";
import api from "./services/api.js";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === "") return alert("Parameter is empty!");

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch (error) {
      alert("Erro na busca");
      setInput("");
    }
  }

  return (
    <div className="container">
      <h1 className="title">Opa</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#000" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>Cep: {cep.cep}</h2>

          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>
            {cep.localidade} - {cep.uf}
          </span>
        </main>
      )}
    </div>
  );
}

export default App;
