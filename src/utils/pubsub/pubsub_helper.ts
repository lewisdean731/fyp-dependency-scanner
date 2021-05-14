// Built following
// https://cloud.google.com/pubsub/docs/pull

import { fetchEnvVar } from "../env_helper";
import { v1 } from "@google-cloud/pubsub";
import { google } from "@google-cloud/pubsub/build/protos/protos";

const subscriptionName: string = fetchEnvVar("PUBSUB_SUBSCRIPTION_ID");
const maxMessagesPerRun: number = parseInt(
  fetchEnvVar("PUBSUB_MAX_MESSAGES_PER_RUN")
);

// Creates a client; cache this for further use.
const subClient = new v1.SubscriberClient();

async function pullMessages() {
  let projectIds: string[] = [];

  // The maximum number of messages returned for this request.
  // Pub/Sub may return fewer than the number specified.
  const request = {
    subscription: subscriptionName,
    maxMessages: maxMessagesPerRun,
  };

  // The subscriber pulls a specified number of messages.
  console.log(`Pulling up to ${maxMessagesPerRun} messages from queue:`);
  const [response] = await subClient.pull(request);

  // Process the messages.
  const ackIds: string[] = [];
  if (response.receivedMessages) {
    for (const message of response.receivedMessages) {
      console.log(
        `Received message: ${message.message?.attributes?.projectId}`
      );
      if (message.ackId && message.message?.attributes?.projectId) {
        projectIds.push(message.message.attributes.projectId);
        ackIds.push(message.ackId);
      }
    }
  }

  if (ackIds.length !== 0) {
    // Acknowledge all of the messages. You could also ackknowledge
    // these individually, but this is more efficient.
    const ackRequest: google.pubsub.v1.IAcknowledgeRequest = {
      subscription: subscriptionName,
      ackIds: ackIds,
    };

    await subClient.acknowledge(ackRequest);
  }

  console.log(projectIds);
  return projectIds;
}

export default pullMessages;
