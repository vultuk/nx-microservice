import {generateFiles, names, offsetFromRoot, Tree} from '@nrwl/devkit';
import * as path from 'path';

export const CopyLibraryFiles = async (tree: Tree, options: any) => {
  console.log(options);
  const templateOptions = {
    ...options,
    ...names(options.name),
    offsetFromRoot: offsetFromRoot(options.projectRoot),
    template: '',
    localPort: '3001',
  };
  await generateFiles(
    tree,
    path.join(__dirname, 'lib'),
    `${options.projectRoot}/data-access/src`,
    templateOptions
  );

  await tree.delete(
    `${options.projectRoot}/data-access/src/lib/${
      names(options.name).fileName
    }-data-access.spec.ts`
  );
  await tree.delete(
    `${options.projectRoot}/data-access/src/lib/${
      names(options.name).fileName
    }-data-access.ts`
  );
};

export default CopyLibraryFiles;
