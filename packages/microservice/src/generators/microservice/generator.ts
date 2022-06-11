import {Tree} from '@nrwl/devkit';
import {applicationGenerator as expressApplication} from '@nrwl/express';
import {libraryGenerator as jsLibrary} from '@nrwl/js';
import {Linter} from '@nrwl/linter';

import {CopyApplicationFiles, CopyLibraryFiles} from './files';
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
  await jsLibrary(tree, { name: 'data-access', directory: schema.name });

  // Copy the default files for the application
  CopyApplicationFiles(tree, applicationOptions, libraryOptions);

  // Copy the default files for the library
  CopyLibraryFiles(tree, libraryOptions);
}
