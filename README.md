# SCLI (Stereo Command Line Interface)

This specialized tool is built entirely in Deno the new runtime for JS. 

### Run

```
deno run --allow-env --allow-run --allow-net src/index.ts contentful create-env --name testing
```

### Compile

```
deno compile --allow-env --allow-run --allow-net --out=scli src/index.ts
```


I developed this to both follow a strict API and to also allow for flexibility in how the you write the interface.
With this framework you can create simple commands like `scli show-date` or complex parent child commands like `scli contentful create-env --name myenv`.


### TODO

Right now there isn't very good validation of the commands and tasks to make sure those flag,commands,tasks exist and to provide helpf feedback to user in the case they dont. Additionally there is no documentation if you type `-h` or `--help`. This is something I'll write later as part of the Task and Command types evolved. 