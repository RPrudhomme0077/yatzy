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
class Dice {
    constructor(numDice) {
        this.numDice = numDice;
        this.values = Array(numDice).fill(0);
        this.keptDice = Array(numDice).fill(false); // Track which dice are kept
    }

    roll(keepDice = []) {
        for (let i = 0; i < this.numDice; i++) {
            if (!keepDice[i]) {
                this.values[i] = Math.floor(Math.random() * 6) + 1; // Roll only non-kept dice
            }
        }
        return this.values;
    }

    getCurrentValues() {
        return this.values;
    }

    keepDice(indexes) {
        for (let i of indexes) {
            this.keptDice[i] = true; // Mark dice as kept
        }
    }
}
