import * as jsonStorage from "electron-json-storage"
import { promisify } from "util"

export interface Config {
    ai?: AiConfig,
    debug: {
        useSampleKifu: boolean
    }
}

export interface AiConfig {
    cmd: string
    cwd: string
}

const DefaultConfig: Config = {
    debug: {
        useSampleKifu: false
    }
}

function getConfig(): Promise<Config> {
    return new Promise((resolve, reject) => {
        jsonStorage.get("config", (err, data) => {
            if (err) reject(err)
            resolve({
                ...DefaultConfig,
                ...(data as Config)
            })
        })
    })
}

async function saveConfig(config: Config): Promise<void> {
    const set = (key: string, value: object) => new Promise((resolve, reject) => {
        jsonStorage.set(key, value, err => {
            if (err) reject(err)
            resolve()
        })
    })
    await set("config", config)
}

export async function initializeConfig(): Promise<Config> {
    const config = await getConfig()
    await saveConfig(config)
    return config
}
