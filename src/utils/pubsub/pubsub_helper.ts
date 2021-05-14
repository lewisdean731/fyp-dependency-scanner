// Built following
// https://cloud.google.com/pubsub/docs/pull

import { fetchEnvVar } from "../env_helper"; 
import { PubSub } from "@google-cloud/pubsub";

const subscriptionName:string = fetchEnvVar("PUBSUB_SUBSCRIPTION_ID");
const maxMessagesPerRun:number = parseInt(fetchEnvVar("PUBSUB_MAX_MESSAGES_PER_RUN"))
let nAckFlag:boolean = false;
const timeout:number = 60;

const pubSubClient = new PubSub();

// Get messages until timeout or max messages receieved
function listenForMessages() {
  const subscription = pubSubClient.subscription(subscriptionName);

  // Create an event handler to handle messages
  let messageCount = 0;
  const messageHandler = (message:any) => {
    console.log(`Received message ${message.id}:`);
    console.log(`\tData: ${message.data}`);
    console.log(`\tAttributes: ${message.attributes}`);
    messageCount += 1;

    // "Ack" (acknowledge receipt of) the message
    if(nAckFlag === false) {
      message.ack();
    } else {
      console.log('Received a message when nAckFlag was set, not ACKing')
    }

    // Stop once messages pulled reaches desired number. set nAckFlag to
    // ensure any other messages do not get acked
    if( messageCount == maxMessagesPerRun) {
      console.log('Max messages reached - closing subscription')
      subscription.close(err => console.log(err))
      nAckFlag = true
    }
  };

  // Listen for new messages until timeout is hit
  subscription.on('message', messageHandler);

  setTimeout(() => {
    subscription.removeListener('message', messageHandler);
    console.log(`${messageCount} message(s) received.`);
  }, timeout * 1000);
}

export default listenForMessages();