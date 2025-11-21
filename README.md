# LATINDER - Aplicativo de Encontros para Pets

O Latinder é um aplicativo web inovador que conecta donos de animais de
estimação em uma plataforma social baseada em encontros. Inspirado nos
aplicativos de encontros tradicionais, o Latinder utiliza um sistema de
deslizar cartões para facilitar interações autênticas entre
proprietários de pets que desejam conectar seus animais ou simplesmente
ampliar sua rede social com outros donos.

------------------------------------------------------------------------

## FUNCIONALIDADES PRINCIPAIS

O Latinder oferece uma experiência completa e intuitiva para conectar
pets e seus donos. Os usuários começam criando uma conta com fotos
pessoais e podem adicionar múltiplos perfis para seus animais de
estimação. Cada perfil de pet inclui nome, raça, data de nascimento,
biografia e até três fotos de alta qualidade.

A interface exibe os perfis de outros pets em um formato de pilha de
cartões deslizáveis, onde o usuário pode:

-   **Passar para a esquerda** → desinteresse\
-   **Passar para a direita** → interesse

Quando dois donos expressam interesse mútuo, um **match** é criado
automaticamente, liberando um sistema de chat integrado.

------------------------------------------------------------------------

## COMO FUNCIONA

O Latinder opera em uma arquitetura web em três camadas:

### 1. Camada de Apresentação

Interface responsiva em **HTML + CSS (Bootstrap)**, interatividade em
**JavaScript** e **Swiper.js** para os cards deslizáveis.

### 2. Camada de Aplicação

Backend em **Django**, responsável por: - Requisições do usuário\
- Algoritmo de match\
- Autenticação\
- Comunicação com o banco

### 3. Camada de Dados

Banco **PostgreSQL**, armazenando: - Usuários\
- Perfis de pets\
- Fotos\
- Swipes\
- Matches\
- Mensagens

------------------------------------------------------------------------

## REQUISITOS DO SISTEMA

-   Python **3.8+**
-   Dependências listadas em `requirements.txt`
-   Ambiente virtual **recomendado**

------------------------------------------------------------------------

## INSTALAÇÃO E CONFIGURAÇÃO

``` bash
git clone SEU_REPOSITORIO
cd nome-do-projeto
python -m venv venv
```

### Ativando o ambiente virtual

**Windows:**

``` bash
venv\Scripts ctivate
```

**Linux/Mac:**

``` bash
source venv/bin/activate
```

Instalar dependências:

``` bash
pip install -r requirements.txt
```

------------------------------------------------------------------------

## CONFIGURANDO NO VISUAL STUDIO CODE

1.  Abra o projeto no VS Code\
2.  Pressione **Ctrl+Shift+P**\
3.  Escolha: **Python: Select Interpreter**\
4.  Selecione o Python da pasta `venv`\
5.  Verifique:\

``` bash
python --version
```

------------------------------------------------------------------------

## INICIANDO O PROJETO

Após configurar tudo:

``` bash
python manage.py runserver
```

------------------------------------------------------------------------

## ESTRUTURA DO PROJETO

Backend Django com models:

-   Owners\
-   Pets\
-   PetPhotos\
-   Swipes\
-   Matches\
-   Messages

Frontend:

-   Autenticação\
-   Criação/edição de perfis\
-   Cards com swipe\
-   Tela de matches\
-   Chat

Banco PostgreSQL com relacionamentos bem definidos.

------------------------------------------------------------------------

## DICAS DE DESENVOLVIMENTO

-   Imagens armazenadas localmente no ambiente de desenvolvimento\
-   Mantenha versões iguais do ambiente entre a equipe\
-   Use Git para versionamento\
-   Revise seu código antes de enviar commits

------------------------------------------------------------------------

## SUPORTE E PRÓXIMOS PASSOS

Se surgir algum problema, execute:

``` bash
pip list
```

