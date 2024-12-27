const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

// handles the messages for winning, losing or draw
function messages(monster, player) {
    if (monster <= 0 && player > 0) {
        alert('You win!!')
    } else if (player <= 0 && monster > 0) {
        alert('You lose!!')
    } else if (player <= 0 && monster <= 0) {
        alert('You have a draw!!')
    }
}
// handles the damage dealt to both monster and player
function attackMonster(mode) {
    let maxDamage;
    if(mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
    } else if (mode === 'STRONG_ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    messages(currentMonsterHealth, currentPlayerHealth);
}

function healPlayerHandler() {
    increasePlayerHealth(HEAL_VALUE);
}

// function attackHandler() {
//     attackMonster("ATTACK");
// }
// function strongAttackHandler() {
//     attackMonster('STRONG_ATTACK')
// }


// used an arrow function for the types of attack
attackBtn.addEventListener('click', attackHandler => {
    attackMonster("ATTACK");
});
strongAttackBtn.addEventListener("click", strongAttackHandler => {
    attackMonster('STRONG_ATTACK')
});
healBtn.addEventListener("click", healPlayerHandler)
