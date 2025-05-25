/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { getNeode } from '@db/neo4j'

const neode = getNeode()

export const trophies = [
  {
    id: 'trophy_blue_beitragsblocker',
    type: 'trophy',
    description: 'Hat bei beitragsblocker.de mitgemacht',
    icon: '/img/badges/trophy_blue_beitragsblocker.svg',
  },
  {
    id: 'trophy_blue_liberationexpress',
    type: 'trophy',
    description: 'Hat bei liberation-express.com mitgemacht',
    icon: '/img/badges/trophy_blue_liberationexpress.svg',
  },
  {
    id: 'trophy_blue_masernimpfblocker',
    type: 'trophy',
    description: 'Hat bei masern-impfblocker.de mitgemacht',
    icon: '/img/badges/trophy_blue_masernimpfblocker.svg',
  },
  {
    id: 'trophy_blue_maskenfreiexpress',
    type: 'trophy',
    description: 'Hat bei maskenfrei.express mitgemacht',
    icon: '/img/badges/trophy_blue_maskenfreiexpress.svg',
  },
  {
    id: 'trophy_blue_nachweisexpress',
    type: 'trophy',
    description: 'Hat bei nachweis-express.de mitgemacht',
    icon: '/img/badges/trophy_blue_nachweisexpress.svg',
  },
  {
    id: 'trophy_blue_rundfunkalarm.svg',
    type: 'trophy',
    description: 'Hat bei rundfunkalarm.de mitgemacht',
    icon: '/img/badges/trophy_blue_rundfunkalarm.svg',
  },
  {
    id: 'trophy_blue_testexpress',
    type: 'trophy',
    description: 'Hat bei test-express.de mitgemacht',
    icon: '/img/badges/trophy_blue_testexpress.svg',
  },
  {
    id: 'trophy_blue_beitragsstopper',
    type: 'trophy',
    description: 'Hat bei beitragsstopper.de mitgemacht',
    icon: '/img/badges/trophy_blue_beitragsstopper.svg',
  },
  {
    id: 'trophy_orange_freunde_der_demokratie',
    type: 'trophy',
    description: 'Hat bei freundederdemokratie.org mitgemacht',
    icon: '/img/badges/trophy_orange_freunde_der_demokratie.svg',
  },
  {
    id: 'trophy_orange_restart_democracy',
    type: 'trophy',
    description: 'Hat bei restart-democracy.org mitgemacht',
    icon: '/img/badges/trophy_orange_restart_democracy.svg',
  },
  {
    id: 'trophy_blue_interested',
    type: 'trophy',
    description: 'Neugier ist eine Tugend',
    icon: '/img/badges/trophy_blue_interested.svg',
  },
  {
    id: 'trophy_blue_tested',
    type: 'trophy',
    description: 'Wollte es wissen',
    icon: '/img/badges/trophy_blue_tested.svg',
  },
]

