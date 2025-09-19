import React, { useMemo, useState } from "react";
import SlideOver from "@/components/ui/SlideOver";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import type { Lead, LeadStatus, LeadUpdate } from "@/features/leads/types";
import {
  LEAD_STATUSES,
  getLeadStatusColor,
  getLeadStatusLabel,
} from "@/features/leads/constants";
import { isEmail } from "@/lib/email";

type Props = {
  open: boolean;
  lead: Lead | null;
  onClose: () => void;
  onSave: (id: string, patch: LeadUpdate) => Promise<void> | void;
  /** novo: disparado para converter o lead em opportunity */
  onConvert?: (lead: Lead) => Promise<void> | void;
};

export default function LeadDetailPanel({
  open,
  lead,
  onClose,
  onSave,
  onConvert,
}: Props) {
  const initial = useMemo(
    () => ({
      email: lead?.email ?? "",
      status: (lead?.status ?? "new") as LeadStatus,
    }),
    [lead]
  );

  const [email, setEmail] = useState(initial.email);
  const [status, setStatus] = useState<LeadStatus>(initial.status);
  const [saving, setSaving] = useState(false);
  const [converting, setConverting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  React.useEffect(() => {
    setEmail(initial.email);
    setStatus(initial.status);
    setErr(null);
  }, [initial.email, initial.status, open]);

  async function handleSave() {
    if (!lead) return;
    if (email && !isEmail(email)) {
      setErr("Invalid e-mail");
      return;
    }
    setErr(null);
    setSaving(true);
    try {
      await onSave(lead.id, { email, status });
      onClose();
    } catch (e) {
      console.error(e);
      setErr("Could not save changes.");
    } finally {
      setSaving(false);
    }
  }

  async function handleConvert() {
    if (!lead || !onConvert) return;
    setConverting(true);
    try {
      await onConvert(lead);
      onClose();
    } catch (e) {
      console.error(e);
      setErr("Could not convert lead.");
    } finally {
      setConverting(false);
    }
  }

  const statusOptions = LEAD_STATUSES.map((s) => ({
    value: s.value,
    label: s.label,
  }));

  return (
    <SlideOver open={open} title={lead ? lead.name : ""} onClose={onClose}>
      {!lead ? null : (
        <div className="flex flex-col gap-6">
          <section className="space-y-2">
            <div className="text-sm text-gray-500">Company</div>
            <div className="text-gray-900">{lead.company || "—"}</div>
          </section>

          <section className="grid gap-4">
            <Input
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@company.com"
            />

            <Select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value as LeadStatus)}
              options={statusOptions}
            />

            <div className="flex items-center gap-2">
              <div className="text-sm text-gray-500">Current status:</div>
              <Badge color={getLeadStatusColor(lead.status)}>
                {getLeadStatusLabel(lead.status)}
              </Badge>
            </div>

            {err && <p className="text-sm text-red-600">{err}</p>}
          </section>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            {onConvert && (
              <Button
                variant="secondary"
                onClick={handleConvert}
                loading={converting}
                loadingLabel="Converting…"
              >
                Convert Lead
              </Button>
            )}

            <div className="ml-auto flex items-center gap-2">
              <Button
                variant="ghost"
                onClick={onClose}
                disabled={saving || converting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                loading={saving}
                loadingLabel="Saving…"
              >
                Save changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </SlideOver>
  );
}
