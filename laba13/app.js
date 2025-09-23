import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  const now = new Date().toISOString();

  console.log(`[${now}] ${req.method} ${req.url}`);

  next();
});

let items = [
  { 
    id: 1, name:
    'Apple', amount: 100
  },
  { 
    id: 2,
    name: 'Banana',
    amount: 101
  }
];

function validateItem(req, res, next) {
  const { name, amount } = req.body;

  if (typeof name !== 'string' || !name.trim()) {
    const err = new Error('Поле name обязательно и должно быть строкой');
    err.status = 400;

    return next(err);
  }
  if (typeof amount !== 'number' || amount < 0) {
    const err = new Error('Поле amount обязательно и должно быть числом >= 0');
    err.status = 400;

    return next(err);
  }
  
  next();
}

app.get('/items', (req, res) => {
  res.json(items);
});

app.get('/items/:id', (req, res, next) => {
  const item = items.find(i => i.id === parseInt(req.params.id));

  if (!item) {
    const err = new Error('Not found');
    err.status = 404;

    return next(err);
  }

  res.json(item);
});

app.post('/items', validateItem, (req, res) => {
  const newItem = {
    id: items.length ? Math.max(...items.map(i => i.id)) + 1 : 1,
    name: req.body.name,
    amount: req.body.amount
  };

  items.push(newItem);

  res.status(201).json(newItem);
});

app.put('/items/:id', validateItem, (req, res, next) => {
  const item = items.find(i => i.id === parseInt(req.params.id));

  if (!item) {
    const err = new Error('Not found');
    err.status = 404;

    return next(err);
  }

  item.id = req.body.id;
  item.name = req.body.name;
  item.amount = req.body.amount;

  res.json(item);
});

app.delete('/items/:id', (req, res, next) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));

  if (index === -1) {
    const err = new Error('Not found');
    err.status = 404;

    return next(err);
  }

  items.splice(index, 1);

  res.status(204).send();
});

app.use((req, res, next) => {
  const err = new Error('Ресурс не найден');
  err.status = 404;

  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    error: err.message || 'Внутренняя ошибка сервера',
    status: err.status || 500
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
