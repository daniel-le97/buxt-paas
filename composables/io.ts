export function useIo() {
  const { $io } = useNuxtApp()
  return $io
}
