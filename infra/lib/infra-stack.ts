import { RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

export class InfraStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const moviePickerBucket = new Bucket(this, 'MoviePickerWebsiteBucket', {
      publicReadAccess: true,
      autoDeleteObjects: true,
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: 'index.html',
    });

    new BucketDeployment(this, 'MoviePickerDeployment', {
      sources: [Source.asset(`${__dirname}/../../movie-picker/build`)],
      destinationBucket: moviePickerBucket,
    })
  }
}
