document.addEventListener('DOMContentLoaded', function () 
{
    document.getElementById("playButton").addEventListener("click", startGame);

    function startGame(e)
    { 
        // Hide the start button and results once the game begins
        e.target.style.visibility = 'hidden';
        document.getElementById("result").style.visibility = 'hidden';

        // scroll down to game section
        window.scrollTo({top: document.body.scrollHeight,  behavior: 'smooth'});

        // Show the user's choices after a 1-second delay
        setTimeout(function() {
            document.getElementById("user").style.visibility = 'visible';
        }, 1000);

        // Enable keyboard shortcuts once the game starts
        document.addEventListener("keypress", handleKeyboardInput);
    }

    function handleKeyboardInput(e) 
    {
        // Check the key pressed and simulate the corresponding image click
        if (e.key === 'r' || e.key === 'R') 
        {
            /* Call chooseImage function with the image element corresponding to "rock" */
            playGame("rock");

        } else if (e.key === 'p' || e.key === 'P') 
        {
            /* Call chooseImage function with the image element corresponding to "paper" */
            playGame("paper");

        } else if (e.key === 's' || e.key === 'S') 
        {
            /* Call chooseImage function with the image element corresponding to "scissor" */
            playGame("scissor");
        }
    }

    document.getElementById("rock").addEventListener("click", playGame);
    document.getElementById("paper").addEventListener("click", playGame);
    document.getElementById("scissor").addEventListener("click", playGame);

    function playGame(e)

    {
        // Hide the user's choices once they have selected an option
        document.getElementById("user").style.visibility = 'hidden';
        
        let winner = "Tie";  // Default winner is "Tie"
        
        // Get user choice 
        let userChoice;

        // If e is string - function called from keyboard input, e will be the choice (rock, paper, or scissor)
        if (typeof e === 'string') userChoice = e;

        // If e is event - function called by event listener, choice is determined through e.target.id
        else userChoice = e.target.id;
        
        // Get computer choice (random)
        const choices = ['rock', 'paper', 'scissor'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];

        // Determine winner
        if (computerChoice === 'rock')
        {
            if (userChoice === 'paper') winner = "You!";  
            if (userChoice === 'scissor') winner = "Me!"; 
        }

        if (computerChoice === 'paper')
        {
            if (userChoice === 'rock') winner = "Me!";  
            if (userChoice === 'scissor') winner = "You!"; 
        }

        if (computerChoice === 'scissor')
        {
            if (userChoice === 'rock') winner = "You!";  
            if (userChoice === 'paper') winner = "Me!";  
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
})