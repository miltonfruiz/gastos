import React, { useState, useEffect } from 'react';

interface Expense {
  id: number;
  date: string;
  description: string;
  amount: number;
}

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetch('http://localhost:5000/expenses')
      .then(response => response.json())
      .then(data => setExpenses(data));
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newExpense: Expense = {
      id: expenses.length + 1,
      date: new Date().toISOString(),
      description,
      amount,
    };
    fetch('http://localhost:5000/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newExpense),
    })
      .then(response => response.json())
      .then(data => setExpenses([...expenses, data]));
    setDescription('');
    setAmount(0);
  };

  return (
    <div>
      <h1>Administrador de gastos personales</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Descripcion:
          <input type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
        </label>
        <label>
          Monto:
          <input type="number" value={amount} onChange={(event) => setAmount(Number(event.target.value))} />
        </label>
        <button type="submit">Agregar gasto</button>
      </form>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.date} - {expense.description} - {expense.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;