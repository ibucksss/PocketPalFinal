import React from "react";
import "../resources/analytics.css";
import { Progress } from "antd";
function Analytics({ transactions }) {
  //Get the total number of transaction for the given table parameters.
  const totalTransactions = transactions.length;
  //Get total number of transactions that are an income for the given parameters
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "Income"
  );
  //Get total number of transactions that are expenses for the given parameters
  const totalExpenseTransactions = transactions.filter(
    (transaction) => transaction.type === "Expense"
  );
  //Get the percentage of income / expense transactions for the given parameters
  const totalIncomeTransactionPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
  const totalExpenseTransactionPercentage =
    (totalExpenseTransactions.length / totalTransactions) * 100;
  //Turnover to calculate total $ on expense and on income with graphical interface.
  const totalTurnover = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const totalIncomeTurnover = transactions
    .filter((transaction) => transaction.type === "Income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenseTurnover = transactions
    .filter((transaction) => transaction.type === "Expense")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / totalTurnover) * 100;
  const totalExpenseTurnoverPercentage =
    (totalExpenseTurnover / totalTurnover) * 100;
  const categories = [
    "Salary",
    "Freelance",
    "Entertainment",
    "Food",
    "Travel",
    "Education",
    "Investment",
    "Medical",
    "Tax",
    "Insurance",
    "Other",
  ];
  return (
    <div className="analytics">
      <div className="row tables">
        <div className="col-md-4 mt-3 card">
          <div className="transactions-count">
            <h4>Total Transactions: {totalTransactions}</h4>
            <hr />
            <h5>Income: {totalIncomeTransactions.length}</h5>
            <h5>Expense: {totalExpenseTransactions.length}</h5>

            <div className="progress-bars">
              <Progress
                className="mx-5 mt-5"
                strokeColor="green"
                type="circle"
                percent={totalIncomeTransactionPercentage.toFixed(0)}
              />
              <Progress
                className="mx-5 mt-5"
                strokeColor="red"
                type="circle"
                percent={totalExpenseTransactionPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3 card">
          <div className="transactions-count">
            <h4>Total Turnover: ${totalTurnover}</h4>
            <hr />
            <h5>Income: ${totalIncomeTurnover}</h5>
            <h5>Expense: ${totalExpenseTurnover}</h5>

            <div className="progress-bars">
              <Progress
                className="mx-5 mt-5"
                strokeColor="green"
                type="circle"
                percent={totalIncomeTurnoverPercentage.toFixed(0)}
              />
              <Progress
                className="mx-5 mt-5"
                strokeColor="red"
                type="circle"
                percent={totalExpenseTurnoverPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <div className="income-category-analysis mt-5">
            <h4>Income by Category</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type == "Income" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);

              return (
                amount > 0 && (
                  <div className="category-card">
                    <h5>{category}</h5>

                    <Progress
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
        <div className="col-md-6">
          <div className="category-analysis mt-5">
            <h4>Expenses by Category</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type == "Expense" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);

              return (
                amount > 0 && (
                  <div className="category-card">
                    <h5>{category}</h5>
                    <Progress
                      percent={((amount / totalExpenseTurnover) * 100).toFixed(
                        0
                      )}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
