import overlay from 'unstorage/drivers/overlay'
import memory from 'unstorage/drivers/memory'
import fs from 'unstorage/drivers/fs'

export default defineNitroPlugin((nitroApp) => {
  const storage = useStorage()

  // Dynamically pass in credentials from runtime configuration, or other sources
  const driver = overlay({
    layers: [memory(), fs({ base: './data' })],
  })

  // Mount driver
  storage.mount('db', driver)
})
