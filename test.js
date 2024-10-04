import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Define test options
export const options = {
  vus: 100, // Number of virtual users
  duration: '1s', // Duration for the test
};

// Load users from a JSON file or hardcode them directly in an array
// const users = new SharedArray('users', function () {
//   return [
//     { teamlead_roll: '101', mobile: '9876543210' },
//     { teamlead_roll: '102', mobile: '9876543211' },
//     { teamlead_roll: '103', mobile: '9876543212' },
//     { teamlead_roll: '104', mobile: '9876543213' },
//     { teamlead_roll: '105', mobile: '9876543214' },
//     { teamlead_roll: '106', mobile: '9876543215' },
//     { teamlead_roll: '107', mobile: '9876543216' },
//     { teamlead_roll: '108', mobile: '9876543217' },
//     { teamlead_roll: '109', mobile: '9876543218' },
//     { teamlead_roll: '110', mobile: '9876543219' },
//     { teamlead_roll: '111', mobile: '9876543220' },
//     { teamlead_roll: '112', mobile: '9876543221' },
//     { teamlead_roll: '113', mobile: '9876543222' },
//     { teamlead_roll: '114', mobile: '9876543223' },
//     { teamlead_roll: '115', mobile: '9876543224' },
//     { teamlead_roll: '116', mobile: '9876543225' },
//     { teamlead_roll: '117', mobile: '9876543226' },
//     { teamlead_roll: '118', mobile: '9876543227' },
//     { teamlead_roll: '119', mobile: '9876543228' },
//     { teamlead_roll: '120', mobile: '9876543229' },
//     { teamlead_roll: '121', mobile: '9876543230' },
//     { teamlead_roll: '122', mobile: '9876543231' },
//     { teamlead_roll: '123', mobile: '9876543232' },
//     { teamlead_roll: '124', mobile: '9876543233' },
//     { teamlead_roll: '125', mobile: '9876543234' },
//     { teamlead_roll: '126', mobile: '9876543235' },
//     { teamlead_roll: '127', mobile: '9876543236' },
//     { teamlead_roll: '128', mobile: '9876543237' },
//     { teamlead_roll: '129', mobile: '9876543238' },
//     { teamlead_roll: '130', mobile: '9876543239' },
//     { teamlead_roll: '131', mobile: '9876543240' },
//     { teamlead_roll: '132', mobile: '9876543241' },
//     { teamlead_roll: '133', mobile: '9876543242' },
//     { teamlead_roll: '134', mobile: '9876543243' },
//     { teamlead_roll: '135', mobile: '9876543244' },
//     { teamlead_roll: '136', mobile: '9876543245' },
//     { teamlead_roll: '137', mobile: '9876543246' },
//     { teamlead_roll: '138', mobile: '9876543247' },
//     { teamlead_roll: '139', mobile: '9876543248' },
//     { teamlead_roll: '140', mobile: '9876543249' },
//     { teamlead_roll: '141', mobile: '9876543250' },
//     { teamlead_roll: '142', mobile: '9876543251' },
//     { teamlead_roll: '143', mobile: '9876543252' },
//     { teamlead_roll: '144', mobile: '9876543253' },
//     { teamlead_roll: '145', mobile: '9876543254' },
//     { teamlead_roll: '146', mobile: '9876543255' },
//     { teamlead_roll: '147', mobile: '9876543256' },
//     { teamlead_roll: '148', mobile: '9876543257' },
//     { teamlead_roll: '149', mobile: '9876543258' },
//     { teamlead_roll: '150', mobile: '9876543259' },
//     { teamlead_roll: '151', mobile: '9876543260' },
//     { teamlead_roll: '152', mobile: '9876543261' },
//     { teamlead_roll: '153', mobile: '9876543262' },
//     { teamlead_roll: '154', mobile: '9876543263' },
//     { teamlead_roll: '155', mobile: '9876543264' },
//     { teamlead_roll: '156', mobile: '9876543265' },
//     { teamlead_roll: '157', mobile: '9876543266' },
//     { teamlead_roll: '158', mobile: '9876543267' },
//     { teamlead_roll: '159', mobile: '9876543268' },
//     { teamlead_roll: '160', mobile: '9876543269' },
//     { teamlead_roll: '161', mobile: '9876543270' },
//     { teamlead_roll: '162', mobile: '9876543271' },
//     { teamlead_roll: '163', mobile: '9876543272' },
//     { teamlead_roll: '164', mobile: '9876543273' },
//     { teamlead_roll: '165', mobile: '9876543274' },
//     { teamlead_roll: '166', mobile: '9876543275' },
//     { teamlead_roll: '167', mobile: '9876543276' },
//     { teamlead_roll: '168', mobile: '9876543277' },
//     { teamlead_roll: '169', mobile: '9876543278' },
//     { teamlead_roll: '170', mobile: '9876543279' },
//     { teamlead_roll: '171', mobile: '9876543280' },
//     { teamlead_roll: '172', mobile: '9876543281' },
//     { teamlead_roll: '173', mobile: '9876543282' },
//     { teamlead_roll: '174', mobile: '9876543283' },
//   ];
// });

