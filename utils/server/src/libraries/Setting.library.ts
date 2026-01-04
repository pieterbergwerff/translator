// import extends
import Library from '@utils/server/extends/Library.extends.ts'
import AuthLibrary from './Auth.library'

// import types
// import { SettingSchema } from '@packages/validators/setting.validator.ts'

// import types
import type { Settings } from '@packages/validators/setting.validator.ts'

export class SettingLibrary extends Library<Settings> {
  private authLibrary: AuthLibrary = new AuthLibrary()

  constructor() {
    super()
    this.tableName = 'settings'
    this.primaryKey = 'settingId'
  }

  public async getSetting(settingName: Settings['settingsName']) {
    await this.init()
    const settingsUserId = await this.authLibrary.getLoggedUserId()

    return (
      this.db(this.tableName)
        .where({
          settingsName: settingName,
          settingsUserId,
        })
        .first() || null
    )
  }

  public async setSetting(
    settingName: Settings['settingsName'],
    settingValue: Settings['settingsValue']
  ) {
    await this.init()
    const settingsUserId = await this.authLibrary.getLoggedUserId()
    const existingSetting = await this.getSetting(settingName)

    if (existingSetting) {
      // Update existing setting
      const updatedSetting = await this.db(this.tableName)
        .where({ settingsName: settingName, settingsUserId })
        .update({ settingsValue: settingValue })
        .returning('*')
      return updatedSetting[0] ?? null
    } else {
      // Insert new setting
      const newSetting = {
        settingsUserId,
        settingsName: settingName,
        settingsValue: settingValue,
      }
      const [insertedSettingId] = await this.db(this.tableName).insert(newSetting).returning('*')
      return insertedSettingId ?? null
    }
  }

  public async init() {
    await this.authLibrary.init()
  }
}

export default SettingLibrary
