import { createMuiTheme as createTheme } from '@material-ui/core'
import { blue as color } from '@material-ui/core/colors'


export default createTheme({
    palette: {
        primary: color,
        type: 'dark',
        background: {
            default: '#121212',
            paper: '#303030',
        },
    },
})