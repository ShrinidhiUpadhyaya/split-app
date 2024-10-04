import {fetchAllExpenses} from "@/lib/expenseApi";
import {useAppStore} from "@/store/zustand";
import {useCallback, useEffect, useState} from "react";

const useTransactions = (userId) => {
  const {transactions, setTransactions} = useAppStore();
  const [owedAmount, setOwedAmount] = useState(0);
  const [oweAmount, setOweAmount] = useState(0);

  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetchAllExpenses(userId);
      if (!response) throw new Error("No response from API");
      setTransactions(response.data);
    } catch (err) {
      console.error("Error fetching expenses data", err);
    }
  }, [userId, setTransactions]);

  useEffect(() => {
    if (userId) {
      fetchTransactions();
    }
  }, [userId, fetchTransactions]);

  useEffect(() => {
    let totalOwe = 0;
    let totalOwed = 0;

    transactions.forEach((expense) => {
      if (expense.isOwed) {
        totalOwed += expense.yourAmount;
      }
      if (!expense.isOwed) {
        totalOwe += expense.yourAmount;
      }
    });

    setOweAmount(totalOwe.toFixed(2));
    setOwedAmount(totalOwed.toFixed(2));
  }, [transactions]);

  return {transactions, oweAmount, owedAmount};
};

export default useTransactions;
