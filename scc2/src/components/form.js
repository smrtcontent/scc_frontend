import React from 'react'
import { FormControl, InputLabel, Input, FormHelperText, Button, Grid } from '@material-ui/core'

const Form = (props) => {
    return (
        <FormControl className='ml-3 col-12'>
            <Grid
                container
                spacing={3}>
                <Grid
                    item
                    xs={12}
                    sm={4}
                >
                    <InputLabel
                        htmlFor="my-input">
                        Email address
                    </InputLabel>
                    <Input
                        id="my-input"
                        aria-describedby="my-helper-text" />
                    <FormHelperText
                        id="my-helper-text">
                        We'll never share your email.
                    </FormHelperText>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={4}
                    direction='row'
                    justify='center'
                    alignItems='center'
                >
                    <Button
                        variant='contained'
                        color='primary'>
                        Save
                    </Button>
                </Grid>
            </Grid>
        </FormControl>
    )
}

export default Form