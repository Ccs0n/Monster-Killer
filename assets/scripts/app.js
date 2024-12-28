const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const HEAL_VALUE = 20;
const MONSTER_ATTACK_VALUE = 14;

let chosenMaxLife = 100;
let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

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

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("second wind")
    }
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You win!!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lose!!');
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth <= 0) {
        alert('You have a draw!!');
    }

    // resets the game when any health bar falls to zero or below using conditionals
    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset()
    }
}

// handles the damage dealt to monster
function attackMonster(mode) {
    let maxDamage;
    if(mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
    } else if (mode === 'STRONG_ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
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
    endRound();
}

// used an arrow function for the types of attack
attackBtn.addEventListener('click', attackHandler => {
    attackMonster("ATTACK");
});
strongAttackBtn.addEventListener("click", strongAttackHandler => {
    attackMonster('STRONG_ATTACK')
});


healBtn.addEventListener("click", healPlayerHandler)
