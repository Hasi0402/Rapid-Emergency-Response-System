export type EmergencyType = "medical" | "fire" | "accident" | "other";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
}

export interface AlertRecord {
  id: string;
  type: EmergencyType;
  createdAt: number;
  latitude: number | null;
  longitude: number | null;
  note: string;
  notifiedContactIds: string[];
}

export interface ServiceEntry {
  id: string;
  name: string;
  category: "police" | "fire" | "hospital";
  phone: string;
  distanceKm: number;
}
