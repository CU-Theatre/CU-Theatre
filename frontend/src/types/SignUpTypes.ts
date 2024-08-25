export type SignUpData = {
  firstName: string;
  lastName: string;
  password: string;
  repeatPassword: string;
  email: string;
  phoneNumber: string;
};


export type SignUpResponse = {
  "id": number,
  "email": string,
  "firstName": string,
  "lastName": string,
  "phoneNumber": string,
  "roleName": null
};
