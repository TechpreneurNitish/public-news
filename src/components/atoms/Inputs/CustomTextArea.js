import React from 'react'
import TextField from '@material-ui/core/TextField'

const CustomInput = (props) => {
    const shrink = props.shrink ? props.shrink.toString() : 'false'
    return (
        <div className="customTextArea">
            <TextField
                multiline
                rowsMax={4}
                value={props.value}
                autoFocus={props.autoFocus}
                name={props.name}
                onChange={props.onChange || props.onChange}
                onBlur={props.onBlur || props.onBlur}
                InputProps={{
                    inputProps: props.inputProps,
                    startAdornment: props.startAdornment,
                    shrink: shrink,
                }}
                id={props.id}
                label={props.label}
                type={props.type}
                size={props.size}
                disabled={props.disabled}
                variant="outlined"
                placeholder={props.placeholder}
                error={props.error}
                helperText={props.helperText}
            />
        </div>
    )
}

export default CustomInput
