var _ = require('lodash');

var helpers = require('./helpers.js');
var get_score = require('./get_score');

const USERNAME = "TEAM_BALAYETTE";
const POSITION_ORIGINE = {
    lat: 0.5,
    lng: 0.5
};

var problems = {
    // 1000 commandes
    problem1: {
        problem_id: 'problem1',
        orders: helpers.parseCsv('problem1.csv')
    },
    // 3000 commandes
    problem2: {
        problem_id: 'problem2',
        orders: helpers.parseCsv('problem2.csv')



    },
    // 3500 commandes un peu spéciales
    problem3: {
        problem_id: 'problem3',
        orders: helpers.parseCsv('problem3.csv')
    }
};

var solve_problem_dumb = function (problem) {
    var solution = {
        problem_id: problem.problem_id,
        username: USERNAME,
        orders: []
    };

    var pos = POSITION_ORIGINE;
    var orders = problems.problem1.orders.sort(compareOrder);

    for(var i=0 ; i<orders.length ; i++)
    {
        console.log(i);
        order = orders[i];
        solution.orders.push(order.order_id);

        // On garde en mémoire la nouvelle position du livreur
        pos.lat = order.pos_lat;
        pos.lng = order.pos_lng;

        // On retire la commande qui vient d'être réalisé
    }
    return solution;
};

var findClosestOrder = function (orders, pos) {
    orders = orders.sort(function (orderA, orderB) {
        return helpers.compute_dist(orderA.pos_lat, orderA.pos_lng, pos.lat, pos.lng) <= helpers.compute_dist(orderB.pos_lat, orderB.pos_lng, pos.lat, pos.lng)
    });
    return orders[orders.length-1];
}

var compareOrder = function (order1 , order2) {
    return parseInt(order2.amount) - parseInt(order1.amount);
}

var solution = solve_problem_dumb(problems.problem1);
helpers.send_solution(solution);