const users = new SharedArray('users', function () {
  return [
    { teamlead_roll: 'Roll 1', mobile: '111111111' },
    { teamlead_roll: 'Roll 2', mobile: '111111112' },
    { teamlead_roll: 'Roll 3', mobile: '111111113' },
    { teamlead_roll: 'Roll 4', mobile: '111111114' },
    { teamlead_roll: 'Roll 5', mobile: '111111115' },
    { teamlead_roll: 'Roll 6', mobile: '111111116' },
    { teamlead_roll: 'Roll 7', mobile: '111111117' },
    { teamlead_roll: 'Roll 8', mobile: '111111118' },
    { teamlead_roll: 'Roll 9', mobile: '111111119' },
    { teamlead_roll: 'Roll 10', mobile: '1111111110' },
    { teamlead_roll: 'Roll 11', mobile: '1111111111' },
    { teamlead_roll: 'Roll 12', mobile: '1111111112' },
    { teamlead_roll: 'Roll 13', mobile: '1111111113' },
    { teamlead_roll: 'Roll 14', mobile: '1111111114' },
    { teamlead_roll: 'Roll 15', mobile: '1111111115' },
    { teamlead_roll: 'Roll 16', mobile: '1111111116' },
    { teamlead_roll: 'Roll 17', mobile: '1111111117' },
    { teamlead_roll: 'Roll 18', mobile: '1111111118' },
    { teamlead_roll: 'Roll 19', mobile: '1111111119' },
    { teamlead_roll: 'Roll 20', mobile: '1111111120' },
    { teamlead_roll: 'Roll 21', mobile: '1111111121' },
    { teamlead_roll: 'Roll 22', mobile: '1111111122' },
    { teamlead_roll: 'Roll 23', mobile: '1111111123' },
    { teamlead_roll: 'Roll 24', mobile: '1111111124' },
    { teamlead_roll: 'Roll 25', mobile: '1111111125' },
    { teamlead_roll: 'Roll 26', mobile: '1111111126' },
    { teamlead_roll: 'Roll 27', mobile: '1111111127' },
    { teamlead_roll: 'Roll 28', mobile: '1111111128' },
    { teamlead_roll: 'Roll 29', mobile: '1111111129' },
    { teamlead_roll: 'Roll 30', mobile: '1111111130' },
    { teamlead_roll: 'Roll 31', mobile: '1111111131' },
    { teamlead_roll: 'Roll 32', mobile: '1111111132' },
    { teamlead_roll: 'Roll 33', mobile: '1111111133' },
    { teamlead_roll: 'Roll 34', mobile: '1111111134' },
    { teamlead_roll: 'Roll 35', mobile: '1111111135' },
    { teamlead_roll: 'Roll 36', mobile: '1111111136' },
    { teamlead_roll: 'Roll 37', mobile: '1111111137' },
    { teamlead_roll: 'Roll 38', mobile: '1111111138' },
    { teamlead_roll: 'Roll 39', mobile: '1111111139' },
    { teamlead_roll: 'Roll 40', mobile: '1111111140' },
    { teamlead_roll: 'Roll 41', mobile: '1111111141' },
    { teamlead_roll: 'Roll 42', mobile: '1111111142' },
    { teamlead_roll: 'Roll 43', mobile: '1111111143' },
    { teamlead_roll: 'Roll 44', mobile: '1111111144' },
    { teamlead_roll: 'Roll 45', mobile: '1111111145' },
    { teamlead_roll: 'Roll 46', mobile: '1111111146' },
    { teamlead_roll: 'Roll 47', mobile: '1111111147' },
    { teamlead_roll: 'Roll 48', mobile: '1111111148' },
    { teamlead_roll: 'Roll 49', mobile: '1111111149' },
    { teamlead_roll: 'Roll 50', mobile: '1111111150' }
  ];
});


