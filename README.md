# SCLI (Stereo Command Line Interface)

This specialized tool is built entirely in Deno the new runtime for JS. 

### Run

```
deno run --allow-env --allow-run --allow-net --allow-write src/index.ts contentful create-env --name testing
```

### Compile

```
deno compile --allow-env --allow-run --allow-net --allow-write --out=scli src/index.ts
```


I developed this to both follow a strict API and to also allow for flexibility in how the you write the interface.
With this framework you can create simple commands like `scli show-date` or complex parent child commands like `scli contentful create-env --name myenv`.


### Using the CLI Framework

#### Command structure


### TODO

Right now there isn't very good validation messages of the commands and tasks to make sure those flags,commands, or tasks exist and to provide helpful feedback to the user in the case they dont. Additionally there's no documentation if you type `-h` or `--help`. This is something I'll write later as part of the Task and Command types evolved. 