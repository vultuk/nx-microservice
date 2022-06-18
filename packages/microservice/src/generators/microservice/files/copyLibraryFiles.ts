import { generateFiles, names, offsetFromRoot, Tree } from '@nrwl/devkit';
import * as path from 'path';

export const CopyLibraryFiles = async (tree: Tree, options: any) => {
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
    `${options.projectRoot}/data-access/get-all-${
      names(options.name).fileName
    }/src`,
    templateOptions
  );

  console.log(
    `${options.projectRoot}/data-access/get-all-${
      names(options.name).fileName
    }/src/lib/${names(options.name).fileName}-data-access-get-all-${
      names(options.name).fileName
    }.spec.ts`
  );

  await tree.delete(
    `${options.projectRoot}/data-access/get-all-${
      names(options.name).fileName
    }/src/lib/${names(options.name).fileName}-data-access-get-all-${
      names(options.name).fileName
    }.spec.ts`
  );
  await tree.delete(
    `${options.projectRoot}/data-access/get-all-${
      names(options.name).fileName
    }/src/lib/${names(options.name).fileName}-data-access-get-all-${
      names(options.name).fileName
    }.ts`
  );
};

export default CopyLibraryFiles;
