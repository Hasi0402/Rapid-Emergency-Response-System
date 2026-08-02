import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogClose } from "@/components/ui/dialog";
import { getContacts, saveContacts, uid } from "@/lib/storage";
import { Contact } from "@/lib/types";
import { toast } from "sonner";

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Contact | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [relation, setRelation] = useState("");

  useEffect(() => {
    setContacts(getContacts());
  }, []);

  function openNew() {
    setEditing(null);
    setName("");
    setPhone("");
    setRelation("");
    setOpen(true);
  }

  function openEdit(c: Contact) {
    setEditing(c);
    setName(c.name);
    setPhone(c.phone);
    setRelation(c.relation);
    setOpen(true);
  }

  function submit() {
    if (!name.trim() || !phone.trim()) {
      toast.error("Name and phone number are required.");
      return;
    }
    let next: Contact[];
    if (editing) {
      next = contacts.map((c) => (c.id === editing.id ? { ...c, name, phone, relation } : c));
    } else {
      next = [...contacts, { id: uid(), name, phone, relation }];
    }
    setContacts(next);
    saveContacts(next);
    setOpen(false);
    toast.success(editing ? "Contact updated." : "Contact added.");
  }

  function remove(id: string) {
    const next = contacts.filter((c) => c.id !== id);
    setContacts(next);
    saveContacts(next);
    toast.success("Contact removed.");
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-signal-teal">Contacts</p>
          <h1 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-base-100">
            Who gets notified
          </h1>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openNew}>Add contact</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle>{editing ? "Edit contact" : "Add contact"}</DialogTitle>
            <div className="mt-5 space-y-4">
              <div>
                <Label htmlFor="c-name">Name</Label>
                <Input id="c-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jordan Lee" />
              </div>
              <div>
                <Label htmlFor="c-phone">Phone number</Label>
                <Input id="c-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1 555 010 2277" />
              </div>
              <div>
                <Label htmlFor="c-relation">Relation</Label>
                <Input id="c-relation" value={relation} onChange={(e) => setRelation(e.target.value)} placeholder="Sister, neighbor, doctor..." />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <DialogClose asChild>
                  <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button onClick={submit}>{editing ? "Save changes" : "Add contact"}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {contacts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-sm text-base-400">
              No contacts yet. Add the people you want notified when you send an alert.
            </p>
          </CardContent>
        </Card>
      ) : (
        <ul className="space-y-2.5">
          {contacts.map((c) => (
            <li key={c.id}>
              <Card>
                <CardContent className="p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-base-100">{c.name}</p>
                    <p className="text-xs text-base-400 font-mono">{c.phone} &middot; {c.relation || "Contact"}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEdit(c)}>Edit</Button>
                    <Button size="sm" variant="danger" onClick={() => remove(c.id)}>Remove</Button>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
