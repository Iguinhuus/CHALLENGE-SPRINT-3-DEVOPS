const express = require('express');
const sql = require('mssql');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Configuração do banco de dados
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_NAME,
    options: {
        encrypt: true, // Necessário para Azure SQL
        trustServerCertificate: true
    }
};

// Conectar ao banco de dados
sql.connect(dbConfig).then(() => console.log('Conectado ao Azure SQL')).catch(err => console.log(err));

// CRUD Clientes
app.get('/clientes', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM Clientes');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/clientes', async (req, res) => {
    const { nome, email, telefone } = req.body;
    try {
        await sql.query(`INSERT INTO Clientes (nome, email, telefone) VALUES ('${nome}', '${email}', '${telefone}')`);
        res.status(201).send('Cliente criado com sucesso');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, email, telefone } = req.body;
    try {
        await sql.query(`UPDATE Clientes SET nome='${nome}', email='${email}', telefone='${telefone}' WHERE id_cliente=${id}`);
        res.send('Cliente atualizado com sucesso');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query(`DELETE FROM Clientes WHERE id_cliente=${id}`);
        res.send('Cliente excluído com sucesso');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

// CRUD Agendamentos
app.get('/agendamentos', async (req, res) => {
    try {
        const result = await sql.query('SELECT * FROM Agendamentos');
        res.json(result.recordset);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post('/agendamentos', async (req, res) => {
    const { id_cliente, data_agendamento, hora_agendamento, status } = req.body;
    try {
        await sql.query(`INSERT INTO Agendamentos (id_cliente, data_agendamento, hora_agendamento, status) VALUES (${id_cliente}, '${data_agendamento}', '${hora_agendamento}', '${status}')`);
        res.status(201).send('Agendamento criado com sucesso');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.put('/agendamentos/:id', async (req, res) => {
    const { id } = req.params;
    const { id_cliente, data_agendamento, hora_agendamento, status } = req.body;
    try {
        await sql.query(`UPDATE Agendamentos SET id_cliente=${id_cliente}, data_agendamento='${data_agendamento}', hora_agendamento='${hora_agendamento}', status='${status}' WHERE id_agendamento=${id}`);
        res.send('Agendamento atualizado com sucesso');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.delete('/agendamentos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await sql.query(`DELETE FROM Agendamentos WHERE id_agendamento=${id}`);
        res.send('Agendamento excluído com sucesso');
    } catch (err) {
        res.status(500).send(err.message);
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
