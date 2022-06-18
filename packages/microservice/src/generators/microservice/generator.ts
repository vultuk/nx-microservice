import { names, Tree, updateJson } from '@nrwl/devkit';
import { applicationGenerator as expressApplication } from '@nrwl/express';
import { libraryGenerator as jsLibrary } from '@nrwl/js';
import { Linter } from '@nrwl/linter';

import { CopyApplicationFiles, CopyLibraryFiles } from './files';
import NormalizeSchema from './normalizeSchema';

export default async function (tree: Tree, schema: any) {
  const apiName = `api-${schema.name}`;

  const applicationOptions = NormalizeSchema(tree, {
    ...schema,
    name: apiName,
  });
  const libraryOptions = NormalizeSchema(tree, schema, true);

  // Create the microservice application
  await expressApplication(tree, {
    name: apiName,
    skipFormat: false,
    skipPackageJson: false,
    unitTestRunner: 'jest',
    linter: Linter.EsLint,
    js: false,
    pascalCaseFiles: false,
    tags: 'microservice',
  });

  // Create a suplemental library
  await jsLibrary(tree, {
    name: `get-all-${names(schema.name).fileName}`,
    directory: `${schema.name}/data-access`,
  });

  // Copy the default files for the application
  await CopyApplicationFiles(tree, applicationOptions, libraryOptions);

  // Copy the default files for the library
  await CopyLibraryFiles(tree, libraryOptions);

  await updateJson(
    tree,
    `apps/${apiName}/project.json`,
    (pkgJson: any): any => {
      // Remove express un-needed configurations from the build script
      delete pkgJson.targets.build.options.assets;
      delete pkgJson.targets.build.configurations.production.fileReplacements;

      return pkgJson;
    }
  );
}
