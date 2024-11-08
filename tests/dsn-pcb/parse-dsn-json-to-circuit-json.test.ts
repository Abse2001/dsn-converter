import { convertCircuitJsonToPcbSvg } from "circuit-to-svg"
import { convertDsnJsonToCircuitJson } from "../../lib/dsn-pcb/dsn-json-to-circuit-json/convert-dsn-json-to-circuit-json.ts"
// @ts-ignore
import testDsnFile from "../assets/testkicadproject/testkicadproject.dsn" with {
  type: "text",
}
// @ts-ignore
import { expect, test } from "bun:test"
import { parseDsnToDsnJson } from "lib"

// @ts-ignore

test.skip("parse s-expr to json", async () => {
  const pcbJson = parseDsnToDsnJson(testDsnFile)
  expect(pcbJson).toBeTruthy()
})

test.skip("parse json to circuit json", async () => {
  const pcb = parseDsnToDsnJson(testDsnFile)
  const circuitJson = convertDsnJsonToCircuitJson(pcb)

  expect(convertCircuitJsonToPcbSvg(circuitJson)).toMatchSvgSnapshot(
    import.meta.path,
  )
})