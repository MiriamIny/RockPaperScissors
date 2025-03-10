function playGame(button)
{ 
    // Hide the start button and results once the game begins
    button.style.visibility = 'hidden';
    document.getElementById("result").style.visibility = 'hidden';

    // Show the user's choices after a 1-second delay
    setTimeout(function() {
        document.getElementById("user").style.visibility = 'visible';
    }, 1000);

    // Enable keyboard shortcuts once the game starts
    document.addEventListener("keypress", handleKeyboardInput);
}

function handleKeyboardInput(event) 
{
    // Check the key pressed and simulate the corresponding image click
    if (event.key === 'r' || event.key === 'R') 
    {
        /* Call chooseImage function with the image element corresponding to "rock" */
        chooseImage(document.querySelector('img[alt="rock"]'));

    } else if (event.key === 'p' || event.key === 'P') 
    {
        /* Call chooseImage function with the image element corresponding to "paper" */
        chooseImage(document.querySelector('img[alt="paper"]'));

    } else if (event.key === 's' || event.key === 'S') 
    {
        /* Call chooseImage function with the image element corresponding to "scissor" */
        chooseImage(document.querySelector('img[alt="scissor"]'));
    }
}

function chooseImage(img)
{
    // Hide the user's choices once they have selected an option
    document.getElementById("user").style.visibility = 'hidden';
    
    let winner = "Tie";  // Default winner is "Tie"
    
    // Get user choice 
    const userChoice = img.getAttribute('alt');
    
    // Get computer choice (random)
    const choices = ['rock', 'paper', 'scissor'];
    let computerChoice = choices[Math.floor(Math.random() * 3)];

    // Determine winner
    if (computerChoice == 'rock')
    {
        if (userChoice == 'paper') winner = "You!";  
        if (userChoice == 'scissor') winner = "Me!"; 
    }

    if (computerChoice == 'paper')
    {
        if (userChoice == 'rock') winner = "Me!";  
        if (userChoice == 'scissor') winner = "You!"; 
    }

    if (computerChoice == 'scissor')
    {
        if (userChoice == 'rock') winner = "You!";  
        if (userChoice == 'paper') winner = "Me!";  
    }

    // Disable keyboard input after the game ends
    document.removeEventListener("keydown", handleKeyboardInput);

    // Display results after a 1-second delay
    setTimeout(display, 1000);

    function display()
    {
        // If the user wins, trigger the confetti effect
        if (winner == "You!") 
        {
            throwConfetti(); /* This was taken from JavaScript confetti */
        }

        // Display user's and computer's choices and winner
        document.getElementById('userChoice').innerText = 'Your choice: ' + userChoice;
        document.getElementById('computerChoice').innerText = 'My choice: ' + computerChoice;
        document.getElementById('winner').innerText = 'Winner: ' + winner;

        // Make the result visible
        document.getElementById("result").style.visibility = "visible";
        
        // Change the play button text and make it visible for replay
        playButton = document.getElementById("playButton");
        playButton.innerText = "Play again!";
        playButton.style.visibility = 'visible';
    }
}

// Found online
function throwConfetti() {
    console.log('Confetti is triggered!');
    
    // Trigger the confetti animation with the specified settings
    confetti({
        particleCount: 100,  // Number of confetti particles
        angle: 60,           // Angle of spread (0 - 360 degrees)
        spread: 55,          // How wide the spread of confetti is
        origin: { x: 0.5, y: 0.5 },  // Origin point (center of the screen)
        duration: 5000,      // Duration in milliseconds (5000 ms = 5 seconds)
        gravity: 0.5         // The gravity of confetti, adjust for falling speed
    });
}
