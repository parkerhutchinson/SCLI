import contentfulCommand from "./commands/contentful/index.ts";
import commandRunner from "./utils/command-runner.ts";
import getFlags from "./utils/get-flags.ts";


// this is all you have to write to make this work
// cli contentful
await commandRunner([contentfulCommand], getFlags(Deno.args));
