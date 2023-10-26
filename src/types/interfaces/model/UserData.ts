import CompanyData from "./CompanyData";

export default interface UserData {
    userType?: string;
    fullName?: string;
    contactNumber?: number;
    dateOfBirth?: string;
    gender?: string;
    nationality?: string;
    address?: string;
    identificationNumber?: number;
    passportNumber?: string;
    email?: string;
    password?: string;
    companyDetails?: CompanyData;
}