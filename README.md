# employee_management_api
###### API de Gerenciamento de documentação de colaboradores

## Como rodar o projeto
Para rodar o projeto é necessário ter o NodeJs v22 e Docker instalado. É possível usar o Postgresql sem o Docker, mas é necessário colocar no arquivo .env as variáveis do banco.

- git clone git@github.com:JonathanEmanuel12/employee_management_api.git
- cd employee_management_api/
- npm install
- criar arquivo .env e copiar conteúdo de .env.example para o .env
- docker compose up -d
- npm run dev

## Rotas da api
Foi usado o Insomnia para os testes na api e o arquivo com a lista de rotas está na raiz do projeto, mas também as reproduzo aqui no readme. (base) = http://localhost:3333; ? = opcional; *()* Os parentêses embaixo de algumas rotas são as funcionalidades esperadas que estavam no texto do teste.

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

## Comentários sobre a estrutura

- O controller coordena quase todo o fluxo da requisição e resposta. Ele recebe os dados, valida com validators se necessário, chama o responsável por processar os dados e retorna a resposta.
- Normalmente os use_cases são os responsáveis por processar a requisição, mas em casos mais simples é possível usar apenas uma chamada de método num repository. Ex: rota GET (base)/employee/:employeeId.
- Chave primária incremental pode revelar a quantidade de registros, por isso usei uuid para as tabelas mais expostas e importantes.