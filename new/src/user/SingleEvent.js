import React, { useState, useEffect } from 'react'
import { readEvent } from './event-api'
import auth from '../auth/auth-helper'
import {Redirect, Link} from 'react-router-dom'
import PropTypes from 'prop-types'

function SingleEvent(props, match) {
    const [values, setValues] = useState({
        events: '',
        error: ''
    })
    
    const { event } = values
    
    useEffect(() => {
        function init(userId) {
            const jwt = auth.isAuthenticated()
            readEvent({
                userId: userId
            }, {t: jwt.token}).then((data) => {
                if(data.error) {
                    setValues({ ...values, error: 'Bad' })
                } else {
                    console.log("list single events", data)
                    //setValues({ events: data })
                }
            })
        }
        init(props.match.params.userId)
    }, [])
    
    return (
        <div>
            single event
        </div>
    )
}

export default SingleEvent
