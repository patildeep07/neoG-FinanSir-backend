const express = require('express');
const cors = require('cors');
const app = express();

const { initializeDatabase } = require("./db/db.connection");
const { Expense } = require("./models/expenses.model");
const { Income } = require("./models/income.model");
const { Savings } = require("./models/savings.model");

app.use(express.json());
app.use(cors());

initializeDatabase();

app.get('/', (req, res) => {
  res.send('Hello, Express!');
});


app.get('/income', async (req, res) => {
  try {
    const incomeData = await Income.find();
    res.json({ message: 'Success', incomeData });
  } catch (error) {
    console.error('Error fetching income data:', error);
    res.status(500).json({ error: 'Error fetching income data' });
  }
});

app.get('/savings', async (req, res) => {
  try {
    const savingsData = await Savings.find();
    res.json(savingsData);
  } catch (error) {
    console.error('Error fetching savings data:', error);
    res.status(500).json({ error: 'Error fetching savings data' });
  }
});

app.get('/expenses', async (req, res) => {
  try {
    const expenseData = await Expense.find();
    res.json(expenseData);
  } catch (error) {
    console.error('Error fetching expense data:', error);
    res.status(500).json({ error: 'Error fetching expense data' });
  }
});

app.post('/add-expense', async (req, res) => {
  const { description, amount, entryType, category } = req.body;

  if (!description || !amount) {
    return res.status(400).json({ error: 'Description, amount are required.' });
  }

  try {
    const newExpenses = await Expense(req.body);

    await newExpenses.save()

    res.json({ success: true, data: newExpenses });
  } catch (error) {
    console.error('Error adding entry:', error);
    res.status(500).json({ error: 'Error adding entry' });
  }
});

app.post('/add-income', async (req, res) => {
  const { description, amount, entryType, category } = req.body;

  if (!description || !amount) {
    return res.status(400).json({ error: 'Description, amount are required.' });
  }

  try {
    const newIncome = await Income({ description, amount, category });

    await newIncome.save()

    res.json({ success: true, data: newIncome });
  } catch (error) {
    console.error('Error adding entry:', error);
    res.status(500).json({ error: 'Error adding entry' });
  }
});

app.post('/add-savings', async (req, res) => {
  const { description, amount, entryType , category} = req.body;

  if (!description || !amount) {
    return res.status(400).json({ error: 'Description, amount are required.' });
  }

  try {
    const newSavings = await Savings({ description, amount, category });

    await newSavings.save()

    res.json({ success: true, data: newSavings });
  } catch (error) {
    console.error('Error adding entry:', error);
    res.status(500).json({ error: 'Error adding entry' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});