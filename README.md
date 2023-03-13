# App

Gympass style app

## RFs (Requisitos funcionais) // funcionalidades da aplicação

-   [] Deve ser possível se cadastrar
-   [] Deve ser possível se autenticar
-   [] Deve ser possível obter o perfil de um usuário logado
-   [] Deve ser possível obter o número de check-ins realizados pelo usuário logado
-   [] Deve ser possível o usuário obter seu histórico de check-ins
-   [] Deve ser possível o usuário buscar academias próximas
-   [] Deve ser possível o usuário buscar academias pelo nome
-   [] Deve ser possível o usuário relizar o check-in em uma academia
-   [] Deve ser possível validar o check-in de um usuário
-   [] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio) // caminhos que cada requisito pode tomar

-   [] O usuário não deve poder se cadastrar um e-mail duplicado
-   [] O usuário não pode fez dois check-ins no mesmo dia
-   [] O usuário não pode fazer check-in se não estiver perto (100m) da academia
-   [] O check-in só pode ser validado até 20 minutos após criado
-   [] O check-in só pode ser validado por admnistradores
-   [] A academia só pode ser cadastrada por admnistradores

## RNFs (Requisitos não-funcionáis) // técnico

-   [] Senha do usuário precisa estar criptografada
-   [] Os dados da aplicação precisam estar persistidos em um banco PostegreSQL
-   [] Todas listas de dados precisam estar paginadas com 20 itens por página
-   [] O usuário deve ser identificado por um JWT
