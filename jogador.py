def jogador_entidade(db_item) -> dict:
    return {
        'id': str(db_item['_id']),
        'nome': (db_item['jogador_nome']),
        'idade': (db_item['jogador_idade']),
        'time': (db_item['jogador_time']),
    }

# para atualizar dados tem que ser na forma DICIONARIO

def lista_jogadores_entidade(db_item_lista) -> list:
    lista_jogadores = []
    for item in db_item_lista:
        lista_jogadores.append(jogador_entidade(item))
    return lista_jogadores



