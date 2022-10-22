# Hello world javascript action

This action prints "Hello World" or "Hello" + the name of a person to greet to the log.

## Inputs

### `GITHUB_TOKEN`

**Required** Github Token for authentication.

### `repositoryName`

**Required** Repository Name for tag lookup.

### `repositoryOwner`

**Required** Repository Owner for tag lookup.

### `sha`

**Required** sha id for tag creation.

## Outputs

### `newTag`

The new Tag we created for you.

## Example usage

```yaml
uses: actions/hello-world-javascript-action@v1.1
with:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  repositoryName: ${{ github.event.repository.name }}
  sha: ${{ github.sha }}
  repositoryOwner: ${{ github.repository_owner }}
```

## development

Don't forget to run `ncc build index.ts --license licenses.txt` before update