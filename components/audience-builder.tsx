"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type AudienceBuilderValue = {
  name: string;
  description: string;
};

export function AudienceBuilder({
  value,
  onChange,
  onSave,
  saving,
}: {
  value: AudienceBuilderValue;
  onChange: (v: AudienceBuilderValue) => void;
  onSave?: () => void;
  saving?: boolean;
}) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="space-y-4 rounded-lg border border-border p-4">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-medium">Audience</h3>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setExpanded((e) => !e)}
        >
          {expanded ? "Collapse" : "Expand"}
        </Button>
      </div>
      {expanded ? (
        <div className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="aud-name">Name</Label>
            <Input
              id="aud-name"
              value={value.name}
              onChange={(e) => onChange({ ...value, name: e.target.value })}
              placeholder="e.g. US prosumer homeowners"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="aud-desc">Description</Label>
            <Textarea
              id="aud-desc"
              value={value.description}
              onChange={(e) =>
                onChange({ ...value, description: e.target.value })
              }
              placeholder="Goals, pain points, demographics, objections..."
              rows={4}
            />
          </div>
          {onSave ? (
            <Button type="button" onClick={onSave} disabled={saving}>
              {saving ? "Saving…" : "Save audience"}
            </Button>
          ) : null}
          <p className="text-xs text-muted-foreground">
            TODO: Structured audience fields (vertical, funnel stage, region) per
            SCHEMA_BLUEPRINT.
          </p>
        </div>
      ) : null}
    </div>
  );
}
