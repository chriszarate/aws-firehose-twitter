/***
Copyright 2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.

Licensed under the Amazon Software License (the "License").
You may not use this file except in compliance with the License.
A copy of the License is located at

http://aws.amazon.com/asl/

or in the "license" file accompanying this file. This file is distributed
on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
express or implied. See the License for the specific language governing
permissions and limitations under the License.
***/

'use strict';

require('dotenv').config({path: __dirname + '/.env'});

var config = module.exports = {
 firehose : {
  DeliveryStreamName: process.env.FIREHOSE_DELIVERY_STREAM_NAME, /* required */
  S3DestinationConfiguration: {
    BucketARN: 'arn:aws:s3:::' + process.env.S3_BUCKET_NAME, /* required if stream not exists */
    RoleARN: 'arn:aws:iam::' + process.env.AWS_ACCOUNT_ID + ':role/' + process.env.FIREHOSE_ROLE, /* required if stream not exists */
    BufferingHints: {
      IntervalInSeconds: 300,
      SizeInMBs: 5
    },
    CompressionFormat: 'UNCOMPRESSED', /* 'UNCOMPRESSED | GZIP | ZIP | Snappy' */
    EncryptionConfiguration: {
      NoEncryptionConfig: 'NoEncryption'
    },
    Prefix: process.env.S3_BUCKET_PATH  /* if stream not exists. example: twitter/raw-data/  */
  }
  },
  twitter: {
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      access_token: process.env.TWITTER_ACCESS_TOKEN,
      access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
 },
 filter: {
   follow: process.env.TWITTER_STREAMING_API_FOLLOW
 },
 waitBetweenDescribeCallsInSeconds: 2,
 recordsToWritePerBatch: 100,
 waitBetweenPutRecordsCallsInMilliseconds: 50,
 region: process.env.FIREHOSE_REGION
};
