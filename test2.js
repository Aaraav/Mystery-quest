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
//     return [
//       { teamlead_roll: '101', mobile: '9876543210' },
//       { teamlead_roll: '102', mobile: '9876543211' },
//       { teamlead_roll: '103', mobile: '9876543212' },
//       { teamlead_roll: '104', mobile: '9876543213' },
//       { teamlead_roll: '105', mobile: '9876543214' },
//       { teamlead_roll: '106', mobile: '9876543215' },
//       { teamlead_roll: '107', mobile: '9876543216' },
//       { teamlead_roll: '108', mobile: '9876543217' },
//       { teamlead_roll: '109', mobile: '9876543218' },
//       { teamlead_roll: '110', mobile: '9876543219' },
//       { teamlead_roll: '111', mobile: '9876543220' },
//       { teamlead_roll: '112', mobile: '9876543221' },
//       { teamlead_roll: '113', mobile: '9876543222' },
//       { teamlead_roll: '114', mobile: '9876543223' },
//       { teamlead_roll: '115', mobile: '9876543224' },
//       { teamlead_roll: '116', mobile: '9876543225' },
//       { teamlead_roll: '117', mobile: '9876543226' },
//       { teamlead_roll: '118', mobile: '9876543227' },
//       { teamlead_roll: '119', mobile: '9876543228' },
//       { teamlead_roll: '120', mobile: '9876543229' },
//       { teamlead_roll: '121', mobile: '9876543230' },
//       { teamlead_roll: '122', mobile: '9876543231' },
//       { teamlead_roll: '123', mobile: '9876543232' },
//       { teamlead_roll: '124', mobile: '9876543233' },
//       { teamlead_roll: '125', mobile: '9876543234' },
//       { teamlead_roll: '126', mobile: '9876543235' },
//       { teamlead_roll: '127', mobile: '9876543236' },
//       { teamlead_roll: '128', mobile: '9876543237' },
//       { teamlead_roll: '129', mobile: '9876543238' },
//       { teamlead_roll: '130', mobile: '9876543239' },
//       { teamlead_roll: '131', mobile: '9876543240' },
//       { teamlead_roll: '132', mobile: '9876543241' },
//       { teamlead_roll: '133', mobile: '9876543242' },
//       { teamlead_roll: '134', mobile: '9876543243' },
//       { teamlead_roll: '135', mobile: '9876543244' },
//       { teamlead_roll: '136', mobile: '9876543245' },
//       { teamlead_roll: '137', mobile: '9876543246' },
//       { teamlead_roll: '138', mobile: '9876543247' },
//       { teamlead_roll: '139', mobile: '9876543248' },
//       { teamlead_roll: '140', mobile: '9876543249' },
//       { teamlead_roll: '141', mobile: '9876543250' },
//       { teamlead_roll: '142', mobile: '9876543251' },
//       { teamlead_roll: '143', mobile: '9876543252' },
//       { teamlead_roll: '144', mobile: '9876543253' },
//       { teamlead_roll: '145', mobile: '9876543254' },
//       { teamlead_roll: '146', mobile: '9876543255' },
//       { teamlead_roll: '147', mobile: '9876543256' },
//       { teamlead_roll: '148', mobile: '9876543257' },
//       { teamlead_roll: '149', mobile: '9876543258' },
//       { teamlead_roll: '150', mobile: '9876543259' },
//       { teamlead_roll: '151', mobile: '9876543260' },
//       { teamlead_roll: '152', mobile: '9876543261' },
//       { teamlead_roll: '153', mobile: '9876543262' },
//       { teamlead_roll: '154', mobile: '9876543263' },
//       { teamlead_roll: '155', mobile: '9876543264' },
//       { teamlead_roll: '156', mobile: '9876543265' },
//       { teamlead_roll: '157', mobile: '9876543266' },
//       { teamlead_roll: '158', mobile: '9876543267' },
//       { teamlead_roll: '159', mobile: '9876543268' },
//       { teamlead_roll: '160', mobile: '9876543269' },
//       { teamlead_roll: '161', mobile: '9876543270' },
//       { teamlead_roll: '162', mobile: '9876543271' },
//       { teamlead_roll: '163', mobile: '9876543272' },
//       { teamlead_roll: '164', mobile: '9876543273' },
//       { teamlead_roll: '165', mobile: '9876543274' },
//       { teamlead_roll: '166', mobile: '9876543275' },
//       { teamlead_roll: '167', mobile: '9876543276' },
//       { teamlead_roll: '168', mobile: '9876543277' },
//       { teamlead_roll: '169', mobile: '9876543278' },
//       { teamlead_roll: '170', mobile: '9876543279' },
//       { teamlead_roll: '171', mobile: '9876543280' },
//       { teamlead_roll: '172', mobile: '9876543281' },
//       { teamlead_roll: '173', mobile: '9876543282' },
//       { teamlead_roll: '174', mobile: '9876543283' },
//     ];
//   });

