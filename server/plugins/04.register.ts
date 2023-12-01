import * as os from 'node:os'

export default defineNitroPlugin((nitroApp) => {
  // const totalMemory = () => os.totalmem()
  // const freeMemory = () => os.freemem()

  // const platform = () => os.platform()

  // const cpus = () => os.loadavg()

  // const interval = setInterval(() => {
  //   const stats = {
  //     total: `total memory ${(totalMemory() / (1024 ** 2)).toFixed(2)}`,
  //     free: `free memory${(freeMemory() / (1024 ** 2)).toFixed(2)}`,
  //   }
  //   console.log(stats)
  // }, 1000)

  nitroApp.hooks.hook('close', () => {
    // clearInterval(interval)
  })
})
