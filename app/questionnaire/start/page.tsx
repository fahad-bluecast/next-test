import StartQuestionaire from "@/components/questionnaire/start/StartQuestionaire";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Start Questionnaire",
  description:
    "Begin your practice exam. Review instructions, set your preferences, and start your test when ready.",
  keywords: [
    "start exam",
    "questionnaire",
    "practice test",
    "exam instructions",
  ],
};
const page = () => {
  return (
    <div>
      <StartQuestionaire />
    </div>
  );
};

export default page;
