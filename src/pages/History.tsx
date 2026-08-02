import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAlerts, saveAlerts } from "@/lib/storage";
import { AlertRecord } from "@/lib/types";
import { EMERGENCY_LABELS, formatDateTime } from "@/lib/utils";
import { toast } from "sonner";

export default function History() {
  const [alerts, setAlerts] = useState<AlertRecord[]>([]);

  useEffect(() => {
    setAlerts(getAlerts());
  }, []);

  function clearAll() {
    saveAlerts([]);
    setAlerts([]);
    toast.success("History cleared.");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-base-400">Log</p>
          <h1 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-base-100">
            Alert history
          </h1>
        </div>
        {alerts.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearAll}>
            Clear history
          </Button>
        )}
      </div>

      {alerts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-sm text-base-400">No alerts sent yet.</p>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-2.5">
          {alerts.map((a) => (
            <li key={a.id}>
              <Card>
                <CardContent className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <Badge tone="alert">{EMERGENCY_LABELS[a.type]}</Badge>
                    <span className="font-mono text-xs text-base-400">{formatDateTime(a.createdAt)}</span>
                  </div>
                  <p className="text-xs text-base-400 font-mono">
                    {a.latitude && a.longitude
                      ? `${a.latitude.toFixed(5)}, ${a.longitude.toFixed(5)}`
                      : "No location captured"}
                  </p>
                  {a.note && <p className="text-sm text-base-200">{a.note}</p>}
                  <p className="text-xs text-base-400">
                    {a.notifiedContactIds.length} contact{a.notifiedContactIds.length === 1 ? "" : "s"} notified
                  </p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
