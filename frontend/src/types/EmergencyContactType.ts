export interface EmergencyContactType {
  id?: number | null;
  userId?: number | null | undefined;
  firstName: string | null;
  lastName: string | null;
  relation: string | null;
  phoneNumber: string | null;
}