export interface Command {
  name: string,
  requiredFlags?: string[]
  exec: (args:string[]) => Promise<unknown>
}