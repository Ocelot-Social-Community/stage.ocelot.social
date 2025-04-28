// eslint-disable-next-line import/no-cycle
import { MiddlewareOrder } from '@middleware/index'

import badgeLookup from './badgeLookup'

export default (): MiddlewareOrder[] => {
  return [{ order: 0, name: 'badgeLookup', middleware: badgeLookup }]
}
