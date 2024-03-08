import { Button, Modal, Stack } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "../context/BudgetContext";
import { currencyFormatter } from "../utils";

export default function ViewExpensesModal({ budgetId, handleClose }) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } = useBudgets()

  const budget =
    UNCATEGORIZED_BUDGET_ID === budgetId
      ? { name: "Uncategorized", id: UNCATEGORIZED_BUDGET_ID }
      : budgets.find(b => b.id === budgetId)

  const expenses = getBudgetExpenses(budgetId)

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="4">
            <div>
              {budget?.name}
            </div>
            {budgetId !== UNCATEGORIZED_BUDGET_ID && (
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(budget)
                  handleClose()
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {expenses.map(expense => (
            <Stack direction="horizontal" gap="2" key={expense.id}>
              <div className="me-auto fs-5">{expense.description}<span className="ms-4" style={{ color: "#7F7F7F", fontSize: "0.75rem" }}>{expense.expenseDate}</span></div>
              <div className="fs-5">{currencyFormatter.format(expense.amount)}</div>
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => deleteExpense(expense)}
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  )
}