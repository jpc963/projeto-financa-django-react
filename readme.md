Como executar o projeto:

Versão necessária do python: 3.11.3

1. Clone o projeto
2. Crie um novo ambiente virtual (VENV): `python -m venv .venv`
3. Ative o novo ambiente virtual criado: `.venv\Scripts\activate.bat`
4. Com o console no caminho do projeto, rodar o comando `pip install -r requirements.txt`
5. Após instalar as dependências, rodar o comando `py manage.py runserver`
6. Crie as migrations do django: `python manage.py makemigrations`
7. Realize as migrations: `python manage.py migrate`
8. Com o console no caminho do front, rodar o comando `npm install`
9. Após instalar as dependências, rodar o comando `npm start`
10. Acessar o endereço `http://localhost:3000/` no navegador
