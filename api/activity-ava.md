# PARTE 1: Trabalhando com toThrow e try/catch

## Título da Atividade
Criação de API REST com Node.js, Express e Arquitetura em Camadas (ESM)

## Objetivo
Criar uma API simples em Node.js utilizando o framework Express, aplicando separação de responsabilidades e utilizando ECMAScript Modules (ESM).

---

## Instruções da Entrega

### 1. Configuração Inicial

```bash
npm init -y
npm install express
```

No package.json:

```json
"type": "module",
"start": "node src/server.js"
```

---

### 2. Estrutura do Projeto

```
meu-projeto/
├── package.json
└── src/
    ├── app.js
    ├── server.js
    └── userService.js
```

---

### 3. Regra de Negócio (userService.js)

Função exportada: createUser(userData)

Validações obrigatórias:

Se não existir propriedade name:
throw new Error("O nome do usuário é obrigatório.")

Se age < 18:
throw new Error("O usuário deve ser maior de idade.")

Retorno esperado:

    {
      id: gerado_aleatoriamente,
      name: string,
      age: number,
      isActive: true,
      roles: ['user']
    }

---

### 4. Express (app.js)

- app.use(express.json())
- Criar rota POST /users
- Retornar 201 em sucesso
- Retornar 400 em erro com:
{ "error": error.message }

---

### 5. Servidor (server.js)

Servidor rodando na porta 3000.

---

# PARTE 2: Documentação

## ENTREGA 01 — Requisitos Funcionais

| ID     | Requisito           | Descrição                                                                 |
|--------|--------------------|---------------------------------------------------------------------------|
| RF-01  | Gerenciar Usuários | Criar, ler, atualizar e deletar usuários no banco de dados com validação |
| RF-02  | Autenticação de Usuário | Validar credenciais de email e senha para login                            |
| RF-03  | Gerenciar Produtos | Criar, ler, atualizar e deletar produtos com controle de estoque         |
| RF-04  | Compra de Produtos | Validar quantidade em estoque e atualizar após compra                     |
| RF-05  | Tratamento de Erros | Retornar mensagens de erro adequadas em todas as operações               |
| RF-06  | Validação de Dados | Validar campos obrigatórios (nome, email, senha, preço, quantidade)     |

---

## ENTREGA 08 — Descritivo de Casos de Teste

### 8.1 Casos de Teste - UsuarioService

| ID Caso | ID Requisito | Descrição                                              | Precondição                  | Passos                                                                 | Resultado Esperado                                                                 |
|---------|-------------|--------------------------------------------------------|------------------------------|------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| CT-01   | RF-01      | Listar todos os usuários com sucesso | Banco contém usuários registrados | 1. Chamar getAll() 2. Aguardar resultado | Array com objetos de usuários |
| CT-02   | RF-01      | Criar novo usuário com dados válidos | Dados completos: nome, email, senha | 1. Chamar createUser({nome, email, senha}) 2. Validar resposta | Retorna {status: true, mensagem: "usuario criado", data: [usuário]} com code 201 |
| CT-03   | RF-02      | Login bem-sucedido com credenciais corretas | Email e senha válidos no BD | 1. Chamar login(email, senha) 2. Validar token/sessão | Retorna {status: true, mensagem: "usuario logado", data: [usuário]} |
| CT-04   | RF-02      | Login falha com credenciais incorretas | Email ou senha inválidos | 1. Chamar login(email_invalido, senha) 2. Validar resposta | Retorna {status: false, mensagem: "email ou senha incorretos"} com code 400 |
| CT-05   | RF-01      | Atualizar usuário existente | Usuário existe no BD | 1. Chamar put({id, nome, email, senha}) 2. Validar alterações | Retorna {status: true, mensagem: "usuario modificado", data: [usuário]} |
| CT-06   | RF-01      | Deletar usuário com sucesso | Usuário existe no BD | 1. Chamar delete(id) 2. Validar remoção | Retorna {status: true, mensagem: "usuario deletado"} |
| CT-07   | RF-06      | Validar nome obrigatório | Dados sem campo "nome" | 1. Tentar criar usuário sem nome | Retorna erro: "O nome do usuário é obrigatório." |
| CT-08   | RF-06      | Validar email obrigatório | Dados sem campo "email" | 1. Tentar criar usuário sem email | Retorna erro: "O email é obrigatório." |
| CT-09   | RF-06      | Validar senha obrigatória | Dados sem campo "senha" | 1. Tentar criar usuário sem senha | Retorna erro: "A senha é obrigatória." |
| CT-10   | RF-05      | Retornar erro 400 em falha de validação | Dados inválidos | 1. Enviar POST com dados incompletos | Status HTTP 400 com mensagem de erro |
| CT-11   | RF-05      | Retornar erro 500 em erro do servidor | Banco de dados indisponível | 1. Desconectar BD 2. Fazer requisição | Status HTTP 500 com mensagem de erro |

