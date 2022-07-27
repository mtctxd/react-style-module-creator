# RSMC

<details>
  <summary>?</summary>
  
react-style-module-creator
  
</details>

Simple script for making components for react with style modules.
There is probably some already made tools like this. But i wanted to make my own one.

## Instalation

```
 npm install -g rsmc
```

## Usage

```
npx rsmc <options> <compnent name / componen path>
```

## Options

- For styles `-scss`, `-less`, `-css`
- For js `-ts`, `-tsx`, `-js`, `-jsx`

However, it will make `.*sx` by default.
Also it will ask you if file already exist and if you want to change it.

## Examples

This command will make HelloWorld.tsx and HelloWorld.module.scss under `./src/components/HelloWorld` path

```
npx rsmc -ts -scss HelloWorld
```

This command will make RegularComponent.tsx and RegularComponent.module.scss under `./scr/components/Main/RegularComponent` path

```
npx rsmc ./scr/components/Main/RegularComponent
```

## Development

<details>
  <summary>?</summary>
  
Ugly code. Dont watch.
  
</details>

```
npm install
```

There are some scripts with for development with predefined args.

# Todo

- [ ] Better error handling
- [ ] maybe I should use some package for cli args
- [ ] Ugle code
- [ ] It will make components if thay already exist but with other extension.
- [ ] tests
- [ ] linter
- [ ] path.isAbsolute(process.argv.slice(2)[0])
- [ ] should throw error if absolute
- [ ] more info about stdin (file name)
- [ ] if dont have argument programm should throw
