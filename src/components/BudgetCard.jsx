import { Button, Card, ProgressBar, Stack } from "react-bootstrap";
import { currencyFormatter } from "../utils";

function getProgressBarVariant(currentAmount, maxAmount) {
  const ratio = currentAmount / maxAmount;
  if (ratio < 0.5) return "primary";
  if (ratio < 0.75) return "warning";
  return "danger";
};

export default function BudgetCard({ name, currentAmount, maxAmount, gray, onAddExpenseClick }) {
  const classNames = [];

  if (currentAmount > maxAmount) {
    classNames.push("bg-danger", "bg-opacity-10")
  } else if (gray) {
    classNames.push("bg-light")
  }

  return (
    <Card className={classNames.join(" ")}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div className="d-flex align-items-baseline">
            {currencyFormatter.format(currentAmount)}
            {maxAmount && (
              <span className="text-muted fs-6 ms-1">
                / {currencyFormatter.format(maxAmount)}
              </span>
            )}
          </div>
        </Card.Title>
        {maxAmount && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVariant(currentAmount, maxAmount)}
            min={0}
            max={maxAmount}
            now={currentAmount}
          />
        )}
        <Stack direction="horizontal" gap="2" className="mt-4">
          <Button variant="outline-primary" className="ms-auto" onClick={onAddExpenseClick}>Add Expense</Button>
          <Button variant="outline-secondary">View Expense</Button>
        </Stack>
      </Card.Body>
    </Card>
  );
}
