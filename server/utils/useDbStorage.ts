type Base = 'compose' | 'db' | 'templates' | 'templates:caprover' | 'templates:caprover:logos' | 'templates:portainer' | 'logs' | 'projects' | 'auth'
export const useDbStorage = (base?: Base) => useStorage(base ? `db:${base}` : 'db')
