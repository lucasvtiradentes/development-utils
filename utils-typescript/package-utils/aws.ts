'use strict';

// https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html
import aws from 'aws-sdk'
import { readFileSync, createWriteStream } from 'node:fs'

export {
  setAwsCredentialsFromObject,
  setAwsCredentialsFromEnvFile,
  setAwsCredentialsFromJsonFile,

  getAwsS3InstanceFromObject,
  getAwsS3DefaultInstance,
  setAwsRegion,

  checkIfUserIsAuthenticated,

  createBucket,
  deleteBucket,
  listBuckets,

  checkFileExistance,
  uploadFile,
  downloadFile,
  createFile,
  deleteFile,
  getFileContent,
  replaceFileContent,
  appendTextToFile,

  checkFolderExistance,
  createFolder,
  deleteFolder
}

// DEFINE FUNCTIONS ####################################################################################################

function setAwsCredentialsFromObject(AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY) {

  aws.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
  });

}

function setAwsCredentialsFromEnvFile(keyId: any, keyAccess: any, AwsRegion: any) {

  if (!keyId || !keyAccess || !AwsRegion) { return false }

  aws.config.update({
    accessKeyId: keyId,
    secretAccessKey: keyAccess,
  });

  setAwsRegion(AwsRegion)
  return true;
}

function setAwsCredentialsFromJsonFile(filePath) {

  // MOD_aws.setAwsCredentialsFromJsonFile('./credentials.json');

  if (!filePath) { return }

  const file_content = readFileSync(filePath);
  const json_parsed = JSON.parse(file_content);

  if (!json_parsed['accessKeyId']) { return false }
  if (!json_parsed['secretAccessKey']) { return false }
  if (!json_parsed['region']) { return false }

  aws.config.loadFromPath(filePath);
  setAwsRegion(json_parsed['region'])
  return true;

}




// #####################################################################################################################

async function getAwsS3InstanceFromObject(accessKeyId, secretAccessKey, region) {

  const s3 = await new aws.S3({
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey,
    region: region
  }).promise();

  return s3;

}

function getAwsS3DefaultInstance() {
  const s3 = new aws.S3({ apiVersion: '2006-03-01' });
  return s3;
}

function setAwsRegion(region) {
  aws.config.update({ region: region });
}




// #####################################################################################################################

async function checkIfUserIsAuthenticated() {

  aws.config.getCredentials(async function (err) {
    if (err) {
      return false;
    } else {
      console.log("Usuário está autenticado! ", aws.config.credentials.accessKeyId);
      return true;
    }
  });

}




// #####################################################################################################################

async function createBucket(s3, bucket_name) {

  const bucketParams = {
    Bucket: bucket_name,
    ACL: 'public-read'
  };

  await s3.createBucket(bucketParams, async function (err, data) {
    if (err) {
      // console.log("Error", err);
      return false;
    } else {
      console.log("Success", data.Location);
      return true;
    }
  }).promise();

}

async function deleteBucket(s3, bucket_name) {

  const bucketParams = {
    Bucket: bucket_name
  };

  await s3.deleteBucket(bucketParams, async function (err, data) {
    if (err) {
      //  console.log("Error", err);
      return false;
    } else {
      //  console.log("Success", data);
      return true;
    }
  }).promise();
}

async function listBuckets(s3) {

  await s3.listBuckets(function (err, data) {
    if (err) {
      // console.log("Error", err);
      return false;
    } else {
      console.log("Success", data.Buckets);
      return true;
    }
  }).promise();
}




// #####################################################################################################################

async function checkFileExistance(s3, bucket, file) {

  const params = {
    Bucket: bucket,
    Key: file
  };

  try {
    await s3.headObject(params).promise()
    return true;
  } catch (e) {
    return false;
  }
}

