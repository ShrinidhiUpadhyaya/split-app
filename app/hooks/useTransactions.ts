import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {useEffect, useState} from "react";

const useTransactions = (userId) => {
  const [owedAmount, setOwedAmount] = useState(0);
  const [oweAmount, setOweAmount] = useState(0);

  const {
    data: transactions,
    isPending,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => axios.get(`/api/expense/all/${userId}`),
  });

  useEffect(() => {
    if (transactions) {
      let totalOwe = 0;
      let totalOwed = 0;

      transactions?.data.forEach((expense) => {
        if (expense.isOwed) {
          totalOwed += expense.yourAmount;
        }
        if (!expense.isOwed) {
          totalOwe += expense.yourAmount;
        }
      });

      setOweAmount(totalOwe.toFixed(2));
      setOwedAmount(totalOwed.toFixed(2));
    }
  }, [transactions]);

  return {transactions: transactions?.data, oweAmount, owedAmount, isPending, isError, isSuccess};
};

export default useTransactions;
