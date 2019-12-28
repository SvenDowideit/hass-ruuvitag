import { calculateAcceleration } from "../lib/calc";

jest.mock("node-fetch");
import _fetch from "node-fetch";
import { getBaseConfig } from "../lib/config";
import Manager from "../lib/Manager";
import { Tag } from "../lib/types";

const fetch: jest.MockInstance<any, any[]> = (_fetch as unknown) as jest.MockInstance<any, any[]>;
const { Response } = require.requireActual("node-fetch");

const data = {
  dataFormat: 3,
  rssi: -56,
  humidity: 23.5,
  temperature: 21.99,
  pressure: 100912,
  accelerationX: -280,
  accelerationY: -956,
  accelerationZ: 36,
  battery: 2965,
  ts: 1545422440544,
};
calculateAcceleration(data);

const tag: Tag = {
  id: "f00f00f00",
  on() {
    return;
  },
};

describe("Manager", () => {
  it("informs the user about unconfigured tags", () => {
    const manager = new Manager(getBaseConfig());
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => undefined);
    manager.handleRuuviUpdate(tag, data);
    expect(logSpy).toHaveBeenCalled();
    expect(logSpy.mock.calls[0][0]).toMatch(`unconfigured tag ${tag.id}`);
    logSpy.mockRestore();
  });
  it("does something with configured tags", () => {
    fetch.mockReturnValue(Promise.resolve(new Response("4")));

    const config = getBaseConfig();
    config.tags.push({
      id: tag.id,
      name: "somename",
      enabled: true,
      temperature: true,
      pressure: true,
      humidity: true,
      battery: true,
      acceleration: true,
      accelerationX: true,
      accelerationY: true,
      accelerationZ: true,
      rssi: false,
      equilibrium_vapor_pressure: false, // use temperature
      absolute_humidity: false, // use temperature & humidity
      air_density: false, // use temperature, humidity & pressure
      dew_point: false, // use temperature & humidity
      vapour_pressure_deficit: false, // use temperature & humidity
    });
    const manager = new Manager(config);
    manager.handleRuuviUpdate(tag, data);
    expect(fetch.mock.calls).toHaveLength(8); // all enabled features
  });
});
