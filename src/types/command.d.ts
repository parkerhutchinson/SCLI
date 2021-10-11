export interface Command {
  name: string,
  docs?: string,
  requiredFlags?: string[]
  exec: (args:Flags) => Promise<unknown>
}

export interface Flags {
  _: string[],
  $0: string,
  [key: string]:string | string[]
}