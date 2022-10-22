const {core} = require('@actions/core');
const {github} = require('@actions/github');
const {Octokit} = require("@octokit/rest");

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  const githubToken = core.getInput('GITHUB_TOKEN');
  const repoName = core.getInput('repoName');
  console.log(`Hello ${nameToGreet}!`);

  // Octokit.js
  // https://github.com/octokit/core.js#readme
  // const octokit = new Octokit({
  //   auth: githubToken
  // });

  // const tokens = Promise.resolve(octokit.request('GET /repos/{owner}/{repo}/tags', {
  //   owner: 'OWNER',
  //   repo: 'REPO'
  // }))
  
  // console.log(tokens);

  const time = (new Date()).toTimeString();
  core.setOutput("time", time);

  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}