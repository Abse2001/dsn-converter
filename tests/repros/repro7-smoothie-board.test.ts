import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { expect, test } from "bun:test"
import { convertDsnPcbToCircuitJson, parseDsnToDsnJson, type DsnPcb } from "lib"
// @ts-ignore
import dsnFileWithFreeroutingTrace from "../assets/repro/smoothieboard-repro.dsn" with {
  type: "text",
}
import { writeFile } from "fs/promises"

test("smoothieboard repro", async () => {
  const dsnJson = parseDsnToDsnJson(dsnFileWithFreeroutingTrace) as DsnPcb

  const circuitJson = convertDsnPcbToCircuitJson(dsnJson)
  writeFile("smoothieboard-repro.json", JSON.stringify(circuitJson, null, 2))
  writeFile("smoothieboard-repro.dsn", dsnFileWithFreeroutingTrace)
  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})
