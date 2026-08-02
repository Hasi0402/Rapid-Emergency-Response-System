import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ServiceEntry } from "@/lib/types";

const SERVICES: ServiceEntry[] = [
  { id: "1", name: "City Police Dispatch", category: "police", phone: "100", distanceKm: 1.2 },
  { id: "2", name: "Fire & Rescue Station 4", category: "fire", phone: "101", distanceKm: 2.4 },
  { id: "3", name: "General Hospital ER", category: "hospital", phone: "102", distanceKm: 3.1 },
  { id: "4", name: "Riverside Police Outpost", category: "police", phone: "100", distanceKm: 4.6 },
  { id: "5", name: "St. Anne's Medical Center", category: "hospital", phone: "102", distanceKm: 5.0 },
];

const CATEGORY_TONE: Record<ServiceEntry["category"], "alert" | "amber" | "teal"> = {
  police: "teal",
  fire: "amber",
  hospital: "alert",
};

const CATEGORY_LABEL: Record<ServiceEntry["category"], string> = {
  police: "Police",
  fire: "Fire",
  hospital: "Hospital",
};

export default function Services() {
  const sorted = [...SERVICES].sort((a, b) => a.distanceKm - b.distanceKm);

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-signal-amber">Directory</p>
        <h1 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-base-100">
          Nearby emergency services
        </h1>
        <p className="mt-2 text-sm text-base-400">
          Sample directory entries. Replace these with verified local numbers for your area before relying on this list.
        </p>
      </div>

      <ul className="space-y-2.5">
        {sorted.map((s) => (
          <li key={s.id}>
            <Card>
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-base-100">{s.name}</p>
                    <Badge tone={CATEGORY_TONE[s.category]}>{CATEGORY_LABEL[s.category]}</Badge>
                  </div>
                  <p className="mt-1 text-xs text-base-400 font-mono">{s.distanceKm.toFixed(1)} km away</p>
                </div>
                <a href={`tel:${s.phone}`}>
                  <Button size="sm">Call</Button>
                </a>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
}
