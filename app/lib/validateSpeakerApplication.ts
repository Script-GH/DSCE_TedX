export type YesNo = "yes" | "no" | null;

export interface SpeakerApplicationInput {
  fullName: string;
  preferredName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  country: string;
  organization: string;
  designation: string;
  linkedinProfile: string;
  website: string;

  bio: string;

  talkTitle: string;
  oneLineSummary: string;
  bigIdea: string;

  takeaway1: string;
  takeaway2: string;
  takeaway3: string;

  credibility: string;

  spokenBefore: YesNo;
  prevEventName: string;
  prevAudienceSize: string;
  prevVideoLink: string;

  socialLinkedin: string;
  socialInstagram: string;
  socialX: string;
  socialYoutube: string;
  socialOther: string;

  availableRehearsals: YesNo;
  availableEventDate: YesNo;

  additionalInfo: string;

  consentOriginal: boolean;
  consentNonPromotional: boolean;
  consentRehearsals: boolean;
  consentContact: boolean;
}

export const emptySpeakerApplication: SpeakerApplicationInput = {
  fullName: "",
  preferredName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  country: "",
  organization: "",
  designation: "",
  linkedinProfile: "",
  website: "",

  bio: "",

  talkTitle: "",
  oneLineSummary: "",
  bigIdea: "",

  takeaway1: "",
  takeaway2: "",
  takeaway3: "",

  credibility: "",

  spokenBefore: null,
  prevEventName: "",
  prevAudienceSize: "",
  prevVideoLink: "",

  socialLinkedin: "",
  socialInstagram: "",
  socialX: "",
  socialYoutube: "",
  socialOther: "",

  availableRehearsals: null,
  availableEventDate: null,

  additionalInfo: "",

  consentOriginal: false,
  consentNonPromotional: false,
  consentRehearsals: false,
  consentContact: false,
};

export type SpeakerApplicationErrors = Partial<Record<keyof SpeakerApplicationInput, string>>;

export const countWords = (s: string) => (s.trim() === "" ? 0 : s.trim().split(/\s+/).length);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (v: unknown): string => (typeof v === "string" ? v : "");
const yesNo = (v: unknown): YesNo => (v === "yes" || v === "no" ? v : null);
const bool = (v: unknown): boolean => v === true;

// Coerces an arbitrary JSON payload into the expected shape — every field
// is guaranteed to be the right primitive type before validation runs.
export function normalizeSpeakerApplication(raw: unknown): SpeakerApplicationInput {
  const o = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  return {
    fullName: str(o.fullName),
    preferredName: str(o.preferredName),
    email: str(o.email),
    phone: str(o.phone),
    city: str(o.city),
    state: str(o.state),
    country: str(o.country),
    organization: str(o.organization),
    designation: str(o.designation),
    linkedinProfile: str(o.linkedinProfile),
    website: str(o.website),

    bio: str(o.bio),

    talkTitle: str(o.talkTitle),
    oneLineSummary: str(o.oneLineSummary),
    bigIdea: str(o.bigIdea),

    takeaway1: str(o.takeaway1),
    takeaway2: str(o.takeaway2),
    takeaway3: str(o.takeaway3),

    credibility: str(o.credibility),

    spokenBefore: yesNo(o.spokenBefore),
    prevEventName: str(o.prevEventName),
    prevAudienceSize: str(o.prevAudienceSize),
    prevVideoLink: str(o.prevVideoLink),

    socialLinkedin: str(o.socialLinkedin),
    socialInstagram: str(o.socialInstagram),
    socialX: str(o.socialX),
    socialYoutube: str(o.socialYoutube),
    socialOther: str(o.socialOther),

    availableRehearsals: yesNo(o.availableRehearsals),
    availableEventDate: yesNo(o.availableEventDate),

    additionalInfo: str(o.additionalInfo),

    consentOriginal: bool(o.consentOriginal),
    consentNonPromotional: bool(o.consentNonPromotional),
    consentRehearsals: bool(o.consentRehearsals),
    consentContact: bool(o.consentContact),
  };
}

export function validateSpeakerApplication(data: SpeakerApplicationInput): SpeakerApplicationErrors {
  const errors: SpeakerApplicationErrors = {};

  const required = (field: keyof SpeakerApplicationInput, message = "This field is required.") => {
    const v = data[field];
    if (typeof v === "string" && v.trim() === "") errors[field] = message;
  };

  required("fullName");
  required("phone");
  required("city");
  required("state");
  required("country");
  required("organization");
  required("designation");
  required("talkTitle");

  if (data.email.trim() === "") errors.email = "This field is required.";
  else if (!EMAIL_RE.test(data.email.trim())) errors.email = "Enter a valid email address.";

  if (countWords(data.bio) > 150) errors.bio = "Bio exceeds the 150-word limit.";
  if (countWords(data.oneLineSummary) > 30) errors.oneLineSummary = "Summary exceeds the 30-word limit.";
  if (countWords(data.bigIdea) > 250) errors.bigIdea = "This exceeds the 250-word limit.";

  if (!data.spokenBefore) errors.spokenBefore = "Please select an option.";
  if (data.spokenBefore === "yes" && data.prevEventName.trim() === "") {
    errors.prevEventName = "Let us know which event.";
  }

  if (!data.availableRehearsals) errors.availableRehearsals = "Please select an option.";
  if (!data.availableEventDate) errors.availableEventDate = "Please select an option.";

  if (!data.consentOriginal || !data.consentNonPromotional || !data.consentRehearsals || !data.consentContact) {
    errors.consentOriginal = "All four consent items must be checked to submit.";
  }

  return errors;
}
