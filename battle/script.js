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

  alert("cheats activated. ");
}
//#endregion
//#region battle stats
var master = []
var randomRole = 0;

var enemys = [
  {
    'name': 'Ice Clan Member',
    'type': 'Member',
    'specialAbility': 'Ice',
    'hp': 69,
    'atk': 69,
    'evation': 5,
    'accuracy': 12,
  },
  {
    'name': 'Dragon',
    'type': 'Creature',
    'specialAbility': 'MFire breathing',
    'hp': 101,
    'atk': 91,
    'evation': 4,
    'accuracy': 12,
  },
  {
    'name': 'Giant troll',
    'type': 'Troll',
    'specialAbility': 'Bat',
    'hp': 221,
    'atk': 42,
    'evation': 2,
    'accuracy': 13,
  },
  {
    'name': 'Wizard',
    'type': 'magical being',
    'specialAbility': 'Magic',
    'hp': 2,
    'atk': 5,
    'evation': 19,
    'accuracy': 19,
  }
];
//above is the sets for each enemy.

var players = [
  {
    'name': 'Zika',
    'type': 'Half Dragon',
    'specialAbility': 'Flames',
    'hp': 350,
    'atk': 200,
    'evation': 1,
    'accuracy': 1,
  },
  {
    'name': 'Eryx',
    'type': 'Human',
    'specialAbility': 'Robbery',
    'hp': 40,
    'atk': 68,
    'evation': 14,
    'accuracy': 15,
  }
]
//the classes/sets for both of the two characters.

function role(number) {
  randomRole = Math.random() * number | 0;
}

function start() {
  master = []
  playerNumber = document.getElementById('playerNumber').value;
  enemyNumber = document.getElementById('enemyNumber').value;

  battle(playerNumber, enemyNumber);
}

function battle(playerNumber, enemyNumber) {
  //if hp 0 either oponent, stop
  if (!(enemys[enemyNumber].hp <= 0) && !(players[playerNumber].hp <= 0)) {
    //player hit role
    role(20);

    if (randomRole <= players[playerNumber].accuracy) {
      //enemy dodge role
      role(20);
      if (randomRole >= enemys[enemyNumber].evation) {
        enemys[enemyNumber].hp = enemys[enemyNumber].hp - players[playerNumber].atk;

        //if hit point below 0 hitpoint equal 0
        if (enemys[enemyNumber].hp < 0) {
          enemys[enemyNumber].hp = 0;
        }
        master.push(players[playerNumber].name + ' hits for ' + players[playerNumber].atk + ' damage. \n' + enemys[enemyNumber].name + ' health is now ' + enemys[enemyNumber].hp + ' hitpoints');
      } else {
        master.push(enemys[enemyNumber].name + ' dodges');
      }
      //player hit role miss
    } else if (randomRole > players[playerNumber].accuracy) {
      master.push(players[playerNumber].name + ' misses');
    }

    //enemy hit role
    role(20);
    if (randomRole <= enemys[enemyNumber].accuracy) {
      //player dodge role
      role(20);
      if (randomRole >= players[playerNumber].evation) {
        players[playerNumber].hp = players[playerNumber].hp - enemys[enemyNumber].atk;

        //if hit point below 0 hitpoint equal 0
        if (players[playerNumber].hp < 0) {
          players[playerNumber].hp = 0;
        }
        master.push(enemys[enemyNumber].name + ' hits for ' + enemys[enemyNumber].atk + ' damage. \n' + players[playerNumber].name + ' health is now ' + players[playerNumber].hp + ' hitpoints');
      } else {
        master.push(players[playerNumber].name + ' dodges');
      }
      //player hit role miss
    } else if (randomRole > enemys[enemyNumber].accuracy) {
      master.push(enemys[enemyNumber].name + ' misses');
    }

    battle(playerNumber, enemyNumber);
  } else {
    master.push('game over');
    if (players[playerNumber].hp <= 0) {
      master.push('enemy wins!')
    } else if (enemys[enemyNumber].hp <= 0) {
      master.push('player wins!')
    }


    //reset
    enemys[0].hp = 69;
    enemys[1].hp = 101;
    enemys[2].hp = 221;
    enemys[3].hp = 2;
    players[0].hp = 500;
    players[1].hp = 40;

    document.getElementById('battleresults').innerHTML = master.join('<br>')

  }

}
//#endregion