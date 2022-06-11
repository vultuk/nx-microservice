import {getWorkspaceLayout, names, Tree} from '@nrwl/devkit';

export const NormalizeSchema = (
  tree: Tree,
  options: any,
  library = false
): any => {
  const name = names(options.name).fileName;
  const projectDirectory = options.directory
    ? `${names(options.directory).fileName}/${name}`
    : name;
  const projectName = projectDirectory.replace(new RegExp('/', 'g'), '-');
  const projectRoot = `${
    getWorkspaceLayout(tree)[library ? 'libsDir' : 'appsDir']
  }/${projectDirectory}`;
  const parsedTags = options.tags
    ? options.tags.split(',').map((s) => s.trim())
    : [];

  return {
    ...options,
    projectName,
    projectRoot,
    projectDirectory,
    parsedTags,
    scope: getWorkspaceLayout(tree).npmScope,
  };
};

export default NormalizeSchema;
