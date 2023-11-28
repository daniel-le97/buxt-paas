import * as fs from 'node:fs'
import * as path from 'node:path'

interface FileInfo {
  name: string
  path: string
  formatted:string
}

function removeSpecialCharacters(inputString: string): string {
  // Use a regular expression to match all non-alphanumeric characters
  const regex = /[^a-zA-Z0-9]/g

  // Replace matched characters with an empty string
  const resultString = inputString.replace(regex, '')

  return resultString.toLowerCase()
}

async function getFileNamesAndPaths(directory: string): Promise<FileInfo[]> {
  const file_list: FileInfo[] = []

  // Asynchronously read the directory
  const files = await fs.promises.readdir(directory)

  // Iterate through all files in the directory
  for (const file of files) {
    // Get the full path of the file
    const full_path = path.join(directory, file)

    // Check if it's a file (not a directory)
    const isFile = (await fs.promises.stat(full_path)).isFile()

    if (isFile) {
      // Append the file name and full path to the list
      file_list.push({ name: file, path: full_path , formatted: removeSpecialCharacters(file.split('.')[0])})
    }
  }

  return file_list
}

export default defineNitroPlugin(async (nitroApp) => {
  const cwd = process.cwd()
  const files = await getFileNamesAndPaths(`${cwd}/public/logos`)
  console.log(files);
  const config = JSON.stringify({logos: files})
  Bun.write('logos.json', config)
  

  // nitroApp.hooks.

  // await fetchDirectory({
  //     repo: "xneo1/portainer_templates",
  //     path: "Template",
  //     destination: "./chalk"
  // });
})
