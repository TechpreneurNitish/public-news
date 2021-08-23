import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            width: '100%',
            height: '60px',
        },
    },
}))

const PrimaryButton = (props) => {
    const classes = useStyles()

    return (
        <div className={`${classes.root} ${props.btnSize} primButton`}>
            <Button
                variant="contained"
                id={props.id}
                onClick={props.onClick}
                disabled={props.disabled}
                type={props.type}
            >
                {props.iconLeft}
                {props.label}
                {props.children}
            </Button>
        </div>
    )
}

export default PrimaryButton
