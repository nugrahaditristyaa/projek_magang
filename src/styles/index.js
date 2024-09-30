import { Dimensions } from "react-native";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

export const COLORS = {
  primary: "#3085BB",
  secondary: "#EBF7FF",
  white: "#FFFFFF",
  black: "#222222",
  gray: "#A1A1A1",
  transparent: "transparent",
  warning: "#BB3030",
  lightWarning: "#FFEBEB",
};

export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 10,
  padding: 12,
  padding2: 32,
  disableOpacity: 0.7,
  // font sizes
  largeText: 32,
  mediumText: 20,
  smallText: 14,
  extraSmallText: 12,
  // app dimensions
  width: WIDTH,
  height: HEIGHT,
  full: "100%",
  auto: "auto",
};
