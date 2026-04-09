// SERVIDOR DE CHAT EM TEMPO REAL

// ESTE SERVIDOR GERENCIA AS CONEXÕES DE USUÁRIOS E DISTRIBUI MENSAGENS
// TECNOLOGIAS:
// - EXPRESS: FRAMEWORK WEB PARA http
// - SOCKET.IO: COMUNICAÇÃO BIDIRECIONAL EM TEMPO REAL VIA WEBSOCKETS

// IMPORTA A BIBLIOTECA EXPRESS
const app = require("express")();

// IMPORTA MÓDULO HTTP NATIVO DO NODE.JS (NECESSÁRIO PARA O SOCKET.IO)
const server = require("http").createServer(app);

// IMPORTA SOCKET.IO E CONFIGURA PARA O SERVIDOR HTTP
const io = require("socket.io")(server, {
  // CORS (CROSS-ORIGIN RESOURCE SHARING): PERMITE QUE CLIENTES DE OUTROS DOMINIOS/IPs SE CONECTEM
  // ALTERE O IP PARA O IP DA MÁQUINA ONDE O SERVIDOR ESTÁ RODANDO
  cors: { origin: "http://localhost:5173" },
  // EXEMPLO: "http://localhost:5173" PARA DESENVOLVIMENTO LOCAL
  // EXEMPLO: "http://SEU-IP:5173" PARA REDE
});

// ...existing code...

const PORT = 3001; // PORTA NA QUAL O SERVIDOR IRÁ ESCUTAR CONEXÕES

// EVENT LISTENER: QUANDO UM CLIENTE SE CONECTA
io.on("connection", (socket) => {
  // "SOCKET" REPRESENTA A CONEXÃO COM UM UNICO CLIENTE
  // CADA CLIENTE QUE SE CONECTA RECEBE UM ID ÚNICO (socket.id)
  // SOCKET.ID: ID ÚNICO DO CLIENTE (GERADO AUTOMATICAMENTE)
  // SOCKET.DATA: OBJETO PARA ARMAZENAR INFORMAÇÕES DO USUÁRIO (EX: NOME)

  // EVENTO: USÚARIO DEFINE SEU NOME
  socket.on("set_username", (username) => {
    // ARMAZENA O NOME DO USUÁRIO NA PROPRIEDADE "DATA" DO SOCKET
    socket.data.username = username;

    // REGISTRA NO CONSOLE QUE UM USUÁRIO CONECTOU
    userName(username, socket.id);

    // EVENTO: USUÁRIO DESCONECTA
    socket.on("disconnect", (reason) => {
      // REGISTRA NO CONSOLE QUE O USUÁRIO DESCONECTOU E O MOTIVO
      console.log(
        `Usuário ${socket.data.username} desconectado! Sua id era ${socket.id}`,
      );
      console.log(`Motivo ${reason}`);
    });

    // EVENTO: SERVIDOR RECEBE MENSAGEM
    socket.on("message", (text) => {
      // QUANDO UM CLIENTE ENVIA UMA MENSAGEM, O SERVIDOR:
      // 1. CRIA UM OBJETO COM DADOS DA MENSAGEM
      // 2. ENVIA PARA TODOS OS CLIENTES CONECTADOS USANDO io.emit()
      // ISSO PERMITE QUE TODOS VEJAM A MENSAGEM EM TEMPO REAL

      io.emit("receive_message", {
        text,
        authorId: socket.id,
        author: socket.data.username,
      });
      console.log(`Usuário ${socket.data.username} enviou uma mensagem!`);
    });
  });
});

// REGISTRA NO CONSOLE QUANDO UM NOVO USUÁRIO SE CONECTA
const userName = (username, id) => {
  console.log(`Usuário ${username} conectado com o seguinte id: ${id}`);
};


// INICIAR O SERVIDOR
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}....`);
  console.log(`Cliente deve conectar em http://seu-ip:${PORT}`);
});
