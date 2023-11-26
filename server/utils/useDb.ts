type Base = 'compose' | 'db' | 'templates'
export const useDbStorage = (base?:Base) => useStorage(base ? `db:${base}` :'db')
export const db = {
    compose: useDbStorage('compose'),
    db: useDbStorage('db'),
    templates: useDbStorage('templates')
}