export const verification = [
  {
    id: 'verification_baden_wuerttemberg',
    type: 'verification',
    description: 'Kommt aus Baden-Württemberg',
    icon: '/img/badges/verification_baden_wuerttemberg.svg',
  },
  {
    id: 'verification_bayern',
    type: 'verification',
    description: 'Kommt aus Bayern',
    icon: '/img/badges/verification_bayern.svg',
  },
  {
    id: 'verification_berlin',
    type: 'verification',
    description: 'Kommt aus Berlin',
    icon: '/img/badges/verification_berlin.svg',
  },
  {
    id: 'verification_brandenburg',
    type: 'verification',
    description: 'Kommt aus Brandenburg',
    icon: '/img/badges/verification_brandenburg.svg',
  },
  {
    id: 'verification_bremen',
    type: 'verification',
    description: 'Kommt aus Bremen',
    icon: '/img/badges/verification_bremen.svg',
  },
  {
    id: 'verification_hamburg',
    type: 'verification',
    description: 'Kommt aus Hamburg',
    icon: '/img/badges/verification_hamburg.svg',
  },
  {
    id: 'verification_hessen',
    type: 'verification',
    description: 'Kommt aus Hessen',
    icon: '/img/badges/verification_hessen.svg',
  },
  {
    id: 'verification_mecklenburg_vorpommern',
    type: 'verification',
    description: 'Kommt aus Mecklenburg-Vorpommern',
    icon: '/img/badges/verification_mecklenburg_vorpommern.svg',
  },
  {
    id: 'verification_niedersachsen',
    type: 'verification',
    description: 'Kommt aus Niedersachsen',
    icon: '/img/badges/verification_niedersachsen.svg',
  },
  {
    id: 'verification_nordrhein_westfalen',
    type: 'verification',
    description: 'Kommt aus Nordrhein-Westfalen',
    icon: '/img/badges/verification_nordrhein_westfalen.svg',
  },
  {
    id: 'verification_rheinland_pfalz',
    type: 'verification',
    description: 'Kommt aus Rheinland-Pfalz',
    icon: '/img/badges/verification_rheinland_pfalz.svg',
  },
  {
    id: 'verification_saarland',
    type: 'verification',
    description: 'Kommt aus dem Saarland',
    icon: '/img/badges/verification_saarland.svg',
  },
  {
    id: 'verification_sachsen_anhalt',
    type: 'verification',
    description: 'Kommt aus Sachsen-Anhalt',
    icon: '/img/badges/verification_sachsen_anhalt.svg',
  },
  {
    id: 'verification_sachsen',
    type: 'verification',
    description: 'Kommt aus Sachsen',
    icon: '/img/badges/verification_sachsen.svg',
  },
  {
    id: 'verification_schleswig_holstein',
    type: 'verification',
    description: 'Kommt aus Schleswig-Holstein',
    icon: '/img/badges/verification_schleswig_holstein.svg',
  },
  {
    id: 'verification_thueringen',
    type: 'verification',
    description: 'Kommt aus Thüringen',
    icon: '/img/badges/verification_thueringen.svg',
  },
]

export default async () => {
  // Trophy Badges

  let dbTrophyBadges = (await neode.all('Badge', { type: 'trophy' })).map((node) => node)
  for await (const trophyBadge of trophies) {
    const inDB = dbTrophyBadges.find((dbItem) => dbItem.properties().id === trophyBadge.id)
    if (inDB) {
      // update item
      // eslint-disable-next-line no-console
      console.log('update', trophyBadge.id)
      await inDB.update(trophyBadge)
      dbTrophyBadges = dbTrophyBadges.filter((dbItem) => dbItem !== inDB)
    } else {
      // insert item
      // eslint-disable-next-line no-console
      console.log('insert', trophyBadge.id)
      await neode.create('Badge', trophyBadge)
    }
  }
  // delete item
  for await (const dbTrophyBadge of dbTrophyBadges) {
    // eslint-disable-next-line no-console
    console.log('delete', dbTrophyBadge.properties().id)
    await dbTrophyBadge.delete()
  }

  // Verification Badges

  let dbVerificationBadges = (await neode.all('Badge', { type: 'verification' })).map(
    (node) => node,
  )
  for await (const verificationBadge of verification) {
    const inDB = dbVerificationBadges.find(
      (dbItem) => dbItem.properties().id === verificationBadge.id,
    )
    if (inDB) {
      // update item
      // eslint-disable-next-line no-console
      console.log('update', verificationBadge.id)
      await inDB.update(verificationBadge)
      dbVerificationBadges = dbVerificationBadges.filter((dbItem) => dbItem !== inDB)
    } else {
      // insert item
      // eslint-disable-next-line no-console
      console.log('insert', verificationBadge.id)
      await neode.create('Badge', verificationBadge)
    }
  }
  // delete item
  for await (const dbVerificationBadge of dbVerificationBadges) {
    // eslint-disable-next-line no-console
    console.log('delete', dbVerificationBadge.properties().id)
    await dbVerificationBadge.delete()
  }
}
