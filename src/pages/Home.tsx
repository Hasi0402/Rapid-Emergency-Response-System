import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addAlert, getContacts, uid } from "@/lib/storage";
import { AlertRecord, Contact, EmergencyType } from "@/lib/types";
import { EMERGENCY_LABELS } from "@/lib/utils";
import { toast } from "sonner";

const TYPES: EmergencyType[] = ["medical", "fire", "accident", "other"];

type Coords = { latitude: number; longitude: number } | null;

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [type, setType] = useState<EmergencyType>("medical");
  const [note, setNote] = useState("");
  const [coords, setCoords] = useState<Coords>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [lastAlert, setLastAlert] = useState<AlertRecord | null>(null);

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  function locate() {
    if (!("geolocation" in navigator)) {
      setLocationError("Location is not available on this device.");
      return;
    }
    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        setLocating(false);
      },
      () => {
        setLocationError("Location permission was denied or is unavailable.");
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }

  useEffect(() => {
    locate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function sendAlert() {
    const record: AlertRecord = {
      id: uid(),
      type,
      createdAt: Date.now(),
      latitude: coords?.latitude ?? null,
      longitude: coords?.longitude ?? null,
      note,
      notifiedContactIds: contacts.map((c) => c.id),
    };
    addAlert(record);
    setLastAlert(record);
    toast.success("Alert logged. Notify your contacts below.");
  }

  const mapsLink = coords
    ? `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`
    : null;

  function messageFor(contact: Contact) {
    const typeLabel = EMERGENCY_LABELS[type];
    const locationText = mapsLink ? ` My location: ${mapsLink}` : " Location unavailable.";
    const noteText = note ? ` Note: ${note}` : "";
    return encodeURIComponent(
      `Emergency (${typeLabel}). I need help.${locationText}${noteText}`
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-alert-light">Emergency alert</p>
        <h1 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-base-100 text-balance">
          Send your location to the people who can help
        </h1>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {TYPES.map((t) => (
          <button
            key={t}
            onClick={() => setType(t)}
            className={`rounded-lg border px-3 py-3 text-sm font-medium transition-colors ${
              type === t
                ? "border-alert bg-alert/10 text-alert-light"
                : "border-base-700 text-base-300 hover:border-base-600"
            }`}
          >
            {EMERGENCY_LABELS[t]}
          </button>
        ))}
      </div>

      <div className="flex flex-col items-center py-6">
        <div className="relative flex h-40 w-40 items-center justify-center">
          <span className="absolute inline-flex h-full w-full rounded-full bg-alert/40 animate-radar" />
          <span
            className="absolute inline-flex h-full w-full rounded-full bg-alert/40 animate-radar"
            style={{ animationDelay: "1.1s" }}
          />
          <button
            onClick={sendAlert}
            className="relative z-10 flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-full bg-alert text-white shadow-[0_0_40px_rgba(226,59,59,0.35)] transition-transform active:scale-95"
          >
            <span className="font-display text-xl font-bold tracking-tight">SOS</span>
            <span className="text-[11px] font-medium opacity-90">Send alert</span>
          </button>
        </div>
        <p className="mt-4 font-mono text-xs text-base-400">
          {locating
            ? "Locating..."
            : coords
            ? `${coords.latitude.toFixed(5)}, ${coords.longitude.toFixed(5)}`
            : locationError ?? "Location not yet captured"}
        </p>
        {!coords && !locating && (
          <Button variant="outline" size="sm" className="mt-3" onClick={locate}>
            Retry location
          </Button>
        )}
      </div>

      <Card>
        <CardContent className="p-5 space-y-3">
          <Label htmlFor="note">Optional note</Label>
          <Input
            id="note"
            placeholder="e.g. Third floor, near the north stairwell"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </CardContent>
      </Card>

      {lastAlert && (
        <Card>
          <CardContent className="p-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-semibold text-base-100">
                Alert logged &middot; notify your contacts
              </p>
              <Badge tone="alert">{EMERGENCY_LABELS[lastAlert.type]}</Badge>
            </div>
            {contacts.length === 0 ? (
              <p className="text-sm text-base-400">
                You have no saved contacts yet. Add one from the Contacts tab so you can reach them quickly next time.
              </p>
            ) : (
              <ul className="space-y-2">
                {contacts.map((c) => (
                  <li
                    key={c.id}
                    className="flex items-center justify-between rounded-lg border border-base-700 px-3.5 py-2.5"
                  >
                    <div>
                      <p className="text-sm font-medium text-base-100">{c.name}</p>
                      <p className="text-xs text-base-400">{c.relation}</p>
                    </div>
                    <div className="flex gap-2">
                      <a href={`tel:${c.phone}`}>
                        <Button size="sm" variant="secondary">Call</Button>
                      </a>
                      <a href={`sms:${c.phone}?body=${messageFor(c)}`}>
                        <Button size="sm" variant="primary">Text</Button>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
