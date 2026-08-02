import { AlertRecord, Contact } from "./types";

const CONTACTS_KEY = "rers.contacts";
const ALERTS_KEY = "rers.alerts";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getContacts(): Contact[] {
  return read<Contact[]>(CONTACTS_KEY, []);
}

export function saveContacts(contacts: Contact[]) {
  write(CONTACTS_KEY, contacts);
}

export function getAlerts(): AlertRecord[] {
  return read<AlertRecord[]>(ALERTS_KEY, []);
}

export function saveAlerts(alerts: AlertRecord[]) {
  write(ALERTS_KEY, alerts);
}

export function addAlert(alert: AlertRecord) {
  const alerts = getAlerts();
  alerts.unshift(alert);
  saveAlerts(alerts);
}

export function uid(): string {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}
