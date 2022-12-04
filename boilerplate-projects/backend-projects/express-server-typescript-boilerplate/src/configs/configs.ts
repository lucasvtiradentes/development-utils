import { join, basename, dirname } from 'path'
import APP_CONFIGS from './app-configs.json'

import dotenv from 'dotenv'
dotenv.config()

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development"

const _dist_folder = APP_CONFIGS['project_configs'].dist_folder?.replace("./", "")
const _running_folder = basename(dirname(__dirname)) === _dist_folder ? "production" : "development"
const _frontend_index = _running_folder === "production" ? '../../../dropspy/build' : '../../dropspy/build'
const DROPSPY_FOLDER = join(__dirname, _frontend_index)

const VERSION = process.env.npm_package_version || "#"
const SERVER_PORT = (process.env.PORT || APP_CONFIGS['server_configs'].default_port)?.toString().trim()
const SERVER_DEV_PORT = APP_CONFIGS['server_configs'].development_port?.toString().trim()
const SERVER_BASE = NODE_ENV === "production" ? process.env.BASE_URL?.toString().trim() : `http://localhost:${SERVER_DEV_PORT}`

export {
  APP_CONFIGS,
  NODE_ENV,
  DROPSPY_FOLDER,
  VERSION,
  SERVER_PORT,
  SERVER_BASE,
}
