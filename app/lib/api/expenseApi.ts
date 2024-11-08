import axios from "axios";
axios.defaults.withCredentials = true;

async function addExpense(values) {
  try {
    const response = await axios.post(`/api/expense/add`, {
      values,
    });
    return response;
  } catch (error) {
    console.log("Add Expense Error", error);
    return;
  }
}

export {addExpense};