// const users = new SharedArray('users', function () {
//   return [
//     { teamlead_roll: 'Roll 1', mobile: '111111111' },
//     { teamlead_roll: 'Roll 2', mobile: '111111112' },
//     { teamlead_roll: 'Roll 3', mobile: '111111113' },
//     { teamlead_roll: 'Roll 4', mobile: '111111114' },
//     { teamlead_roll: 'Roll 5', mobile: '111111115' },
//     { teamlead_roll: 'Roll 6', mobile: '111111116' },
//     { teamlead_roll: 'Roll 7', mobile: '111111117' },
//     { teamlead_roll: 'Roll 8', mobile: '111111118' },
//     { teamlead_roll: 'Roll 9', mobile: '111111119' },
//     { teamlead_roll: 'Roll 10', mobile: '1111111110' },
//     { teamlead_roll: 'Roll 11', mobile: '1111111111' },
//     { teamlead_roll: 'Roll 12', mobile: '1111111112' },
//     { teamlead_roll: 'Roll 13', mobile: '1111111113' },
//     { teamlead_roll: 'Roll 14', mobile: '1111111114' },
//     { teamlead_roll: 'Roll 15', mobile: '1111111115' },
//     { teamlead_roll: 'Roll 16', mobile: '1111111116' },
//     { teamlead_roll: 'Roll 17', mobile: '1111111117' },
//     { teamlead_roll: 'Roll 18', mobile: '1111111118' },
//     { teamlead_roll: 'Roll 19', mobile: '1111111119' },
//     { teamlead_roll: 'Roll 20', mobile: '1111111120' },
//     { teamlead_roll: 'Roll 21', mobile: '1111111121' },
//     { teamlead_roll: 'Roll 22', mobile: '1111111122' },
//     { teamlead_roll: 'Roll 23', mobile: '1111111123' },
//     { teamlead_roll: 'Roll 24', mobile: '1111111124' },
//     { teamlead_roll: 'Roll 25', mobile: '1111111125' },
//     { teamlead_roll: 'Roll 26', mobile: '1111111126' },
//     { teamlead_roll: 'Roll 27', mobile: '1111111127' },
//     { teamlead_roll: 'Roll 28', mobile: '1111111128' },
//     { teamlead_roll: 'Roll 29', mobile: '1111111129' },
//     { teamlead_roll: 'Roll 30', mobile: '1111111130' },
//     { teamlead_roll: 'Roll 31', mobile: '1111111131' },
//     { teamlead_roll: 'Roll 32', mobile: '1111111132' },
//     { teamlead_roll: 'Roll 33', mobile: '1111111133' },
//     { teamlead_roll: 'Roll 34', mobile: '1111111134' },
//     { teamlead_roll: 'Roll 35', mobile: '1111111135' },
//     { teamlead_roll: 'Roll 36', mobile: '1111111136' },
//     { teamlead_roll: 'Roll 37', mobile: '1111111137' },
//     { teamlead_roll: 'Roll 38', mobile: '1111111138' },
//     { teamlead_roll: 'Roll 39', mobile: '1111111139' },
//     { teamlead_roll: 'Roll 40', mobile: '1111111140' },
//     { teamlead_roll: 'Roll 41', mobile: '1111111141' },
//     { teamlead_roll: 'Roll 42', mobile: '1111111142' },
//     { teamlead_roll: 'Roll 43', mobile: '1111111143' },
//     { teamlead_roll: 'Roll 44', mobile: '1111111144' },
//     { teamlead_roll: 'Roll 45', mobile: '1111111145' },
//     { teamlead_roll: 'Roll 46', mobile: '1111111146' },
//     { teamlead_roll: 'Roll 47', mobile: '1111111147' },
//     { teamlead_roll: 'Roll 48', mobile: '1111111148' },
//     { teamlead_roll: 'Roll 49', mobile: '1111111149' },
//     { teamlead_roll: 'Roll 50', mobile: '1111111150' }
//   ];
// });

