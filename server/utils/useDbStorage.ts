type Base = 'compose' | 'db' | 'templates' | 'templates:caprover' | 'templates:caprover:logos'
export const useDbStorage = (base?:Base) => useStorage(base ? `db:${base}` :'db')
