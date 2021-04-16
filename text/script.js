//#region easter egg
var allowedKeys = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'a',
  66: 'b'
};

// the 'official' Konami Code sequence
var konamiCode = ['up', 'up', 'down', 'down', 'left', 'right', 'left', 'right', 'b', 'a'];

// a variable to remember the 'position' the user has reached so far.
var konamiCodePosition = 0;

// add keydown event listener
document.addEventListener('keydown', function(e) {
  // get the value of the key code from the key map
  var key = allowedKeys[e.keyCode];
  // get the value of the required key from the konami code
  var requiredKey = konamiCode[konamiCodePosition];

  // compare the key with the required key
  if (key == requiredKey) {

    // move to the next key in the konami code sequence
    konamiCodePosition++;

    // if the last key is reached, activate cheats
    if (konamiCodePosition == konamiCode.length) {
      activateCheats();
      konamiCodePosition = 0;
    }
  } else {
    konamiCodePosition = 0;
  }
});

function activateCheats() {

  var audio = new Audio('images/found.mp3');
  audio.play();

  if (window.confirm('cheats activated, click ok to continue')) 
  {
    window.location.href='https://youtu.be/pG5omcvhfOQ';
  };
}

alert("Howdy! welcome to the text based game!! woo!");
//#endregion

//#region text options
const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'choose your character',
    options: [
      {
        text: 'Zika',
        setState: { blueGoo: true },
        nextText: 2
      },
      {
        text: 'Eryx',
        setState: { blueGoo: true },
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You venture forth, from your destroyed home village, to find a ice clan outpost, what do you do?',
    options: [
      {
        text: 'wait for movement, and have no plan',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3
      },
      {
        text: 'investigate and come up with a plan',
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3
      },
    ]
  },
  {
    id: 3,
    text: 'you dedide to sneek up on the base, but there are members there',
    options: [
      {
        text: 'Call ya dragon in and ambush',
        nextText: 4
      },
      {
        text: 'Ambush by yourself',
        nextText: 5
      },
      {
        text: 'Sneak up on the clan',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You decide to call ya dragon in, but it gets shot down and dies',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'You decide to ambush them by your self, but you get overrunned and captured',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'you decide to sneak up on the clan',
    options: [
      {
        text: 'approch the outpost quietly',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'While ya sneak up on them, a member notices you and starts to charge at you with a spear.',
    options: [
      {
        text: 'Try to run',
        nextText: 8
      },
      {
        text: 'Attack with your fists',
        requiredState: (currentState) => currentState.sword,
        nextText: 9
      },
      {
        text: 'Block the damage',
        requiredState: (currentState) => currentState.shield,
        nextText: 10
      },
      {
        text: 'attack the member',
        requiredState: (currentState) => currentState.shield,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'Your attempts to run but you are easily caught, and stabbed with a spear.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'really? with fists?',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'you tried to block the incoming attack, but failed',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'you attack the member, but realize that was the leader of the outpost, so the other members retreat. you successfully captured the outpost, but your journey doesnt end there...',
    options: [
      {
        text: 'PLay again?',
        nextText: -1
      }
    ]
  }
]

startGame()
//#endregion