import {FormControl, FormField, FormItem, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import React from "react";

interface FormFieldProps {
  control: any;
  name: string;
  placeholder?: string;
  type?: string | undefined;
}

const DFormFieldComponent: React.FC<FormFieldProps> = ({
  control,
  name,
  placeholder,
  type = "text",
}) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({field}) => (
        <FormItem>
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DFormFieldComponent;