const users = new SharedArray('users', function () {
  return [
    { teamlead_roll: 'ROLL001', mobile: '1234567890' },
    { teamlead_roll: 'ROLL002', mobile: '1234567891' },
    { teamlead_roll: 'ROLL003', mobile: '1234567892' },
    { teamlead_roll: 'ROLL004', mobile: '1234567893' },
    { teamlead_roll: 'ROLL005', mobile: '1234567894' },
    { teamlead_roll: 'ROLL006', mobile: '1234567895' },
    { teamlead_roll: 'ROLL007', mobile: '1234567896' },
    { teamlead_roll: 'ROLL008', mobile: '1234567897' },
    { teamlead_roll: 'ROLL009', mobile: '1234567898' },
    { teamlead_roll: 'ROLL010', mobile: '1234567899' },
    { teamlead_roll: 'ROLL011', mobile: '1234567800' },
    { teamlead_roll: 'ROLL012', mobile: '1234567801' },
    { teamlead_roll: 'ROLL013', mobile: '1234567802' },
    { teamlead_roll: 'ROLL014', mobile: '1234567803' },
    { teamlead_roll: 'ROLL015', mobile: '1234567804' },
    { teamlead_roll: 'ROLL016', mobile: '1234567805' },
    { teamlead_roll: 'ROLL017', mobile: '1234567806' },
    { teamlead_roll: 'ROLL018', mobile: '1234567807' },
    { teamlead_roll: 'ROLL019', mobile: '1234567808' },
    { teamlead_roll: 'ROLL020', mobile: '1234567809' },
    { teamlead_roll: 'ROLL021', mobile: '1234567810' },
    { teamlead_roll: 'ROLL022', mobile: '1234567811' },
    { teamlead_roll: 'ROLL023', mobile: '1234567812' },
    { teamlead_roll: 'ROLL024', mobile: '1234567813' },
    { teamlead_roll: 'ROLL025', mobile: '1234567814' },
    { teamlead_roll: 'ROLL026', mobile: '1234567815' },
    { teamlead_roll: 'ROLL027', mobile: '1234567816' },
    { teamlead_roll: 'ROLL028', mobile: '1234567817' },
    { teamlead_roll: 'ROLL029', mobile: '1234567818' },
    { teamlead_roll: 'ROLL030', mobile: '1234567819' },
    { teamlead_roll: 'ROLL031', mobile: '1234567820' },
    { teamlead_roll: 'ROLL032', mobile: '1234567821' },
    { teamlead_roll: 'ROLL033', mobile: '1234567822' },
    { teamlead_roll: 'ROLL034', mobile: '1234567823' },
    { teamlead_roll: 'ROLL035', mobile: '1234567824' },
    { teamlead_roll: 'ROLL036', mobile: '1234567825' },
    { teamlead_roll: 'ROLL037', mobile: '1234567826' },
    { teamlead_roll: 'ROLL038', mobile: '1234567827' },
    { teamlead_roll: 'ROLL039', mobile: '1234567828' },
    { teamlead_roll: 'ROLL040', mobile: '1234567829' },
    { teamlead_roll: 'ROLL041', mobile: '1234567830' },
    { teamlead_roll: 'ROLL042', mobile: '1234567831' },
    { teamlead_roll: 'ROLL043', mobile: '1234567832' },
    { teamlead_roll: 'ROLL044', mobile: '1234567833' },
    { teamlead_roll: 'ROLL045', mobile: '1234567834' },
    { teamlead_roll: 'ROLL046', mobile: '1234567835' },
    { teamlead_roll: 'ROLL047', mobile: '1234567836' },
    { teamlead_roll: 'ROLL048', mobile: '1234567837' },
    { teamlead_roll: 'ROLL049', mobile: '1234567838' },
    { teamlead_roll: 'ROLL050', mobile: '1234567839' },
    { teamlead_roll: 'ROLL051', mobile: '1234567840' },
    { teamlead_roll: 'ROLL052', mobile: '1234567841' },
    { teamlead_roll: 'ROLL053', mobile: '1234567842' },
    { teamlead_roll: 'ROLL054', mobile: '1234567843' },
    { teamlead_roll: 'ROLL055', mobile: '1234567844' },
    { teamlead_roll: 'ROLL056', mobile: '1234567845' },
    { teamlead_roll: 'ROLL057', mobile: '1234567846' },
    { teamlead_roll: 'ROLL058', mobile: '1234567847' },
    { teamlead_roll: 'ROLL059', mobile: '1234567848' },
    { teamlead_roll: 'ROLL060', mobile: '1234567849' },
    { teamlead_roll: 'ROLL061', mobile: '1234567850' },
    { teamlead_roll: 'ROLL062', mobile: '1234567851' },
    { teamlead_roll: 'ROLL063', mobile: '1234567852' },
    { teamlead_roll: 'ROLL064', mobile: '1234567853' },
    { teamlead_roll: 'ROLL065', mobile: '1234567854' },
    { teamlead_roll: 'ROLL066', mobile: '1234567855' },
    { teamlead_roll: 'ROLL067', mobile: '1234567856' },
    { teamlead_roll: 'ROLL068', mobile: '1234567857' },
    { teamlead_roll: 'ROLL069', mobile: '1234567858' },
    { teamlead_roll: 'ROLL070', mobile: '1234567859' },
    { teamlead_roll: 'ROLL071', mobile: '1234567860' },
    { teamlead_roll: 'ROLL072', mobile: '1234567861' },
    { teamlead_roll: 'ROLL073', mobile: '1234567862' },
    { teamlead_roll: 'ROLL074', mobile: '1234567863' },
    { teamlead_roll: 'ROLL075', mobile: '1234567864' },
    { teamlead_roll: 'ROLL076', mobile: '1234567865' },
    { teamlead_roll: 'ROLL077', mobile: '1234567866' },
    { teamlead_roll: 'ROLL078', mobile: '1234567867' },
    { teamlead_roll: 'ROLL079', mobile: '1234567868' },
    { teamlead_roll: 'ROLL080', mobile: '1234567869' },
    { teamlead_roll: 'ROLL081', mobile: '1234567870' },
    { teamlead_roll: 'ROLL082', mobile: '1234567871' },
    { teamlead_roll: 'ROLL083', mobile: '1234567872' },
    { teamlead_roll: 'ROLL084', mobile: '1234567873' },
    { teamlead_roll: 'ROLL085', mobile: '1234567874' },
    { teamlead_roll: 'ROLL086', mobile: '1234567875' },
    { teamlead_roll: 'ROLL087', mobile: '1234567876' },
    { teamlead_roll: 'ROLL088', mobile: '1234567877' },
    { teamlead_roll: 'ROLL089', mobile: '1234567878' },
    { teamlead_roll: 'ROLL090', mobile: '1234567879' },
    { teamlead_roll: 'ROLL091', mobile: '1234567880' },
    { teamlead_roll: 'ROLL092', mobile: '1234567881' },
    { teamlead_roll: 'ROLL093', mobile: '1234567882' },
    { teamlead_roll: 'ROLL094', mobile: '1234567883' },
    { teamlead_roll: 'ROLL095', mobile: '1234567884' },
    { teamlead_roll: 'ROLL096', mobile: '1234567885' },
    { teamlead_roll: 'ROLL097', mobile: '1234567886' },
    { teamlead_roll: 'ROLL098', mobile: '1234567887' },
    { teamlead_roll: 'ROLL099', mobile: '1234567888' },
    { teamlead_roll: 'ROLL100', mobile: '1234567889' }
  ];
});


  

