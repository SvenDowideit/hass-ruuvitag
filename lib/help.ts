import { Tag, TagConfig, TagData } from "./types";

export function presentUnconfiguredTag(tag: Tag, data: TagData) {
  const exampleConfig: TagConfig = {
    id: tag.id,
    name: "some-name",
    enabled: true,
    temperature: true,
    pressure: true,
    humidity: true,
    battery: true,
    acceleration: false,
    accelerationX: false,
    accelerationY: false,
    accelerationZ: false,
    rssi: false,
    equilibrium_vapor_pressure: false, // use temperature
    absolute_humidity: false, // use temperature & humidity
    air_density: false, // use temperature, humidity & pressure
    dew_point: false, // use temperature & humidity
    vapor_pressure_deficit: false, // use temperature & humidity
  };
  const buf = [
    `Unconfigured tag ${tag.id}: ${JSON.stringify(data)}`,
    // `Found an unconfigured tag ${tag.id}. This will only be shown once per tag.`,
    // `To help you identify this tag, its current information follows.`,
    // `  ${JSON.stringify(data)}`,
    // `To have its status posted to Home Assistant, add the following to the tags configuration:`,
    // `  ${JSON.stringify(exampleConfig)}`,
  ];
  console.log(buf.join("\n"));
}
