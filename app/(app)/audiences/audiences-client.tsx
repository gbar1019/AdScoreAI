"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AudienceBuilder } from "@/components/audience-builder";
export function AudiencesClient() {
  const list = useQuery(api.audiences.listMine);
  const create = useMutation(api.audiences.create);
  const [value, setValue] = useState({ name: "", description: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSave() {
    setSaving(true);
    setError(null);
    try {
      await create({
        name: value.name.trim() || "Untitled",
        description: value.description.trim() || "—",
      });
      setValue({ name: "", description: "" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not save");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Audiences</h1>
        <p className="text-muted-foreground">
          Reusable audience profiles for scoring.
        </p>
      </div>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}

      <AudienceBuilder
        value={value}
        onChange={setValue}
        onSave={handleSave}
        saving={saving}
      />

      <Card>
        <CardHeader>
          <CardTitle>Saved audiences</CardTitle>
          <CardDescription>Use these when creating score jobs.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {list === undefined ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : list.length === 0 ? (
            <p className="text-sm text-muted-foreground">None yet.</p>
          ) : (
            list.map((a: Doc<"audiences">) => (
              <div key={a._id} className="rounded-md border border-border p-3">
                <p className="font-medium">{a.name}</p>
                <p className="text-sm text-muted-foreground">{a.description}</p>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
