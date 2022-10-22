import *  as Core from '@actions/core';
import * as Github from '@actions/github';
import { Octokit } from "@octokit/rest";

try {
  // `who-to-greet` input defined in action metadata file
  console.log(`Hello start of action!`);
  const nameToGreet = Core.getInput('who-to-greet');
  const githubToken = Core.getInput('GITHUB_TOKEN');
  const repositoryName = Core.getInput('repositoryName');
  const sha = Core.getInput('sha');
  console.log(`Hello ${nameToGreet}!`);
  console.log(`repositoryName ${repositoryName}!`);

  // Octokit.js
  // https://github.com/octokit/core.js#readme
  const octokit = new Octokit({
    auth: githubToken
  });

  const tokens = await octokit.rest.repos.listTags({
    owner: 'x-danma',
    repo: repositoryName
  })
  console.log("tokens:" ,tokens);

  const firstTag = tokens.data[0].name.split('.');
  console.log("firstTag:" ,firstTag);

  const major = firstTag[0];
  const minor = firstTag[1];
  const feature = firstTag[2];

  const newFeatureVersion = String(Number(feature) + 1)

  const newTag = [major, minor, newFeatureVersion].join('.')

  console.log('newTag:', newTag);

  const time = (new Date()).toTimeString();
  Core.setOutput("time", time);

  // https://docs.github.com/en/rest/git/refs#create-a-reference

  const createTagResponse = await octokit.request('POST /repos/{owner}/{repo}/git/refs', {
    owner: 'x-danma',
    repo: repositoryName,
    ref: `refs/tags/${newTag}`,
    sha
  })

  console.log('new Tag was created, response:', createTagResponse);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(Github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  Core.setFailed(error.message);
}