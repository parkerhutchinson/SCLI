import { assertEquals } from "https://deno.land/std@0.110.0/testing/asserts.ts";
import commandRunner from "../utils/command-runner.ts";
import getFlags from "../utils/get-flags.ts";
import {Command, Flags} from "../types/command.d.ts";

const testCommand = async (args:Flags) => {
  await 'hello world'
}

const testCommandObj:Command = {
  name: 'test',
  docs: 'hello docs',
  options: {debug: true},
  exec:  async (args:Flags) => await testCommand(args)
}

Deno.test('Command Runner runs', async () => {
  const runner = await commandRunner([testCommandObj], getFlags(['test']));
  assertEquals(runner?.command.name, 'test');
});

Deno.test('Command Runner has --name flag', async () => {
  const runner = await commandRunner([testCommandObj], getFlags(['test', '--name', 'hello world']));
  assertEquals(runner?.args.name, 'hello world');
});


const testCommandObjRequiredFlags:Command = {
  name: 'test',
  requiredFlags: ['name'],
  options: {debug: true},
  exec:  async (args:Flags) => await testCommand(args)
}

Deno.test('Command Runner is missing --name flag', async () => {
  const runner = await commandRunner([testCommandObjRequiredFlags], getFlags(['test']));
  //@ts-ignore: just a test
  const hasFlag = typeof runner?.args[runner.command.requiredFlags[0]] !== 'undefined';
  assertEquals(hasFlag, false);
});


Deno.test('Command runner has docs', async () => {
  const runner = await commandRunner([testCommandObj], getFlags(['test']));
  const hasDocs = typeof runner?.command.docs !== 'undefined';
  assertEquals(hasDocs, true);
})