// Login test scenario
export default function () {
  // Get a unique user for each VU based on its iteration index
  const user = users[__VU % users.length];

  // Define the login URL
  const loginUrl = 'http://13.60.156.243:1337/api/login'; // Change to your actual login endpoint
  const riddleUrl = 'http://13.60.156.243:1337/api/getRiddles';

  // Define the payload for login
  const loginPayload = JSON.stringify({
    teamlead_roll: user.teamlead_roll,
    mobile: user.mobile,
  });

  // Define request headers for login
  const loginHeaders = {
    'Content-Type': 'application/json',
  };

  // Perform the POST request for login
  const loginResponse = http.post(loginUrl, loginPayload, { headers: loginHeaders });

  // Check for a successful login response
  const successChecks = {
    'is status 200': (r) => r.status === 200,
    'login successful': (r) => r.json('message') === 'You are successfully logged in',
  };

  const loginSuccess = check(loginResponse, successChecks);

  // Extract access token from the login response
  const accessToken = loginSuccess ? loginResponse.json('token') : null; // Adjust based on your response structure

  // If login was successful, request riddles
  if (accessToken) {
    const riddleHeaders = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`, // Include token in the header
    };

    // Perform the GET request for riddles
    const riddleResponse = http.get(riddleUrl, { headers: riddleHeaders });

    // Check for a successful riddles retrieval response
    const riddleChecks = {
      'is status 200': (r) => r.status === 200,
      'riddles retrieved': (r) => Array.isArray(r.json()) && r.json().length > 0, // Adjust based on your response structure
    };

    check(riddleResponse, riddleChecks);
  } else {
    console.error('Login failed, cannot retrieve riddles.');
  }

  // Simulate a small wait time between iterations
  sleep(1);
}
