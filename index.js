const express = require('express');
const server = express();
server.use(express.json());

var tarefas = [
    {
        id: 1,
        descricao: "Comprar pão",
        finalizado: "false"
    },
    {
        id: 2,
        descricao: "Lavar a louça",
        finalizado: "true"
    }
];

server.get('/tarefa', function(request, response) {
    return response.json(tarefas);
})

server.get('/tarefa/:id', function(request, response) {
    const id = request.params.id;
    const tarefa = tarefas.filter(p => p.id == id);
    return response.json(tarefa);
})

server.post('/tarefa', function(request, response){
    const tarefa = request.body;
    tarefas.push(tarefa);
    return response.status(201).send();
})

server.delete('/tarefa/:id', function(request, response){
    const id = request.params.id;
    tarefas = tarefas.filter(p => p.id != id);
    return response.status(200).send();
})

server.put('/tarefa/:id', (req, res) => {
    const id = req.params.id;
    const tarefa = req.body;

    tarefas.forEach(t => {
        if(t.id == id) {
            t.descricao = tarefa.descricao;
            t.finalizado = tarefa.finalizado;
            return;
        }
    })
    return res.send();
})

server.listen(3000);