async function uploadFile(s3, bucket_name, filePath, fileName) {

  const fileContent = readFileSync(filePath);

  const params = {
    Bucket: bucket_name,
    Key: fileName,
    Body: fileContent,
    ACL: 'public-read',
    // ContentEncoding: 'base64',
    // ContentType: 'image/jpeg'
  };

  await s3.upload(params, async function (err, data) {
    if (err) {
      // console.log('erro');
      // console.log(err);
      return false;
    } else {
      console.log(`Arquivo enviado com sucesso! ${data.Location}`);
      return true;
    }
  }).promise();

};

async function downloadFile(s3, bucket, file, localPathToSave) {

  const params = {
    Bucket: bucket,
    Key: file,
  };

  const fileExist = await checkFileExistance(s3, bucket, file);
  if (!fileExist) { return false }

  const savedFile = createWriteStream(`${localPathToSave}/${file}`);
  s3.getObject(params).createReadStream().pipe(savedFile);

}

async function createFile(s3, bucket, file, content) {

  const params = {
    Bucket: bucket,
    Key: file,
    Body: content,
  };

  const fileExist = await checkFileExistance(s3, bucket, file);

  if (fileExist) { return false }

  return await s3.putObject(params, async function (err, data) {

    if (err) {
      return false;
    } else {
      // console.log('Arquivo criado com sucesso');
      return true;
    }
  }).promise();

}

async function deleteFile(s3, bucket, file) {

  const params = {
    Bucket: bucket,
    Key: file
  };

  const fileExist = await checkFileExistance(s3, bucket, file);

  if (!fileExist) { return false }

  return await s3.deleteObject(params, function (err, data) {

    if (err) {
      return false;
    } else {
      // console.log('Arquivo apagado com sucesso!');
      return true;
    }

  }).promise();

}

async function getFileContent(s3, bucket, file) {

  const params = {
    Bucket: bucket,
    Key: file,
  };

  const fileExist = await checkFileExistance(s3, bucket, file);

  if (!fileExist) { return false }

  const file_content = await s3.getObject(params, async function (err, data) {

    if (err) {
      return false;
    } else {
      return data;
    }

  }).promise();

  return file_content.Body.toString();
}

async function replaceFileContent(s3, bucket, file, fileContent) {

  const fileDeleted = await deleteFile(s3, bucket, file);
  const fileCreated = await createFile(s3, bucket, file, fileContent);

  if (fileDeleted && fileCreated) {
    return true;
  } else if (!fileDeleted && fileCreated) {
    return true;
  } else {
    return false;
  }
}

async function appendTextToFile(s3, bucket, file, contentToAdd) {

  const fileContent = await getFileContent(s3, bucket, file);
  const newContent = fileContent + '\n' + contentToAdd;

  const response = await replaceFileContent(s3, bucket, file, newContent);
  return response;
}

// #####################################################################################################################

async function checkFolderExistance(s3, bucket, folder) {

  const params = {
    Bucket: bucket,
    Key: folder + "/"
  };

  try {
    await s3.headObject(params).promise()
    return true;
  } catch (e) {
    return false;
  }
}

async function createFolder(s3, bucket, foldername) {

  const params = {
    Bucket: bucket,
    Key: foldername + "/",
    Body: "",
  };

  const folderExist = await checkFolderExistance(s3, bucket, foldername);

  if (!folderExist) { return false }

  await s3.putObject(params, function (err, data) {

    if (err) {
      return false;
    } else {
      // console.log('Pasta criada com sucesso!');
      return true;
    }
  }).promise();

}

async function deleteFolder(s3, bucket, foldername) {

  const params = {
    Bucket: bucket,
    Key: foldername + "/",
  };

  const folderExist = await checkFolderExistance(s3, bucket, foldername);

  if (!folderExist) { return false }

  await s3.deleteObject(params, function (err, data) {

    if (err) {
      return false;
    } else {
      // console.log('Pasta apagada com sucesso!');
      return true;
    }

  }).promise();
}

// #####################################################################################################################
