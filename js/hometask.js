//task1

function assign() {
    for (var i = 0; i < arguments.length; i++) {
        for (var property in arguments[i]) {
            if (arguments[i].hasOwnProperty(property)) {
                arguments[0][property] = arguments[i][property];
            }
        }
    }
    return arguments[0];
}

// var defaults = { width: 100, height: 100 };
// var options = { width: 150 };
// var configs = assign({}, defaults, options); // -> {width: 150, height: 100}

//task2

function inherit(child, father) {
    child.prototype = Object.create(father.prototype);
    child.prototype.constructor = child;
}

function checkIsPositiveInteger(value) {
    return typeof value === "number" && (value % 1) === 0 && value >= 0;
}

var Character = function(obj) {
    this.name = obj.name;
    this.attack = obj.attack;
    this.hitpoints = obj.hitpoints;
    this.totalHitpoints = obj.hitpoints;
};

Character.prototype.getHitpoints = function() {
    return this.hitpoints;
};
Character.prototype.setHitpoitns = function(value) {
    if (checkIsPositiveInteger(value)) {
        if (value > this.totalHitpoints) {
            this.hitpoints = this.totalHitpoints;
        } else {
            this.hitpoints = value;
        }
    } else {
        this.hitpoints = 0;
    }
};

Character.prototype.getTotalHitpoints = function() {
    return this.totalHitpoints;
};

Character.prototype.setTotalHitpoits = function(value) {
    if (checkIsPositiveInteger(value)) {
        this.totalHitpoints = value;
    } else {
        this.totalHitpoints = 0;
    }
};

Character.prototype.isAlive = function() {
    return this.getHitpoints() > 0;
};

Character.prototype.getAttack = function() {
    return this.attack;
};

Character.prototype.setAttack = function(value) {
    if (checkIsPositiveInteger(value)) {
        this.attack = value;
    } else {
        this.attack = 0;
    }
};


var Champion = function(obj) {
    Character.call(this, obj);
    this.isBlocked = false;

    this.rest = function() {
        this.setHitpoitns(this.getHitpoints() + 5);
    };

    this.defence = function() {
        this.isBlocked = true;
    };

    this.experience = function() {
        this.setAttack(this.getAttack() + 1);
    };

};

inherit(Champion, Character);

Champion.prototype.fight = function(enemy) {
    if (enemy === this) {
        console.log("Fight whith youself is bad idea.");
    } else if (!enemy.isAlive()) {
        console.log("You enemy has dead already.");
    } else {

        if (enemy.isBlocked) {
            enemy.isBlocked = false;
            return this;
        }

        enemy.setHitpoitns(enemy.getHitpoints() - this.getAttack());

        if (!(enemy.isAlive())) {
            this.experience();
        }

    }
};

var Monster = function(obj) {
    Character.call(this, obj);
    this.rageHits = 0;

    this.enrage = function() {
        this.rageHits = 2;
    };

    this.feast = function(enemy) {
        this.setHitpoitns(this.getHitpoints() + Math.floor(enemy.getTotalHitpoints() * 0.25));
        this.setTotalHitpoits(this.getTotalHitpoints() + Math.floor(enemy.getTotalHitpoints() * 0.1));
    };

};

inherit(Monster, Character);

Monster.prototype.fight = function(enemy) {
    if (enemy === this) {
        console.log("Fight whith youself is bad idea.");
    } else if (!enemy.isAlive()) {
        console.log("You enemy has dead already.");
    } else {

        var multiple = 1;
        if (this.rageHits > 0) {
            this.rageHits--;
            multiple *= 2;
        }

        if (enemy.isBlocked) {
            enemy.isBlocked = false;
            return this;
        }

        enemy.setHitpoitns(enemy.getHitpoints() - multiple * this.getAttack());

        if (!enemy.isAlive()) {
            this.feast(enemy);
        }

    }
};

// var heracles = new Champion({
//     name: 'Heracles',
//     attack: 10,
//     hitpoints: 50
// });
//
// var boar = new Monster({
//     name: 'Erymanthian Boar',
//     attack: 5,
//     hitpoints: 100
// });

module.exports = {
    assign: assign,
    inherit: inherit,
    checkIsPositiveInteger: checkIsPositiveInteger,
    Character: Character,
    Champion: Champion,
    Monster: Monster
}
