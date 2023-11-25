<template>
  <section>

    <!-- <div class="w-full ">
      <form class="">
        <div class="mb-4">
          <div class="lg:flex space-x-3">
            <label class="block dark:text-white text-gray-700 text-3xl  font-bold mb-2" for="username">
              Public Repository from Git
            </label>
            <UTooltip>
              <UIcon name="uil:question-circle" class="text-2xl" />
              <template #text>
                <span class="italic">Hello World!</span>
              </template>
            </UTooltip>
          </div>
          <input id="username"
            class="h-12 shadow appearance-none border rounded w-full py-2 px-3 dark:text-white text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text">
        </div>

        <button class="bg-amber-400 p-2 rounded-md px-4" type="button" >

          Build
        </button>
      </form>
    </div> -->

    <div class="p-2">
      <div class="lg:flex space-x-3">
        <label class="block dark:text-white text-gray-700 text-3xl  font-bold mb-2" for="username">
          Build Log
        </label>
        <UTooltip>
          <UIcon name="uil:rocket" class="text-2xl" />
          <template #text>
            <span class="italic">Hello World!</span>
          </template>
        </UTooltip>
      </div>

      <div class="p-2 bg-zinc-700 rounded-md">
        <!-- <div v-for="data in hello">
        </div> -->
        <pre class="scrollable-pre" id="pre-build"> {{ buildData }}</pre>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>

const buildData = ref('')

const eventSource = ref<EventSource | null>( null );
// const close = () => {
//   const id = useActiveId()
//   id.value = ''
//   eventSource.value?.close()
// }
onMounted( () => {
  const id = useActiveId()
  if (!id.value) {
    return
  }
  eventSource.value = new EventSource( 'http://localhost:3000/api/build/' + id.value );

  eventSource.value.addEventListener( 'message', ( event: { data: any; } ) => {
    const data = event.data;
    console.log( data );

    // Parse the data if needed
    try
    {
      const parsedData = JSON.parse( data );
      console.log( 'Parsed Data:', parsedData );
      buildData.value += `${ parsedData.data }\n`;
      const element = document.getElementById('pre-build');
      if (element) {
        // console.log('found element');
        
        element.scrollTop = element.scrollHeight
      }
      // Do something with parsedData
    }
    catch ( error )
    {
      console.error( 'Error parsing JSON:', error );
    }
  } );

  eventSource.value.addEventListener( 'error', () => {
    id.value = ''
    eventSource.value?.close();
    // console.error('EventSource error:', errorEvent)
    // Handle errors if needed
  } );

  eventSource.value.addEventListener( 'close', () => {
    id.value = ''
    eventSource.value?.close();
    // console.log('EventSource connection closed')

    // Handle the connection close if needed
  } );
} );

onBeforeMount( () => {
  if ( eventSource.value )
  {
    eventSource.value.close();
  }
} );
</script>

<style>
.scrollable-pre {
  max-height: 500px; /* Set the desired fixed height */
  overflow-y: auto; /* Enable vertical scrolling */
  border: 1px solid #ccc; /* Optional: add a border for styling */
  padding: 10px; /* Optional: add padding for better appearance */
}
</style>

