import { EmergencyContactType } from "../types/EmergencyContactType";
import { client } from "../utils/fetchClient";

export const addEmergencyContact = (contact: EmergencyContactType, token: string) => {
  return client.post('/emergency-contact/add', contact, token);
};

export const updateEmergencyContact = (contact: EmergencyContactType, token: string) => {
  return client.put('/emergency-contact/update', contact, token);
};

export const getEmergencyContact = ( userId: number, token: string): Promise<EmergencyContactType> => {
  return client.get(`/emergency-contact/get/${userId}`, token);
};