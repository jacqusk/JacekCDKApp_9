/*
 * ******************************************************************************
 *   Copyright 2023 Ellucian Company L.P. and its affiliates.
 * ******************************************************************************
 */

//-------------------------------------------------------------------------------
// JacekCDKApp_9 sample main.ts file for quick starting the project
//-------------------------------------------------------------------------------
import { EApp } from '@ellucian/ellucian-cdk/lib/apps';
import { EStack, EStackProps } from '@ellucian/ellucian-cdk/lib/stacks';
import { Construct } from 'constructs';
//import { EBucket } from '@ellucian/ellucian-cdk/lib/constructs/EllucianBucket'

//This is a sample stack and you should move to a seperate file. The key here is to implement
//an EStack.
//-------------------------------------------------------------------------------
// Stack Type Definition
//-------------------------------------------------------------------------------
export class GeneralStack extends EStack {
  constructor(scope: Construct, id: string, developerSuppliedProps: EStackProps) {
    const hardCodedProps: EStackProps = {
      environmentName: developerSuppliedProps.environmentName || 'dev',
      groupName: developerSuppliedProps.groupName || '',
      pointOfContact: developerSuppliedProps.pointOfContact || '',
      costCenter: developerSuppliedProps.costCenter || '',
    };
    const mergedProps = { ...developerSuppliedProps, ...hardCodedProps };
    super(scope, id, mergedProps);

    //Add new resources here...
    //const ebucket = new EBucket(this, 'JacekCDKApp_9Bucket-' + mergedProps.environmentName, {});
    //ebucket.setDestroyRemovalPolicy();

  }
}

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
new GeneralStack(app, 'JacekCDKApp_9GeneralStack', {
  env: {},
  costCenter: '',
  environmentName: 'dev',
  groupName: '',
  pointOfContact: '',
});
