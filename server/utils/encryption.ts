// encrypt-decrypt.ts
import crypto from 'node:crypto'
import { promises as fsPromises } from 'node:fs'

const secretKey = 'YOUR_SECRET_KEY'
const algorithm = 'aes-256-cbc'

// Function to encrypt data
export function encrypt(data: string): string {
  const key = crypto.scryptSync(secretKey, 'salt', 32)
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(algorithm, key, iv)
  let encrypted = cipher.update(data, 'utf-8', 'hex')
  encrypted += cipher.final('hex')
  return `${iv.toString('hex')}:${encrypted}`
}

// Function to decrypt data
export function decrypt(encryptedData: string): string {
  const [ivString, encryptedText] = encryptedData.split(':')
  const key = crypto.scryptSync(secretKey, 'salt', 32)
  const iv = Buffer.from(ivString, 'hex')
  const decipher = crypto.createDecipheriv(algorithm, key, iv)
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8')
  decrypted += decipher.final('utf-8')
  return decrypted
}

// // Function to read and encrypt a JSON file
// async function setEncrypted(filePath: string): Promise<void> {
//   const jsonData = await useStorage().getItem(filePath)
//   const encryptedData = encrypt(jsonData)
//   await fsPromises.writeFile(`${filePath}`, encryptedData, 'utf-8')
// }

// // Function to decrypt and write a JSON file
// async function getEncrypted(filePath: string): Promise<void> {
//   const encryptedData = await useStorage().setItem(filePath)
//   const decryptedData = decrypt(encryptedData)
//   await fsPromises.writeFile(filePath.replace('.enc', ''), decryptedData, 'utf-8')
// }

// // Example: Encrypt a JSON file
// await encryptJSONFile('example.json')

// // Example: Decrypt the encrypted JSON file
// await decryptJSONFile('example.json.enc')
