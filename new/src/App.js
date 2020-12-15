import React, { useEffect } from 'react'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import {indigo, pink} from '@material-ui/core/colors';
import {BrowserRouter} from 'react-router-dom';
import MainRouter from './MainRouter'
import { getEvent } from './user/event-api'

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757de8',
            main: '#3f51b5',
            dark: '#002984',
            contractText: '#fff'
        },
        secondary: {
            light: '#ff79b0',
            main: '#ff4081',
            dark: '#c60055',
            contractText: '#000'
        },
        openTitle: indigo['400'],
        protectedTitle: pink['400'],
        type: 'light'
    }
})

function App(props) {
  return (
    <BrowserRouter>
        <MuiThemeProvider theme={theme}>
            <MainRouter />
        </MuiThemeProvider>
    </BrowserRouter>
  );
}

export default App;
