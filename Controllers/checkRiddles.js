const prisma = require('../DB/db.config');

const checkAnswer = async (req, res) => {
    try {
        const { userId, riddleId, userAnswer } = req.body;

        const progress = await prisma.userProgress.findFirst({
            where: { teamId: userId, riddleId: riddleId }
        });

        if (!progress) {
            return res.status(404).json({ error: "Riddle not found for this user." });
        }

        const riddle = await prisma.riddle.findUnique({
            where: { id: riddleId }
        });

        if (!riddle) {
            return res.status(404).json({ error: "Riddle not found." });
        }

        if (userAnswer.toLowerCase() === riddle.riddlecode.toLowerCase()) {
            let score = 0;
            if (progress.attempts === 0) score = 10;
            else if (progress.attempts === 1) score = 8;
            else if (progress.attempts === 2) score = 6;

            await prisma.userProgress.update({
                where: { id: progress.id },
                data: {
                    score: score,
                    lastSolvedAt: new Date(),
                    attempts: progress.attempts + 1
                }
            });


            return res.status(200).json({ message: "Correct answer!", score: score });
        } else {
            await prisma.userProgress.update({
                where: { id: progress.id },
                data: { attempts: progress.attempts + 1 }
            });

            return res.status(400).json({ message: "Incorrect answer. Try again." });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error checking answer: ' + error.message });
    }
};


module.exports=checkAnswer;
