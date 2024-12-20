import {SplitPerson, SplitTypes} from "@/types/utils/splitTypes";

interface SplitAmountType {
  totalAmount: number;
  type: SplitTypes;
  people: SplitPerson[];
  amounts: [];
}

const splitAmount = ({totalAmount, people, type, amounts = []}: SplitAmountType) => {
  switch (type) {
    case "Equal":
      const amountPerPerson = totalAmount / people.length;
      return people.map((person) => ({
        ...person,
        amount: amountPerPerson,
      }));

    case "Percentage":
      return people.map((person) => ({
        ...person,
        amount: totalAmount * (person.percentage / 100),
      }));

    case "Exact":
      return people.map((person, index) => ({
        ...person,
        amount: amounts[index],
      }));

    default:
      throw new Error("Invalid split type. Must be 'equally', 'percentage', or 'exact'.");
  }
};

export {splitAmount};
