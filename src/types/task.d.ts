type flag = {
  name: string
}
export type task = {
  command: string
  flags: flag[],
  exec: (name:string) => Promise<unknown>
}