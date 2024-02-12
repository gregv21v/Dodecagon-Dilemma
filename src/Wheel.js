class Wheel {

    static Sides = 12;
    static Radius = 70;

    /**
     * 
     * @param {number} radius the radius of the wheel
     * @param {Array[Number]} numbers the order of the numbers on the wheel
     */
    constructor(radius, letter, numbers) {
        this._radius = radius;
        this._numbers = numbers;
        this._colored = Array(Wheel.Sides).fill(false);
        this._letter = letter;
        this._position = {x: 0, y: 0};
        //this._selected = false;
        this._color = "grey";
    }


    /**
     * alignsWith()
     * @description determines if the wheel is aligned with the another wheel
     * @param {Wheel} wheel the other wheel to align with
     */
    alignsWith(wheel, grid) {
        // find the both wheels in the graph and mark down their locations


        // check if they are adjacent to each other in the grid

        // if they are adjacent check if the the numbers on their edges line up
    }


    /**
     * getTop()
     * @description returns the top number on the wheel
     */
    getTop() {
        return this._numbers[6];
    }

    /**
     * getBottom()
     * @description returns the bottom number on the wheel
     */
    getBottom() {
        return this._numbers[0];
    }

    /**
     * getLeft()
     * @description returns the left number on the wheel
     */
    getLeft() {
        return this._numbers[9];
    }

    /**
     * getRight()
     * @description returns the right number on the wheel
     */
    getRight() {
        return this._numbers[3];
    }

    /**
     * colorTop()
     * @description colors the top number on the wheel
     */
    colorTop() {
        this._colored[6] = true;
    }

    /**
     * colorBottom()
     * @description colors the bottom number on the wheel
     */
    colorBottom() {
        this._colored[0] = true;
    }

    /**
     * colorLeft()
     * @description colors the left number on the wheel
     */
    colorLeft() {
        this._colored[9] = true;
    }

    /**
     * colorRight()
     * @description colors the right number on the wheel
     */
    colorRight() {
        return this._colored[3] = true;
    }


    /**
     * clearTop()
     * @description clears the color for the top of the wheel
     */
    clearTop() {
        this._colored[6] = false;
    }

    /**
     * clearBottom()
     * @description clears the color for the bottom of the wheel
     */
    clearBottom() {
        this._colored[0] = false;
    }

    /**
     * clearLeft()
     * @description clears the color for the left number on the wheel
     */
    clearLeft() {
        this._colored[9] = false;
    }

    /**
     * clearRight()
     * @description clears the color for the right number on the wheel
     */
    clearRight() {
        return this._colored[3] = false;
    }

    /**
     * clearColors()
     * @description clears the colors on the wheel
     */
    clearColors() {
        this._colored = Array(Wheel.Sides).fill(false);
    }

    /**
     * isClicked() 
     * @description determines if the wheel was clicked
     * @param {Object} position the position of the click
     */
    isClicked(position) {
        return Math.sqrt(
            Math.pow(position.x - this._position.x, 2) + Math.pow(position.y - this._position.y, 2)
        ) < this._radius;
    }


    


    /**
     * rotate()
     * @description rotates the wheel
     * @param {number} amount the amount to rotate the wheel by (1 - 12)
     */
    rotate(amount) {
        this._rotationAmount = ((this._rotationAmount | 0) + amount) % Wheel.Sides;

        for(let i = 0; i < amount; i++) {
            this._numbers.unshift(this._numbers.pop());
        }

        console.log(this._numbers);
    }

    /**
     * get position()
     * @returns {Object} the position of the wheel
     */
    get position() {
        return this._position;
    }

    /**
     * set position()
     * @param {Object} position the position of the wheel
     */
    set position(position) {
        this._position = position;
    }

    /**
     * get letter()
     * @returns {string} the letter on the wheel
     */
    get letter() {
        return this._letter;
    }

    /**
     * set color()
     * @param {string} color the color to set the wheel to
     */
    set color(color) {
        this._color = color;
    }

    /**
     * select()
     * @description selects the wheel
     */
    select() {
        this._selected = true;
    }

    /** 
     * deselect()
     * @description deselects the wheel
     */
    deselect() {
        this._selected = false;
    }


    /**
     * drawWheel()
     * @description draws the wheel
     * @param {CanvasRenderingContext2D} context the context to draw the wheel on
     */
    drawSegments(context) {
        // draw the wheel
        context.fillStyle = this._color;
        
        for (let index = 0; index < Wheel.Sides; index++) {
            if(this._colored[index]) {
                context.fillStyle = "red";
            } else {
                context.fillStyle = this._color;
            }

            context.beginPath();

            let angle1 = (index) * (360 / Wheel.Sides) + ((360 / Wheel.Sides)/2)
            let angle2 = (index-1) * (360 / Wheel.Sides) + ((360 / Wheel.Sides)/2)

            let startPoint = {
                x: this._position.x + this._radius * Math.sin(angle1 * (Math.PI / 180)),
                y: this._position.y + this._radius * Math.cos(angle1 * (Math.PI / 180))
            }

            let endPoint = {
                x: this._position.x + this._radius * Math.sin(angle2 * (Math.PI / 180)),
                y: this._position.y + this._radius * Math.cos(angle2 * (Math.PI / 180))
            }

            context.moveTo(this._position.x, this._position.y);
            context.lineTo(endPoint.x, endPoint.y);
            context.lineTo(startPoint.x, startPoint.y);
            
            context.lineTo(this._position.x, this._position.y);

            context.fill();
            context.closePath();
            
        }
        
    }


    /**
     * drawDividingLines()
     * @description draws the dividing lines on the wheel
     * @param {CanvasRenderingContext2D} context the context to draw the wheel on
     */
    drawDividingLines(context) {
        // draw the dividing lines
        for (let index = 0; index < Wheel.Sides; index++) {
            context.strokeStyle = "black";
            context.lineWidth = 1;
            context.beginPath();

            let angle1 = (index) * (360 / Wheel.Sides) + ((360 / Wheel.Sides)/2)

            let point = {
                x: this._position.x + this._radius * Math.sin(angle1 * (Math.PI / 180)),
                y: this._position.y + this._radius * Math.cos(angle1 * (Math.PI / 180))
            }


            context.moveTo(this._position.x, this._position.y);
            context.lineTo(point.x, point.y);

            context.stroke();            
        }
    }


    /**
     * drawNumbers()
     * @description draws the numbers on the wheel
     * @param {CanvasRenderingContext2D} context the context to draw the wheel on
     */
    drawNumbers(context) {
        // draw the numbers on the wheel
        context.fillStyle = "black";

        for (let index = 0; index < Wheel.Sides; index++) {

            let angle1 = (index) * (360 / Wheel.Sides)


            let point = {
                x: this._position.x + (this._radius - 10) * Math.sin(angle1 * (Math.PI / 180)),
                y: this._position.y + (this._radius - 10) * Math.cos(angle1 * (Math.PI / 180))
            }

            context.textAlign = "center";
            context.textBaseline = "middle";
            context.fillText(this._numbers[index], point.x, point.y);
            
        }

        // draw the letter on the wheel
        let angle = (this._rotationAmount | 0) * (360 / Wheel.Sides)

        let point = {
            x: this._position.x + (30) * Math.sin(angle * (Math.PI / 180)),
            y: this._position.y + (30) * Math.cos(angle * (Math.PI / 180))
        }

        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(this._letter, point.x, point.y);
    }


    /**
     * toJSON()
     * @description returns the wheel as a JSON object
     */
    toJSON() {
        return {
            position: this._position,
            letter: this._letter,
            color: this._color,
            rotationAmount: this._rotationAmount,
            numbers: this._numbers,
            colored: this._colored
        }
    }
        

    /**
     * draw()
     * @description draws the wheel
     * @param {CanvasRenderingContext2D} context the context to draw the wheel on
     */
    draw(context) {
        this.drawSegments(context);
        this.drawDividingLines(context);
        this.drawNumbers(context);
    }
}