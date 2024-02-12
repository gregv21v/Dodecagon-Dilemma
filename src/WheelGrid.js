/**
 * WheelGrid - the grid where all the wheels are placed
 */
class WheelGrid {
    static Rows = 3;
    static Columns = 4;
    

    /**
     * constructor()
     * @description creates a new wheel grid
     */
    constructor() {

        // initialize the grid of wheels
        this._grid = [
            [
                new Wheel(Wheel.Radius, "A", [1, 5, 4, 12, 7, 2, 9, 8, 3, 11, 6, 10]),
                new Wheel(Wheel.Radius, "B", [1, 12, 9, 10, 8, 4, 2, 11, 7, 3, 5, 6]),
                new Wheel(Wheel.Radius, "C", [1, 6, 7, 10, 4, 2, 11, 3, 12, 9, 8, 3]),
                new Wheel(Wheel.Radius, "D", [1, 8, 9, 10, 11, 12, 7, 2, 3, 4, 5, 6])
            ],
            [
                new Wheel(Wheel.Radius, "E", [1, 5, 11, 2, 4, 3, 10, 7, 8, 6, 12, 9]),
                new Wheel(Wheel.Radius, "F", [1, 10, 11, 3, 4, 8, 9, 2, 6, 5, 7, 12]),
                new Wheel(Wheel.Radius, "G", [1, 7, 2, 5, 10, 12, 11, 9, 5, 6, 4, 8]),
                new Wheel(Wheel.Radius, "H", [1, 10, 12, 6, 7, 5, 3, 2, 9, 8, 11, 4]),
            ],
            [
                new Wheel(Wheel.Radius, "I", [1, 7, 5, 3, 12, 10, 11, 9, 2, 6, 4, 8]),
                new Wheel(Wheel.Radius, "J", [1, 7, 11, 2, 4, 3, 12, 5, 8, 6, 10, 9]),
                new Wheel(Wheel.Radius, "K", [1, 3, 10, 12, 6, 4, 2, 7, 9, 5, 8, 11]),
                new Wheel(Wheel.Radius, "L", [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]),
            ]
        ]

        this._locations = {}; // a lookup table for the location of each wheel indexed 
                              // by the letter of the wheel
        for (let y = 0; y < this._grid.length; y++) {
            for (let x = 0; x < this._grid[y].length; x++) {
                const wheel = this._grid[y][x];
                this._locations[wheel.letter] = {x, y}
            }
        }

        this.positionWheels();
    }


    /**
     * get grid()
     * @description gets the grid of wheels
     * @returns the grid of wheels
     */
    get grid() {
        return this._grid;
    }

    /**
     * positionWheels()
     * @description positions the wheels in the grid
     */
    positionWheels() {
        // position the wheels
        let i = 0, j = 0;
        for (const row of this._grid) {
            for (const wheel of row) {
                wheel.position = {
                    x: 70 + j * Wheel.Radius * 2,
                    y: 70 + i * Wheel.Radius * 2
                }
                j++;
            }
            i++;
            j = 0;
        }
    }


    /**
     * getWheelByLetter()
     * @description returns the wheel with the specified letter
     * @param {character} letter the letter of the wheel to return
     */
    getWheelLocationByLetter(letter) {
        return this._locations[letter];
    }


    /**
     * getWheelAt()
     * @description returns the wheel at a given location
     * @param {number} x the x coordinate of the wheel
     * @param {number} y the y coorindate of the wheel
     */
    getWheelAt(x, y) {
        return this._grid[y][x];
    }


    /**
     * getWheelByLetter()
     * @description returns the wheel with the specified letter
     */
    getWheelByLetter(letter) {
        const {x, y} = this.getWheelLocationByLetter(letter);
        return this.getWheelAt(x, y);
    }


    /**
     * clearAdjacentWheels()
     * @description clears the colors of adjacent wheels to a specified wheel
     * @param {letter} letter the letter of the wheel to clear adjacent wheels for
     */
    clearAdjacentWheels(letter) {
        const loc = this.getWheelLocationByLetter(letter);

        // clear the wheels above below, and to the left and right of this one
        if(loc.y - 1 >= 0) {
            this._grid[loc.y - 1][loc.x].clearBottom()
        }

        if(loc.y + 1 < this._grid.length) {
            this._grid[loc.y + 1][loc.x].clearTop()
        }

        if(loc.x - 1 >= 0) {
            this._grid[loc.y][loc.x - 1].clearRight()
        }

        if(loc.x + 1 < this._grid[0].length) {
            this._grid[loc.y][loc.x + 1].clearLeft()
        }

        this._grid[loc.y][loc.x].clearColors()
    }



