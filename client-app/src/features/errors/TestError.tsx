import React, { useState } from 'react';
import { Button, Header, Segment } from "semantic-ui-react";
import axios from 'axios';
import ValidationErrors from './ValidationErrors';

export default function TestErrors() {
    const baseUrl = 'https://localhost:44343/api'
    const [errors, setErrors] = useState(null);

    function handleNotFound() {
        axios.get(baseUrl + '/Buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + '/Buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + '/Buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorized() {
        axios.get(baseUrl + '/Buggy/unauthorized').catch(err => console.log(err.response));
    }

    function handleValidationError() {
        axios.post(baseUrl + '/Activities', {}).catch(err => setErrors(err));
    }

    return (
        <>
            <Header as='h1' content='Test Error Component'/>
            <Segment>
                <Button.Group widths='7'>
                    <Button onClick={handleNotFound} content="Not Found" basic primary/>
                    <Button onClick={handleBadRequest} content="Bad Request" basic primary/>
                    <Button onClick={handleServerError} content="Server Error" basic primary/>
                    <Button onClick={handleUnauthorized} content="Unauthorized" basic primary/>
                    <Button onClick={handleValidationError} content="Validation Error" basic primary/>
                </Button.Group>
            </Segment>
            {errors &&
                <ValidationErrors errors={errors} />
            }
        </>
    )
}