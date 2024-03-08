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
  const [creationDate] = useState(getCurrentDate())

  function openAddExpenseModal(budgetId) {
    setShowAddExpenseModal(true)
    setAddExpenseModalBudgetId(budgetId)
  }

  function getCurrentDate() {
    const date = new Date()
    return date.toLocaleDateString()
  }

  return (
    <>
      <Container className="mb-4">
        <Header
          onAddBudgetClick={() => setShowAddBudgetModal(true)}
          onAddExpenseClick={openAddExpenseModal}
        />
        {(budgets.length !== 0) ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:"1rem", alignItems:"flex-start" }}>
            {budgets.map(budget => {
              const currentAmount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
              return (
                <BudgetCard
                  key={budget.id}
                  creationDate={creationDate}
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
        ) : (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
            <img
              src="./img/add_icon.svg"
              alt="Add"
              height="60px"
              onClick={() => setShowAddBudgetModal(true)}
              style={{ cursor:"pointer" }}
              onMouseOver={(e) => {e.currentTarget.src = "./img/add_icon_hover.svg"}}
              onMouseOut={(e) => {e.currentTarget.src = "./img/add_icon.svg"}}
            />
            <span className="mt-2 fs-6" style={{ color:"#ADADAD" }}>Add a budget to start tracking</span>
          </div>
        )}
        <Container style={{ borderTop: "1px solid #DEE2E6", marginTop: "2rem", paddingTop: "2rem" }}>
          <TotalBudgetCard />
        </Container>
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
