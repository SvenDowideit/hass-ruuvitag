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
function evp(tagData: TagData) {
  if (tagData.temperature !== 0 && !tagData.temperature) {
    return null;
  }
  tagData.equilibriumVaporPressure = 611.2 * Math.exp(17.67 * tagData.temperature / (243.5 + tagData.temperature));
}

export function calculateEquilibriumVaporPressure(tagData: TagData) {
 if ((tagData.temperature !== 0 && !tagData.temperature) || !tagData.humidity) {
   return null;
 }
 tagData.absoluteHumidity = evp(tagData.temperature) * tagData.humidity * 0.021674 / (273.15 + tagData.temperature);
}

/**
 * Calculates the absolute humidity
 *
 * @param temperature Temperature in Celsius
 * @param humidity Relative humidity % (range 0-100)
 * @return The absolute humidity in g/m^3
 */
export function calculateAbsoluteHumidity(tagData: TagData) {
  if ((tagData.temperature !== 0 && !tagData.temperature) || !tagData.humidity) {
    return null;
  }
  tagData.absoluteHumidity = evp(tagData.temperature) * tagData.humidity * 0.021674 / (273.15 + tagData.temperature);
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
  if ((tagData.temperature !== 0 && !tagData.temperature) || !tagData.humidity || !tagData.pressure) {
    return null;
  }
  tagData.airDensity = 1.2929 * 273.15 / (tagData.temperature + 273.15) * (tagData.pressure - 0.3783 * tagData.humidity / 100 * calculateEquilibriumVaporPressure(tagData.temperature)) / 101300;
}

/**
 * Calculates the dew point
 *
 * @param temperature Temperature in Celsius
 * @param humidity Relative humidity % (range 0-100)
 * @return The dew point in Celsius
 */
export function calculateDewPoint(tagData: TagData) {
  if ((tagData.temperature !== 0 && !tagData.temperature) || !tagData.humidity) {
    return null;
  }
  const v = Math.log(tagData.humidity / 100 * evp(tagData.temperature) / 611.2);
  tagData.dewPoint = -243.5 * v / (v - 17.67);
}

const c2k = function(tempK) {
  return 273.15 + tempK;
};

/**
 * Calculates the vapour-pressure deficit
 *
 * @param temperature Temperature in Celsius
 * @param humidity Relative humidity % (range 0-100)
 * @return vapour-pressure deficit (0-20)
 */
export function calculateVapourPressureDeficit(tagData: TagData) {
  if ((tagData.temperature !== 0 && !tagData.temperature) || !tagData.humidity) {
    return null;
  }
  const ew = Math.exp(13.7 - 5120 / (273.15 + tagData.temperature)) * 1000;
  tagData.vapourPressureDeficit = ew - tagData.humidity / 100 * ew;
}
// const vpd = {
//     ew1: function(temp) {
//         // =EXP(
//         //     1,673952 * 10^-5 * (T)^2 - 2,711193 * 10^-2 * (T) + 21,2409642 - 6096,9385 / (T) + 2,433502 * LN(T)
//         // )/100
//         let K = c2k(temp);
//         return Math.exp(
//             1.673952 * 0.00001 * Math.pow(K, 2) - 2.711193 * 0.01 * K + 21.2409642 - 6096.9385 / K + 2.433502 * Math.log(K)
//         ) / 100;
//     },
//     ew2: function(temp) {
//         // =EXP(13,7-5120/(273+T°))*1000
//         return Math.exp(13.7 - 5120 / c2k(temp)) * 1000;
//     },
//     model: function(model, rh, temp) {
//         let ew = vpd["ew" + model](temp);
//         return ew - rh / 100 * ew;
//     },
//     model1: function(rh, temp) {
//         return vpd.model(1, rh, temp);
//     },
//     model2: function(rh, temp) {
//         return vpd.model(2, rh, temp);
//     }
// };
// const vapourPressureDeficit = vpd.model1;
