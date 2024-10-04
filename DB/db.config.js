const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ["warn", "error"]
});

const addRiddles = async () => {
    try {
        const riddles = [
            {
             "rid": "RID001",
             "description": "आग में तपकर ही सच्चा शूरवीर बनता है, यही दीवार उसकी सच्चाई को मानती है।",
             "riddlecode": "AB",
             "location": "Neki ki diwar"
            },
            {
             "rid": "RID002",
             "description": "The hidden gate near the tallest building, where tools come to life.",
             "riddlecode": "AG",
             "location": "Mech block back gate"
            },
            {
             "rid": "RID003",
             "description": "Where precision meets focus and targets align, what place is known for aiming straight and fine?",
             "riddlecode": "AE",
             "location": "Archery"
            },
            {
             "rid": "RID004",
             "description": "Rahu aapki seva mei chahe raat ho ya din, Dikhau aapki keemat, bs daalo apna pin.",
             "riddlecode": "AX",
             "location": "ATM"
            },
            {
             "rid": "RID005",
             "description": "I stand tall, a place of sound, Where voices echo all around. Speeches, songs, and plays unfold, Right across where decisions hold. What am I?",
             "riddlecode": "BD",
             "location": "Auditorium"
            },
            {
             "rid": "RID006",
             "description": "The hot spot, where students flock, a hub of chatter from dusk to dawn. Treats tempt, but wallet beware, because every place has a cost to bear.",
             "riddlecode": "AU",
             "location": "Cafeteria"
            },
            {
             "rid": "RID007",
             "description": "I'm the tallest brother in the town. Guess who am I?",
             "riddlecode": "AP",
             "location": "CV Raman"
            },
            {
             "rid": "RID008",
             "description": "Don't let a simple ache stop you in your heels; come here to find all your remedies and heal.",
             "riddlecode": "AN",
             "location": "Dispensary"
            },
            {
             "rid": "RID009",
             "description": "I use network to manage the network of data. Find me.",
             "riddlecode": "AJ",
             "location": "IT Cell"
            },
            {
             "rid": "RID010",
             "description": "A place of sport and dance and play, Where students gather day by day. A junction named for a famous man, A bustling hub, a vibrant plan. What is it?",
             "riddlecode": "AL",
             "location": "LC"
            },
            {
             "rid": "RID011",
             "description": "Place where stories unfold, yet silence is made of gold. What is it?",
             "riddlecode": "BC",
             "location": "Library"
            },
            {
             "rid": "RID012",
             "description": "A grand entry where journeys start, The first step to knowledge and art.",
             "riddlecode": "BB",
             "location": "Main Gate"
            },
            {
             "rid": "RID013",
             "description": "Here, the business ideas flow, Instilling life skills, which helps students grow.",
             "riddlecode": "AR",
             "location": "Management Block"
            },
            {
             "rid": "RID014",
             "description": "Come here to find comfort for the soul and peace of mind; feel closer to divinity and leave your worries behind.",
             "riddlecode": "AM",
             "location": "Mandir"
            },
            {
             "rid": "RID015",
             "description": "A place where business minds meet, Ideas are shared while sitting on a bench. The entrance has a soil that remains drenched.",
             "riddlecode": "AY",
             "location": "MBA Park"
            },
            {
             "rid": "RID016",
             "description": "The heart of metals, where ideas take shape.",
             "riddlecode": "AI",
             "location": "Mechanical Workshop"
            },
            {
             "rid": "RID017",
             "description": "A place with the tagline 'Happy Food Happy People.'",
             "riddlecode": "AO",
             "location": "Mother Dairy"
            },
            {
             "rid": "RID018",
             "description": "Seek where the young in uniform stand, To serve their nation, with discipline at hand.",
             "riddlecode": "BE",
             "location": "NCC Office"
            },
            {
             "rid": "RID019",
             "description": "Where colors bloom and green leaves play, A garden where nature finds its way. What is it?",
             "riddlecode": "AV",
             "location": "Nursery"
            },
            {
             "rid": "RID020",
             "description": "Beyond the arch where students roam, A secure spot where wheels find home.",
             "riddlecode": "BF",
             "location": "Parking"
            },
            {
             "rid": "RID021",
             "description": "Na keh sako agar koi baat, to likh ke bta dena, likhi hui baat yaha se bhijwa dena.",
             "riddlecode": "AF",
             "location": "Post Office"
            },
            {
             "rid": "RID022",
             "description": "Made like a gun, riding me is fun. Lohe ki gaadi, shero ki sawaari.",
             "riddlecode": "AT",
             "location": "Royal Enfield"
            },
            {
             "rid": "RID023",
             "description": "With tensed heads, in queue you stand, aiming to secure your seat on the spot.",
             "riddlecode": "AD",
             "location": "Shakuntalam"
            },
            {
             "rid": "RID024",
             "description": "The place where creativity rules the day with paints and papers.",
             "riddlecode": "AS",
             "location": "Srijan Headquarters"
            },
            {
             "rid": "RID025",
             "description": "Jaha se aaye madhur aawaz, Jaha se nikle sureele raag, Jaha hote hai Sangeet aur saaz, Btao kaha chupa hai agla raaz.",
             "riddlecode": "AZ",
             "location": "Tarannum Quarters"
            },
            {
             "rid": "RID026",
             "description": "I am the office where career advance, future soars, seeking to place all those who deserve. I stand tall near to where wealth reserves.",
             "riddlecode": "AK",
             "location": "TPO"
            },
            {
             "rid": "RID027",
             "description": "In bottles I grow, with time. I stand upright, I don’t spread wide. Do you know where I hide?",
             "riddlecode": "AQ",
             "location": "Vertical Garden"
            },
            {
             "rid": "RID028",
             "description": "I’m split by a net, with players in rows, where teamwork decides how the match goes.",
             "riddlecode": "AH",
             "location": "Volleyball Ground"
            },
            {
             "rid": "RID029",
             "description": "I am a tank built under the ground, Where the rain from above can be found.",
             "riddlecode": "AW",
             "location": "Water Harvesting"
            },
            {
             "rid": "RID030",
             "description": "Where whispered secrets and stories of women are kept in quote embrace. What is this place?",
             "riddlecode": "AC",
             "location": "Women Cell"
            },
            {
             "rid": "RID031",
             "description": "दिशाओं का ज्ञानी, हर कोने का साथी, बताता सही राह, जब हो कहीं उलझन भरी।",
             "riddlecode": "SG",
             "location": "YMCA ka Map"
            },
            {
                "rid": "RID032",
                "description": "I stand where the university's borders mark an end,opening the way to where the cars reside.",
                "riddlecode": "SB",
                "location": "2nd front gate"
            },
            {
                "rid": "RID033",
                "description": "I stand proud with a silent roar, king of beast but made of stone, who am I ?",
                "riddlecode": "LL",
                "location": "Lion statue in front of E Dept"
            },
            {
                "rid": "RID034",
                "description": " no swifts only drifts, Ra ta ta?",
                "riddlecode": "OU",
                "location": "Mechnext supra garage"
            },
            {
                "rid": "RID035",
                "description": " I stand upright, watching them chase for scores with all their might.",
                "riddlecode": "FK",
                "location": "Football post"
            },
            {
                "rid": "RID036",
                "description": " I am a room where silence stays, With watchful eyes that never stray, I stand guard both night and day, Can you guess, who am I, keeping threats at bay?",
                "riddlecode": "KF",
                "location": "GUARD room"
            },
            {
                "rid": "RID037",
                "description": " A place to sit and eat or snack, But first, these steps you must track!",
                "riddlecode": "PO",
                "location": "YMCA mess stairs"
            },
            
            {
                "rid": "RID038",
                "description": " Guarding the haven of knowledge and rest, through me, professors find their nest. What am I?",
                "riddlecode": "QW",
                "location": "Staff quarter Main gate"
            },
            {
                "rid": "RID039",
                "description": " Bats and balls, nets and more, I keep them safe behind my door. What am I?",
                "riddlecode": "IO",
                "location": "Sports room"
            },
            {
                "rid": "RID040",
                "description": " Where students build futures day by day. What place helps craft and create, A vocational path to shape their fate?",
                "riddlecode": "PU",
                "location": "Bvoc building"
            },


            
        ];

        // Insert all riddles if they don't exist yet
        await prisma.riddle.createMany({
            data: riddles,
            skipDuplicates: true, // Avoid inserting duplicates
        });

        console.log('Riddles have been added to the database.');
        await prisma.$disconnect();
    } catch (error) {
        console.error('Error adding riddles: ', error);
    }
};

addRiddles();

module.exports = prisma;