### 8.2 Casos de Teste - ProdutoService

| ID Caso | ID Requisito | Descrição                                              | Precondição                  | Passos                                                                 | Resultado Esperado                                                                 |
|---------|-------------|--------------------------------------------------------|------------------------------|------------------------------------------------------------------------|-------------------------------------------------------------------------------------|
| CT-12   | RF-03      | Listar todos os produtos com sucesso | BD contém produtos | 1. Chamar getAll() | Retorna {status: true, mensagem: "todos os produtos", data: [produtos]} |
| CT-13   | RF-03      | Buscar produto por ID | Produto existe no BD | 1. Chamar getById(id) | Retorna {status: true, mensagem: "Produto encontrado", data: {produto}} |
| CT-14   | RF-03      | Criar novo produto | Dados: nome, valor, quantidade | 1. Chamar createProduto({nome, valor, quantidade}) | Retorna {status: true, mensagem: "Produto criado", data: [produto]} |
| CT-15   | RF-04      | Comprar produto com estoque disponível | Produto existe e tem quantidade | 1. Chamar comprar(id, quantidade) 2. Validar estoque reduzido | Retorna {status: true, mensagem: "Compra efetuada"} |
| CT-16   | RF-04      | Falha na compra com estoque insuficiente | Quantidade solicitada > quantidade disponível | 1. Chamar comprar(id, quantidade_grande) | Retorna {status: false, mensagem: "erro ao comprar"} |
| CT-17   | RF-03      | Deletar produto | Produto existe no BD | 1. Chamar delete(id) | Retorna {status: true, mensagem: "Produto deletado"} |
| CT-18   | RF-06      | Validar campos obrigatórios em produto | Dados incompletos | 1. Tentar criar com nome/valor/quantidade vazio | Retorna erro de validação |

---

## ENTREGA 09 — Ferramentas de Ambiente

### 9.1 Dependências Principais

| Ferramenta | Versão | Descrição |
|-----------|--------|-----------|
| **Node.js** | LTS (18+) | Runtime JavaScript do servidor |
| **npm** | 8.0+ | Gerenciador de pacotes |
| **Express** | ^5.2.1 | Framework web minimalista |
| **PostgreSQL** | 12+ | Banco de dados relacional |
| **pg** | ^8.20.0 | Driver Node.js para PostgreSQL |
| **dotenv** | ^17.3.1 | Variáveis de ambiente |
| **CORS** | ^2.8.6 | Controle de requisições cross-origin |

### 9.2 Dependências de Desenvolvimento (Dev)

| Ferramenta | Versão | Descrição |
|-----------|--------|-----------|
| **Jest** | ^30.2.0 | Framework de testes unitários |
| **jest-html-reporters** | ^3.1.7 | Gerador de relatórios HTML para testes |


---

## Observações

- Testes unitários focados em userService
- Cobertura de sucesso e exceções
- Uso de toBe e toEqual
