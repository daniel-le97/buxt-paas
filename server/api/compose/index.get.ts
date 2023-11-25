// import type{StorageValue} from 'unstorage'

export default defineEventHandler(async (event) => {
  let data = []
  const yamls = (await useStorage('db').getKeys('compose'))
  for await (const yaml of yamls){
    data.push({name: yaml, data: await useStorage('db').getItem(`compose:${yaml}`)})
  }
  console.log( data);
  
  return data
})
