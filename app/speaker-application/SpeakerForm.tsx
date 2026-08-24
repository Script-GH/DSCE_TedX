"use client";

import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  CheckboxRow,
  SectionHeading,
  TextAreaField,
  TextField,
  YesNoToggle,
} from "./formFields";
import {
  emptySpeakerApplication,
  validateSpeakerApplication,
  type SpeakerApplicationErrors,
  type SpeakerApplicationInput,
} from "../lib/validateSpeakerApplication";

type FormData = SpeakerApplicationInput;

export default function SpeakerForm() {
  const [data, setData] = useState<FormData>(emptySpeakerApplication);
  const [errors, setErrors] = useState<SpeakerApplicationErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const set = <K extends keyof FormData>(field: K, value: FormData[K]) =>
    setData((prev) => ({ ...prev, [field]: value }));

  const onText = (field: keyof FormData) => (e: ChangeEvent<HTMLInputElement>) => set(field, e.target.value as never);
  const onArea = (field: keyof FormData) => (e: ChangeEvent<HTMLTextAreaElement>) => set(field, e.target.value as never);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const found = validateSpeakerApplication(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const firstField = Object.keys(found)[0];
      document.getElementById(firstField)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/speaker-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const body = (await res.json().catch(() => null)) as
        | { error?: string; fieldErrors?: SpeakerApplicationErrors }
        | null;

      if (body?.fieldErrors) {
        setErrors(body.fieldErrors);
        const firstField = Object.keys(body.fieldErrors)[0];
        document.getElementById(firstField)?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setSubmitError(body?.error || "Something went wrong. Please try again.");
    } catch {
      setSubmitError("Couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "40px 24px",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "color-mix(in oklab, var(--ted) 15%, transparent)",
            border: "1px solid color-mix(in oklab, var(--ted) 40%, transparent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            color: "var(--ted)",
            marginBottom: 26,
          }}
        >
          ✓
        </div>
        <h1
          className="display"
          style={{
            fontSize: "clamp(28px,4vw,42px)",
            marginBottom: 16,
          }}
        >
          Application received
        </h1>
        <p style={{ fontSize: 16, color: "#a3a3a3", maxWidth: 480, lineHeight: 1.6, marginBottom: 36 }}>
          Thanks for putting your idea forward, {data.fullName.split(" ")[0] || "friend"}. Our curation team
          reviews every submission — if it&apos;s a fit for Rise of the Domineo, we&apos;ll reach out at{" "}
          <strong style={{ color: "#f5f5f5" }}>{data.email}</strong>.
        </p>
        <Link
          href="/"
          className="transition-transform duration-300 hover:scale-[1.03]"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 9,
            background: "var(--ted)",
            color: "#fff",
            padding: "15px 28px",
            borderRadius: 100,
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          Back to home
        </Link>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <div style={{ padding: "140px 24px 120px" }}>
      <div style={{ maxWidth: 720, margin: "0 auto" }}>
        <Link
          href="/"
          className="text-muted-foreground transition-colors hover:text-foreground"
          style={{ fontSize: 13.5, marginBottom: 30, display: "inline-block" }}
        >
          &larr; Back to home
        </Link>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            letterSpacing: ".22em",
            textTransform: "uppercase",
            color: "var(--ted)",
            marginBottom: 16,
          }}
        >
          Speaker Application
        </div>
        <h1
          className="display"
          style={{
            fontSize: "clamp(32px, 5vw, 52px)",
            lineHeight: 1.05,
            marginBottom: 18,
          }}
        >
          Become a TEDxDSCE speaker
        </h1>
        <p style={{ fontSize: 16, color: "#a3a3a3", lineHeight: 1.65, maxWidth: 560 }}>
          Every talk starts with one idea worth spreading. Tell us about yours — fields marked{" "}
          <span style={{ color: "var(--ted)" }}>*</span> are required.
        </p>

        <form onSubmit={onSubmit} noValidate style={{ marginTop: 20 }}>
          {submitError && (
            <div
              style={{
                marginTop: 30,
                padding: "14px 18px",
                borderRadius: 10,
                border: "1px solid color-mix(in oklab, var(--ted) 40%, transparent)",
                background: "color-mix(in oklab, var(--ted) 8%, transparent)",
                color: "#ff8a7e",
                fontSize: 14,
              }}
            >
              {submitError}
            </div>
          )}
          {!submitError && errorCount > 0 && (
            <div
              style={{
                marginTop: 30,
                padding: "14px 18px",
                borderRadius: 10,
                border: "1px solid color-mix(in oklab, var(--ted) 40%, transparent)",
                background: "color-mix(in oklab, var(--ted) 8%, transparent)",
                color: "#ff8a7e",
                fontSize: 14,
              }}
            >
              Please fix {errorCount} {errorCount === 1 ? "issue" : "issues"} below before submitting.
            </div>
          )}

          <SectionHeading eyebrow="01" title="Personal Information" />
          <TextField label="Full Name" name="fullName" value={data.fullName} onChange={onText("fullName")} required error={errors.fullName} />
          <TextField label="Preferred Name" name="preferredName" value={data.preferredName} onChange={onText("preferredName")} hint="Optional" />
          <TextField label="Email Address" name="email" type="email" value={data.email} onChange={onText("email")} required error={errors.email} />
          <TextField label="Phone Number" name="phone" type="tel" value={data.phone} onChange={onText("phone")} required error={errors.phone} />
          <TextField label="City" name="city" value={data.city} onChange={onText("city")} required error={errors.city} />
          <TextField label="State" name="state" value={data.state} onChange={onText("state")} required error={errors.state} />
          <TextField label="Country" name="country" value={data.country} onChange={onText("country")} required error={errors.country} />
          <TextField label="Current Organization" name="organization" value={data.organization} onChange={onText("organization")} required error={errors.organization} />
          <TextField label="Current Designation / Role" name="designation" value={data.designation} onChange={onText("designation")} required error={errors.designation} />
          <TextField label="LinkedIn Profile" name="linkedinProfile" type="url" value={data.linkedinProfile} onChange={onText("linkedinProfile")} placeholder="https://linkedin.com/in/..." />
          <TextField label="Personal Website / Portfolio" name="website" type="url" value={data.website} onChange={onText("website")} hint="Optional" placeholder="https://..." />

          <SectionHeading eyebrow="02" title="About You" />
          <TextAreaField
            label="Short Bio"
            name="bio"
            value={data.bio}
            onChange={onArea("bio")}
            maxWords={150}
            error={errors.bio}
            rows={5}
          />

          <SectionHeading eyebrow="03" title="Your TEDx Talk" />
          <TextField label="Proposed Talk Title" name="talkTitle" value={data.talkTitle} onChange={onText("talkTitle")} required error={errors.talkTitle} />
          <TextAreaField
            label="One-Line Summary"
            name="oneLineSummary"
            value={data.oneLineSummary}
            onChange={onArea("oneLineSummary")}
            hint="Explain your talk in one sentence."
            maxWords={30}
            error={errors.oneLineSummary}
            rows={2}
          />
          <TextAreaField
            label="The Big Idea"
            name="bigIdea"
            value={data.bigIdea}
            onChange={onArea("bigIdea")}
            hint="What is the core idea behind your talk?"
            maxWords={250}
            error={errors.bigIdea}
            rows={6}
          />

          <SectionHeading eyebrow="04" title="Audience Takeaways" />
          <p style={{ fontSize: 13, color: "#737373", marginBottom: 18, marginTop: -12 }}>
            What are the top 3 things the audience should remember?
          </p>
          <TextField label="Takeaway 1" name="takeaway1" value={data.takeaway1} onChange={onText("takeaway1")} />
          <TextField label="Takeaway 2" name="takeaway2" value={data.takeaway2} onChange={onText("takeaway2")} />
          <TextField label="Takeaway 3" name="takeaway3" value={data.takeaway3} onChange={onText("takeaway3")} />

          <SectionHeading eyebrow="05" title="Evidence & Credibility" />
          <TextAreaField
            label="What qualifies you to speak on this topic?"
            name="credibility"
            value={data.credibility}
            onChange={onArea("credibility")}
            rows={4}
          />

          <SectionHeading eyebrow="06" title="Previous Speaking Experience" />
          <YesNoToggle
            label="Have you spoken publicly before?"
            value={data.spokenBefore}
            onChange={(v) => set("spokenBefore", v)}
            required
            error={errors.spokenBefore}
          />
          {data.spokenBefore === "yes" && (
            <div style={{ paddingLeft: 20, borderLeft: "2px solid rgba(230,43,30,.3)", marginBottom: 10 }}>
              <TextField label="Event Name" name="prevEventName" value={data.prevEventName} onChange={onText("prevEventName")} error={errors.prevEventName} />
              <TextField label="Audience Size" name="prevAudienceSize" value={data.prevAudienceSize} onChange={onText("prevAudienceSize")} />
              <TextField label="Link to Video" name="prevVideoLink" type="url" value={data.prevVideoLink} onChange={onText("prevVideoLink")} placeholder="YouTube / Vimeo link" />
            </div>
          )}

          <SectionHeading eyebrow="07" title="Social Presence" />
          <TextField label="LinkedIn" name="socialLinkedin" type="url" value={data.socialLinkedin} onChange={onText("socialLinkedin")} />
          <TextField label="Instagram" name="socialInstagram" value={data.socialInstagram} onChange={onText("socialInstagram")} />
          <TextField label="X (Twitter)" name="socialX" value={data.socialX} onChange={onText("socialX")} />
          <TextField label="YouTube" name="socialYoutube" type="url" value={data.socialYoutube} onChange={onText("socialYoutube")} />
          <TextField label="Other" name="socialOther" value={data.socialOther} onChange={onText("socialOther")} />

          <SectionHeading eyebrow="08" title="Availability" />
          <YesNoToggle
            label="Are you available to attend rehearsals before the event?"
            value={data.availableRehearsals}
            onChange={(v) => set("availableRehearsals", v)}
            required
            error={errors.availableRehearsals}
          />
          <YesNoToggle
            label="Are you available on the TEDxDSCE event date?"
            value={data.availableEventDate}
            onChange={(v) => set("availableEventDate", v)}
            required
            error={errors.availableEventDate}
          />

          <SectionHeading eyebrow="09" title="Additional Information" />
          <TextAreaField
            label="Anything else you'd like us to know?"
            name="additionalInfo"
            value={data.additionalInfo}
            onChange={onArea("additionalInfo")}
            rows={4}
          />

          <SectionHeading eyebrow="10" title="Consent" />
          <CheckboxRow checked={data.consentOriginal} onChange={(v) => set("consentOriginal", v)} error={!!errors.consentOriginal}>
            I confirm that this is my original idea.
          </CheckboxRow>
          <CheckboxRow checked={data.consentNonPromotional} onChange={(v) => set("consentNonPromotional", v)} error={!!errors.consentOriginal}>
            I understand TEDx talks are educational, non-promotional, and non-political.
          </CheckboxRow>
          <CheckboxRow checked={data.consentRehearsals} onChange={(v) => set("consentRehearsals", v)} error={!!errors.consentOriginal}>
            I agree to participate in rehearsals if selected.
          </CheckboxRow>
          <CheckboxRow checked={data.consentContact} onChange={(v) => set("consentContact", v)} error={!!errors.consentOriginal}>
            I agree that TEDxDSCE may contact me regarding this application.
          </CheckboxRow>
          {errors.consentOriginal && (
            <div style={{ fontSize: 12.5, color: "#ff6a5e", marginTop: -2, marginBottom: 10 }}>{errors.consentOriginal}</div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="submit-btn"
            style={{
              marginTop: 30,
              width: "100%",
              background: "var(--ted)",
              color: "#fff",
              border: "none",
              padding: "17px 32px",
              borderRadius: 100,
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
              fontFamily: "'Inter'",
            }}
          >
            {submitting ? "Submitting…" : "Submit application"}
          </button>
        </form>
      </div>
    </div>
  );
}
