from fastapi import APIRouter
from database import conexao
from jogador_model import Jogador
from jogador import jogador_entidade, lista_jogadores_entidade
from bson import ObjectId

jogador_router = APIRouter()


@jogador_router.get("/")
async def inicio():
    return "Bem vindo ao FullStack Farm"


# lista TODOS jogadores
@jogador_router.get("/jogadores")
async def listar_jogadores():
    return lista_jogadores_entidade(conexao.local.jogador.find())


@jogador_router.get("/jogadores/{jogador_id}")
def busca_jogador_id(jogador_id):
    return jogador_entidade(
        conexao.local.jogador.find_one
            (
            {'_id': ObjectId(jogador_id)}
        )
    )


# INSERE jogadores
@jogador_router.post("/jogadores")
async def cadastra_jogadores(jogador: Jogador):
    conexao.local.jogador.insert_one(dict(jogador))
    return lista_jogadores_entidade(conexao.local.jogador.find())


# UPDATE jogador
@jogador_router.put("/jogadores/{jogador_id}")
async def atualiza_jogador(jogador_id, jogador: Jogador):
    conexao.local.jogador.find_one_and_update(
        {'_id': ObjectId(jogador_id)},
        {'$set': dict(jogador)}
    )
    return lista_jogadores_entidade(
        conexao.local.jogador.find()
    )


# EXCLUI jogador
@jogador_router.delete('/jogadores/{jogador_id}')
async def exclui_jogador(jogador_id):
    conexao.local.jogador.find_one_and_delete(
        {'_id': ObjectId(jogador_id)}
    )
    return lista_jogadores_entidade(conexao.local.jogador.find())
