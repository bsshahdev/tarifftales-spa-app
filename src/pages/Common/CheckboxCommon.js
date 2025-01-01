import React from 'react'

export default function CheckboxCommon({
    label,id,name,className,isDisabled,handleCheckbox, values, parentName
}) {
    return (
        <>
            <div className={`form-check ${className || ''}`}>
                <input
                    className="form-check-input"
                    type="checkbox"
                    id={id}
                    name={name}
                    onChange={(e) => handleCheckbox(name, e.target.checked, parentName)}
                    checked={values?.includes(name) || false}
                    disabled={isDisabled || false}
                />
                <label className="form-check-label" htmlFor={id}>
                    {label}
                </label>
            </div>
        </>
    )
}
