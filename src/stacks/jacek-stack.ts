import * as path from 'path';
import { EStack, EStackProps } from '@ellucian/ellucian-cdk/lib/stacks';
import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

import { JacekRestAPI } from '../api/jacek-api';
import { JacekDynamoDB } from '../dynamodb/jacek-dynamodb';
import { JacekLambda } from '../lambdas/jacek-lambda';
//import { EBucket } from '@ellucian/ellucian-cdk/lib/constructs/EllucianBucket'

//This is a sample stack moved to a seperate subfolder and file. The key here is to implement
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

    // Create dynamodb table 'JacekTable'
    const jacekTable = new JacekDynamoDB(this, 'JacekTable');

    // Create lambda function 'JacekLambda' to process dynamodb table
    const jacekLambda = new JacekLambda(this, 'JacekLambda', {
      functionName: 'Jacek-Lambda',
      // eslint-disable-next-line quotes
      description: `Jacek's sample lambda to handle dynamoDB updates`,
      environment: { DYNAMODB_TABLE_NAME: jacekTable.tableName },
    });

    // Grant lambda function read/write access to the table
    jacekTable.grantReadWriteData(jacekLambda);

    // Create the API gateway
    const jacekApi = new JacekRestAPI(this, 'JacekAPI');

    // Create lambda function 'JacekAuthorizerLambda'
    const jacekAuthZFunction = new lambda.Function(this, 'JacekAuthorizerLambda', {
      functionName: 'JacekAuthorizerLambda',
      description: 'Jacek\'s sample lambda authorizer to access API',
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'jacek-authorizer-lambda.handler',
      code: lambda.Code.fromAsset(path.dirname('./functions/jacek-authorizer-lambda.js')),
    });

    // Add token authorizer 'JacekTokenAuthorizer' using authorizer function 'JacekAuthorizerLambda'
    const jacekTokenAuthorizer = new apigateway.TokenAuthorizer(this, 'JacekTokenAuthorizer', {
      authorizerName: 'JacekTokenAuthorizer',
      handler: jacekAuthZFunction,
      resultsCacheTtl: cdk.Duration.seconds(0),
      identitySource: apigateway.IdentitySource.header('authorizationToken')
    });

    // Add the API Gateway lambda integration and method
    jacekApi.root.addMethod('ANY', new apigateway.LambdaIntegration(jacekLambda)
      , { authorizer: jacekTokenAuthorizer },
    );

    // Add the API url output
    new cdk.CfnOutput(this, 'HTTP API URL', {
      value: jacekApi.url ?? 'Something went wrong with the deployment',
    });

  }
}
