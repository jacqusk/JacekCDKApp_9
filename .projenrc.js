/*
 * ******************************************************************************
 *   Copyright 2023 Ellucian Company L.P. and its affiliates.
 * ******************************************************************************
 */
const { execSync } = require('child_process');
const { version } = require('os');
const { ECDKGeneralTSAppProject } = require('@ellucian/ellucian-projen/lib/projects/typescript/ECDKGeneralTSAppProject');
const { awscdk, build } = require('projen');
const { NodePackageManager } = require('projen/lib/javascript');

//Create a new instance of the Application
const project = new ECDKGeneralTSAppProject({
  author: '',
  cdkVersion: `${execSync('npm show aws-cdk-lib version')}`.trim(),
  defaultReleaseBranch: 'master',
  name: 'JacekCDKApp_9',
  deps: ['@ellucian/ellucian-cdk', '@ellucian/ellucian-projen'],
  majorVersion: 0,
  packageManager: NodePackageManager.NPM,
  name: 'JacekCDKApp_9',
  packageName: 'JacekCDKApp_9',
  scope: 'JacekCDKApp_9',
  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});


//-------------------------------------------------------------------------------
// Project Syth
//-------------------------------------------------------------------------------
project.synth();