# Projeto OdontoPrev - Gestão de Clientes e Agendamentos

## Sobre o Projeto
Este projeto tem como objetivo a criação de um sistema para gerenciamento de Clientes e Agendamentos, utilizando Node.js,Azure SQL e API REST.

##Grupo:
RM 553434 – Igor Oviedo 
Rm553565 - Thiago Carrillo    
RM 553093 - Cauã Loureiro   


# Tecnologias Utilizadas
- Back-end: Node.js 
- Banco de Dados: Azure SQL


# Estrutura do Projeto

api-odontoprev
│--  index.js  # Código principal da API
│--  .env      # Configuração das variáveis de ambiente
│--  package.json  # Dependências do projeto


# Como Rodar o Projeto

# 1. requisitos
- Node.js instalado 
- Conta no Azure e um banco de dados criado

### 2. Clonar o Repositório
sh
 cd api-odontoprev


### 3. Instalar Dependências
sh
npm install


# 4. Configurar o Banco de Dados no Azure SQL
Execute o seguinte script no Azure SQL para criar as tabelas:
sql
CREATE TABLE Clientes (
    id_cliente INT IDENTITY(1,1) PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    data_criacao DATETIME DEFAULT GETDATE()
);

CREATE TABLE Agendamentos (
    id_agendamento INT IDENTITY(1,1) PRIMARY KEY,
    id_cliente INT NOT NULL,
    data_agendamento DATE NOT NULL,
    hora_agendamento TIME NOT NULL,
    status VARCHAR(50) CHECK (status IN ('Agendado', 'Cancelado', 'Concluído')) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES Clientes(id_cliente) ON DELETE CASCADE
);


# 5. Criar e Configurar o Arquivo .env
Crie um arquivo `.env` na raiz do projeto e adicione:

DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_SERVER=seu_servidor.database.windows.net
DB_NAME=OdontoPrevDB
PORT=3000


# 6. Iniciar a API
sh
npm start

Ou utilize o nodemon para recarregamento automático:
sh
npx nodemon index.js


# 7. Testar a API
Utilize Postman ou Insomnia para testar os endpoints:

# Criar um Cliente (POST /clientes)
`json
{
  "nome": "Carlos Oliveira",
  "email": "carlos.oliveira@email.com",
  "telefone": "11912345678"
}


# Criar um Agendamento (POST /agendamentos)
json
{
  "id_cliente": 1,
  "data_agendamento": "2025-04-10",
  "hora_agendamento": "15:30",
  "status": "Agendado"
}


# 8. Outros Endpoints
| Método | Rota | Descrição |
|--------|------|------------|
| GET | /clientes | Lista todos os clientes |
| GET | /agendamentos | Lista todos os agendamentos |
| PUT | /clientes/:id | Atualiza um cliente |
| DELETE | /clientes/:id | Remove um cliente |
| PUT | /agendamentos/:id | Atualiza um agendamento |
| DELETE | /agendamentos/:id | Remove um agendamento |
