// eslint-disable-next-line import/no-cycle
import { MiddlewareOrder } from '@middleware/index'

import badgeLookup from './badgeLookup'
import locationVerification from './locationVerification'

export default (): MiddlewareOrder[] => {
  return [
    { order: 0, name: 'badgeLookup', middleware: badgeLookup },
    { order: 1, name: 'locationVerification', middleware: locationVerification },
  ]
}
