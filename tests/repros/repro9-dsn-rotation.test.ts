import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { expect, test } from "bun:test"
import {
  convertCircuitJsonToDsnString,
  convertDsnPcbToCircuitJson,
  parseDsnToCircuitJson,
  parseDsnToDsnJson,
  type DsnPcb,
} from "lib"
// @ts-ignore
import circuit from "../assets/repro/dsn_rotation_test.json" with {
  type: "json",
}
import { writeFile } from "fs/promises"
import type { AnyCircuitElement } from "circuit-json"

test("Rotation  repro", async () => {
  const dsn = convertCircuitJsonToDsnString(circuit as AnyCircuitElement[])
  // const dsnPcb = parseDsnToDsnJson(dsn) as DsnPcb
  const circuitJson = parseDsnToCircuitJson(dsn)
  // const dsnJson = parseDsnToDsnJson(circuit) as DsnPcb
  // const circuitJson = convertDsnPcbToCircuitJson(dsnJson)
  writeFile("dsn_rotation_test.dsn", dsn)
  writeFile("dsn_rotation_test.json", JSON.stringify(circuitJson, null, 2))
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
