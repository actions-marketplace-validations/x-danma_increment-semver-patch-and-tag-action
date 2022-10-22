# Hello world javascript action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `who-to-greet`

**Required** The name of the person to greet. Default `"World"`.

### `GITHUB_TOKEN`

**Required** Github Token for tag lookup and creation. No Default.

### `repositoryName`

**Required** Repository Name for tag lookup and creation. No Default.

## Outputs

### `time`

The time we greeted you.

## Example usage

```yaml
uses: actions/hello-world-javascript-action@v1.1
with:
  who-to-greet: 'Mona the Octocat'
```

## development

Don't forget to run `ncc build index.ts --license licenses.txt`