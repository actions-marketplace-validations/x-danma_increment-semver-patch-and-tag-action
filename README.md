# Increment SemVer Patch Version and Tag

This action will increment the patch version from your previous tags and create a tag ref to your commit.

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
uses: actions/increment-semver-patch-and-tag-action@1.2.0
with:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
  repositoryName: ${{ github.event.repository.name }}
  repositoryOwner: ${{ github.repository_owner }}
  sha: ${{ github.sha }}
```