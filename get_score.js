var _ = require('lodash');

exports.get_score = function(problem, orders) {
	var total_distance_solution = 0;
	var total_bonus_solution = 0;
	
	var pos = {
		lat: 0.5,
		lng: 0.5
	};
	
	_.each(orders, function (order_id, i_order) {
		var order = _.find(problem.orders, function (o) {
            return o.order_id === order_id
        });
		var distance_order = exports.compute_dist(pos.lat, pos.lng, order.pos_lat, order.pos_lng);
        var bonus_order = Math.max(0, order.amount - i_order);

		total_distance_solution += distance_order;
		total_bonus_solution += bonus_order;
		
		pos.lat = order.pos_lat;
		pos.lng = order.pos_lng;
	});

	return {
        total_distance: total_distance_solution,
        total_bonus: total_bonus_solution,
        score: total_bonus_solution - total_distance_solution
    };
};