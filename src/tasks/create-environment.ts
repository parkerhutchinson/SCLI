import type {task as TTask} from "../types/task.d.ts";
import {manageContentfulData} from "../lib/contentful-data.ts";


const createEnvironment = async (name:string) => {
  const {status: environmentStatus, data: environmentData} = await manageContentfulData('environments', false);
  return environmentData;
}

const task:TTask = {
  command: 'create-env',
  flags: [{name: '--name'}],
  exec: async (name:string) => await createEnvironment(name)
}

export default task;