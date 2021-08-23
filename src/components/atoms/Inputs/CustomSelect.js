import React from 'react'
import TextField from '@material-ui/core/TextField'

const CustomSelect = (props) => {
    const shrink = props.shrink ? props.shrink.toString() : 'false'
    return (
        <div className="customSelect">
            <TextField
                id={props.id}
                select
                size={props.size}
                label={props.label}
                SelectProps={{
                    native: true,
                }}
                fullWidth
                margin="normal"
                InputLabelProps={{
                    shrink: shrink,
                }}
                variant="outlined"
                disabled={props.disabled}
                name={props.name}
                value={props.value}
                autoFocus={props.autoFocus}
                onChange={props.onChange || props.onChange}
                error={props.error}
                helperText={props.helperText}
            >
                {props.children}
            </TextField>
        </div>
    )
}

export default CustomSelect
