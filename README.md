# Desafio Técnico 2 - Escribo

O desafio consiste em desenvolver uma API RESTful para autenticação de usuários, que permita operações de cadastro (sign up), autenticação (sign in) e recuperação de informações do usuário.


# Especificações Técnicas:

1. Formato de Comunicação:

● Todos os endpoints devem aceitar e retornar apenas dados no formato JSON.

● Retorno JSON para situações de endpoint não encontrado.

2. Persistência de Dados:

● Armazenamento persistente de dados do usuário.

3. Respostas de Erro:

● Formato padrão:

{ "mensagem": "mensagem de erro" }

#ENDPOINTS

1. Sign Up (Criação de Cadastro):


● Input:
    {
      "nome": "string",
      "email": "string,
      "senha": "senha",
      "telefones": [{"numero": "123456789", "ddd": "11")}
    }



    
● Output (sucesso):
      {
      "id": "GUID/ID",
      "data_criacao": "data",
      "data_atualizacao": "data",
      "ultimo_login": "data",
      "token": "GUID/JWT",
    }


    
● Erro:



○ E-mail já cadastrado: { "mensagem": "E-mail já existente" }

    

2. Sign In (Autenticação):


● Input:
    {
      "email": "string,
      "senha": "senha",
    }


    
● Output:
   {
      "id": "GUID/ID",
      "data_criacao": "data",
      "data_atualizacao": "data",
      "ultimo_login": "data",
      "token": "GUID/JWT",
    }


 ● Erros:


○ E-mail não cadastrado ou senha incorreta:


■ { "mensagem": "Usuário e/ou senha inválidos" } |


○ Senha incorreta: status 401 com:


■ { "mensagem": "Usuário e/ou senha inválidos" }


3. Buscar Usuário:


● Requisição: Header Authentication com valor "Bearer {token}"


● Erros:


○ Token inválido: { "mensagem": "Não autorizado" } |


○ Token expirado (mais de 30 minutos): { "mensagem": "Sessão inválida" } 
