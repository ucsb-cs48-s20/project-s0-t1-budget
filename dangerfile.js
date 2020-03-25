schedule(async () => {
  const packageDiff = await danger.git.JSONDiffForFile("package.json");
  const dependenciesDiff = packageDiff.dependencies;

  if (dependenciesDiff) {
    const addedDependencies = dependenciesDiff.added;

    if (addedDependencies.length > 0) {
      let msg = `This PR add or changes ${addedDependencies.length} dependencies:`;

      for (const dep of addedDependencies) {
        msg += `\n* \`${dep}\`: \`${dependenciesDiff.after[dep]}\``;
      }

      message(msg);
    }
  }
});
