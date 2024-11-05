const apiKey = 'AIzaSyB0UmIwTGG6IAccAuS2ZuU8M7mQnoSHuRU';

const apiURL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

const chatMessages = document.getElementById('chat-messages');

const userInput = document.getElementById('user-input');

const sendButton = document.getElementById('send');

async function generateResponse(prompt){

  const response = await fetch(`${apiURL}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      contents: [
        {
          parts:[
            {
              text: prompt
            }
          ]
        }
      ]
    })
  });

  if(!response.ok){
    throw new Error('Failed to generate response');
  }

  const data = await response.json();

  return data.candidates [0].content.parts[0].text;
}

function cleanMarkdown(text){
  return text
      .replace(/#{1,6}\s?/g, '')
      .replace(/\*\*/g, '')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
}

function addMessage(message, isUser){
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(isUser ? 'user-message' : 'bot-message');

  const profileImage = document.createElement('img');
  profileImage.classList.add('profile-image');
  profileImage.src = isUser ? 'https://lh3.googleusercontent.com/a/ACg8ocJIYi3sEzWJQiSHXmpOk3oBsd5_YOBd3JmcfguRp8uIcr03sLE=s64-c-mo' : 'https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg';
  profileImage.alt = isUser ? 'User' : 'Bot';

  const messageContent = document.createElement('div');
  messageContent.classList.add('message-content');
  messageContent.textContent = message;

  messageElement.appendChild(profileImage);
  messageElement.appendChild(messageContent);

  chatMessages.appendChild(messageElement);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function handleUserInput(){
  const userMessage = userInput.value.trim();

  if(userMessage){
    addMessage(userMessage, true);
    userInput.value = '';
    sendButton.disabled = true;
    userInput.disabled = true;

    try{
      const botMessage = await generateResponse(userMessage);
      addMessage(cleanMarkdown(botMessage), false);
    }

    catch(error){
      console.error('Error', error);
      addMessage('Sorry, I encountered an error. Please try again', false);
    } 

    finally{
      sendButton.disabled = false;
      userInput.disabled = false;
      userInput.focus();
    }

  }

}

sendButton.addEventListener('click', handleUserInput);

userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && !e.shiftKey){
    e.preventDefault();
    handleUserInput();
  }
});



