// environment.ts

// Este archivo puede ser reemplazado durante la construcción utilizando el array `fileReplacements`.
// `ng build --prod` reemplaza `environment.ts` con `environment.prod.ts`.
// La lista de reemplazos de archivos se puede encontrar en `angular.json`.

const URL_API_SECURITY =
  'https://dashboard.render.com/web/srv-cr9pl2jv2p9s73bc2t7g';
const URL_API_STUDENT_SERVICE =
  'https://dashboard.render.com/web/srv-cr9pneaj1k6c73bjutpg';
const URL_API_LABMANAGING =
  'https://dashboard.render.com/web/srv-cr9pq3ij1k6c73bjvcv0';

export const environment = {
  production: false,
  URL_USERS: `${URL_API_SECURITY}/user`,
  URL_REPORT: `${URL_API_LABMANAGING}/report`,
  URL_AUTH: `${URL_API_SECURITY}/auth`,
  URL_REFRESH: `${URL_API_SECURITY}/auth/refresh`,
  URL_ZONE: `${URL_API_STUDENT_SERVICE}/zone`,
  URL_API_CATEGORY: `${URL_API_STUDENT_SERVICE}/category`,
  URL_LOSTANDFOUND: `${URL_API_STUDENT_SERVICE}/lostObject`,
  URL_LOSTOBJECTSBYID: `${URL_API_STUDENT_SERVICE}/lostObjectById`,
  URL_ENROLLMENT: `${URL_API_SECURITY}/user/enrollment`,
  URL_VERIFY: `${URL_API_SECURITY}/user/verification`,
  URL_API_LABMANAGING: `${URL_API_LABMANAGING}/lab`,
  URL_API_PROFESSOR: `${URL_API_LABMANAGING}/professor`,
  URL_API_SAFEKEEPER: `${URL_API_LABMANAGING}/safekeeper`,
  URL_LOGOUT: `${URL_API_SECURITY}/auth/logout`,
  URL_TEACHEREMAIL: `${URL_API_LABMANAGING}/professor/byemail`,
  URL_BOOKING: `${URL_API_LABMANAGING}/booking`,
  URL_BOOKING_COMPUTER: `${URL_API_LABMANAGING}/booking/computer`,
  URL_PASSWORD_RESET: `${URL_API_SECURITY}/user/password`,
  URL_CHANGE_PASSOWORD: `${URL_API_SECURITY}/user/password`,
};
