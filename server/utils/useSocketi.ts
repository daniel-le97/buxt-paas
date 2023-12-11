import type Pusher from 'pusher'
import { Logger } from './Logger'

type Nitro = ReturnType<typeof useNitroApp>
class PusherConnection {
  private _pusher: Pusher | null
  constructor() {
    this._pusher = null
  }

  async setup(nitro: Nitro) {
    const Pusher = await import('pusher').then(m => m.default || m)
    if (this._pusher)
      return
    const runtimeConfig = useRuntimeConfig()
    this._pusher = new Pusher({
      appId: 'app-id',
      key: 'app-key',
      secret: 'app-secret',
      useTLS: false, // optional, defaults to false, // if `host` is present, it will override the `cluster` option.
      host: '127.0.0.1',
      port: '6001',
      encryptionMasterKeyBase64: 'fs3BQPxnvTH7bHJTN9aoTy57eLzLrP0FX3WqyD57sto=',
    })
    this._pusher ? Logger.success('connected to pusher') : Logger.error('failed to connect to pusher')

    nitro.hooks.hook('close', () => {
      console.log('closing pusher connection')

      this._pusher = null
    })
  }

  get pusher() {
    if (!this._pusher)
      throw new Error('Pusher not initialized')
    return this._pusher
  }
}


export const pusher = new PusherConnection()

export const useSocketi = () => pusher.pusher
