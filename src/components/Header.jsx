import { useEffect, useState } from "react";
import { Button, Stack } from "react-bootstrap";

export default function Header({ onAddBudgetClick, onAddExpenseClick }) {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header>
      <Stack direction={isMobile ? "vertical" : "horizontal"} gap="2" className="mb-4">
        <img src="./img/budgettracker_project-thumbnails.svg" alt="Budget Tracker" height="80px" className={isMobile ? "" : "me-auto"} />
        <Button variant="primary" onClick={onAddBudgetClick}>Add Budget</Button>
        <Button variant="outline-primary" onClick={onAddExpenseClick}>Add Expense</Button>
      </Stack>
    </header>
  )
}