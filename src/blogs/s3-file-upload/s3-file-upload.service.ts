import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3FileUploadService {
  constructor(private config: ConfigService) {
    AWS.config.update({
      region: config.get('REGION'),
      credentials: new AWS.Credentials({
        accessKeyId: config.get('ACCESS_KEY'),
        secretAccessKey: config.get('SECRETE_ACCESS_KEY'),
      }),
    });
  }

  async uploadFile(file: any) {
    const { originalname } = file;
    const bucketName = this.config.get('AWS_S3_BUCKET');
    return await this.s3_upload(
      file.buffer,
      bucketName,
      originalname,
      file.mimetype,
    );
  }

  private async s3_upload(file: any, bucket: any, name: any, mimetype: any) {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ACL: 'public-read',
      resize: {
        Height: 250,
      },
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-south-1',
      },
    };

    try {
      let s3Response = await new AWS.S3().upload(params).promise();
      return {
        image: s3Response.Location,
      };
    } catch (e) {
      console.log(e);
    }
  }
}
