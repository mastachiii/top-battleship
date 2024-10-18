const computer = {
    hitQueue: [],

    isHitQueueEmpty() {
        return this.hitQueue.length === 0;
    },

    getItemFromQueue() {
        const coordinates = this.hitQueue.shift();

        return coordinates;
    },
};

export { computer };
