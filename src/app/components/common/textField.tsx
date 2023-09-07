import React from "react";

interface TextFieldProps {
    value?: string;
    placeholder?: string;
    onChange?: (value: string) => void;
    name?: string;
    error?: string;
}

const TextField = ({
    value,
    placeholder,
    onChange,
    name,
    error,
}: TextFieldProps) => {
    const handleChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
        onChange && onChange(target.value);
    };
    return (
        <div className="input-group textField">
            <input
                className={"form-control" + (error ? " is-invalid" : "")}
                type="text"
                placeholder={placeholder}
                name={name}
                value={value || ""}
                onChange={handleChange}
            />
            <button className="btn btn-light">
                <i className="bi bi-search"></i>
            </button>
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
};

export default TextField;
