/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/* global score */

var Direction = {
    LEFT: 37,
    UP: 1,
    RIGHT: 39,
    DOWN: 2,
    UP_LEFT: 3,
    UP_RIGHT: 4,
    RIGHT_UP: 5,
    LEFT_UP: 6
};

function Item(context, width, height) {
    this._context = context;
    this._width = width;
    this._height = height;
    
    this.width = function () {
        return this._width;
    };
    
    this.height = function () {
        return this._height;
    };
    
    this.paint = function () {        
    };
}

function Area(context, width, height) {
    Item.call(this, context, width, height);
    
    var image = new Image();
    image.src = "http://mrg.bz/HQAA2t";

    this.paint = function () {
        this._context.drawImage(image, 0, 0, this._width, this._height);
    };
    
    this.getContext = function () {
        return this._context;
    };
    
    this.check_up_left = function (item) {
        if (item.x() <= 0 && item.bottom() >= this._height) {
            item.setDirection(Direction.LEFT_UP);
        }
        else if (item.x() <= 0) {
            item.setDirection(Direction.UP_RIGHT);
        }
        else if (item.bottom() >= this._height) {
            item.setDirection(Direction.RIGHT_UP);
        }    
    };
    
    this.check_up_right = function (item) {
        if (item.right() >= this._width && item.bottom() >= this._height) {
            item.setDirection(Direction.RIGHT_UP);
        }
        else if (item.right() >= this._width) {
            item.setDirection(Direction.UP_LEFT);
        }
        else if (item.bottom() >= this._height) {
            item.setDirection(Direction.LEFT_UP);
        } 
    };
    
    this.check_right_up = function (item){
        if (item.x() <= 0 && item.y() <= 0) {
            item.setDirection(Direction.UP_RIGHT);
        }
        else if (item.x() <= 0) {
            item.setDirection(Direction.LEFT_UP);
        }
        else if (item.y() <= 0) {
            item.setDirection(Direction.UP_LEFT);
        } 
    };
    
    this.check_left_up = function (item) {
        if (item.right() >= this._width && item.y() <= 0) {
            item.setDirection(Direction.UP_LEFT);
        }
        else if (item.right() >= this._width) {
            item.setDirection(Direction.RIGHT_UP);
        }
        else if (item.y() <= 0) {
            item.setDirection(Direction.UP_RIGHT);
        } 
    };
}

function AreaItem(area, width, height) {
    Item.call(this, area.getContext(), width, height);
    
    this._area = area;
    this._x = 0;
    this._y = 0;
    this._step = 1;
    this._direction = Direction.LEFT;
    
    this.setStep = function (step) {
        this._step = step;
    };
    
    this.getStep = function () {
        return this._step;
    };
    
    this.setDirection = function (direction) {
        this._direction = direction;
    };
    
    this.getDirection = function () {
        return this._direction;
    };
    
    this.setPosition = function (x, y) {
        this._x = x;
        this._y = y;
    };
    
    this.x = function () {
        return this._x;
    };
    
    this.y = function () {
        return this._y;
    };
    
    this.right = function () {
        return this._x + this._width;
    };
    
    this.bottom = function () {
        return this._y + this._height;
    };
    
    this.contains_x = function (item) {
        return item.x() >= this.x() && item.x() <= this.right();
    };
    
    this.contains_y = function (item) {
        return item.bottom() >= this.y() && item.y() <= this.bottom();  
    };

    this.cross = function (item) {
        return this.contains_x(item) && this.contains_y(item);
    };    
    
    this.check_up_left = function (item) {
        if (this.cross(item)) {
            item.setPosition(item.x(), this.y() - item.height());
        }
        
        if (item.x() === this.right() && item.bottom() === this.y()) {
            item.setDirection(Direction.LEFT_UP);
            return true;
        }
        else if (item.x() === this.x() && this.contains_y(item)) {
            item.setDirection(Direction.UP_RIGHT);
            return true;
        }
        else if (item.bottom() === this.y() && this.contains_x(item)) {
            item.setDirection(Direction.RIGHT_UP);
            return true;
        }
        return false;
    };
    
    this.check_up_right = function (item) {
        if (this.cross(item)) {
            item.setPosition(item.x(), this.y() - item.height());
        }
        
        if (item.right() === this.x() && item.bottom() === this.y()) {
            item.setDirection(Direction.RIGHT_UP);
            return true;
        }
        else if (item.right() === this.x() && this.contains_y(item)) {
            item.setDirection(Direction.UP_LEFT);
            return true;
        }
        else if (item.bottom() === this.y() && this.contains_x(item)) {
            item.setDirection(Direction.LEFT_UP);
            return true;
        }
        return false;
    };
    
    this.check_right_up = function (item){
        if (this.cross(item)) {
            item.setPosition(item.x(), item.bottom());
        }
        
        if (item.x() === this.right() && item.y() === this.bottom()) {
            item.setDirection(Direction.UP_RIGHT);
            return true;
        }
        else if (item.x() === this.right() && this.contains_y(item)) {
            item.setDirection(Direction.LEFT_UP);
            return true;
        }
        else if (item.y() === this.bottom() && this.contains_x(item)) {
            item.setDirection(Direction.UP_LEFT);
            return true;
        }
        return false;
    };
    
    this.check_left_up = function (item) {
        if (this.cross(item)) {
            item.setPosition(item.x(), item.bottom());
        }
        
        if (item.right() === this.x() && item.y() === this.bottom()) {
            item.setDirection(Direction.UP_LEFT);
            return true;
        }
        else if (item.right() === this.x() && this.contains_y(item)) {
            item.setDirection(Direction.RIGHT_UP);
            return true;
        }
        else if (item.y() === this.bottom() && this.contains_x(item)) {
            item.setDirection(Direction.UP_RIGHT);
            return true;
        }
        return false;
    };
    
    this.move = function () {        
    };    
}

