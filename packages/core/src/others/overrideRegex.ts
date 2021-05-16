import variables from '../variables'
const { OVERRIDE_REGEX } = variables

export default new RegExp(OVERRIDE_REGEX, 'gi')
