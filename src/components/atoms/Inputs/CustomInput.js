import React from 'react'
import TextField from '@material-ui/core/TextField'
import Tooltip from '@material-ui/core/Tooltip'

const CustomInput = (props) => {
    const shrink = props.shrink ? props.shrink.toString() : 'false'
    return (
        <div className="customInput" style={props.inputStyle || props.inputStyle}>
            {props.upperLabel ? (
                <>
                    <label>{props.label}</label>
                    <TextField
                        value={props.value}
                        autoFocus={props.autoFocus}
                        name={props.name}
                        onChange={props.onChange || props.onChange}
                        onBlur={props.onBlur || props.onBlur}
                        InputProps={{
                            inputProps: props.inputProps,
                            startAdornment: props.startAdornment,
                            endAdornment: props.endAdornment,
                            shrink: shrink,
                        }}
                        id={props.id}
                        type={props.type}
                        size={props.size}
                        disabled={props.disabled}
                        variant="outlined"
                        placeholder={props.placeholder}
                        error={props.error}
                        helperText={props.helperText}
                    />
                </>
            ) : (
                <Tooltip
                    title={props.tooltiptitle}
                    arrow={props.tooltiptitle ? true : false}
                    placement="top"
                    disableHoverListener={true}
                    disableFocusListener={props.tooltiptitle ? false : true}
                >
                    <TextField
                        value={props.value}
                        autoFocus={props.autoFocus}
                        name={props.name}
                        onChange={props.onChange || props.onChange}
                        onBlur={props.onBlur || props.onBlur}
                        InputProps={{
                            inputProps: props.inputProps,
                            startAdornment: props.startAdornment,
                            endAdornment: props.endAdornment,
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
                </Tooltip>
            )}
        </div>
    )
}

export default CustomInput
