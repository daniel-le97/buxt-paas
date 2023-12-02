export function useIo() {
  const { $io } = useNuxtApp()
  return $io
}

export const useLogger = () => useNuxtApp().$logger
