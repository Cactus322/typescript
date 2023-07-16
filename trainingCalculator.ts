interface Result {
    periodLength: number;
    trainingDays: number;
    target: number;
    average: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
}

export const trainingCalculate = (exercises: string[], target: number) => {
    const calculate = (a: number[], t: number): Result => {
        a.forEach((e) => {
            if (isNaN(Number(t)) || isNaN(Number(e))) {
                throw new Error('Provided values were not numbers!');
            }
        });

        const periodLength: number = a.length;
        const trainingDays: number = a.filter((e) => e !== 0).length;
        const averageTime: number = Number(
            (a.reduce((acc, current) => acc + current) / a.length).toFixed(2)
        );

        const ratingPercent: number = t / 100;
        let rating: number;
        let ratingDescription: string;

        if (averageTime / ratingPercent > 100) {
            rating = 3;
            ratingDescription = 'Good job';
        } else if (averageTime / ratingPercent > 65) {
            rating = 2;
            ratingDescription = 'Not too bad but could be better';
        } else {
            rating = 1;
            ratingDescription = 'It was bad';
        }

        return {
            periodLength: periodLength,
            trainingDays: trainingDays,
            target: t,
            average: averageTime,
            success: averageTime > t ? true : false,
            rating: rating,
            ratingDescription: ratingDescription,
        };
    };

    try {
        if (exercises && target) {
            const array: number[] = exercises.map((e) =>
                e === '0' ? 0 : Number(e)
            );
            console.log(calculate(array, target));
        } else {
            const array: number[] = process.argv
                .slice(3)
                .map((e) => (e === '0' ? 0 : Number(e)));
            const time: number = Number(process.argv[2]);
            console.log(calculate(array, time));
        }
    } catch (error: unknown) {
        let errorMessage = 'Something bad happened.';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        console.log(errorMessage);
    }
};