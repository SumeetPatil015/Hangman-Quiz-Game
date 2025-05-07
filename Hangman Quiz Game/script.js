const wordList = [
    {
      word: "guitar",
      hint: "🎸 What instrument has six strings and is often used in rock music?"
    },
    {
      word: "elephant",
      hint: "🐘 Which large animal has a trunk and big ears?"
    },
    {
      word: "pyramid",
      hint: "📐 What ancient Egyptian structure has triangular sides?"
    },
    {
      word: "oxygen",
      hint: "🫧 What gas do humans breathe in to survive?"
    },
    {
      word: "rainbow",
      hint: "🌈 What appears in the sky after rain with multiple colors?"
    }
  ];
  
  const wordDisplay = document.querySelector(".word-display");
  const guessesText = document.querySelector(".guesses-text b");
  const hintText = document.querySelector(".hint-text b");
  const keyboardDiv = document.querySelector(".keyboard");
  const gameModal = document.querySelector(".game-modal");
  const playAgainBtn = document.querySelector(".play-again");
  
  let currentWord, correctLetters, wrongGuessCount, maxGuesses = 6;
  
  const getRandomWord = () => {
    const { word, hint } = wordList[Math.floor(Math.random() * wordList.length)];
    currentWord = word.toLowerCase();
    correctLetters = [];
    wrongGuessCount = 0;
  
    wordDisplay.innerHTML = currentWord.split("").map(() => `<li></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn => btn.disabled = false);
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
    hintText.innerText = hint;
  };
  
  const gameOver = (isVictory) => {
    setTimeout(() => {
      const modalText = isVictory 
        ? `🎉 You answered correctly!` 
        : `😞 Oops! Better luck next time.`;
  
      gameModal.querySelector("img").src = `images/${isVictory ? 'victory' : 'lost'}.gif`;
      gameModal.querySelector("h4").innerText = isVictory ? 'You Won! 🎊' : 'You Lost 😔';
      gameModal.querySelector("p").innerHTML = `${modalText}<br>The correct answer was: <b>${currentWord}</b>`;
      gameModal.classList.add("show");
    }, 300);
  };
  
  const initGame = (button, clickedLetter) => {
    if (currentWord.includes(clickedLetter)) {
      [...currentWord].forEach((letter, index) => {
        if (letter === clickedLetter) {
          correctLetters.push(letter);
          wordDisplay.querySelectorAll("li")[index].innerText = letter;
        }
      });
    } else {
      wrongGuessCount++;
    }
  
    button.disabled = true;
    guessesText.innerText = `${wrongGuessCount} / ${maxGuesses}`;
  
    if (wrongGuessCount === maxGuesses) return gameOver(false);
    if (correctLetters.length === currentWord.length) return gameOver(true);
  };
  
  for (let i = 97; i <= 122; i++) {
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, button.innerText));
  }
  
  getRandomWord();
  playAgainBtn.addEventListener("click", () => {
    gameModal.classList.remove("show");
    getRandomWord();
  });