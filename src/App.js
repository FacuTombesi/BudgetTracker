import { useState } from "react";
import { Container } from "react-bootstrap";
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from "./context/BudgetContext";
import Header from "./components/Header";
import BudgetCard from "./components/BudgetCard";
import TotalBudgetCard from "./components/TotalBudgetCard";
import Footer from "./components/Footer";
import UncategorizedBudgetCard from "./components/UncategorizedBudgetCard";
import AddBudgetModal from "./components/AddBudgetModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ViewExpensesModal from "./components/ViewExpensesModal";

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [viewExpensesModalBudgetId, setViewExpensesModalBudgetId] = useState()
  const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState()
  const { budgets, getBudgetExpenses } = useBudgets()

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  return (
    <>
      <Container className="my-4">
        <Header
          onAddBudgetClick={() => setShowAddBudgetModal(true)}
          onAddExpenseClick={openAddExpenseModal}
        />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:"1rem", alignItems:"flex-start" }}>
          {budgets.map(budget => {
            const currentAmount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                currentAmount={currentAmount}
                maxAmount={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() => setViewExpensesModalBudgetId(budget.id)}
              />
            )
          })}
          <UncategorizedBudgetCard onAddExpenseClick={openAddExpenseModal} onViewExpenseClick={() => setViewExpensesModalBudgetId(UNCATEGORIZED_BUDGET_ID)} />
        </div>
      </Container>
      <Container style={{ borderTop: "1px solid #DEE2E6", marginTop: "2rem", paddingTop: "2rem" }}>
        <TotalBudgetCard />
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseModalBudgetId}
        handleClose={() => setShowAddExpenseModal(false)}
      />
      <ViewExpensesModal
        budgetId={viewExpensesModalBudgetId}
        handleClose={() => setViewExpensesModalBudgetId()}
      />
      <Footer />
    </>
  );
}

export default App;
