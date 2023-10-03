export interface RegisterUser{
  email:string;
  userName:string;
  addressLineOne:string;
  addressLineTwo:string;
  city:string;
  state:string;
  country:string;
  zipPostalCode:string;
  dateOfBirth?:Date;
  firstname:string;
  homePhone:string;
  lastname:string;
  mobilePhone:string;
  title:string;
  password:string;
  token?: string;

}
