function messageDependencyChanges(packageDiff) {
  const dependenciesDiff = packageDiff.dependencies;

  if (dependenciesDiff) {
    const addedDependencies = dependenciesDiff.added;

    if (addedDependencies.length > 0) {
      let msg = `This PR adds ${addedDependencies.length} dependencies:`;

      for (const dep of addedDependencies) {
        msg += `\n* \`${dep}\`: \`${dependenciesDiff.after[dep]}\``;
      }

      message(msg);
    }
  }
}

function messageDevDependencyChanges(packageDiff) {
  const dependenciesDiff = packageDiff.devDependencies;

  if (dependenciesDiff) {
    const addedDependencies = dependenciesDiff.added;

    if (addedDependencies.length > 0) {
      let msg = `This PR adds ${addedDependencies.length} dev dependencies:`;

      for (const dep of addedDependencies) {
        msg += `\n* \`${dep}\`: \`${dependenciesDiff.after[dep]}\``;
      }

      message(msg);
    }
  }
}

schedule(async () => {
  const packageDiff = await danger.git.JSONDiffForFile("package.json");

  messageDependencyChanges(packageDiff);
  messageDevDependencyChanges(packageDiff);
});
