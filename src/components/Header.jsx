import { Button, Stack } from "react-bootstrap";

export default function Header({ onAddBudgetClick, onAddExpenseClick }) {
  return (
    <header>
      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary" onClick={onAddBudgetClick}>Add Budget</Button>
        <Button variant="outline-primary" onClick={onAddExpenseClick}>Add Expense</Button>
      </Stack>
    </header>
  )
}