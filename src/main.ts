/*
 * ******************************************************************************
 *   Copyright 2023 Ellucian Company L.P. and its affiliates.
 * ******************************************************************************
 */

//-------------------------------------------------------------------------------
// JacekCDKApp_9 sample main.ts file for quick starting the project
//-------------------------------------------------------------------------------
import { EApp } from '@ellucian/ellucian-cdk/lib/apps';
import { GeneralStack } from './stacks/jacek-stack';

//-------------------------------------------------------------------------------
// The one and only EApp
//-------------------------------------------------------------------------------
const app = new EApp({
  outdir: 'cdk.out',
});

//-------------------------------------------------------------------------------
// Create a new instance of the Satck
//-------------------------------------------------------------------------------
//
//Create an instance of the General Stack
new GeneralStack(app, 'JacekStack', {
  env: {},
  costCenter: '',
  environmentName: 'dev',
  groupName: '',
  pointOfContact: '',
});
