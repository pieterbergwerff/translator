// import extends
import Library from '@utils/server/extends/Library.extends.ts'

// import utils
import { getServerSession } from 'next-auth'
import { authOptions } from '@utils/server/auth.ts'

// import types
import type { Session } from 'next-auth'

export class AuthLibrary extends Library {
  private session: Session | null = null
  private initialized = false

  public async getLoggedUser() {
    await this.init()
    return this.session?.user || null
  }

  public async getLoggedUserId() {
    await this.init()
    return this.session?.user?.userId || null
  }

  public async isLoggedIn() {
    await this.init()
    return !!this.getLoggedUser()
  }

  public async isRootUser() {
    await this.init()
    if (!this.isLoggedIn()) return false

    // fix
    return true
  }

  public async init() {
    if (!this.initialized) {
      this.session = await getServerSession(authOptions)
      this.initialized = true
    }
  }
}

export default AuthLibrary
