var randomRole = 0;

var enemys = [
  {
    'name': 'Ice Clan',
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

var players = [
  {
    'name': 'Zika',
    'type': 'Half Dragon',
    'specialAbility': 'Flames',
    'hp': 500,
    'atk': 500,
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

function role(number) {
  randomRole = Math.random() * number | 0;
}

function start() {
  console.clear()
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
        console.log(players[playerNumber].name + ' hits for ' + players[playerNumber].atk + ' damage. \n' + enemys[enemyNumber].name + ' health is now ' + enemys[enemyNumber].hp + ' hitpoints');
      } else {
        console.log(enemys[enemyNumber].name + ' dodges');
      }
      //player hit role miss
    } else if (randomRole > players[playerNumber].accuracy) {
      console.log(players[playerNumber].name + ' misses');
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
        console.log(enemys[enemyNumber].name + ' hits for ' + enemys[enemyNumber].atk + ' damage. \n' + players[playerNumber].name + ' health is now ' + players[playerNumber].hp + ' hitpoints');
      } else {
        console.log(players[playerNumber].name + ' dodges');
      }
      //player hit role miss
    } else if (randomRole > enemys[enemyNumber].accuracy) {
      console.log(enemys[enemyNumber].name + ' misses');
    }

    battle(playerNumber, enemyNumber);
  } else {
    console.log('game over');
    if (players[playerNumber].hp <= 0) {
      console.log('enemy wins!')
    } else if (enemys[enemyNumber].hp <= 0) {
      console.log('player wins!')
    }

    //reset
    enemys[0].hp = 69;
    enemys[1].hp = 101;
    enemys[2].hp = 221;
    enemys[3].hp = 2;
    players[0].hp = 500;
    players[1].hp = 40;

  }
}