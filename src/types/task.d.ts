export interface Task {
  name: string
  requiredFlags?: string[]
  exec: (args:{[index: string]: string}) => Promise<unknown>
}