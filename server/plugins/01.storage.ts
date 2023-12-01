import fs from 'unstorage/drivers/fs-lite'

// import { createStorage, defineDriver} from "unstorage";

export default defineNitroPlugin((nitroApp) => {
  // const myStorageDriver = defineDriver((options) => {
  //   return {
  //     name: "my-custom-driver",
  //     options,
  //     async hasItem(key, _opts) {},
  //     async getItem(key, _opts) {},
  //     async setItem(key, value, _opts) {},
  //     async removeItem(key, _opts) {},
  //     async getKeys(base, _opts) {},
  //     async clear(base, _opts) {},
  //     async dispose() {},
  //     async watch(callback) {},
  //   };
  // });

  // const bunStorage = createStorage({
  //   driver: myStorageDriver(),
  // });
  const storage = useStorage()

  // Dynamically pass in credentials from runtime configuration, or other sources
  // const driver = overlay({
  //   layers: [memory(), fs({ base: './data' })],
  // })

  const driver = fs({ base: './data' })

  // Mount driver
  storage.mount('db', driver)
})
