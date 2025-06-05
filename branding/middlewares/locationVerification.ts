/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import badgesResolver from '@graphql/resolvers/badges'
import { Context } from '@src/server'

const {
  Mutation: { setVerificationBadge },
} = badgesResolver


const searchLocations = [
  { region: 'region.9274', badge: 'verification_hamburg' },
  { region: 'region.17466', badge: 'verification_schleswig_holstein' },
  { region: 'region.25658', badge: 'verification_mecklenburg_vorpommern' },
  { region: 'region.33850', badge: 'verification_niedersachsen' },
  { region: 'region.42042', badge: 'verification_nordrhein_westfalen' },
  { region: 'region.50234', badge: 'verification_hessen' },
  { region: 'region.58426', badge: 'verification_rheinland_pfalz' },
  { region: 'region.66618', badge: 'verification_saarland' },
  { region: 'region.74810', badge: 'verification_sachsen' },
  { region: 'region.83002', badge: 'verification_thueringen' },
  { region: 'region.91194', badge: 'verification_sachsen_anhalt' },
  { region: 'region.99386', badge: 'verification_brandenburg' },
  { region: 'region.107578', badge: 'verification_bremen' },
  { region: 'region.115770', badge: 'verification_berlin' },
  { region: 'region.132154', badge: 'verification_baden_wuerttemberg' },
  { region: 'region.123962', badge: 'verification_bayern' },
]

export const assignVerificationBadge = async (userId: string, root, context: Context, info) => {
  const location = (
    await context.database.query({
      query: `
        MATCH (user:User{id: $userId})-[:IS_IN*]->(location:Location)
        WHERE location.id IN $searchLocations
        RETURN location {.*}
      `,
      variables: {
        userId,
        searchLocations: searchLocations.map((loc) => loc.region),
      },
    })
  ).records.map((record) => record.get('location'))

  if (location.length !== 1) {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const foundLocation = searchLocations.find((sloc) => sloc.region === location[0].id)
  if (!foundLocation) {
    return
  }
  
  await setVerificationBadge(root, { userId, badgeId: foundLocation.badge }, context, info)
}

export default {
  Mutation: {
    UpdateUser: async (resolve, root, args, context: Context, info) => {
      const { id: userId } = args
      const resolved = await resolve(root, args, context, info)
      if (!userId) {
        return resolved
      }

      void assignVerificationBadge(userId, root, context, info)
      
      return resolved
    },
  },
}
