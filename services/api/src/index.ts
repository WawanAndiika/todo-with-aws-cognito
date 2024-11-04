import { Hono } from 'hono';
import { Client } from '@neondatabase/serverless';

const connectionString = "DB_POSTGRE_URL";

const app = new Hono();

const errorHandler = (error: any, c: any) => {
  console.error(error);
  return c.text('Internal Server Error', 500);
};

// Routes
app.get('/todos', async (c) => {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    const { rows } = await client.query('SELECT * FROM todos WHERE sub = $1', [c.req.query('sub')]);
    return c.json(rows);
  } catch (error) {
    return errorHandler(error, c);
  }
});

// Add a new todo
app.post('/todos', async (c) => {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    const { code, priority, status, sub, title } = await c.req.json();
    const result = await client.query(
      'INSERT INTO todos (code, priority, status, sub, title) VALUES ($1, $2, $3, $4, $5) RETURNING id',
      [code, priority, status, sub, title]
    );
    return c.json({ id: result.rows[0].id, code, priority, status, sub, title }, 201);
  } catch (error) {
    return errorHandler(error, c);
  }
});

// Update a todo by ID
app.put('/todos/:id', async (c) => {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    const { id } = c.req.param();
    const { code, priority, status, sub, title } = await c.req.json();
    await client.query(
      'UPDATE todos SET code = $1, priority = $2, status = $3, sub = $4, title = $5 WHERE id = $6',
      [code, priority, status, sub, title, id]
    );
    return c.json({ id, code, priority, status, sub, title });
  } catch (error) {
    return errorHandler(error, c);
  }
});

// Delete a todo by ID
app.delete('/todos/:id', async (c) => {
  const client = new Client({ connectionString });
  try {
    await client.connect();
    const { id } = c.req.param();
    await client.query('DELETE FROM todos WHERE id = $1', [id]);
    return c.json({ message: `Todo ${id} deleted` });
  } catch (error) {
    return errorHandler(error, c);
  }
});

export default app;
