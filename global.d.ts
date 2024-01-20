interface CurrentPath {
  __filename: string
  __dirname: string
}

declare namespace NodeJS {
  interface Process {
    join: () => string
    currentPath: () => CurrentPath
    glob: () => Promise<any>
    mkDirectory: () => void
  }
  interface ProcessEnv {
    /** 正在使用的数据库 */
    readonly ACTIVE_DATABASE: 'MYSQL' | 'MONGODB'
  }
}
