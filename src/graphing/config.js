const quadrantSize = typeof window !== "undefined" && window.innerWidth>1280 ? window.innerWidth / 2 - 32 : 550;
// const quadrantSize = 550
const quadrantGap = 16

const getQuadrants = () => {
  return JSON.parse(process.env.QUADRANTS || null) || ['Techniques', 'Platforms', 'Tools', 'Languages & Frameworks']
}

const getRings = () => {
  return JSON.parse(process.env.RINGS || null) || ['Adopt', 'Trial', 'Hold']
}

const isBetween = (number, startNumber, endNumber) => {
  return startNumber <= number && number <= endNumber
}
const isValidConfig = () => {
  return getQuadrants().length === 4 && isBetween(getRings().length, 1, 3)
}

const getQuadrantSize = () => {
  const width = getRadarWidth();
  return width > 1280 ?  width / 2 - quadrantGap / 2 : 550
}
const getRadarWidth = () => {
  if(typeof window === "undefined" || typeof document === "undefined") {
    return 0;
  }
  const mainElement = document.querySelector('.byod-main');
  const mainElemenComputedStyle = window.getComputedStyle(mainElement);
  return mainElement.offsetWidth - parseInt(mainElemenComputedStyle.paddingLeft) - parseInt(mainElemenComputedStyle.paddingRight);
}


const graphConfig = {

  effectiveQuadrantHeight: getQuadrantSize() + quadrantGap / 2,
  effectiveQuadrantWidth: getQuadrantSize() + quadrantGap / 2,
  quadrantHeight: getQuadrantSize(),
  quadrantWidth: getQuadrantSize(),
  quadrantsGap: quadrantGap,
  minBlipWidth: 12,
  blipWidth: 22,
  groupBlipHeight: 24,
  newGroupBlipWidth: 88,
  existingGroupBlipWidth: 124,
  rings: getRings(),
  quadrants: getQuadrants(),
  groupBlipAngles: [30, 35, 60, 80],
  maxBlipsInRings: [60, 22, 17],
}

const uiConfig = {
  subnavHeight: 115, //height for  the sticky menu
  tabletSubnavHeight: 75,
  bannerHeight: 0,
  tabletBannerHeight: 0,
  headerHeight: 0,
  legendsHeight: 42,
  tabletViewWidth: 1280,
  mobileViewWidth: 768,
}

function getScale() {
  return window.innerWidth < 1800 ? 1.15 : 0.9
}

function getGraphSize() {
  return graphConfig.effectiveQuadrantHeight + graphConfig.effectiveQuadrantWidth
}

function getScaledQuadrantWidth(scale) {
  return graphConfig.quadrantWidth * scale
}

function getScaledQuadrantHeightWithGap(scale) {
  return (graphConfig.quadrantHeight + graphConfig.quadrantsGap) * scale
}

module.exports = {
  graphConfig,
  uiConfig,
  getScale,
  getGraphSize,
  getScaledQuadrantWidth,
  getScaledQuadrantHeightWithGap,
  isValidConfig,
}
