type ExpenseType = "Equal" | "ExactAmounts" | "Percentages";

function calculateContributions(totalAmount: number, personsInvolved, type: ExpenseType) {
  return personsInvolved.map((person) => {
    let contribution = 0;

    switch (type) {
      case "Equal":
        contribution = totalAmount / personsInvolved.length;
        break;

      case "ExactAmounts":
        contribution = person.exactAmount || 0;
        break;

      case "Percentages":
        const percentageTotal = personsInvolved.reduce((sum, p) => sum + (p.percentage || 0), 0);

        if (percentageTotal !== 100) {
          throw new Error("Percentages must total 100%");
        }

        contribution = (totalAmount * (person.percentage || 0)) / 100;
        break;
    }

    return {
      ...person,
      contribution,
    };
  });
}

export default calculateContributions;
