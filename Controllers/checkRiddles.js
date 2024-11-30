const prisma = require('../DB/db.config');

const checkAnswer = async (req, res) => {
    try {
        // const user = req.user;

        // const team = await prisma.team.findFirst({
        //     where: { email: user.email }
        // });

        // if (!team) {
        //     return res.status(404).json({ error: "Team not found for the user." });
        // }
        // console.log('team',team);

        

        const { teamId, riddleId, userAnswer } = req.body;

        const progress = await prisma.userProgress.findFirst({
            where: { teamId: parseInt(teamId), riddleId: riddleId }
        });

        if (!progress) {
            return res.status(404).json({ error: "Riddle not found for this user." });
        }

        if (progress.score > 0) {
            return res.status(400).json({ message: "This riddle has already been solved by your team. No further attempts allowed." });
        }

        if (progress.attempts >= 5) {
            return res.status(400).json({ message: "No more attempts are allowed for this riddle. You have reached the maximum attempts." });
        }

        const riddle = await prisma.riddle.findUnique({
            where: { rid: riddleId }
        });

        if (!riddle) {
            return res.status(404).json({ error: "Riddle not found." });
        }

        if (userAnswer.toLowerCase() === riddle.riddlecode.toLowerCase()) {
            let score = 0;
            if (progress.attempts === 0) score = 10;
            else if (progress.attempts === 1) score = 8;
            else if (progress.attempts === 2) score = 6;
            else if (progress.attempts === 3) score = 2;
            else if (progress.attempts === 4) score = 1;
            else score = 0;

            await prisma.$transaction(async (prisma) => {
                await prisma.userProgress.update({
                    where: { id: progress.id },
                    data: {
                        score: score,
                        lastSolvedAt: new Date(),
                        attempts: progress.attempts + 1
                    }
                });

                await prisma.team.update({
                    where: {
                      id: parseInt(teamId)
                    },
                    data: {
                      teamscore: {
                        increment: score
                      },
                      lastSolvedAt: new Date()
                    }
                  });
            });

            return res.status(200).json({ message: "Correct answer!", score: score });
        } else {
            await prisma.userProgress.update({
                where: { id: progress.id },
                data: { attempts: progress.attempts + 1 }
            });

            if (progress.attempts >= 5) {
                return res.status(400).json({ message: "Incorrect answer. You have used all your attempts for this riddle." });
            }

            return res.status(400).json({ message: "Incorrect answer. Try again." });
        }
    } catch (error) {
        return res.status(500).json({ error: 'Error checking answer: ' + error.message });
    }
};

module.exports = checkAnswer;
