if (!(sessionStorage.getItem("name") && sessionStorage.getItem("room"))) {
  alert("Please provide your name and room to continue");
  window.location = window.origin;
}
const currentUserName = sessionStorage.getItem("name");
const currentRoom = sessionStorage.getItem("room");
let numberOfUsers = 1;
// http://localhost:5000/
const socket = io("https://assignment3-it.herokuapp.com/");
socket.emit("joinChat", { username: currentUserName, room: currentRoom });
const inputMessage = document.querySelector("#chatMessage");
const formMessage = document.querySelector("#formMessage");
const chatMessageBox = document.querySelector("#chatMessageBox");
const userList = document.querySelector("#userLists");

const showMessage = messageObj => {
  const { username, createdAt, message } = messageObj;
  let htmltag;
  console.log({ username, currentUserName });
  console.log(username === currentUserName);
  if (username === "Chatbox")
    htmltag = `
      <div class="chat-message-center pb-4">
        <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
          <div class="font-weight-bold mb-1">Chatbox</div>
          ${message}
        </div>
      </div>
    `;
  else
    htmltag = `
    <div class="${
      currentUserName === username ? "chat-message-right" : "chat-message-left"
    } pb-4">
      <div>
        <img
          src="https://res.cloudinary.com/dybygufkr/image/upload/v1593000869/avatar_q2ysxd.jpg"
          alt="Chris Wood"
          width="40"
          height="40"
        />
        <div class="text-muted small text-nowrap mt-2">
          ${createdAt}
        </div>
      </div>
      <div class="flex-shrink-1 bg-light rounded py-2 px-3 ${
        currentUserName === username ? "mr-3" : "ml-3"
      }">
        <div class="font-weight-bold mb-1">${username}</div>
        ${message}
      </div>
    </div>
  `;
  chatMessageBox.insertAdjacentHTML("beforeend", htmltag);
};

const showUsers = users => {
  const html = users
    .map(
      user => `
      <a
        href="#"
        class="list-group-item list-group-item-action border-0"
      >
        <div class="d-flex align-items-start">
          <img
            src="https://res.cloudinary.com/dybygufkr/image/upload/v1593000869/avatar_q2ysxd.jpg"
            class="rounded-circle mr-1"
            alt="Avatar image"
            width="40"
            height="40"
          />
          <div class="flex-grow-1 ml-3">
            ${user.username}
            <div class="small">
              <span class="fas fa-circle chat-online"></span> Online
            </div>
          </div>
        </div>
      </a>
    `
    )
    .join("");
  userList.innerHTML = html;
};

const showRoom = room => {};

socket.on("message", messageObj => {
  showMessage(messageObj);
  chatMessageBox.scrollTop = chatMessageBox.scrollHeight;
});

socket.on("roomUsers", roomUsersObj => {
  const { room, users } = roomUsersObj;
  console.log("ENTER");
  console.log(room, users.length);
  numberOfUsers = users.length;
  // showRoom(room);
  showUsers(users);
});

formMessage.addEventListener("submit", e => {
  e.preventDefault();
  const value = inputMessage.value;
  socket.emit("chatMessage", value);
  if (numberOfUsers === 1) {
    console.log("Enter chatbox");
    chatBotResponse(value);
  }

  inputMessage.value = "";
  inputMessage.focus();
});

function chatBotResponse(userInput) {
  let value = userInput.toLowerCase();
  let message;
  value = value.replaceAll("u", "you");
  value = value.replaceAll("ur", "your");
  if (value.includes("your name")) {
    message = "My name is Chatbox. Nice to meet you.";
  }
  // Write your code here
  else if (value.includes("what can you do")) {
    message = `I can speak with you if you feel lonely`;
  } else if (value.includes("Hi")) {
    message = `Hello :)`;
  } else if (value.includes("time")) {
    message = `It is currently ${new Date().getHours()}:${new Date().getMinutes()}`;
  } else if (value.includes("how are you")) {
    message = `I am fine. Thank you for asking :))`;
  } else if (value.includes("what's up")) {
    message = `Yo, friend!`;
  } else if (value.includes("how to talk to your crush")) {
    message = `I have no idea :))`;
  } else if (value.includes("I am bored today")) {
    message = `You can play games`;
  } else if (value.includes("I am happy today")) {
    message = `Great to hear that!`;
  } else if (value.includes("what should I do")) {
    message = `Play soccer, play video games, watch movies, etc.`;
  } else if (value.includes("how to have a lover")) {
    message = `Learn guitar or ukulele and sing for her/him`;
  } else if (value.includes("your favorite movies")) {
    message = `Marvel Series, Tenet, Inception, The Dark Knight, Memento, etc. `;
  } else if (value.includes("your favorite video games")) {
    message = `League Of Lengends, Overwatch, Farm Together, Genshin Impact`;
  } else if (value.includes("what are you doing")) {
    message = `Talking with the sweetest person on Earth (｡•̀ᴗ-)✧`;
  } else if (value.includes("your favorite color")) {
    message = `My favorite color is blue. Fun fact: blue actually slows your metabolism. That's why fast-food chains rarely use blue in their logos ^^`;
  } else if (value.includes("who are you")) {
<<<<<<< HEAD
=======
    message = `I am Messen Bot`;
  } else if (value.includes("the love and care of TTCN")) {
>>>>>>> 4b043552416372d402c3b03ebc8780150635cd30
    message = `your personal emotional support <(･ω<)☆`;
  } else if (value.includes("where are you from")) {
    message = `the love and care of Techolorgy`;
  } else if (value.includes("tell me a joke")) {
    message = `I'm on a seafood diet. I see food I eat it.`;
  } else if (value.includes("i love you")) {
    message = `yes i love me too <(･ω<)☆`;
  } else if (value.includes("knock knock")) {
    message = `the door's unlocked`;
  } else if (value.includes("tiktok")) {
    message = `my fyp is filled with driver license and its variations`;
  } else if (value.includes("")) {
    message = `Hmm? Are you trying to say something?`;
  }  else if (value.includes("i'm glad to have talked to you")) {
      message = `me too :)`;
  } else {
    message = "Sorry i am not smart enough to understand your question now :((";
  }
  htmltag = `
    <div class="chat-message-center pb-4">
      <div class="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
        <div class="font-weight-bold mb-1">Chatbox</div>
        ${message}
      </div>
    </div>`;
  setTimeout(() => {
    chatMessageBox.insertAdjacentHTML("beforeend", htmltag);
    chatMessageBox.scrollTop = chatMessageBox.scrollHeight;
  }, 1000);
}
