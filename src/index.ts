import type { LinearGradientProps } from 'react-native-linear-gradient'
import { ComponentType } from 'react'

let implementation
if (process.env.TARO_ENV === 'rn') {
  implementation = require('./lib/rn')
} else {
  implementation = require('./lib/index')
}
const linearGradient: ComponentType<LinearGradientProps> = implementation.default || implementation
export default linearGradient
