import { TagData } from "./types";

export function calculateAcceleration(tagData: TagData) {
  tagData.acceleration =
    Math.abs(tagData.accelerationX) +
    Math.abs(tagData.accelerationY) +
    Math.abs(tagData.accelerationZ);
}

/**
 * Calculates the equilibrium vapor pressure of water
 *
 * @param temperature Temperature in Celsius
 * @return The vapor pressure in Pa
 */
export function calculateEquilibriumVaporPressure(tagData: TagData) {
  if ((tagData.temperature !== 0 && !tagData.temperature) || !tagData.humidity) {
    return null;
  }
  tagData.equilibriumVaporPressure = 611.2 * Math.exp(17.67 * tagData.temperature / (243.5 + tagData.temperature));
}

/**
 * Calculates the absolute humidity
 *
 * @param temperature Temperature in Celsius
 * @param humidity Relative humidity % (range 0-100)
 * @return The absolute humidity in g/m^3
 */
export function calculateAbsoluteHumidity(tagData: TagData) {
  if ((tagData.temperature !== 0 && !tagData.temperature) || !tagData.humidity || !tagData.equilibriumVaporPressure) {
    return null;
  }
  tagData.absoluteHumidity = tagData.equilibriumVaporPressure * tagData.humidity * 0.021674 / (273.15 + tagData.temperature);
}

/**
 * Calculates the air density
 *
 * @param temperature Temperature in Celsius
 * @param humidity Relative humidity % (range 0-100)
 * @param pressure Pressure in pa
 * @return The air density in kg/m^3
 */
export function calculateAirDensity(tagData: TagData) {
  if ((tagData.temperature !== 0 && !tagData.temperature) || !tagData.humidity || !tagData.pressure || !tagData.equilibriumVaporPressure) {
    return null;
  }
  tagData.airDensity = 1.2929 * 273.15 / (tagData.temperature + 273.15) * (tagData.pressure - 0.3783 * tagData.humidity / 100 * tagData.equilibriumVaporPressure) / 101300;
}

/**
 * Calculates the dew point
 *
 * @param temperature Temperature in Celsius
 * @param humidity Relative humidity % (range 0-100)
 * @return The dew point in Celsius
 */
export function calculateDewPoint(tagData: TagData) {
  if ((tagData.temperature !== 0 && !tagData.temperature) || !tagData.humidity || !tagData.equilibriumVaporPressure) {
    return null;
  }
  const v = Math.log(tagData.humidity / 100 * tagData.equilibriumVaporPressure / 611.2);
  tagData.dewPoint = -243.5 * v / (v - 17.67);
}

/**
 * Calculates the vapour-pressure deficit
 *
 * @param temperature Temperature in Celsius
 * @param humidity Relative humidity % (range 0-100)
 * @return vapour-pressure deficit (0-20) in hPa
 */
export function calculateVaporPressureDeficit(tagData: TagData) {
  if ((tagData.temperature !== 0 && !tagData.temperature) || !tagData.humidity) {
    return null;
  }
  const ew = Math.exp(13.7 - 5120 / (273.15 + tagData.temperature)) * 1000;
  tagData.vaporPressureDeficit = ew - tagData.humidity / 100 * ew;
}
