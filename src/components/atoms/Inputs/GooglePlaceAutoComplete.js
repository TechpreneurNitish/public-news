import React, { useEffect } from 'react'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import parse from 'autosuggest-highlight/parse'
import throttle from 'lodash/throttle'

const autocompleteService = { current: null }

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}))

const abbrState = (input, to) => {
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ]

    if (to == 'abbr') {
        input = input.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        })
        for (let i = 0; i < states.length; i++) {
            if (states[i][0] == input) {
                return states[i][1]
            }
        }
    } else if (to == 'name') {
        input = input.toUpperCase()
        for (let i = 0; i < states.length; i++) {
            if (states[i][1] == input) {
                return states[i][0]
            }
        }
    }
}

const GooglePlaceComplete = (props) => {
    const classes = useStyles()
    const [value, setValue] = React.useState(null)
    const [inputValue, setInputValue] = React.useState('')
    const [options, setOptions] = React.useState([])

    const fetchPlace = React.useMemo(
        () =>
            throttle((request, callback) => {
                request.types = [props.googlePlaceType]
                request.componentRestrictions = { country: 'us' }
                autocompleteService.current.getPlacePredictions(request, callback)
            }, 200),
        [],
    )

    React.useEffect(() => {
        let active = true

        if (!autocompleteService.current && window.google) {
            autocompleteService.current = new window.google.maps.places.AutocompleteService()
        }
        if (!autocompleteService.current) {
            return undefined
        }

        if (inputValue === '') {
            setOptions(value ? [value] : [])
            return undefined
        }

        fetchPlace({ input: inputValue }, (results) => {
            if (active) {
                let newOptions = []

                if (value) {
                    newOptions = [value]
                }

                if (results) {
                    newOptions = [...newOptions, ...results]
                }
                setOptions(newOptions)
            }
        })

        return () => {
            active = false
        }
    }, [value, inputValue, fetch])

    const fillZipFromAddress = async (address) => {
        fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                address,
            )}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
        )
            .then((response) => response.json())
            .then((data) => {
                if (data.results) {
                    if (data.results[0].address_components) {
                        data.results[0].address_components.map((addr) => {
                            if (addr.types[0] === 'postal_code') {
                                props.formik.setFieldValue('zip', addr.long_name)
                            }
                        })
                    }
                }
            })
    }
    const onChangeHandler = (event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options)
        let mainValue
        if (newValue && typeof newValue.structured_formatting !== 'undefined') {
            if (props.name == 'address1') {
                let split = newValue.structured_formatting.secondary_text.split(', ')
                let state = abbrState(split[1], 'name')
                // prefill based on address
                props.formik.setFieldValue('city', split[0])
                props.formik.setFieldValue('state', state)
                // get zip
                fillZipFromAddress(newValue.description)
            }
            mainValue = newValue.structured_formatting.main_text
        }
        props.formik.values[props.name] = mainValue
        props.formik.setFieldValue(props.name, mainValue)
        setValue(mainValue)
    }

    useEffect(() => {
        setValue(props.value)
    }, [props.value])
    return (
        <Autocomplete
            style={{ marginBottom: '30px' }}
            getOptionLabel={(option) => (typeof option === 'string' ? option : option.description)}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            onChange={(event, newValue) => onChangeHandler(event, newValue)}
            onInputChange={(event, newInputValue) => {
                let tempValue = newInputValue.split(', ')[0]
                setInputValue(tempValue)
            }}
            renderInput={(params) => {
                return (
                    <TextField
                        {...params}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'new-password',
                        }}
                        label={props.label}
                        id={props.id}
                        name={props.name}
                        value={value}
                        error={props.error}
                        helperText={props.helperText}
                        autoComplete="off"
                        variant="outlined"
                        fullWidth
                    />
                )
            }}
            renderOption={(option) => {
                if (typeof option.structured_formatting === 'undefined') return
                const matches = option.structured_formatting.main_text_matched_substrings
                const parts = parse(
                    option.structured_formatting.main_text,
                    matches.map((match) => [match.offset, match.offset + match.length]),
                )

                return (
                    <Grid container alignItems="center">
                        <Grid item>
                            <LocationOnIcon className={classes.icon} />
                        </Grid>
                        <Grid item xs>
                            {parts.map((part, index) => (
                                <span
                                    key={index}
                                    style={{ fontWeight: part.highlight ? 700 : 400 }}
                                >
                                    {part.text}
                                </span>
                            ))}

                            <Typography variant="body2" color="textSecondary">
                                {option.structured_formatting.secondary_text}
                            </Typography>
                        </Grid>
                    </Grid>
                )
            }}
        />
    )
}

export default GooglePlaceComplete
