const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);

  const ref = core.getInput('ref') 
  const tagName = core.getInput('tag-name')
  const tag = core.getInput("tag")
  
  console.log(`Ref : ${ref}!`);
  console.log(`tagName : ${tagName}!`);
  console.log(`tag : ${tag}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}