export interface Task {
  name: string
  exec: (args:string[]) => Promise<unknown>
}