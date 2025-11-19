import React from "react";
import axios from "axios";

function Jogador(props){

    const excluiJogador = (id) => {
        axios.delete(`http://127.0.0.1:8000/jogadores/${id}`)
            .then(response => {
                props.setJogadorList(response.data); // lista atualizada
            })
            .catch(error => console.log(error));
    };

    const editaJogador = (jogador) => {
        props.setJogadorId(jogador.id);
        props.setJogadorNome(jogador.nome);
        props.setJogadorIdade(jogador.idade);
        props.setJogadorTime(jogador.time);
        props.setTextoBotao('Atualizar');
    }

    return (
        <li className="d-flex justify-content-between align-items-center mb-1">
            <span>
                {props.jogador.nome} - {props.jogador.idade} - {props.jogador.time}
            </span>

            {/* Grupo dos botões */}
            <div className="d-flex gap-2">

                <button 
                    onClick={() => editaJogador(props.jogador)}
                    className="btn btn-sm"
                >
                    <span className="badge rounded-pill bg-info">
                        Editar
                    </span>
                </button>

                <button 
                    onClick={() => excluiJogador(props.jogador.id)}
                    className="btn btn-sm"
                >
                    <span className="badge rounded-pill bg-danger">
                        X
                    </span>
                </button>

            </div>
        </li>
    );
}

export default Jogador;
