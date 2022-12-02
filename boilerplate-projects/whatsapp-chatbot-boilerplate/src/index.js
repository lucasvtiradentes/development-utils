import venom from 'venom-bot'

try {

  const sessionName = 'session-name'
  const client = await venom.create(sessionName, undefined, onClientStatusChange, { multidevice: true, headless: false })
  const repliesArr = [
    ['Oi', "olá, sou um bot"],
    ['Oi2', "olá, sou um bot2"],
    ['Oi3', "olá, sou um bot3"],
  ]

  setDefaultReplies(client, repliesArr)
  sendMessage(client, "559196159754@c.us", "Oi mae")
  sendMessage(client, "559185174224-1617326973@g.us", "Msg teste")

} catch (e) {
  console.log(`Error: ${e.message}`)
}


function setDefaultReplies(client, repliesArr) {

  if (!repliesArr || !client) { return }

  client.onMessage(async (message) => {
    repliesArr.map(async (row) => {
      if (message.body === row.rowMsg && message.isGroupMsg === false) {
        await sendMessage(client, message.from, row.rowReply)
      }
    })
  });

}

async function sendMessage(client, sendTo, message) {

  try {
    const msgResult = await client.sendText(sendTo, message)
    console.log('Result: ', msgResult);
  } catch (e) {
    console.error('Error when sending: ', e);
  }

}

function onClientStatusChange(statusSession, session) {
  console.log('Status Session: ', statusSession);
  console.log('Session name: ', session);
}
