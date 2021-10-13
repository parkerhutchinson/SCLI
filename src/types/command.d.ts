export interface Command {
  name: string,
  docs?: string,
  options?: {[option:string]:unknown},
  requiredFlags?: string[]
  exec: (args:Flags) => unknown
}

export interface Flags {
  _: string[],
  $0: string,
  [key: string]:string | string[]
}