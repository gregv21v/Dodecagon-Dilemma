let canvas = document.querySelector('canvas');
let context = canvas.getContext('2d');

/**
 * 0 - rotate
 * 1 - swap
 */
let mode = 0 

let grid = new WheelGrid();
grid.draw(context);

let selectedWheels = [
    null, null
];
let selectedIndex = 0;

let wheelOrder = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];


document.querySelector("canvas").addEventListener("click", function(event) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    let rect = canvas.getBoundingClientRect();
    let x = event.clientX - rect.left;
    let y = event.clientY - rect.top;

    

    if (mode == 0) {
        selectedWheels[0] = grid.getClickedWheel({x, y});
        selectedWheels[0].rotate(1);
        grid.clearAdjacentWheels(selectedWheels[0].letter);
        grid.checkWheelsAround(selectedWheels[0].letter);
    } else if (mode == 1) {
        if(selectedIndex === 0) {
            if(selectedWheels[0] !== null) selectedWheels[0].color = "grey";
            selectedWheels[0] = grid.getClickedWheel({x, y});
            selectedWheels[0].color = "red";
            selectedIndex = 1;
        } else {
            if(selectedWheels[1] !== null) selectedWheels[1].color = "grey";
            selectedWheels[1] = grid.getClickedWheel({x, y});
            selectedWheels[1].color = "green";
            selectedIndex = 0;
        }

        console.log(selectedWheels[0], selectedWheels[1]);
        if(selectedWheels[0] && selectedWheels[1]) {
            grid.clearAdjacentWheels(selectedWheels[0].letter);
            grid.clearAdjacentWheels(selectedWheels[1].letter);
            grid.swapWheels(selectedWheels[0].letter, selectedWheels[1].letter);
            grid.checkWheelsAround(selectedWheels[0].letter);
            grid.checkWheelsAround(selectedWheels[1].letter);
            selectedWheels[0].color = "grey";
            selectedWheels[1].color = "grey";
            selectedWheels = [null, null];
            selectedIndex = 0;
        }
    }

    grid.draw(context);
});


document.querySelector("#swap").addEventListener("click", function(event) {
    mode = 1;
    document.querySelector("#mode").innerHTML = "Swap";
});

document.querySelector("#rotate").addEventListener("click", function(event) {
    mode = 0;
    document.querySelector("#mode").innerHTML = "Rotate";
});

document.querySelector("#undo").addEventListener("click", function(event) {
    // undo the last move
});

document.querySelector("#solve").addEventListener("click", function(event) {
    // solve the puzzle

    // using algorithm 1 (brute force method)
    
    // 1. Place the first wheel in the top left corner
    // wheel is already in the correct location
    //2. Place the second wheel in the position after that. <br>
    // wheel is already in the correct location
    //3. Rotate the second wheel until it aligns with all the wheels already placed <br>
    // rotate the wheel

    let index = 1;
    let letter = wheelOrder[index];
    let wheel = grid.getWheelByLetter(letter);
    let rotation = 0;
    let isAligned = false;
    let interval = setInterval(() => {

        wheel.rotate(1);
        rotation++;
        grid.clearAdjacentWheels(letter);
        grid.checkWheelsAround(letter);
        grid.draw(context);

        // if on the top row
        if(index >= 1 && index <= 3) {
            isAligned = grid.isLeftAligned(letter);
        }

        // if on the middle row
        if(index >= 5 && index <= 11 && index !== 8) {
            isAligned = grid.isLeftAligned(letter) && grid.isTopAligned(letter);
        }

        // left bottom two wheels
        if(index === 4 || index === 8) {
            isAligned = grid.isTopAligned(letter);
        }


        // exit the loop if edges are aligned or the wheel has been fully rotated
        if(isAligned || rotation >= 12) {
            // swap the current wheel with the next wheel
            console.log(rotation)
            if(rotation >= 12 && index + 1 < wheelOrder.length) {
                let swappingLetter = wheelOrder[index + 1];

                let temp = wheelOrder[index];
                wheelOrder[index] = swappingLetter;
                wheelOrder[index + 1] = temp;
                grid.clearAdjacentWheels(letter);
                grid.clearAdjacentWheels(swappingLetter);
                grid.swapWheels(letter, swappingLetter);
                grid.checkWheelsAround(letter);
                grid.checkWheelsAround(swappingLetter);
                console.log(wheelOrder);
            }

            index++;
            rotation = 0;
            letter = wheelOrder[index];
            wheel = grid.getWheelByLetter(letter);
        } 

        // if there are no more wheels to place, stop the interval
        if(index >= wheelOrder.length) {
            clearInterval(interval);
        }
    }, 1000);
    
    //4. If a full rotation does not reach a configuration where the 
        //wheel fits, then try the next wheel in the list of wheels. <br>

    
    //4. Repeat step 2 <br>
    //5. After all the wheels have been placed 



})



