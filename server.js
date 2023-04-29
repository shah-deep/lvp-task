const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'user-details.ciqbixbqvibo.us-east-1.rds.amazonaws.com',
  database: 'userdb',
  password: '12345678',
  port: 5432,
});

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Welcome to my app!');
});

app.get('/api/data', async (req, res) => {
    try {
        const { rows } = await pool.query('SELECT * FROM userdata');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});


app.post('/api/data', async (req, res) => {
    const { name, email, phone } = req.body;
    try {
        const { rows } = await pool.query(
        'INSERT INTO userdata (name, email, phone) VALUES ($1, $2, $3) RETURNING *',
        [name, email, phone]
        );
        res.json(rows[0]);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
});

app.put('/api/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { name, email, phone } = req.body;
  pool.connect((err, client, done) => {
    if (err) {
      console.error('Error acquiring client', err.stack);
      res.sendStatus(500);
    } else {
      client.query(
        'UPDATE userdata SET name = $1, email = $2, phone = $3 WHERE id = $4 RETURNING *',
        [name, email, phone, id],
        (err, result) => {
          done();
          if (err) {
            console.error('Error executing query', err.stack);
            res.sendStatus(500);
          } else if (result.rows.length === 0) {
            res.sendStatus(404);
          } else {
            res.json(result.rows[0]);
          }
        }
      );
    }
  });
});

app.delete('/api/data/:id', (req, res) => {
    const id = parseInt(req.params.id);
    pool.connect((err, client, done) => {
      if (err) {
        console.error('Error acquiring client', err.stack);
        res.sendStatus(500);
      } else {
        client.query(
          'DELETE FROM userdata WHERE id = $1 RETURNING *',
          [id],
          (err, result) => {
            done();
            if (err) {
              console.error('Error executing query', err.stack);
              res.sendStatus(500);
            } else if (result.rows.length === 0) {
              res.sendStatus(404);
            } else {
              res.json(result.rows[0]);
            }
          }
        );
      }
    });
  });


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  