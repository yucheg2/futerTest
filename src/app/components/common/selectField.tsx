import React from "react";

interface SelectFieldProps {
    label?: string;
    value: string;
    onChange: (value: { [name: string]: string }) => void;
    defaultOption?: string;
    options: { id: string; name: string }[];
    name: string;
}

const SelectField = ({
    label,
    value,
    onChange,
    defaultOption,
    options,
    name,
}: SelectFieldProps) => {
    const handleChange = ({ target }: React.ChangeEvent<HTMLSelectElement>) => {
        onChange({ [target.name]: target.value });
    };
    return (
        <div className="selectField">
            <label htmlFor={name}>
                {" "}
                <h5>{label}</h5>
            </label>
            <select
                className="form-select"
                name={name}
                id={name}
                value={value}
                onChange={handleChange}
            >
                {defaultOption && (
                    <option disabled value="">
                        {defaultOption}
                    </option>
                )}
                {options &&
                    options.map((option) => {
                        return (
                            <option value={option.id} key={option.id}>
                                {option.name}
                            </option>
                        );
                    })}
            </select>
        </div>
    );
};

export default SelectField;