// const users = new SharedArray('users', function () {
//   return [
//     { teamname: 'Team 1', teamlead: 'Lead 1', teamlead_roll: 'Roll 1', email: 'lead1@example.com', mobile: '1111111110' },
//     { teamname: 'Team 2', teamlead: 'Lead 2', teamlead_roll: 'Roll 2', email: 'lead2@example.com', mobile: '1111111111' },
//     { teamname: 'Team 3', teamlead: 'Lead 3', teamlead_roll: 'Roll 3', email: 'lead3@example.com', mobile: '1111111112' },
//     { teamname: 'Team 4', teamlead: 'Lead 4', teamlead_roll: 'Roll 4', email: 'lead4@example.com', mobile: '1111111113' },
//     { teamname: 'Team 5', teamlead: 'Lead 5', teamlead_roll: 'Roll 5', email: 'lead5@example.com', mobile: '1111111114' },
//     { teamname: 'Team 6', teamlead: 'Lead 6', teamlead_roll: 'Roll 6', email: 'lead6@example.com', mobile: '1111111115' },
//     { teamname: 'Team 7', teamlead: 'Lead 7', teamlead_roll: 'Roll 7', email: 'lead7@example.com', mobile: '1111111116' },
//     { teamname: 'Team 8', teamlead: 'Lead 8', teamlead_roll: 'Roll 8', email: 'lead8@example.com', mobile: '1111111117' },
//     { teamname: 'Team 9', teamlead: 'Lead 9', teamlead_roll: 'Roll 9', email: 'lead9@example.com', mobile: '1111111118' },
//     { teamname: 'Team 10', teamlead: 'Lead 10', teamlead_roll: 'Roll 10', email: 'lead10@example.com', mobile: '1111111119' },
//     { teamname: 'Team 11', teamlead: 'Lead 11', teamlead_roll: 'Roll 11', email: 'lead11@example.com', mobile: '1111111120' },
//     { teamname: 'Team 12', teamlead: 'Lead 12', teamlead_roll: 'Roll 12', email: 'lead12@example.com', mobile: '1111111121' },
//     { teamname: 'Team 13', teamlead: 'Lead 13', teamlead_roll: 'Roll 13', email: 'lead13@example.com', mobile: '1111111122' },
//     { teamname: 'Team 14', teamlead: 'Lead 14', teamlead_roll: 'Roll 14', email: 'lead14@example.com', mobile: '1111111123' },
//     { teamname: 'Team 15', teamlead: 'Lead 15', teamlead_roll: 'Roll 15', email: 'lead15@example.com', mobile: '1111111124' },
//     { teamname: 'Team 16', teamlead: 'Lead 16', teamlead_roll: 'Roll 16', email: 'lead16@example.com', mobile: '1111111125' },
//     { teamname: 'Team 17', teamlead: 'Lead 17', teamlead_roll: 'Roll 17', email: 'lead17@example.com', mobile: '1111111126' },
//     { teamname: 'Team 18', teamlead: 'Lead 18', teamlead_roll: 'Roll 18', email: 'lead18@example.com', mobile: '1111111127' },
//     { teamname: 'Team 19', teamlead: 'Lead 19', teamlead_roll: 'Roll 19', email: 'lead19@example.com', mobile: '1111111128' },
//     { teamname: 'Team 20', teamlead: 'Lead 20', teamlead_roll: 'Roll 20', email: 'lead20@example.com', mobile: '1111111129' },
//     { teamname: 'Team 21', teamlead: 'Lead 21', teamlead_roll: 'Roll 21', email: 'lead21@example.com', mobile: '1111111130' },
//     { teamname: 'Team 22', teamlead: 'Lead 22', teamlead_roll: 'Roll 22', email: 'lead22@example.com', mobile: '1111111131' },
//     { teamname: 'Team 23', teamlead: 'Lead 23', teamlead_roll: 'Roll 23', email: 'lead23@example.com', mobile: '1111111132' },
//     { teamname: 'Team 24', teamlead: 'Lead 24', teamlead_roll: 'Roll 24', email: 'lead24@example.com', mobile: '1111111133' },
//     { teamname: 'Team 25', teamlead: 'Lead 25', teamlead_roll: 'Roll 25', email: 'lead25@example.com', mobile: '1111111134' },
//     { teamname: 'Team 26', teamlead: 'Lead 26', teamlead_roll: 'Roll 26', email: 'lead26@example.com', mobile: '1111111135' },
//     { teamname: 'Team 27', teamlead: 'Lead 27', teamlead_roll: 'Roll 27', email: 'lead27@example.com', mobile: '1111111136' },
//     { teamname: 'Team 28', teamlead: 'Lead 28', teamlead_roll: 'Roll 28', email: 'lead28@example.com', mobile: '1111111137' },
//     { teamname: 'Team 29', teamlead: 'Lead 29', teamlead_roll: 'Roll 29', email: 'lead29@example.com', mobile: '1111111138' },
//     { teamname: 'Team 30', teamlead: 'Lead 30', teamlead_roll: 'Roll 30', email: 'lead30@example.com', mobile: '1111111139' },
//     { teamname: 'Team 31', teamlead: 'Lead 31', teamlead_roll: 'Roll 31', email: 'lead31@example.com', mobile: '1111111140' },
//     { teamname: 'Team 32', teamlead: 'Lead 32', teamlead_roll: 'Roll 32', email: 'lead32@example.com', mobile: '1111111141' },
//     { teamname: 'Team 33', teamlead: 'Lead 33', teamlead_roll: 'Roll 33', email: 'lead33@example.com', mobile: '1111111142' },
//     { teamname: 'Team 34', teamlead: 'Lead 34', teamlead_roll: 'Roll 34', email: 'lead34@example.com', mobile: '1111111143' },
//     { teamname: 'Team 35', teamlead: 'Lead 35', teamlead_roll: 'Roll 35', email: 'lead35@example.com', mobile: '1111111144' },
//     { teamname: 'Team 36', teamlead: 'Lead 36', teamlead_roll: 'Roll 36', email: 'lead36@example.com', mobile: '1111111145' },
//     { teamname: 'Team 37', teamlead: 'Lead 37', teamlead_roll: 'Roll 37', email: 'lead37@example.com', mobile: '1111111146' },
//     { teamname: 'Team 38', teamlead: 'Lead 38', teamlead_roll: 'Roll 38', email: 'lead38@example.com', mobile: '1111111147' },
//     { teamname: 'Team 39', teamlead: 'Lead 39', teamlead_roll: 'Roll 39', email: 'lead39@example.com', mobile: '1111111148' },
//     { teamname: 'Team 40', teamlead: 'Lead 40', teamlead_roll: 'Roll 40', email: 'lead40@example.com', mobile: '1111111149' },
//   ];
// });


// Login test scenario
export default function () {
  // Get a unique user for each VU based on its iteration index
  const user = users[__VU % users.length];

  // Define the login URL
  const url = 'https://mystery-quest-02ay.onrender.com/api/login';

  // Define the payload for login
  const payload = JSON.stringify({
    teamlead_roll: user.teamlead_roll,
    mobile: user.mobile,
  });

  // Define request headers
  const headers = {
    'Content-Type': 'application/json',
  };

  // Perform the POST request for login
  const response = http.post(url, payload, { headers });

  // Check for a successful login response
  const successChecks = {
    'is status 200': (r) => r.status === 200,
    'login successful': (r) => r.json('message') === 'You are successfully logged in',
  };

  check(response, successChecks);

  // Simulate a small wait time between iterations
  sleep(1);
}