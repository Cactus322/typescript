import express from 'express';
import { bmiCalculator } from './bmiCalculator';
import { trainingCalculate } from './trainingCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {
    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);

    res.send(bmiCalculator(height, weight));
});

app.get('/exercises', (_req, res) => {
    const exercises = (_req.query.exercises as string).split(',');
    const target = Number(_req.query.target);

    res.send(trainingCalculate(exercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
