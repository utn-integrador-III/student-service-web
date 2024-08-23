// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  URL_USERS: '',
  URL_REPORT: '',
  URL_AUTH: 'http://localhost:5002/auth',
  URL_REFRESH: 'http://localhost:5002/auth/refresh',
  URL_ZONE: 'http://localhost:5001/zone',
  URL_API_CATEGORY: 'http://localhost:5001/category',
  URL_LOSTANDFOUND: 'http://localhost:5001/lostObject',
  URL_LOSTOBJECTSBYID: '',
  URL_ENROLLMENT: 'http://localhost:5002/auth/enrollment',
  URL_VERIFY: 'http://localhost:5002/user/verification',
  URL_API_LABMANAGING: 'http://localhost:5003/lab',
  URL_API_PROFESSOR: 'http://localhost:5003/professor',
  URL_API_SAFEKEEPER: 'http://localhost:5001/safekeeper',
  URL_LOGOUT: 'http://localhost:5002/auth/logout',
  URL_TEACHEREMAIL: 'http://localhost:5003/professor/byemail',
  URL_BOOKING: 'http://localhost:5003/booking',
  URL_BOOKING_COMPUTER: 'http://localhost:5003/booking/computer',
};
