import * as os from 'node:os'

const totalMemory = () => os.totalmem()
const freeMemory = () => os.freemem()

const platform = () => os.platform()

const cpus = () => os.loadavg()

export default defineEventHandler(async (event) => {
  return 'Hello Nitro'
})
