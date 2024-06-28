// utils/calculateCoefficient.js
module.exports = (difficulty, importance, deadline, estimatedTime) => {
    const currentDate = new Date();
    const timeToDeadline = (new Date(deadline) - currentDate) / (1000 * 60 * 60 * 24); // Temps restant en jours

    // Calcul du coefficient
    return (importance * difficulty) / (estimatedTime * timeToDeadline);
};
