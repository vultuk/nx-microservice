import {generateFiles, names, offsetFromRoot, Tree} from '@nrwl/devkit';
import * as path from 'path';

export const CopyApplicationFiles = async (
  tree: Tree,
  options: any,
  libraryOptions: any
) => {
  const templateOptions = {
    ...options,
    ...names(libraryOptions.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
    localPort: '3001',
  };
  generateFiles(
    tree,
    path.join(__dirname, 'app'),
    `${options.projectRoot}/src`,
    templateOptions
  );
  await tree.delete(`${options.projectRoot}/src/app`);
  await tree.delete(`${options.projectRoot}/src/assets`);
  await tree.delete(`${options.projectRoot}/src/environments`);
};

export default CopyApplicationFiles;
