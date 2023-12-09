export default defineNitroPlugin(async () => {
  const Pusher = await import('pusher').then((m) => m.default || m)
  const pusher = new Pusher({
    appId: 'app-id',
    key: 'app-key',
    secret: 'app-secret',
    useTLS: false, // optional, defaults to false, // if `host` is present, it will override the `cluster` option.
    host: '127.0.0.1', // optional, defaults to api.pusherapp.com
    port: '6001',
    // optional, defaults to 80 for non-TLS connections and 443 for TLS connections
    encryptionMasterKeyBase64: 'fs3BQPxnvTH7bHJTN9aoTy57eLzLrP0FX3WqyD57sto=', // a base64 string which encodes 32 bytes, used to derive the per-channel encryption keys (see below!)
  })

  console.log(pusher)

  pusher.trigger('my-channel', 'my-event', {
    message: 'hello world',
  })
})
