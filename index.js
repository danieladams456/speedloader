/**
 * SQS single message and total batch max size are both 256k.
 * For now, only support single messages since the idea is they would
 * be large ones close to or at the 256k limit.
 *
 * SDK v3 does 3 retries on transient errors, do don't need to account for that.
 */
const { SQSClient, SendMessageCommand } = require("@aws-sdk/client-sqs-node");

async function main() {
  const sqs = new SQSClient();
  const command = new SendMessageCommand({
    QueueUrl: "",
    MessageBody: ""
  });
}

// https://nodejs.org/api/modules.html#modules_accessing_the_main_module
if (require.main === module) {
  main();
}
