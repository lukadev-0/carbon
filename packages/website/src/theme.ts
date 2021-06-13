import { createMuiTheme } from '@material-ui/core'
import { purple } from '@material-ui/core/colors'


export default createMuiTheme({
    palette: {
        primary: purple,
        type: 'dark',
        background: {
            default: '#121212',
            paper: '#303030',
        },
    },
})