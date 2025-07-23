# employee_management_api
###### API de Gerenciamento de documentação de colaboradores

## Tecnologias

- Nodejs v22
- AdonisJS 6
- Docker
- Postgresql

## Como rodar o projeto
Para rodar o projeto é necessário ter o Nodejs v22 e Docker instalado. É possível usar o Postgresql sem o Docker, mas é necessário colocar no arquivo .env as variáveis do banco.

- git clone git@github.com:JonathanEmanuel12/employee_management_api.git
- cd employee_management_api/
- npm install
- criar arquivo .env e copiar conteúdo de .env.example para o .env
- docker compose up -d
- node ace migration:run
- npm run dev

## Rotas da api
Foi usado o Insomnia para os testes na api e o arquivo com a lista de rotas está na raiz do projeto, mas também as reproduzo aqui no readme por segurança porque o Insomnia pode ter problemas de compatibilidade.
Em todas as rotas, com exceção das rotas /auth, é necessário o envio do Bearer token.
Obs: (base) = http://localhost:3333; ? = opcional; *()* Os parentêses embaixo de algumas rotas são as funcionalidades esperadas que estavam no texto do teste.

###### - auth
- POST (base)/auth/signUp
		body: { "email": string, "password": string }
- POST (base)/auth/signIn
		body: { "name": string, "email": string, "password": string }

------------

###### - document_type
- POST (base)/documentType
*(Cadastro de tipo de documento)*
		body: { "name": string }
- GET (base)/documentType

------------

###### - employee
- POST (base)/employee
*(Cadastro de colaborador) (Vinculação de um colaborador com tipos de documentos)*
		body: { "name": string, "attachDocumentTypeIds"?: number[] }

- PUT (base)/employee/:employeeId
*(Atualização de colaborador) (Vinculação e desvinculação de um colaborador com tipos de documentos)*
		body: { "name"?: string, "hiredAt"?: string, "detachDocumentTypeIds"?: number[], "attachDocumentTypeIds"?: number[] }

- GET (base)/employee
*(Listar todos os documentos pendentes de todos os colaboradores. Incluir paginação. Incluir filtros opcionais por colaborador e por tipo de documento)*

- GET (base)/employee/:employeeId
*(Obter o status da documentação de um colaborador específico, mostrando quais foram enviados e quais ainda estão pendentes de envio)*
		query_params: search?: string, page?: number, perPage?: number, documentTypeId?: number
- PUT (base)/employee/:employeeId/document
*(Enviar um documento relacionado ao tipo de documento e ao colaborador)*
		body: { "identifier": string, "documentTypeId"?: number }

## Comentários sobre o projeto

- O controller coordena quase todo o fluxo da requisição e resposta. Ele recebe os dados, valida com validators se necessário, chama o responsável por processar os dados e retorna a resposta.
- Normalmente os use_cases são os responsáveis por processar a requisição, mas em casos mais simples é possível usar apenas uma chamada de método num repository. Ex: rota GET (base)/employee/:employeeId.
- Chave primária incremental pode revelar a quantidade de registros, por isso usei uuid para as tabelas mais expostas e importantes.
- O tratamento de erro foi feito usando as exceções do AdonisJS. Na maioria dos casos o próprio framework cuida disso (validators, queries no banco, autenticação), mas nos casos referentes a regras de negócio foi necessário implementar e lançar as exceções.
- Rodando a api em modo de desenvolvimento alguns erros podem trazer um stack trace, mas isso não acontece em produção (NODE_ENV=production)

## Deploy

Costumo usar a Heroku e a AWS para fazer o deploy de api. Por não ter uma conta pessoal nessas plataformas e também por conta do tempo não irei configurar o deploy, mas vou colocar um passo a passo de como fazê-lo aqui no readme. 

#### Heroku

- Criar e configurar dyno para a api (definir stack e variáveis de ambiente)
- Criar banco de dados Postgresql relacionado ao dyno na Heroku
- Enviar código para o repositório da Heroku.
- Ao enviar o código para a Heroku, estando tudo configurado corretamente, a api passará pela build e rodará. É necessário colocar no package.json um pre-start para rodar as migrações antes de iniciar a api.
- É possível automatizar o processo de deploy pegando uma chave dentro do perfil do usuário e usando-a para fazer o git push por um pipeline no github, bitbucket ou outro serviço.

#### AWS

- Criar uma instância ec2
- Puxar o código do github para a instância
- Rodar o banco de dados
- Rodar a api com pm2
- Liberar porta 80 e 443 na instância
- Configurar proxy reverso com nginx e um domínio
- Configurar certificado ssl via certbot
- É possível automatizar o processo de deploy configurando uma chave ssh no bitbucket, por exemplo, para rodar os comandos na instância via pipeline.
- Daria pra usar um RDS para o banco de dados ou rodar a api de forma diferente, mas procurei fazer um passo a passo mais simplificado.

## Testes automatizados

O framework usado para fazer a api (Adonis 6) possui uma integração com o framework de teste japa.dev, mas os testes não foram implementados por conta do tempo.
