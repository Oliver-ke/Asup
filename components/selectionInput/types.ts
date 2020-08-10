
export type SelectOption = {
    label: string;
    value: string;
}

export type SelectProps = {
    options: SelectOption[];
    label: string;
    name?: string;
    setFieldValue?: () => void;
}