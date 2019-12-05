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
const TOTAL_MESSAGES = 10_000;
const CHUNK_SIZE = 200;

const chunk = (arr, size) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
    arr.slice(i * size, i * size + size)
  );

const main = async () => {
  const sqs = new SQSClient({ profile: AWS_PROFILE });

  console.log("generating test data");
  const testData = Array.from(Array(TOTAL_MESSAGES).keys()).map(x =>
    x.toString()
  );
  const chunkedTestData = chunk(testData, CHUNK_SIZE);

  for (const [i, testDataChunk] of chunkedTestData.entries()) {
    const commands = testDataChunk.map(
      item =>
        new SendMessageCommand({
          QueueUrl: QUEUE_URL,
          MessageBody: item
        })
    );
    const promises = commands.map(command => sqs.send(command));

    try {
      await Promise.all(promises);
      console.log("finished batch", i);
    } catch (error) {
      console.error(error);
    }
  }
};

// https://nodejs.org/api/modules.html#modules_accessing_the_main_module
if (require.main === module) {
  main();
}
