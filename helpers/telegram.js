const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");

const apiId = 21809944;
const apiHash = "ec4fc1a788533055ea0361140cc0fe46";
const stringSession = new StringSession(
  "1AQAOMTQ5LjE1NC4xNzUuNjABu1dgn2QXPDKagSG1U5i0sDuAyIVCkF1/fuwWaKjrJlHbKVfv7JdJH9sUPlJwtyUHFvQDYZVI2Lw2CdRZqO5V+rI2VrQO4IYGWUcSR5AtcIJ33D0FmGIZASVMniB1pvRT6OZEqkgLGNgQ4ufXnYfUAP8Tx0HOkwXLEgr3EXQL+FM63babgSzHC0DMn4XqQEk2Borm7qa9jutP1Z8RBhuD8UuM/98y7bjx0Gz6+0cMyucF5htGDF7WQhJJBtJHxWkRziTN4ANcueXUiHGolLwLx6jQAwckTL0BbqlDI+bpB/CC8yina2o5oRw8AOuklE2JgZsgrZP83INtGRJyvnbvU4c="
); // fill this later with the value from session.save()
var messages = [];
async function telegram(peerID) {
  // console.log("Loading interactive example...");
  const client = new TelegramClient(stringSession, apiId, apiHash, {
    connectionRetries: 5,
  });
  await client.start({
    phoneNumber: "",
    password: "",
    phoneCode: "",
    onError: (err) => console.log(err),
  });
  // console.log("You should now be connected.");
  // console.log(client.session.save()); // Save this string to avoid logging in again
  // await client.sendMessage("me", { message: "Hello!" });
  //...............messages.GetHistory.................
  var dateSliced = Date.now();
  while (dateSliced > 9999999999) {
    dateSliced = dateSliced / 10;
  }
  var dateSlicedNoDecimals;
  let array = [];
  dateSlicedNoDecimals = dateSliced.toFixed(0);
  console.log(parseInt(dateSlicedNoDecimals));
  var peerID_input = peerID;
  var result;
  do {
    result = await client.invoke(
      new Api.messages.GetHistory({
        peer: peerID_input,
        limit: 100,
        offsetDate: parseInt(dateSlicedNoDecimals),
      })
    );
    await result.messages.forEach((message) => {
      array.push(message.message);
    });
    dateSlicedNoDecimals = result.messages[result.messages.length - 1].date;
    console.log(result.messages.length);
  } while (result.messages.length > 1);
  console.log("DONE");
  return array;
  //...................................................
}
module.exports = telegram;
// https://gram.js.org/
