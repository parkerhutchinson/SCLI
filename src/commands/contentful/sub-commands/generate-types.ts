import { Command, Flags } from "../../../types/command.d.ts";
import { readEnvFile } from "../../../lib/env-io.ts";
import run from "../../../utils/run.ts";
import log from "../../../utils/log.ts";



const generateTypes = async (_args:Flags) => {
  const spaceId: string | undefined = Deno.env.get("CONTENTFUL_SPACE_ID");
  const manageToken: string | undefined = Deno.env.get(
    "CONTENTFUL_MANAGEMENT_ACCESS_TOKEN"
  );
  const envId: string | undefined = await readEnvFile();
  
  log(`Generating contentful interfaces from environment: ${envId}`, "cyan");

  await run([
    "npx",
    "cf-content-types-generator",
    `--token=${manageToken}`,
    `--spaceId=${spaceId}`,
    `--environment=${envId}`,
    '--out=src/types/generated'
  ]);
}

const generateTypesCommand: Command = {
  name: "generate-types",
  docs: `\n 
    This generates contentful type interfaces from your content type schema.  
    Another tool that uses a node module to run cf-content-type-generator. 
  \n`,
  exec: async (args: Flags) => await generateTypes(args),
};

export default generateTypesCommand;