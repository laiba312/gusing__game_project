import * as readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class GuessTheNumberGame {
  private readonly MAX_NUMBER: number = 100;
  private readonly MAX_TRIES: number = 5;
  private readonly ROUND_COUNT: number = 3;
  private score: number = 0;

  constructor() {
    console.log('Welcome to Guess the Number Game!');
    console.log(
      `You have ${this.MAX_TRIES} tries to guess a number between 1 and ${this.MAX_NUMBER}.`
    );
    console.log(`You will play ${this.ROUND_COUNT} rounds.`);
    console.log('--------------------------');
  }

  async startGame(): Promise<void> {
    for (let i = 0; i < this.ROUND_COUNT; i++) {
      console.log(`Round ${i + 1}:`);
      const randomNumber = this.generateRandomNumber();
      const result = await this.playRound(randomNumber); // await here
      if (result) {
        console.log('Congratulations! You guessed the number.');
        this.score++;
      } else {
        console.log(
          `Sorry, you didn't guess the number. The correct number was ${randomNumber}.`
        );
      }
      console.log('--------------------------');
    }
    console.log(
      `Game over! Your final score is: ${this.score}/${this.ROUND_COUNT}`
    );
    rl.close();
  }

  private generateRandomNumber(): number {
    return Math.floor(Math.random() * this.MAX_NUMBER) + 1;
  }

  private async getUserGuess(): Promise<number> {
    return new Promise<number>((resolve) => {
      rl.question('Enter your guess: ', (guess) => {
        const parsedGuess = parseInt(guess);
        if (!isNaN(parsedGuess)) {
          resolve(parsedGuess);
        } else {
          console.log('Invalid input. Please enter a valid number.');
          resolve(this.getUserGuess());
        }
      });
    });
  }

  private async playRound(randomNumber: number): Promise<boolean> {
    for (let i = 0; i < this.MAX_TRIES; i++) {
      const guess = await this.getUserGuess();
      if (guess === randomNumber) {
        return true;
      } else {
        console.log(
          `Incorrect guess. ${this.MAX_TRIES - i - 1} tries remaining.`
        );
      }
    }
    return false;
  }
}

const game = new GuessTheNumberGame();
game.startGame().catch((err) => console.error(err));
