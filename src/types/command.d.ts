export interface Command {
  name: string
  exec: (args:string[]) => Promise<unknown>
}