import {useState} from "react";
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger} from "../ui/select";

const SHARE_OPTIONS = [
  {
    label: "Equally",
    value: "equal",
  },

  {
    label: "Percentages",
    value: "percentage",
  },
  {
    label: "Exact Amounts",
    value: "exact",
  },
];

const SplitTypeSelect = () => {
  const [value, setValue] = useState("equal");
  return (
    <Select onValueChange={(value) => setValue(value)}>
      <SelectTrigger>
        {SHARE_OPTIONS.filter((option) => option.value === value)[0].label}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {SHARE_OPTIONS.map((type) => (
            <SelectItem key={type.value} value={type.value}>
              {type.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SplitTypeSelect;
