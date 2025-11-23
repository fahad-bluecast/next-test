import ListMcq from "@/components/questionnaire/mcq/ListMcq";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Questionnaires",
  description:
    "Explore our comprehensive collection of practice exams and questionnaires across various subjects. Find the perfect test to enhance your learning.",
  keywords: [
    "questionnaires",
    "practice exams",
    "online tests",
    "exam preparation",
    "study materials",
    "practice tests",
  ],
  robots: {
    index: true, // Public page - should be indexed
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Browse Questionnaires - Exam Platform",
    description: "Explore our collection of practice exams and tests",
  },
};
const page = () => {
  return (
    <div>
      <ListMcq />
    </div>
  );
};

export default page;
