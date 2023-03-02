import * as cdk from 'aws-cdk-lib';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';

export class JacekDynamoDB extends dynamodb.Table {
  constructor(scope: Construct, id: string) {
    super(scope, id,
      {
        tableName: 'JacekTable',
        partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
        sortKey: { name: 'name', type: dynamodb.AttributeType.STRING },
        removalPolicy: cdk.RemovalPolicy.DESTROY,
      });
  }
}