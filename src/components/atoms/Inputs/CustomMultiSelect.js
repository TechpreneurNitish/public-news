import React from 'react'
import TextField from '@material-ui/core/TextField'

const CustomInput = (props) => {
    return (
        <div className="customInput">
            <TextField
                select
                name={props.name}
                id={props.id}
                variant="outlined"
                size={props.size}
                disabled={props.disabled}
                onBlur={props.onBlur || props.onBlur}
                label={props.label}
                placeholder={props.placeholder}
                error={props.error}
                helperText={props.helperText}
                SelectProps={{
                    multiple: true,
                    value: props.value,
                    onChange: props.onChange || props.onChange,
                }}
            >
                {props.children}
            </TextField>
        </div>
    )
}

export default CustomInput
