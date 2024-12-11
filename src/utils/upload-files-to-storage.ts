import { put } from '@vercel/blob'

export async function uploadFileForStorage(file: Buffer, filename: string) {
  const blob = await put(filename, file, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  })
  return blob
}
