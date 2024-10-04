import axios from "axios";
axios.defaults.withCredentials = true;

async function fetchFriendsData(userId) {
  try {
    const response = await axios.get(`/api/friends/${userId}`);
    const values = fetchFriendsExpenses(response.data, userId);
    return values;
  } catch (error) {
    console.log("Fetch friends error", error);
    return;
  }
}

async function fetchFriendsExpenses(data, userId) {
  try {
    const response = await axios.get(`/api/expense/${userId}`);
    const expenses = response.data;
    const matchedExpenses = [];

    for (const friend of data) {
      const userId = friend._id;
      if (expenses[userId]) {
        matchedExpenses.push({
          ...friend,
          ...expenses[userId],
        });
      }
    }

    return matchedExpenses;
  } catch (error) {
    console.log("Fetch friends expenses error", error);
    return;
  }
}

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

async function fetchAllExpenses(userId) {
  try {
    const response = await axios.get(`/api/expense/all/${userId}`);
    return response;
  } catch (error) {
    console.log("Add Expense Error", error);
    return;
  }
}

export {addExpense, fetchAllExpenses, fetchFriendsData};
