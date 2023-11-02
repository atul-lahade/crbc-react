export default interface ApplicantData {
    applicantId: number;
    fullName: string;
    dateOfBirth: Date;
    gender: string;
    nationality: string;
    contactNumber: string;
    address: string;
    identificationNumber: string;
    passportNumber: string;
    criminalRecord: CriminalRecord;
}

export interface CriminalRecord {
    crimeDescription: string;
    convictionDate: Date;
    severityLevel: string;
    judicialAuthority: string;
}