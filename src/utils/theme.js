import { colors } from "./colors";
import { components } from './components'
import { media } from './media'

export const theme = {
  colors,
  components,
  media,
  spacingMiniscule: "0.25rem",
  spacingTiny: "0.5rem",
  spacingSmall: "0.75rem",
  spacingNormal: "1rem",
  spacingBig: "1.5rem",
  spacingContentMobile: "1.5rem",
  spacingMobileWithHeader: "6.25rem",
  spacingLarge: "2rem",
  spacingHuge: "3rem",
  spacingContent: "3rem",
  spacingWithHeader: "7.75rem",
  spacing: (size) => `${size}rem`,

  fontDefault: "Assistant",
  fontHandWriting: "Courgette",

  fontSizeSmall: "0.75rem",
  fontSizeNormal: "1rem",
  fontSizeMedium: "1.25rem",
  fontSizeBig: "1.5rem",
  fontSizeLarge: "2rem",

  desktopWidth: 750,

  boxShadow: "0 4px 20px 0 rgba(37, 38, 94, 0.1)",

  zIndexModal: 20, 
};
