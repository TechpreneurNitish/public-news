import React, { useContext } from 'react'
import MuiPhoneInput from 'material-ui-phone-number'
import CustomCommonContext from '../../../../custom/context/common/commonContext'

const CustomPhone = (props) => {
    const customCommonContext = useContext(CustomCommonContext)
    const { allConfigurationVariables } = customCommonContext

    const shrink = props.shrink ? props.shrink.toString() : 'false'
    return (
        <div className="customInput">
            <MuiPhoneInput
                value={
                    props.value
                        ? props.value
                        : allConfigurationVariables && allConfigurationVariables.country_code
                        ? allConfigurationVariables.country_code
                        : '+1'
                }
                autoFocus={props.autoFocus}
                name={props.name}
                onChange={props.onChange || props.onChange}
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
                countryCodeEditable={props.countryCodeEditable}
            />
        </div>
    )
}

export default CustomPhone
