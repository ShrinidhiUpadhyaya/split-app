import Expense from "../../../models/Expense";

export async function POST(req) {
  const {values} = await req.json();
  const {amount, description, paidBy, sharedWith} = values;

  try {
    const expense = new Expense({
      amount,
      description,
      paidBy: paidBy,
      sharedWith: sharedWith.map((share) => ({
        _id: share._id,
        shareType: share.shareType,
        amount: share.amount,
        percentage: share.percentage,
        shares: share.shares,
      })),
    });

    const savedExpense = await expense.save();
    return new Response(JSON.stringify(savedExpense), {status: 200});
  } catch (error) {
    console.error("Add expense error", error);
    return new Response(JSON.stringify({error: error.message}), {
      status: 400,
    });
  }
}
