var should = require('chai').should();
var expect = require('chai').expect;
var exercise = require('../exercise.js');

data = [{
        rooms: 1,
        area: 350,
        type: 'apartment',
        distance: null
    },
    {
        rooms: 2,
        area: 300,
        type: 'apartment',
        distance: null
    },
    {
        rooms: 3,
        area: 300,
        type: 'apartment',
        distance: null
    },
    {
        rooms: 4,
        area: 250,
        type: 'apartment',
        distance: null
    },
    {
        rooms: 4,
        area: 500,
        type: 'apartment',
        distance: null
    },
    {
        rooms: 4,
        area: 400,
        type: 'apartment',
        distance: null
    },
    {
        rooms: 5,
        area: 450,
        type: 'apartment',
        distance: null
    },
    {
        rooms: 7,
        area: 850,
        type: 'house',
        distance: null
    },
    {
        rooms: 7,
        area: 900,
        type: 'house',
        distance: null
    },
    {
        rooms: 7,
        area: 1200,
        type: 'house',
        distance: null
    },
    {
        rooms: 8,
        area: 1500,
        type: 'house',
        distance: null
    },
    {
        rooms: 9,
        area: 1300,
        type: 'house',
        distance: null
    },
    {
        rooms: 8,
        area: 1240,
        type: 'house',
        distance: null
    },
    {
        rooms: 10,
        area: 1700,
        type: 'house',
        distance: null
    },
    {
        rooms: 9,
        area: 1000,
        type: 'house',
        distance: null
    },
    {
        rooms: 1,
        area: 800,
        type: 'flat',
        distance: null
    },
    {
        rooms: 3,
        area: 900,
        type: 'flat',
        distance: null
    },
    {
        rooms: 2,
        area: 700,
        type: 'flat',
        distance: null
    },
    {
        rooms: 1,
        area: 900,
        type: 'flat',
        distance: null
    },
    {
        rooms: 2,
        area: 1150,
        type: 'flat',
        distance: null
    },
    {
        rooms: 1,
        area: 1000,
        type: 'flat',
        distance: null
    },
    {
        rooms: 2,
        area: 1200,
        type: 'flat',
        distance: null
    },
    {
        rooms: 1,
        area: 1300,
        type: 'flat',
        distance: null
    }
];

var k = 3;
var rooms = Math.round(Math.random() * 9);
var area = 250 + Math.round(Math.random() * 1450);

describe('kNN Exercise', function() {
    it('measureDistances should fill in the key distance with a non-null value', function() {
        exercise.measureDistances(rooms, area);
        expect(data[1].distance).to.not.be.null;
    });
});

describe('kNN Exercise', function() {
    it('sortByDistance should sort the data by the key "distance"', function() {

        exercise.sortByDistance();

        for (i = 0; i < data.length - 1; i++) {
            expect(data[i].distance).to.be.at.most(data[i + 1].distance);
        };

    });
});


describe('kNN Exercise', function() {
    it('guessType should classify the type of the input point', function() {

        var guessEx = exercise.guessType(k);

        var types = {
            apartment: 0,
            flat: 0,
            house: 0
        };
        // get nearest neighbors
        var nn = data.slice(0, k);

        // count types in nearest neighbors
        for (var i = 0; i < k; i++) {

            // get nearest neighbor type
            var nnType = nn[i].type;

            if (nnType === 'apartment') types.apartment += 1;
            if (nnType === 'flat') types.flat += 1;
            if (nnType === 'house') types.house += 1;
        }

        // find the most comon (highest count) type
        var guess = {
            type: false,
            count: 0
        };
        for (var type in types) {
            if (types[type] > guess.count) {
                guess.type = type;
                guess.count = types[type];
            }
        }

        expect(guessEx).to.have.all.keys('type', 'count');
        expect(guessEx.type).to.equal(guess.type);
        expect(guessEx.count).to.equal(guess.count);
    });
});