const enteredValue = prompt('Maximum life for you end the monster.', '100');
let chosenMaxLife = parseInt(enteredValue);
let batleLog = [];

// This is an if check to be sure the input is number
if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    alert('Invalid input. Please refresh the page.');
}

const ATTACK_VALUE = (chosenMaxLife / 10);
const STRONG_ATTACK_VALUE = (chosenMaxLife / 5.5);
const HEAL_VALUE = (chosenMaxLife / 5);
const MONSTER_ATTACK_VALUE = (chosenMaxLife / 7.2);

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

// prompt('Maximum life for you end the monster.', '100')
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };
    switch (event) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry.target = 'MONSTER';
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: 'MONSTER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
            };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry = {
                event: event,
                value: value,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
            };
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry = {
                event: event,
                value: value,
                target: 'PLAYER',
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
            };
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry = {
                event: event,
                value: value,
                finalMonsterHealth: monsterHealth,
                finalPlayerHealth: playerHealth,
            };
            break;
            default:
                logEntry = {};

    }
    // if (event === LOG_EVENT_PLAYER_ATTACK) {
    //     logEntry.target = 'MONSTER';
    // } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
    //     logEntry = {
    //         event: event,
    //         value: value,
    //         target: 'MONSTER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth,
    //     };
    // } else if (event === LOG_EVENT_MONSTER_ATTACK) {
    //     logEntry = {
    //         event: event,
    //         value: value,
    //         target: 'PLAYER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth,
    //     };
    // } else if (event === LOG_EVENT_PLAYER_HEAL) {
    //     logEntry = {
    //         event: event,
    //         value: value,
    //         target: 'PLAYER',
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth,
    //     };
    // } else if (event === LOG_EVENT_GAME_OVER) {
    //     logEntry = {
    //         event: event,
    //         value: value,
    //         finalMonsterHealth: monsterHealth,
    //         finalPlayerHealth: playerHealth,
    //     };
    // }
    batleLog.push(logEntry);
}

//reset func
function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

// includes the damage dealt to player, bonus life and conditionals
function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(LOG_EVENT_MONSTER_ATTACK, playerDamage, currentMonsterHealth, currentPlayerHealth);

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("second wind")
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You win!!');
        writeToLog(LOG_EVENT_GAME_OVER, 'You win!!', currentMonsterHealth, currentPlayerHealth);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lose!!');
        writeToLog(LOG_EVENT_GAME_OVER, 'You lose!!', currentMonsterHealth, currentPlayerHealth);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!!');
        writeToLog(LOG_EVENT_GAME_OVER, 'You have a draw!!', currentMonsterHealth, currentPlayerHealth);
    }

    // resets the game when any health bar falls to zero or below using conditionals
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset()
    }
}

// handles the damage dealt to monster
function attackMonster(mode) {
    // maxDamage with ternary operator
    // const maxDamage = mode === MODE_ATTACK ? ATTACK_VALUE : STRONG_ATTACK_VALUE;
    let maxDamage;
    let logEvent;

    if(mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    } else if (mode === MODE_STRONG_ATTACK) {
        maxDamage = STRONG_ATTACK_VALUE;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
    endRound();
}

// heals the player and lets the monster continue attacking
function healPlayerHandler() {
    let healValue;
    //checks the value of health when healing.
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) { // if it is more than 80, it applies as much as it
        alert("You can't heal to more than your max health!!") // needs to reach max health
        healValue = chosenMaxLife - currentPlayerHealth;
    } else { // applies full heal value (20 points)
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(LOG_EVENT_PLAYER_HEAL, healValue, currentMonsterHealth, currentPlayerHealth);
    endRound();
}
function printLogHandler() {
    for (let i = 0; i < batleLog.length; i++){
        console.log('-------');
    }
    console.log(batleLog);
}
// used an arrow function for the types of attack
attackBtn.addEventListener('click', attackHandler => {
    attackMonster(MODE_ATTACK);
});
strongAttackBtn.addEventListener("click", strongAttackHandler => {
    attackMonster(MODE_STRONG_ATTACK)
});
healBtn.addEventListener("click", healPlayerHandler)
logBtn.addEventListener("click", printLogHandler)
