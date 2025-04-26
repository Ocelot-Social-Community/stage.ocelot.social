/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Factory from '@db/factories'

export const trophies = async () => {
  return {
    trophyBeitragsblocker: await Factory.build('badge', {
      id: 'trophy_blue_beitragsblocker',
      type: 'trophy',
      description: 'Hat bei beitragsblocker.de mitgemacht',
      icon: '/img/badges/trophy_blue_beitragsblocker.svg',
    }),
    trophyLiberationexpress: await Factory.build('badge', {
      id: 'trophy_blue_liberationexpress',
      type: 'trophy',
      description: 'Hat bei liberation-express.com mitgemacht',
      icon: '/img/badges/trophy_blue_liberationexpress.svg',
    }),
    trophyMasernimpfblocker: await Factory.build('badge', {
      id: 'trophy_blue_masernimpfblocker',
      type: 'trophy',
      description: 'Hat bei masern-impfblocker.de mitgemacht',
      icon: '/img/badges/trophy_blue_masernimpfblocker.svg',
    }),
    trophyMaskenfreiexpress: await Factory.build('badge', {
      id: 'trophy_blue_maskenfreiexpress',
      type: 'trophy',
      description: 'Hat bei maskenfrei.express mitgemacht',
      icon: '/img/badges/trophy_blue_maskenfreiexpress.svg',
    }),
    trophyNachweisexpress: await Factory.build('badge', {
      id: 'trophy_blue_nachweisexpress',
      type: 'trophy',
      description: 'Hat bei nachweis-express.de mitgemacht',
      icon: '/img/badges/trophy_blue_nachweisexpress.svg',
    }),
    trophyRundfunkalarm: await Factory.build('badge', {
      id: 'trophy_blue_rundfunkalarm.svg',
      type: 'trophy',
      description: 'Hat bei rundfunkalarm.de mitgemacht',
      icon: '/img/badges/trophy_blue_rundfunkalarm.svg',
    }),
    trophyTestexpress: await Factory.build('badge', {
      id: 'trophy_blue_testexpress',
      type: 'trophy',
      description: 'Hat bei test-express.de mitgemacht',
      icon: '/img/badges/trophy_blue_testexpress.svg',
    }),
    trophyBeitragsstopper: await Factory.build('badge', {
      id: 'trophy_blue_beitragsstopper',
      type: 'trophy',
      description: 'Hat bei beitragsstopper.de mitgemacht',
      icon: '/img/badges/trophy_blue_beitragsstopper.svg',
    }),
    trophyFreundeDerDemokratie: await Factory.build('badge', {
      id: 'trophy_orange_freunde_der_demokratie',
      type: 'trophy',
      description: 'Hat bei freundederdemokratie.org mitgemacht',
      icon: '/img/badges/trophy_orange_freunde_der_demokratie.svg',
    }),
    trophyRestartDemocracy: await Factory.build('badge', {
      id: 'trophy_orange_restart_democracy',
      type: 'trophy',
      description: 'Hat bei restart-democracy.org mitgemacht',
      icon: '/img/badges/trophy_orange_restart_democracy.svg',
    }),
  }
}

export const verification = async () => {
  return {
    verificationBadenWuerttemberg: await Factory.build('badge', {
      id: 'verification_baden_wuerttemberg',
      type: 'verification',
      description: 'Kommt aus Baden-Württemberg',
      icon: '/img/badges/verification_baden_wuerttemberg.svg',
    }),
    verificationBayern: await Factory.build('badge', {
      id: 'verification_bayern',
      type: 'verification',
      description: 'Kommt aus Bayern',
      icon: '/img/badges/verification_bayern.svg',
    }),
    verificationBerlin: await Factory.build('badge', {
      id: 'verification_berlin',
      type: 'verification',
      description: 'Kommt aus Berlin',
      icon: '/img/badges/verification_berlin.svg',
    }),
    verificationBrandenburg: await Factory.build('badge', {
      id: 'verification_brandenburg',
      type: 'verification',
      description: 'Kommt aus Brandenburg',
      icon: '/img/badges/verification_brandenburg.svg',
    }),
    verificationBremen: await Factory.build('badge', {
      id: 'verification_bremen',
      type: 'verification',
      description: 'Kommt aus Bremen',
      icon: '/img/badges/verification_bremen.svg',
    }),
    verificationHamburg: await Factory.build('badge', {
      id: 'verification_hamburg',
      type: 'verification',
      description: 'Kommt aus Hamburg',
      icon: '/img/badges/verification_hamburg.svg',
    }),
    verificationHessen: await Factory.build('badge', {
      id: 'verification_hessen',
      type: 'verification',
      description: 'Kommt aus Hessen',
      icon: '/img/badges/verification_hessen.svg',
    }),
    verificationMecklenburgVorpommern: await Factory.build('badge', {
      id: 'verification_mecklenburg_vorpommern',
      type: 'verification',
      description: 'Kommt aus Mecklenburg-Vorpommern',
      icon: '/img/badges/verification_mecklenburg_vorpommern.svg',
    }),
    verificationNiedersachsen: await Factory.build('badge', {
      id: 'verification_niedersachsen',
      type: 'verification',
      description: 'Kommt aus Niedersachsen',
      icon: '/img/badges/verification_niedersachsen.svg',
    }),
    verificationNordrheinWestfalen: await Factory.build('badge', {
      id: 'verification_nordrhein_westfalen',
      type: 'verification',
      description: 'Kommt aus Nordrhein-Westfalen',
      icon: '/img/badges/verification_nordrhein_westfalen.svg',
    }),
    verificationRheinlandPfalz: await Factory.build('badge', {
      id: 'verification_rheinland_pfalz',
      type: 'verification',
      description: 'Kommt aus Rheinland-Pfalz',
      icon: '/img/badges/verification_rheinland_pfalz.svg',
    }),
    verificationSaarland: await Factory.build('badge', {
      id: 'verification_saarland',
      type: 'verification',
      description: 'Kommt aus dem Saarland',
      icon: '/img/badges/verification_saarland.svg',
    }),
    verificationSachsenAnhalt: await Factory.build('badge', {
      id: 'verification_sachsen_anhalt',
      type: 'verification',
      description: 'Kommt aus Sachsen-Anhalt',
      icon: '/img/badges/verification_sachsen_anhalt.svg',
    }),
    verificationSachsen: await Factory.build('badge', {
      id: 'verification_sachsen',
      type: 'verification',
      description: 'Kommt aus Sachsen',
      icon: '/img/badges/verification_sachsen.svg',
    }),
    verificationSchleswigHolstein: await Factory.build('badge', {
      id: 'verification_schleswig_holstein',
      type: 'verification',
      description: 'Kommt aus Schleswig-Holstein',
      icon: '/img/badges/verification_schleswig_holstein.svg',
    }),    
    verificationThueringen: await Factory.build('badge', {
      id: 'verification_thueringen',
      type: 'verification',
      description: 'Kommt aus Thüringen',
      icon: '/img/badges/verification_thueringen.svg',
    }),
  }
}

export default async () => {
  await trophies()
  await verification()
}