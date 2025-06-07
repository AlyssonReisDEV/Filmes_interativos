# Filmoteca

A Filmoteca é uma ferramenta para rastrear seus filmes favoritos, adicionar novos títulos, marcar como assistido, favoritar, filtrar e descobrir novas produções.

---

## 🛠️ Tecnologias utilizadas

- HTML5  
- CSS3  
- JavaScript  
- Font Awesome (ícones)
- [json-server](https://github.com/typicode/json-server) (para simular o backend)

---

## 🚧 Status do projeto

⚙️ Em desenvolvimento — funcionalidades e estilos sendo ajustados

---

## 👁️ Como visualizar o projeto

1. Clone este repositório para sua máquina local:

   ```bash
   git clone https://github.com/menuvieira/filmoteca.git
   ```

2. Abra a pasta do projeto que foi baixada.

3. Abra o arquivo `index.html` no seu navegador (Google Chrome, Firefox, Edge, etc.).

---
   
## 🗄️ Como acessar e rodar o banco de dados (json-server)

O projeto utiliza um arquivo `filmes.json` como banco de dados simulado, acessado via [json-server](https://github.com/typicode/json-server).

### Passos para rodar o backend localmente:

1. Instale o json-server globalmente (caso ainda não tenha):

   ```bash
   npm install -g json-server
   ```

2. Na pasta do projeto, rode o comando:

   ```bash
   json-server --watch backend/filmes.json --port 3000
   ```

3. O backend estará disponível em:  
   [http://localhost:3000/filmes](http://localhost:3000/filmes)

4. O frontend já está configurado para consumir este endpoint.

---

## 👥 Desenvolvedores

- Alysson Reis ([AlyssonReisDEV](https://github.com/AlyssonReisDEV))  
- Daniel Luna ([dannx06](https://github.com/dannx06))  
- Emanuelly Vieira ([menuvieira](https://github.com/menuvieira))  
- Gabriel Cavalcanti ([GBVini-06](https://github.com/GBVini-06))  
- João Gabriel ([bielliquida](https://github.com/bielliquida))

---

## 📢 Observações

- Para que o site funcione com o banco de dados, é necessário que o json-server esteja rodando.
- Caso queira resetar os dados, basta editar ou apagar o arquivo `filmes.json`.
- O projeto é apenas para fins didáticos e não envia dados reais para a internet.

---