    /**
     * checkWheelsAround()
     * @description checks if the wheel numbers align on their edges centered around the specified wheel
     * @param {Wheel} wheel the wheel to check around
     */
    checkWheelsAround(letter) {
        let loc = this.getWheelLocationByLetter(letter);

        console.log("Wheels Around Checked");

        // check if the wheel just above this one aligns with it
        if(loc.y - 1 >= 0) {
            if(this._grid[loc.y - 1][loc.x].getBottom() == this._grid[loc.y][loc.x].getTop()) {
                // color the segments that match green
                this._grid[loc.y - 1][loc.x].colorBottom()
                this._grid[loc.y][loc.x].colorTop()

                console.log("Top");
            }
        }

        // check if the bottom wheel aligns with this one
        if(loc.y + 1 < this._grid.length) {
            if(this._grid[loc.y + 1][loc.x].getTop() == this._grid[loc.y][loc.x].getBottom()) {
                // color the segments that match green
                this._grid[loc.y + 1][loc.x].colorTop()
                this._grid[loc.y][loc.x].colorBottom()
                
                console.log("Bottom");
            }
        }

        // check if the wheel to the left aligns with this one
        if(loc.x - 1 >= 0) {
            if(this._grid[loc.y][loc.x - 1].getRight() == this._grid[loc.y][loc.x].getLeft()) {
                // color the segments that match green
                this._grid[loc.y][loc.x - 1].colorRight()
                this._grid[loc.y][loc.x].colorLeft()

                console.log("Left");
            }
        }

        // check if the wheel to the right aligns with this one
        if(loc.x + 1 < this._grid[0].length) {
            if(this._grid[loc.y][loc.x + 1].getLeft() == this._grid[loc.y][loc.x].getRight()) {
                // color the segments that match green
                this._grid[loc.y][loc.x + 1].colorLeft()
                this._grid[loc.y][loc.x].colorRight()

                console.log("Top");
            }
        }
    }


    /**
     * isTopAligned()
     * @description checks if the wheels are aligned on the top edge
     * @param {character} letter the letter of the wheel to check
     */
    isTopAligned(letter) {
        let loc = this.getWheelLocationByLetter(letter);

        if(loc.y - 1 >= 0) {
            if(this._grid[loc.y - 1][loc.x].getBottom() == this._grid[loc.y][loc.x].getTop()) {
                // color the segments that match green
                return true;
            }
        }
        return false;
    }

    /**
     * isBottomAligned()
     * @description checks if the wheels are aligned on the top edge
     * @param {character} letter the letter of the wheel to check
     */
    isBottomAligned(letter) {
        let loc = this.getWheelLocationByLetter(letter);

        // check if the bottom wheel aligns with this one
        if(loc.y + 1 < this._grid.length) {
            if(this._grid[loc.y + 1][loc.x].getTop() == this._grid[loc.y][loc.x].getBottom()) {
                // color the segments that match green
                return true;
            }
        }

        return false;
    }

    /**
     * isTopAligned()
     * @description checks if the wheels are aligned on the top edge
     * @param {character} letter the letter of the wheel to check
     */
    isLeftAligned(letter) {
        let loc = this.getWheelLocationByLetter(letter);

        // check if the wheel to the left aligns with this one
        if(loc.x - 1 >= 0) {
            if(this._grid[loc.y][loc.x - 1].getRight() == this._grid[loc.y][loc.x].getLeft()) {
                // color the segments that match green
                return true;
            }
        }
        return false;
    }

    /**
     * isTopAligned()
     * @description checks if the wheels are aligned on the top edge
     * @param {character} letter the letter of the wheel to check
     */
    isRightAligned(letter) {
        let loc = this.getWheelLocationByLetter(letter);

        // check if the wheel to the right aligns with this one
        if(loc.x + 1 < this._grid[0].length) {
            if(this._grid[loc.y][loc.x + 1].getLeft() == this._grid[loc.y][loc.x].getRight()) {
                // color the segments that match green
                return true;
            }
        }
        return false;
    }


    /**
     * swapWheels()
     * @description swaps the wheels in the grid
     * @param {character} letter the letter of the wheel to be swapped
     * @param {character} letter2 the letter of the wheel to swap with
     */
    swapWheels(sourceLetter, destinationLetter) {
        let source = this._locations[sourceLetter]// the location of sourceLetter 
        let destination = this._locations[destinationLetter]// the location of destinationLetter

        // swap the location of the wheels
        this._locations[sourceLetter] = destination;
        this._locations[destinationLetter] = source;

        // swap the wheels
        let temp = this._grid[source.y][source.x];
        this._grid[source.y][source.x] = this._grid[destination.y][destination.x];
        this._grid[destination.y][destination.x] = temp;

        // update the locations of the wheels
        this.positionWheels();
    }



    /**
     * getClickedWheel()
     * @description returns the wheel that was clicked
     * @param {object} position the position of the click
     */
    getClickedWheel(position) {
        for (const row of this._grid) {
            for (const wheel of row) {
                if (wheel.isClicked(position)) {
                    return wheel;
                }
            }
        }
        return null;
    }


    /**
     * draw()
     * @description draws the grid of wheels
     * @param {CanvasRenderingContext2D} ctx the context to draw the wheels on
     */
    draw(ctx) {
        for (const row of this._grid) {
            for (const wheel of row) {
                wheel.draw(ctx);
            }
        }
    }
}
