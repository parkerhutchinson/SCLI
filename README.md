# SCLI (Stereo Command Line Interface)

This specialized tool is built entirely in Deno the new runtime for JS. 

### Development

```
deno run --allow-env --allow-run --allow-net --allow-write --allow-read src/index.ts contentful create-env --name testing
```

### Compile

```
deno compile --allow-env --allow-run --allow-net --allow-write --allow-read --out=scli src/index.ts
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
