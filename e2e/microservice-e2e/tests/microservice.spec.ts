import {ensureNxProject, runNxCommandAsync, uniq} from '@nrwl/nx-plugin/testing';

describe('microservice e2e', () => {
  // Setting up individual workspaces per
  // test can cause e2e runs to take a long time.
  // For this reason, we recommend each suite only
  // consumes 1 workspace. The tests should each operate
  // on a unique project in the workspace, such that they
  // are not dependant on one another.
  beforeAll(() => {
    ensureNxProject('@vultuk/microservice', 'dist/packages/microservice');
  });

  afterAll(() => {
    // `nx reset` kills the daemon, and performs
    // some work which can help clean up e2e leftovers
    runNxCommandAsync('reset');
  });

  it('should create microservice', async () => {
    const project = uniq('microservice');
    const result = await runNxCommandAsync(
      `generate @vultuk/microservice:app ${project}`
    );
    console.log({ result });
    expect(result.stdout).toContain('Done in');
  }, 120000);
});
