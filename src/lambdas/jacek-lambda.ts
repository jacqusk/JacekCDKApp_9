import * as path from 'path';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';

export class JacekLambda extends lambda.Function {
  constructor(scope: Construct, id: string, props?: lambda.FunctionOptions) {
    super(scope, id,
      {
        functionName: props?.functionName,
        description: props?.description,
        runtime: lambda.Runtime.NODEJS_14_X,
        handler: 'jacek-lambda.handler',
        environment: props?.environment,
        code: lambda.Code.fromAsset(path.dirname('./functions/jacek-lambda.js')),
      });
  }
}

