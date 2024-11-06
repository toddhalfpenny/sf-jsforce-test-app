import * as jsforce from 'jsforce'
require('dotenv').config();
let conn: jsforce.Connection;

const run = async () => {
  console.log(process.env.INSTANCE_URL)
  conn = new jsforce.Connection({
    instanceUrl : process.env.INSTANCE_URL,
    accessToken : process.env.ACCESS_TOKEN,
    version: process.env.API_VERSION
  });

  const srID = await checkForSR();
  await patchSR(srID);
}

const checkForSR = async (): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    console.log('checkForSR');
    try {
      const res = await conn.tooling.sobject('StaticResource').find(
        {
          Name: 'SRTest'
        }
      ).execute();
      console.log(`fetched : ${res.length}`);
      resolve(res[0].Id)
    } catch(err: any)  {
      console.error("Error",err);
      reject();
    }
  });
}


const createSR = async () => {
  console.log('createSR');
  try {
    const res = conn.tooling.sobject('StaticResource').create(
      {
        Name: 'SRTest',
        Description:
          'App Bundle - auto-uploaded by MobileCaddy delopyment tooling',
        body: 'test',
        ContentType: 'text/plain',
        CacheControl: 'Public'
      }
    );
    console.log(res);
  } catch(err: any)  {
    console.error("Error",err);
  }
}


const patchSR = async (id: string)=> {
  console.log('createSR');
  try {
    const res = conn.tooling.sobject('StaticResource').update(
      {
        Name: 'SRTest',
        Description:
          'App Bundle - auto-uploaded by MobileCaddy delopyment tooling',
        body: 'test',
        ContentType: 'text/plain',
        CacheControl: 'Public',
        Id: id
      }
    );
    console.log(res);
  } catch(err: any)  {
    console.error("Error",err);
  }
}
run();