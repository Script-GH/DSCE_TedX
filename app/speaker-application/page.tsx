import type { Metadata } from "next";
import SpeakerForm from "./SpeakerForm";

export const metadata: Metadata = {
  title: "Become a Speaker — TEDxDSCE",
  description: "Apply to speak at TEDxDSCE: Rise of the Domino.",
};

export default function SpeakerApplicationPage() {
  return <SpeakerForm />;
}
