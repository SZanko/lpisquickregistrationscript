# lpisquickregistrationscript

## How to run

Download violentmonkey and copy the script from the dist directory than change the options in the object LvaToRegister


## Limitation

Currently, only works with LVA where it is possible to register through the search option or directly via the group page.
However, the group page registration doesn't support groups with the same name but different instructors

## Development

``` sh
# Compile and watch
$ npm run dev

# Build script
$ npm run build

# Lint
$ npm run lint

# Manuell Test
$ http-server -c5 dist
```
