import { Command } from "./types/command.d.ts";
import contentfulCommand from "./commands/contentful/index.ts";


const COMMANDS:Command[] = [contentfulCommand];

COMMANDS.forEach(
  (command: Command) => 
    Deno.args[0] === command.name && command.exec(Deno.args)
);
