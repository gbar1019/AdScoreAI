"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export type EmailFormValue = {
  subject: string;
  previewText: string;
  body: string;
};

export function EmailInputForm({
  value,
  onChange,
}: {
  value: EmailFormValue;
  onChange: (v: EmailFormValue) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label htmlFor="email-subject">Subject</Label>
        <Input
          id="email-subject"
          value={value.subject}
          onChange={(e) => onChange({ ...value, subject: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email-preview">Preview text</Label>
        <Input
          id="email-preview"
          value={value.previewText}
          onChange={(e) => onChange({ ...value, previewText: e.target.value })}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="email-body">Body</Label>
        <Textarea
          id="email-body"
          rows={8}
          value={value.body}
          onChange={(e) => onChange({ ...value, body: e.target.value })}
        />
      </div>
    </div>
  );
}
