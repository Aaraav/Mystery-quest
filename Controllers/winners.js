const prisma = require('../DB/db.config');

const getTopTeams = async (req, res) => {
    try {
        // Fetch top 3 teams based on score and last solved time
        const topTeams = await prisma.team.findMany({
            orderBy: [
                { teamscore: 'desc' },
                { lastSolvedAt: 'asc' }
            ],
            take: 3
        });

        if (!topTeams || topTeams.length === 0) {
            return res.status(404).json({ message: "No teams found." });
        }

        const rankedTeams = topTeams.map((team, index) => ({
            id: team.id,
            rank: index + 1,
            teamname: team.teamname,
            teamlead: team.teamlead,
            teamscore: team.teamscore,
            lastSolvedAt: team.lastSolvedAt,
        }));

        // Use a transaction to update the winners
        await prisma.$transaction(async (prisma) => {
            for (const rankedTeam of rankedTeams) {
                await prisma.winner.create({
                    data: {
                        teamId: rankedTeam.id,  // Use the existing teamId
                        rank: rankedTeam.rank,
                        score: rankedTeam.teamscore,
                        solvedAt: rankedTeam.lastSolvedAt || new Date()  // Ensure solvedAt is a valid Date
                    }
                });
            }
        });

        return res.status(200).json(rankedTeams);

    } catch (error) {
        console.error('Error fetching top teams:', error);
        return res.status(500).json({ error: 'Error fetching top teams: ' + error.message });
    }
};

module.exports = getTopTeams;
