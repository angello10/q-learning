function QLearner(alpha, gamma, epsilon, epsilon_min, epsilon_time) {
    this.alpha = alpha;
    this.gamma = gamma;
    this.Q = [];
    this.epsilon = epsilon;
    this.epsilon_min = epsilon_min;
    this.delta_epsilon = (epsilon - epsilon_min) / epsilon_time;
}

QLearner.prototype = {
    optimumAction: function(s, a) {
        if (this.epsilon > this.epsilon_min) this.epsilon -= this.delta_epsilon;
        if (this.epsilon > Math.random()) return a[Math.floor(Math.random() * a.length)];

        var arr;
        var max;

        for (var i in a) {
            if (!this.Q[s][a[i]]) this.Q[s][a[i]] = 0;
            if(!arr || max < this.Q[s][a[i]]) {
                arr = [a[i]];
                max = this.Q[s][a[i]];
            }
            else if (max == this.Q[s][a[i]]) {
                arr.push(a[i]);
            }
        }
        return arr[Math.floor(Math.random() * arr.length)]
    }, 
    train: function(s, a, r, s2) {
        if (!this.Q[s]) this.Q[s] = [];
        if (!this.Q[s][a]) this.Q[s][a] = 0;

        var max;
        if (s2 >= 0) {
            if (!this.Q[s2]) this.Q[s2] = [];
            for (var i in this.Q[s2]) {
                if (!this.Q[s2][i]) this.Q[s2][i] = 0;
                if ((!max && max !== 0) || max < this.Q[s2][i]) max = this.Q[s2][i];
            }
        }
        max = (max || 0);
        var learning_value = r + this.gamma * max;
        this.Q[s][a] = (1 - this.alpha) * this.Q[s][a] + this.alpha * learning_value;
    }
}
