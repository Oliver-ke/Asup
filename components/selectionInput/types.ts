
export type SelectOption = {
    label: string;
    value: string | number;
}

export type SelectProps = {
    options: SelectOption[];
    label: string;
    name?: string;
    setFieldValue?: (val: string | number) => void;
    selectedValue?: string | number; 
}