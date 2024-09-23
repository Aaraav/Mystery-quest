const prisma = require('../DB/db.config');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret';

const createTeam = async (req,res) => {
    try {
        const { teamname, teamlead_roll,teamlead, email, mobile } = req.body;


        const existingTeam = await prisma.team.findFirst({
            where: {
                OR: [
                    { teamname },
                    { email },
                    {teamlead_roll},
                    { mobile: String(mobile) }
                ]
            }
        });

        if (existingTeam) {
            return res.status(400).json({ error: 'A team with this name, email, or mobile already exists.' });
        }
        

        const team = await prisma.team.create({
            data: {
                teamname,
                teamlead,
                teamlead_roll,
                email,
                mobile: String(mobile),
            }
        });

        return res.status(200).json({
            message:'team craeted',
            team
        });
    } catch (error) {
        throw new Error('Error creating team: ' + error.message);
    }
};

// Login Function
const login = async (req, res) => {
    try {
        const { teamlead_roll, mobile } = req.body;

        if (!teamlead_roll) {
            return res.status(400).json({ error: "teamlead_roll is required." });
        }
        
        const team = await prisma.team.findUnique({
            where: {
                teamlead_roll: teamlead_roll, // Use the valid value
            },
                });

        if (!team || mobile !== team.mobile.toString()) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ teamname: team.teamname, mobile: team.mobile.toString() }, JWT_SECRET, { expiresIn: '24h' });


        return res.status(200).json({
            message: 'You are successfully logged in',
            token,
            team
        });
    } catch (error) {
        console.error('Login error:', error.message);
        return res.status(500).json({ error: 'Internal server error: ' + error.message });
    }
};


module.exports = { createTeam, login };
