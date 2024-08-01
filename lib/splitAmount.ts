const splitEqually = (people, totalAmount) => {
  const amountPerPerson = totalAmount / people.length;
  const newValues = people.map((person) => ({
    ...person,
    amount: amountPerPerson,
  }));

  return newValues;
};

const splitByPercentage = (people, totalAmount, percentages) => {
  const newValues = people.map((person, index) => ({
    ...person,
    amount: totalAmount * (percentages[index] / 100),
  }));

  return newValues;
};

const splitByExactAmounts = (people, amounts) => {
  const newValue = people.map((person, index) => ({
    ...person,
    amount: amounts[index],
  }));

  return newValue;
};

export {splitEqually};
