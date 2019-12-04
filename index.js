/**
 * SDK Docs: https://github.com/aws/aws-sdk-js-v3/tree/master/clients/node/client-sqs-node
 *
 * SQS single message and total batch max size are both 256k.
 * For now, only support single messages since the idea is they would
 * be large ones close to or at the 256k limit.
 *
 * SDK v3 does 3 retries on transient errors, do don't need to account for that.
 */
const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs-node");
const QUEUE_URL = process.env.QUEUE_URL;
const AWS_PROFILE = process.env.AWS_PROFILE;

async function main() {
  const sqs = new SQSClient({ profile: AWS_PROFILE });
  const command = new SendMessageCommand({
    QueueUrl: QUEUE_URL,
    MessageBody: "test me"
  });

  try {
    const res = await sqs.send(command);
    console.log(res);
  } catch (error) {
    console.error(error);
  }
}

// https://nodejs.org/api/modules.html#modules_accessing_the_main_module
if (require.main === module) {
  main();
}
