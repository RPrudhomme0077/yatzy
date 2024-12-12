/**
 * Author: Ryley Prudhomme
 *
 * Student ID: 041137018
 *
 * Course CST3106 -  Internet Architecture and Web Development
 *
 * Term: Fall 2024
 *
 * Assignment: Assignment 1 Yatzy Singleplayer Game
 *
 * Date: 2024-11-09
 */

// Class representing the game logic for Yatzy
class YatzyGame {
    constructor() {
        this.maxRounds = 13; // Total number of turns in a game
        this.rolledThisTurn = false; // Tracks whether the dice have been rolled during the current turn
        this.resetGame(); // Initializes the game state
        this.addEventListeners(); // Sets up event listeners for user interactions
    }

    /**
     * Resets the game state to its initial values.
     * Called at the start of the game or when restarting.
     */
    resetGame() {
        this.currentRound = 1; // Start at the first round
        this.dice = new Dice(5); // Create a set of 5 dice
        this.engine = new YatzyEngine(); // Initialize the scoring engine
        this.scoreTable = { ...this.engine.scoreTable }; // Reset the score table
        this.heldDice = [false, false, false, false, false]; // Reset all dice to "unheld"
        this.updateDiceDisplay([1, 1, 1, 1, 1]); // Display default dice values
        this.updateScoreboard(); // Reset the score display
        this.rolledThisTurn = false; // Ensure the player needs to roll before scoring
        document.getElementById('turnsRemaining').textContent = this.maxRounds - this.currentRound + 1; // Update the turn counter
    }

    /**
     * Sets up event listeners for game interactions.
     * Handles rolling dice, holding dice, selecting scores, and restarting the game.
     */
    addEventListeners() {
        // Roll Button: Rolls the dice and marks that the player has rolled
        document.getElementById('rollButton').addEventListener('click', () => {
            const rolledValues = this.dice.roll(this.heldDice);
            this.updateDiceDisplay(rolledValues);
            this.rolledThisTurn = true; // Allow scoring after rolling
        });

        // Restart Button: Restarts the game after confirmation
        document.getElementById('restartButton').addEventListener('click', () => {
            if (confirm('Are you sure you want to restart the game?')) {
                this.resetGame();
            }
        });

        // Dice Click: Toggles the "held" state of a die
        const diceElements = document.getElementsByClassName('dice');
        Array.from(diceElements).forEach(die => {
            die.addEventListener('click', () => {
                const index = parseInt(die.getAttribute('data-index'));
                this.toggleHoldDice(index, die);
            });
        });

        // Scoring Categories: Handles scoring when a category is clicked
        const scoreList = document.getElementById('scoreList');
        scoreList.addEventListener('click', event => {
            const category = event.target.dataset.category;

            // Ensure the player has rolled before scoring
            if (!this.rolledThisTurn) {
                alert("You must roll the dice before selecting a score!");
                return;
            }

            // Validate that the category is unscored and calculate the score
            if (category && this.scoreTable[category] === 0) {
                const diceValues = this.dice.getCurrentValues();
                console.log('Scoring category:', category);
                console.log('Dice values:', diceValues);

                try {
                    const score = this.engine.calculateScore(category, diceValues);

                    // Optional validation: Ensure the score is valid for specific cases
                    if (score === 0) {
                        alert("This score is invalid or doesn't match the dice.");
                        return;
                    }
                    

                    // Update the score table and end the turn
                    this.scoreTable[category] = score;
                    this.updateScoreboard();
                    this.rolledThisTurn = false; // Prevent scoring again without rolling
                    this.endTurn();
                } catch (error) {
                    console.error('Error calculating score:', error);
                    alert('An error occurred while scoring. Please check the console for details.');
                }
            } else if (category) {
                alert("Invalid category or already scored!");
            }
        });
    }

    /**
     * Toggles the "held" state of a specific die.
     * @param {number} index - The index of the die to toggle.
     * @param {HTMLElement} die - The HTML element representing the die.
     */
    toggleHoldDice(index, die) {
        this.heldDice[index] = !this.heldDice[index]; // Toggle the held state
        die.classList.toggle('held', this.heldDice[index]); // Update the visual indicator
    }

    /**
     * Updates the displayed values of the dice.
     * @param {Array<number>} values - The new values to display for the dice.
     */
    updateDiceDisplay(values) {
        const diceElements = document.getElementsByClassName('dice');
        values.forEach((value, index) => {
            diceElements[index].textContent = value;
        });
    }

    /**
     * Updates the scoreboard UI to reflect the current scores.
     */
    updateScoreboard() {
        Object.entries(this.scoreTable).forEach(([category, score]) => {
            const scoreElement = document.getElementById(`score${category.replace(/\s+/g, '')}`);
            if (scoreElement) {
                scoreElement.textContent = score;
            }
        });
    }

    /**
     * Ends the current turn, progresses to the next turn, or ends the game.
     */
    endTurn() {
        this.currentRound++;
        if (this.currentRound > this.maxRounds) {
            this.endGame(); // Ends the game if all turns are complete
        } else {
            this.heldDice.fill(false); // Reset all dice to "unheld"
            Array.from(document.getElementsByClassName('dice')).forEach(die => die.classList.remove('held')); // Update visuals
            document.getElementById('turnsRemaining').textContent = this.maxRounds - this.currentRound + 1; // Update turn counter
        }
    }

    /**
     * Ends the game and displays the final score.
     */
    endGame() {
        const totalScore = Object.values(this.scoreTable).reduce((sum, val) => sum + val, 0); // Calculate the total score
        alert(`Game over! Your final score is ${totalScore}`); // Display the final score
    }
}

// Initialize the Yatzy game when the DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    new YatzyGame();
});
