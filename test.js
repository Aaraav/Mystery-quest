import http from 'k6/http';
import { check, sleep } from 'k6';
import { SharedArray } from 'k6/data';

// Define test options
export const options = {
  vus: 100, // Number of virtual users
  duration: '10s', // Duration for the test
};

// Load users from a JSON file or hardcode them directly in an array
const users = new SharedArray('users', function () {
  return [
    { teamlead_roll: '101', mobile: '9876543210' },
    { teamlead_roll: '102', mobile: '9876543211' },
    { teamlead_roll: '103', mobile: '9876543212' },
    { teamlead_roll: '104', mobile: '9876543213' },
    { teamlead_roll: '105', mobile: '9876543214' },
    { teamlead_roll: '106', mobile: '9876543215' },
    { teamlead_roll: '107', mobile: '9876543216' },
    { teamlead_roll: '108', mobile: '9876543217' },
    { teamlead_roll: '109', mobile: '9876543218' },
    { teamlead_roll: '110', mobile: '9876543219' },
    { teamlead_roll: '111', mobile: '9876543220' },
    { teamlead_roll: '112', mobile: '9876543221' },
    { teamlead_roll: '113', mobile: '9876543222' },
    { teamlead_roll: '114', mobile: '9876543223' },
    { teamlead_roll: '115', mobile: '9876543224' },
    { teamlead_roll: '116', mobile: '9876543225' },
    { teamlead_roll: '117', mobile: '9876543226' },
    { teamlead_roll: '118', mobile: '9876543227' },
    { teamlead_roll: '119', mobile: '9876543228' },
    { teamlead_roll: '120', mobile: '9876543229' },
    { teamlead_roll: '121', mobile: '9876543230' },
    { teamlead_roll: '122', mobile: '9876543231' },
    { teamlead_roll: '123', mobile: '9876543232' },
    { teamlead_roll: '124', mobile: '9876543233' },
    { teamlead_roll: '125', mobile: '9876543234' },
    { teamlead_roll: '126', mobile: '9876543235' },
    { teamlead_roll: '127', mobile: '9876543236' },
    { teamlead_roll: '128', mobile: '9876543237' },
    { teamlead_roll: '129', mobile: '9876543238' },
    { teamlead_roll: '130', mobile: '9876543239' },
    { teamlead_roll: '131', mobile: '9876543240' },
    { teamlead_roll: '132', mobile: '9876543241' },
    { teamlead_roll: '133', mobile: '9876543242' },
    { teamlead_roll: '134', mobile: '9876543243' },
    { teamlead_roll: '135', mobile: '9876543244' },
    { teamlead_roll: '136', mobile: '9876543245' },
    { teamlead_roll: '137', mobile: '9876543246' },
    { teamlead_roll: '138', mobile: '9876543247' },
    { teamlead_roll: '139', mobile: '9876543248' },
    { teamlead_roll: '140', mobile: '9876543249' },
    { teamlead_roll: '141', mobile: '9876543250' },
    { teamlead_roll: '142', mobile: '9876543251' },
    { teamlead_roll: '143', mobile: '9876543252' },
    { teamlead_roll: '144', mobile: '9876543253' },
    { teamlead_roll: '145', mobile: '9876543254' },
    { teamlead_roll: '146', mobile: '9876543255' },
    { teamlead_roll: '147', mobile: '9876543256' },
    { teamlead_roll: '148', mobile: '9876543257' },
    { teamlead_roll: '149', mobile: '9876543258' },
    { teamlead_roll: '150', mobile: '9876543259' },
    { teamlead_roll: '151', mobile: '9876543260' },
    { teamlead_roll: '152', mobile: '9876543261' },
    { teamlead_roll: '153', mobile: '9876543262' },
    { teamlead_roll: '154', mobile: '9876543263' },
    { teamlead_roll: '155', mobile: '9876543264' },
    { teamlead_roll: '156', mobile: '9876543265' },
    { teamlead_roll: '157', mobile: '9876543266' },
    { teamlead_roll: '158', mobile: '9876543267' },
    { teamlead_roll: '159', mobile: '9876543268' },
    { teamlead_roll: '160', mobile: '9876543269' },
    { teamlead_roll: '161', mobile: '9876543270' },
    { teamlead_roll: '162', mobile: '9876543271' },
    { teamlead_roll: '163', mobile: '9876543272' },
    { teamlead_roll: '164', mobile: '9876543273' },
    { teamlead_roll: '165', mobile: '9876543274' },
    { teamlead_roll: '166', mobile: '9876543275' },
    { teamlead_roll: '167', mobile: '9876543276' },
    { teamlead_roll: '168', mobile: '9876543277' },
    { teamlead_roll: '169', mobile: '9876543278' },
    { teamlead_roll: '170', mobile: '9876543279' },
    { teamlead_roll: '171', mobile: '9876543280' },
    { teamlead_roll: '172', mobile: '9876543281' },
    { teamlead_roll: '173', mobile: '9876543282' },
    { teamlead_roll: '174', mobile: '9876543283' },
  ];
});

// Login test scenario
export default function () {
  // Get a unique user for each VU based on its iteration index
  const user = users[__VU % users.length];

  // Define the login URL
  const url = 'http://localhost:4000/api/login';

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