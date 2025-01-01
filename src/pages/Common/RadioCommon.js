import React from 'react'

export default function RadioCommon({
    label, id, name, className,value,array,setArray
}) {
    const handleChangeHandler = (e,name) => {
        let newObj = {
            ...array,
            [name]: e.target.value
        }
        setArray(newObj);
    }
    return (
        <>
            <div className={`form-check ${className || ''}`}>
                <input
                    className="form-check-input"
                    type="radio"
                    name={name}
                    id={id}
                    value={value}
                    onChange={(e) => {handleChangeHandler(e,name)}}
                    checked={array[name] === value}
                />
                <label className="form-check-label" htmlFor={id}>
                    {label}
                </label>
            </div>
        </>
    )
}
