const channels = document.querySelectorAll('.channel');
const chatHeader = document.querySelector('#channel-title');
const chatContainer = document.querySelector('#chat-messages');
const template = document.querySelector('template');
const messageInput = document.querySelector('#message-input');
const sendButton = document.querySelector('#chat-form button');

// Star Wars–themed chat data
const chatData = {
  general: [
    {
      sender: "Luke Skywalker",
      text: "May the Force be with you, everyone.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Always",
      fromSelf: true,
    },
    {
      sender: "Leia Organa",
      text: "Focus, team. We have a new transmission from Hoth Command.",
      fromSelf: false,
    },
  ],

  planning: [
    {
      sender: "Han Solo",
      text: "I've got a bad feeling about this mission...",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "It's just a quick hyperspace jump.",
      fromSelf: true,
    },
    {
      sender: "Chewbacca",
      text: "Rrrrghh!",
      fromSelf: false,
    },
    {
      sender: "Han Solo",
      text: "Chewie agrees. We should double-check the nav-computer.",
      fromSelf: false,
    },
  ],

  feedback: [
    {
      sender: "Obi-Wan Kenobi",
      text: "Remember: The Force will be with you, always.",
      fromSelf: false,
    },
    {
      sender: "Yoda",
      text: "Do or do not. There is no try.",
      fromSelf: false,
    },
    {
      sender: "You",
      text: "Wise words",
      fromSelf: true,
    },
  ],
};

function populateMessages(channel) {
  chatContainer.innerHTML = ''; // clear old messages
  const messages = chatData[channel] || [];

  messages.forEach(msg => {
    const messageEl = template.content.cloneNode(true);
    const div = messageEl.querySelector('.message');
    div.querySelector('.sender').textContent = msg.sender + ':';
    div.querySelector('.text').textContent = msg.text;

    if (msg.fromSelf) div.classList.add('self'); // style user messages

    chatContainer.appendChild(messageEl);
  });
}

function changeChannel(e) {
  channels.forEach(c => c.classList.remove('active'));
  const clicked = e.currentTarget;
  clicked.classList.add('active');

  const channelName = clicked.dataset.channel;
  chatHeader.textContent = clicked.textContent;
  populateMessages(channelName);
}

function sendMessage() {
  const text = messageInput.value.trim();
  if (!text) return;

  const activeChannel = document.querySelector('.channel.active');
  const channelName = activeChannel.dataset.channel;

  // Add message to chatData
  chatData[channelName].push({ sender: 'You', text, fromSelf: true });

  // Update messages
  populateMessages(channelName);
  messageInput.value = '';
}

// Event listeners
channels.forEach(c => c.addEventListener('click', changeChannel));
sendButton.addEventListener('click', sendMessage);

// Load first channel messages on page load
if (channels.length) channels[0].click();