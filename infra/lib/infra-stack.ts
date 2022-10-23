import { CfnOutput, Duration, RemovalPolicy, Stack, StackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { FunctionUrlAuthType, Runtime } from 'aws-cdk-lib/aws-lambda';
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
      sources: [Source.asset(`${__dirname}/../../movie-picker-ui/build`)],
      destinationBucket: moviePickerBucket,
    });

    const movieListHandlerFunction = new NodejsFunction(this, 'MoviePicker-MovieListHandler', {
      runtime: Runtime.NODEJS_16_X,
      entry: `${__dirname}/movie-picker/movie-list.handler.ts`,
      timeout: Duration.seconds(5),
    });

    const movieListHandlerUrl = movieListHandlerFunction.addFunctionUrl({ authType: FunctionUrlAuthType.NONE });

    const movieHandlerFunction = new NodejsFunction(this, 'MoviePicker-MovieHandler', {
      runtime: Runtime.NODEJS_16_X,
      entry: `${__dirname}/movie-picker/movie.handler.ts`,
      timeout: Duration.seconds(5),
    });

    const movieHandlerUrl = movieHandlerFunction.addFunctionUrl({ authType: FunctionUrlAuthType.NONE });

    const moviePickerTable = new Table(this, 'MoviePickerTable', {
      tableName: 'MoviePickerTable',
      // DynamoDB has forever free provisioned 25 WCU and 25 RCU
      // https://aws.amazon.com/free
      billingMode: BillingMode.PROVISIONED,
      readCapacity: 5,
      writeCapacity: 5,
      partitionKey: { name: 'pk', type: AttributeType.STRING },
      sortKey: { name: 'sk', type: AttributeType.STRING },
    });

    moviePickerTable.grantReadWriteData(movieHandlerFunction);
    moviePickerTable.grantReadWriteData(movieListHandlerFunction);

    new CfnOutput(this, 'MoviePicker-MovieListHandlerUrl', {
      value: movieListHandlerUrl.url,
      exportName: 'MovieListHandlerUrl',
    });
    new CfnOutput(this, 'MoviePicker-MovieHandlerUrl', {
      value: movieHandlerUrl.url,
      exportName: 'MovieHandlerUrl',
    });
    new CfnOutput(this, 'MoviePicker-WebsiteUrl', {
      value: moviePickerBucket.bucketWebsiteUrl,
      exportName: 'WebsiteUrl',
    });
  }
}
