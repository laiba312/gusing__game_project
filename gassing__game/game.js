"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline = __importStar(require("readline"));
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
class GuessTheNumberGame {
    constructor() {
        this.MAX_NUMBER = 100;
        this.MAX_TRIES = 5;
        this.ROUND_COUNT = 3;
        this.score = 0;
        console.log('Welcome to Guess the Number Game!');
        console.log(`You have ${this.MAX_TRIES} tries to guess a number between 1 and ${this.MAX_NUMBER}.`);
        console.log(`You will play ${this.ROUND_COUNT} rounds.`);
        console.log('--------------------------');
    }
    startGame() {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.ROUND_COUNT; i++) {
                console.log(`Round ${i + 1}:`);
                const randomNumber = this.generateRandomNumber();
                const result = yield this.playRound(randomNumber); // await here
                if (result) {
                    console.log('Congratulations! You guessed the number.');
                    this.score++;
                }
                else {
                    console.log(`Sorry, you didn't guess the number. The correct number was ${randomNumber}.`);
                }
                console.log('--------------------------');
            }
            console.log(`Game over! Your final score is: ${this.score}/${this.ROUND_COUNT}`);
            rl.close();
        });
    }
    generateRandomNumber() {
        return Math.floor(Math.random() * this.MAX_NUMBER) + 1;
    }
    getUserGuess() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                rl.question('Enter your guess: ', (guess) => {
                    const parsedGuess = parseInt(guess);
                    if (!isNaN(parsedGuess)) {
                        resolve(parsedGuess);
                    }
                    else {
                        console.log('Invalid input. Please enter a valid number.');
                        resolve(this.getUserGuess());
                    }
                });
            });
        });
    }
    playRound(randomNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            for (let i = 0; i < this.MAX_TRIES; i++) {
                const guess = yield this.getUserGuess();
                if (guess === randomNumber) {
                    return true;
                }
                else {
                    console.log(`Incorrect guess. ${this.MAX_TRIES - i - 1} tries remaining.`);
                }
            }
            return false;
        });
    }
}
const game = new GuessTheNumberGame();
game.startGame().catch((err) => console.error(err));
