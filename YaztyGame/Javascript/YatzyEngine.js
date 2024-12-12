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

// Class representing the Yatzy game engine, handling scoring logic for various categories
class YatzyEngine {
    constructor() {
        // Initializes the score table with all scoring categories set to 0
        this.scoreTable = {
            Aces: 0,
            Twos: 0,
            Threes: 0,
            Fours: 0,
            Fives: 0,
            Sixes: 0,
            'Three of a Kind': 0,
            'Four of a Kind': 0,
            'Full House': 0,
            'Small Straight': 0,
            'Large Straight': 0,
            Yatzy: 0,
            Chance: 0,
        };
    }

    /**
     * Calculates the score for a given category based on the dice values.
     * @param {string} category - The scoring category (e.g., "Aces", "Full House").
     * @param {Array<number>} diceValues - Array of dice values to evaluate.
     * @returns {number} - The calculated score for the category.
     */
    calculateScore(category, diceValues) {
        switch (category) {
            case 'Aces':
                // Sums all dice showing the value 1
                return diceValues.filter(val => val === 1).reduce((sum, val) => sum + val, 0);
            case 'Twos':
                // Sums all dice showing the value 2
                return diceValues.filter(val => val === 2).reduce((sum, val) => sum + val, 0);
            case 'Threes':
                // Sums all dice showing the value 3
                return diceValues.filter(val => val === 3).reduce((sum, val) => sum + val, 0);
            case 'Fours':
                // Sums all dice showing the value 4
                return diceValues.filter(val => val === 4).reduce((sum, val) => sum + val, 0);
            case 'Fives':
                // Sums all dice showing the value 5
                return diceValues.filter(val => val === 5).reduce((sum, val) => sum + val, 0);
            case 'Sixes':
                // Sums all dice showing the value 6
                return diceValues.filter(val => val === 6).reduce((sum, val) => sum + val, 0);
            case 'Three of a Kind':
                // Checks if there are at least 3 of the same value and sums all dice
                return this.checkOfAKind(diceValues, 3);
            case 'Four of a Kind':
                // Checks if there are at least 4 of the same value and sums all dice
                return this.checkOfAKind(diceValues, 4);
            case 'Full House':
                // Checks if there is a pair and a three of a kind, scores 25 points
                return this.checkFullHouse(diceValues);
            case 'Small Straight':
                // Checks for a sequence of 4 consecutive numbers, scores 30 points
                return this.checkStraight(diceValues, 4) ? 30 : 0;
            case 'Large Straight':
                // Checks for a sequence of 5 consecutive numbers, scores 40 points
                return this.checkStraight(diceValues, 5) ? 40 : 0;
            case 'Yatzy':
                // Checks if all 5 dice are the same, scores 50 points
                return this.checkOfAKind(diceValues, 5) ? 50 : 0;
            case 'Chance':
                // Sums all dice values
                return diceValues.reduce((sum, val) => sum + val, 0);
            default:
                // Handles unknown categories
                throw new Error(`Unknown scoring category: ${category}`);
        }
    }

    /**
     * Checks if there are at least a certain number of dice with the same value.
     * @param {Array<number>} diceValues - Array of dice values to evaluate.
     * @param {number} count - The required number of matching dice.
     * @returns {number} - The total of all dice if the condition is met, otherwise 0.
     */
    checkOfAKind(diceValues, count) {
        const counts = this.getCounts(diceValues);
        return Object.values(counts).some(val => val >= count)
            ? diceValues.reduce((sum, val) => sum + val, 0)
            : 0;
    }

    /**
     * Checks if the dice values form a Full House (a pair and a three of a kind).
     * @param {Array<number>} diceValues - Array of dice values to evaluate.
     * @returns {number} - 25 points if it's a Full House, otherwise 0.
     */
    checkFullHouse(diceValues) {
        const counts = Object.values(this.getCounts(diceValues));
        return counts.includes(3) && counts.includes(2) ? 25 : 0;
    }

    /**
     * Checks if the dice values form a straight of a certain length.
     * @param {Array<number>} diceValues - Array of dice values to evaluate.
     * @param {number} length - The required straight length (4 or 5).
     * @returns {boolean} - True if the straight is found, otherwise false.
     */
    checkStraight(diceValues, length) {
        const uniqueValues = [...new Set(diceValues)].sort();
        let straightCount = 1;
        for (let i = 1; i < uniqueValues.length; i++) {
            if (uniqueValues[i] === uniqueValues[i - 1] + 1) {
                straightCount++;
                if (straightCount === length) return true;
            } else {
                straightCount = 1;
            }
        }
        return false;
    }

    /**
     * Counts the occurrences of each dice value.
     * @param {Array<number>} diceValues - Array of dice values to count.
     * @returns {Object} - An object with dice values as keys and their counts as values.
     */
    getCounts(diceValues) {
        return diceValues.reduce((counts, val) => {
            counts[val] = (counts[val] || 0) + 1;
            return counts;
        }, {});
    }
}
