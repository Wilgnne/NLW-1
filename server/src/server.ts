import express from 'express';

const app = express();

app.get('/users', (request, response) => {
  console.log('Listagem de Usuários');
  response.json([
    'Diego',
    'Robson',
    'Cleiton'
  ]);
});

app.listen(3333);
