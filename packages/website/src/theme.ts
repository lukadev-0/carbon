import { createMuiTheme as createTheme } from '@material-ui/core'
import { deepPurple as color } from '@material-ui/core/colors'

export default createTheme({
    palette: {
        primary: {
            light: color[100],
            main: color[200],
            dark: color[300],
        },
        type: 'dark',
        background: {
            default: '#121212',
            paper: '#303030',
        },
    },
})