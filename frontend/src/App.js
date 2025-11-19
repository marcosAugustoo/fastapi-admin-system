import { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css'
import JogadorList from "./components/JogadorList";

function App(){

  const [jogadorList, setJogadorList] = useState([]);
  const [jogadorNome, setJogadorNome] = useState('');
  const [jogadorIdade, setJogadorIdade] = useState('');
  const [jogadorTime, setJogadorTime] = useState('');
  const [jogadorId, setJogadorId] = useState('');
  const [textoBotao, setTextoBotao] = useState('Cadastrar');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/jogadores')
      .then(resposta => {
        setJogadorList(resposta.data);
      })
      .catch(error => console.log(error));
  }, []);

  const adicionaJogador = (jogador) => {
      axios.post('http://127.0.0.1:8000/jogadores', jogador)
      .then(resposta => {
        setJogadorList(resposta.data); // lista já atualizada
      })
      .catch(error => console.log(error));
  }

  const atualizaJogador = (jogador) => {
  axios.put(`http://127.0.0.1:8000/jogadores/${jogadorId}`, jogador)
    .then(resposta => {

      // atualiza a lista
      setJogadorList(resposta.data);

      setJogadorId('');
      setJogadorNome('');
      setJogadorIdade('');
      setJogadorTime('');

      alert('Jogador atualizado com sucesso!!!');
    })
    .catch(error => console.log(error));
}

  const adicionaAtualizaJogador = () => {
    const jogador = {
      jogador_nome: jogadorNome,
      jogador_idade: jogadorIdade,
      jogador_time: jogadorTime
    };
    
    if (jogadorId !== ''){
      atualizaJogador(jogador);
    } else{
      adicionaJogador(jogador);
      }
  };

  return(
    <div className="container">
      <div className="mt-3 justify-content-center align-items-center mx-auto"
           style={{ width: "70vw", backgroundColor: "#fff" }}>

        <h2 className="text-center text-white bg-success card pb-2 pt-2">
          Gerenciamento de jogadores
        </h2>

        <div className="card-body text-center">

          <h5 className="card text-center text-white bg-dark pb-1 pt-1">
            Cadastro do jogador
          </h5>

          <input className="mb-2 form-control"
                 placeholder="informe o nome:"
                 value={jogadorNome}
                 onChange={e => setJogadorNome(e.target.value)} />

          <input className="mb-2 form-control"
                 placeholder="informe a idade:"
                 value={jogadorIdade}
                 onChange={e => setJogadorIdade(e.target.value)} />

          <input className="mb-2 form-control"
                 placeholder="informe o time:"
                 value={jogadorTime}
                 onChange={e => setJogadorTime(e.target.value)} />

          <button onClick={adicionaAtualizaJogador}
                  className="mb-4 btn btn-outline-success">
            { textoBotao }
          </button>

          <h5 className="card text-center text-white bg-dark pb-1">
            Lista de jogadores:
          </h5>

          <JogadorList 
            jogadorList={jogadorList}
            setJogadorList={setJogadorList}
            setJogadorNome={setJogadorNome}
            setJogadorIdade={setJogadorIdade}
            setJogadorTime={setJogadorTime}
            setJogadorId={setJogadorId}
            setTextoBotao = {setTextoBotao}
          />

        </div>

        <h6 className="card text-center text-white bg-success py-1">&copy; MS - 2025</h6>
      </div>
    </div>
  );
}

export default App;