function Block(area, width, height) {
    AreaItem.call(this, area, width, height);
    
    var random_color = function () {
        var possible_color_components = "0123456789abcdef";
        var color = "#";
        var max_index = possible_color_components.length - 1;
        for(var i = 0; i < 3; ++i) {
            var index = Math.floor(Math.random() * max_index);
            color += possible_color_components.charAt(index);
        }    
        return color;
    };
    
    var color = random_color();
    
    this.paint = function () {
        this._context.fillStyle = color;
        this._context.fillRect(this._x, this._y, this._width, this._height);
    };
}

function Rackquet(area) {
    AreaItem.call(this, area, area.width() / 10, area.height() / 50);
    this.setStep(area.width() / 50);
    this.setPosition((area.width() - this.width()) / 2, 0);
    
    this.paint = function () {
        this._context.fillStyle = "#b00";
        this._context.fillRect(this._x, this._y, this._width, this._height);
    };
    
    this.move = function () {
        if (this._direction === Direction.LEFT) {
            this._x = Math.max(0, this._x - this._step);
        }
        else if (this._direction === Direction.RIGHT) {
            this._x = Math.min(area.width() - this.width(), this._x + this._step);
        }
    };
    
    this.move_left = function () {
        this.setDirection(Direction.LEFT);
        this.move();
    };
    
    this.move_right = function () {
        this.setDirection(Direction.RIGHT);
        this.move();
    };
}

function Blocks() {
    var blocks = [];
    
    this.make = function (area) {
        blocks = [];
        
        var offset = area.height() * 0.05;
        var rows = 5;
        var columns = 10;
        
        var free_space_width = area.width() - 2 * offset - (columns - 1) * offset;
        var free_space_height = area.height() / 2 - 2 * offset - (rows - 1) * offset;
        
        var block_width = free_space_width / columns;
        var block_height = free_space_height / rows;

        var x = offset;
        var y = area.height() - block_height - offset;
        
        for(var row = 0; row < rows; ++row) {
            for(var column = 0; column < columns; ++column) {
                var block = new Block(area, block_width, block_height);
                block.setPosition(x, y);
                blocks.push(block);               
                
                x += block_width;
                x += offset;
            }
            y -= block_height;
            y -= offset;
            x = offset;
        }    
    };
    
    this.paint = function () {
        for(var i = 0; i < blocks.length; ++i) {
            blocks[i].paint();
        }
    };    
        
    this.check_up_left = function (item) {
        for(var i = 0; i < blocks.length; ++i) {
            if (blocks[i].check_up_left(item)) {
                blocks.splice(i, 1);
                break;
            }
        }
    };
    
    this.check_up_right = function (item) {
        for(var i = 0; i < blocks.length; ++i) {
            if (blocks[i].check_up_right(item)) {
                blocks.splice(i, 1);
                break;
            }
        }
    };
    
    this.check_right_up = function (item){
        for(var i = 0; i < blocks.length; ++i) {
            if (blocks[i].check_right_up(item)) {
                blocks.splice(i, 1);
                break;
            }
        }
    };
    
    this.check_left_up = function (item) {
        for(var i = 0; i < blocks.length; ++i) {
            if (blocks[i].check_left_up(item)) {
                blocks.splice(i, 1);
                break;
            }
        }
    };    
}

function Ball(area, blocks) {
    AreaItem.call(this, area, area.height() / 25, area.height() / 25);
    this.setDirection(Direction.UP_RIGHT);
    
    this._blocks = blocks;
    
    this.paint = function () {
        var center_x = this._x + this._width / 2;
        var center_y = this._y + this._height / 2;
        var radius = this._width / 2;
        
        this._context.fillStyle = "#dd0";
        this._context.strokeStyle = this._context.fillStyle;
        this._context.beginPath();
        this._context.arc(center_x, center_y, radius, 0 * Math.PI, 2 * Math.PI);
        this._context.fill();
        this._context.stroke();
    };
    
    this.move = function () {
        switch(this._direction) {
            case Direction.UP_LEFT:
                this._x -= this._step;
                this._y += this._step;
                this._area.check_up_left(this);
                this._blocks.check_up_left(this);
                break;
            case Direction.UP_RIGHT:
                this._x += this._step;
                this._y += this._step;
                this._area.check_up_right(this);
                this._blocks.check_up_right(this);
                break;
            case Direction.RIGHT_UP:
                this._x -= this._step;
                this._y -= this._step;
                this._area.check_right_up(this);
                this._blocks.check_right_up(this);
                break;
            case Direction.LEFT_UP:
                this._x += this._step;
                this._y -= this._step;
                this._area.check_left_up(this);
                this._blocks.check_left_up(this);
                break;
        }
    };
}

function Arcanoid() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    var score = 0;
    var area = new Area(context, canvas.width, canvas.height);
    var rackquet = new Rackquet(area);

    var blocks = new Blocks();
    blocks.make(area);
    
    var ball = new Ball(area, blocks);
    ball.setPosition((area.width() - ball.width()) / 2, rackquet.height() + ball.height() / 2);    
    
    var paint_score = function () {
        document.getElementById("score").getElementsByTagName("h1")[0].innerHTML = "Your score: " + score;
    };
    
    var paint = function () {
        paint_score();
        area.paint();
        rackquet.paint();
        blocks.paint();
        ball.paint();
    };
    
    this.step = function () {
        paint();
        ball.move();
    };
    
    this.move_left = function () {
        rackquet.move_left();
    };
    
    this.move_right = function () {
        rackquet.move_right();
    };
}
