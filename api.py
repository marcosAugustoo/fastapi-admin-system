from fastapi import FastAPI
from jogador_route import jogador_router
from fastapi.middleware.cors import CORSMiddleware

cliente_app = [
    'http://localhost:3000'  # 3000 PORTA PADRAO REACT
]

app = FastAPI()

app.include_router(jogador_router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=cliente_app,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)