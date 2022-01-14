# SCLI (Stereo Command Line Interface)

This specialized tool is built entirely in Deno the new runtime for JS. 

### Development

```
deno run --allow-env --allow-run --allow-net --allow-write --allow-read src/index.ts contentful create-env --name testing
```

### Compile

```
deno compile --allow-env --allow-run --allow-net --allow-write --allow-read --output=scli src/index.ts
```

### Testing

```
deno test --allow-all
```
or
```
deno test --allow-env --allow-run --allow-net --allow-write --allow-read
```

This tool is meant to be compiled and run as a binary so all of the documentation is written around using the binary.
I developed this to both follow a strict API and to also allow for flexibility in how the you write the interface.
With this framework you can create simple commands like `scli show-date` or complex parent child commands like `scli contentful create-env --name myenv`.


### Using the CLI Framework

#### Command structure

Commands have a simple API to follow. The base level object requires a name and the exec prop to be set. where name is a string of the command, which can by hyphenated or separated by other punctuation like colons, and the `exec` is a async function callback. 

```
const myCommand:Command = {
  name: 'my-command',
  exec: async (args:Flags) => await myCommandFunc(args)
}
```

The command runner doesn't actually impose any limitations on how the command is written. as long as words are joined with punctuation you can write the command any way you like. `mycommand my-command command:subcommand` etc.


## Commands

You always access the list of commands with the parent contentful command e.g. `$ scli contentful -h` This section helps clarify what those commands do in more detail.

#### create-environment

Creates a new environment clone from master using the management API. It creates a configuration value locally to tell the migrations what environment you plan on testing migrations on. This will automatically update the access tokens with permission to view the new environment.

| Argument | Description |
|:--|:--|
| --name | A lowercase dash concatenate value. This creates a new contentful environment and sets it to active in a local configuration file.  |

Examples:

```
$ scli contentful create-env --name cat-bug 

// creates environment cat-bug, sets local migration target to cat-bug.
```

***

**set-environment**

Manually sets the active environment for migration use. 

**NOTE:** This does not create a new environment in contentful, it only sets the active environment locally for migrations. 

| Argument | Description |
|:--|:--|
| --name | A lowercase dash concatenate value. This will set the active environment locally |

```
$ scli contentful set-env --name jake-the-dog

// manually sets migration target to jake-the-dog
```

***

**show-environment**

Show the current active environment. 

```
$ scli contentful show-environment
```

***

**create-migration**

Creates a new migration stub in your src/migrations directory given a content type name and a migration name. 

| Flag | Value | Description
|:--|:--|:--|
| --content-type | content-type | The name of the content type you want to work on. you can use existing content types here and it will append a new migration to the content types subdirectory in src/migrations/content-type eg cta, midpage-hero, image-text-stack etc. |
| --name | migration-name | The name of the migration you want to create. you should name this as a small description of the work you are doing eg cta-boolean-field-additions or cta-init |

```
$ scli contentful create-migration --content-type bimo --name add-battery-pack

/src/migrations/bimo/${timestamp}_add-battery-pack.js

// creates a new migration called "add-batter-pack" to the new content type "bimo".
```

```
$ scli contentful create-migration -c bimo -m remove-battery-pack

/src/migrations/bimo/${timestamp}_remove-battery-pack.js

// creates a new migration "remove-battery-pack" inside the existing content type "bimo".
```

***

**migration-up**

Runs any pending migrations you've created. This runs the "up" action of all pending migrations. You can also preview the migration before it commits to the contentful environment by passing the `-d` command to the end.

| Flag | Value | Description
|:--|:--|:--|
| -d | NA | Dry-Run the migration. Get a preview of the migration you just wrote. Use this to iterate over changes before making them, confirming that the change are valid. |

```
$ scli contentful migration-up -d

// runs all the pending migrations as a dry-run which will show a preview of the migration you want to run.
```

```
$ scli contentful migration-up

// runs and commits all the pending migrations on the environment you set or created.
```
***

**migration-down**

This runs the "down" action of the migration you wrote. Any down actions should undo whatever the up action implemented. You must specify the content type you want to run the down action on. 

**NOTE**: You can't run destroy-migration on a content type with entries. You must delete the content before you can destroy any fields or content types. Also know that this runs in sequential order, meaning the last migration you ran will attempt the down action of that migration. Once that has run and you run destroy-migration again it will go to the previous migration and so on. 

| Flag | Value | Description
|:--|:--|:--|
| --content-type | content-type | you must specify the content type you wish to run the down command on |

```
$ scli contentful migration-down --content-type bimo

// runs the "down" action on the most recently ran migration for the content type "bimo".
```

