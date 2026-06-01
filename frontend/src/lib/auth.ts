const ACCESS_KEY = 'ljx_access'
const REFRESH_KEY = 'ljx_refresh'

const isBrowser = () => typeof window !== 'undefined'

export const auth = {
  getToken: (): string | null => (isBrowser() ? localStorage.getItem(ACCESS_KEY) : null),
  getRefresh: (): string | null => (isBrowser() ? localStorage.getItem(REFRESH_KEY) : null),
  setTokens: (access: string, refresh: string): void => {
    if (!isBrowser()) return
    localStorage.setItem(ACCESS_KEY, access)
    localStorage.setItem(REFRESH_KEY, refresh)
  },
  clear: (): void => {
    if (!isBrowser()) return
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
  },
}
