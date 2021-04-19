const { WebClient } = require("@slack/web-api");
const axios = require("axios");
const dotenv = require("dotenv");

dotenv.config();

// Read a token from the environment variables
const token = process.env.SLACK_TOKEN;

// Initialize
const web = new WebClient(token);

// Given some known conversation ID (representing a public channel, private channel, DM or group DM)
const conversationId = "test-app-123";

(async () => {
  // Post a message to the channel, and await the result.
  // Find more arguments and details of the response: https://api.slack.com/methods/chat.postMessage
  const result = await web.chat.postMessage({
    text: "Hello world!",
    channel: conversationId,
    attachments: [
      {
        title: "The Further Adventures of Slackbot",
        fields: [
          {
            title: "Volume",
            value: "1",
            short: true,
          },
          {
            title: "Issue",
            value: "3",
            short: true,
          },
        ],
        author_name: "Stanford S. Strickland",
        author_icon:
          "http://a.slack-edge.com/7f18https://a.slack-edge.com/80588/img/api/homepage_custom_integrations-2x.png",
        image_url: "http://i.imgur.com/OJkaVOI.jpg?1",
      },
      {
        title: "Synopsis",
        text:
          "After @episod pushed exciting changes to a devious new branch back in Issue 1, Slackbot notifies @don about an unexpected deploy...",
      },
      {
        fallback: "Would you recommend it to customers?",
        title: "Would you recommend it to customers?",
        callback_id: "comic_1234_xyz",
        color: "#3AA3E3",
        attachment_type: "default",
        actions: [
          {
            name: "recommend",
            text: "Recommend",
            type: "button",
            value: "recommend",
          },
          {
            name: "no",
            text: "No",
            type: "button",
            value: "bad",
          },
        ],
      },
    ],
  });

  // The result contains an identifier for the message, `ts`.
  console.log(
    `Successfully send message ${result.ts} in conversation ${conversationId}`
  );
})();
