import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class JacekRestAPI extends apigateway.RestApi {
  constructor(scope: Construct, id: string) {
    super(scope, id,
      {
        restApiName: 'JacekAPI',
        description: "This service serves as an API for the Jacek's app."
      });
  }
}
