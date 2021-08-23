import React from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'

function CustomAutocomplete(props) {
    return (
        <>
            <Autocomplete
                id={props.id}
                options={props.options}
                onChange={(event, value) => {
                    props.onChange(value.value)
                }}
                getOptionLabel={(option) => option.show}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={props.label}
                        variant={props.variant ? props.variant : 'outlined'}
                        error={props.error}
                        value={props.value}
                        size={props.size}
                        name={props.name}
                        onChange={props.onChange}
                        helperText={props.helperText}
                    />
                )}
                autoFocus={props.autoFocus}
            />
        </>
    )
}
export default CustomAutocomplete
