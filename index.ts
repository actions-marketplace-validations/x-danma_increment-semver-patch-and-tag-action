import *  as Core from '@actions/core';
import { Octokit } from "@octokit/rest";

try {
  console.log(`Hello! Lets begin autobumping tags :)`);
  const githubToken = Core.getInput('GITHUB_TOKEN');
  const repositoryName = Core.getInput('repositoryName');
  const repositoryOwner = Core.getInput('repositoryOwner');
  const sha = Core.getInput('sha');

  // Octokit.js
  // https://github.com/octokit/core.js#readme
  const octokit = new Octokit({
    auth: githubToken
  });

  const tokens = await octokit.rest.repos.listTags({
    owner: repositoryOwner,
    repo: repositoryName
  })
  console.log("tokens:", tokens);

  const firstTag = tokens.data[0].name.split('.');
  console.log("firstTag:", firstTag);

  const major = firstTag[0];
  const minor = firstTag[1];
  const feature = firstTag[2];

  const newFeatureVersion = String(Number(feature) + 1)

  const newTag = [major, minor, newFeatureVersion].join('.')

  console.log('newTag:', newTag);

  Core.setOutput("newTag", newTag);

  // https://docs.github.com/en/rest/git/refs#create-a-reference
  const createTagResponse = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
    owner: repositoryOwner,
    repo: repositoryName,
    ref: `refs/tags/${newTag}`,
    sha
  })

  console.log('new Tag was created, response:', createTagResponse);

} catch (error) {
  Core.setFailed(error.message);
}