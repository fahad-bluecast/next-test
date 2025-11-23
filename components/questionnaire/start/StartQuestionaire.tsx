import Link from "next/link";
import { Button } from "../../ui/button";

const StartQuestionaire = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className=" p-8">
        {/* Header */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Ancient Indian History MCQ
        </h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8 bg-[#1C3141] rounded-xl py-4">
          <div className=" text-white p-6 text-center border-r-2 border-r-white">
            <div className="text-sm ">Total MCQ's:</div>
            <div className="text-4xl font-bold">100</div>
          </div>
          <div className=" text-white p-6 text-center border-r-2 border-r-white">
            <div className="text-sm ">Total marks:</div>
            <div className="text-4xl font-bold">100</div>
          </div>
          <div className=" text-white p-6 text-center">
            <div className="text-sm ">Total time:</div>
            <div className="text-4xl font-bold">90:00</div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Instructions:
          </h2>
          <ol className="space-y-2 text-gray-700 text-sm">
            <li className="flex">
              <span className="font-semibold mr-2">1.</span>
              <span>You have 100 minutes to complete the test.</span>
            </li>
            <li className="flex">
              <span className="font-semibold mr-2">2.</span>
              <span>Test consists of 100 multiple-choice qs.</span>
            </li>
            <li className="flex">
              <span className="font-semibold mr-2">3.</span>
              <span>
                You are allowed 2 reattempts if you do not pass on the first
                try.
              </span>
            </li>
            <li className="flex">
              <span className="font-semibold mr-2">4.</span>
              <span>
                Each incorrect answer will incur a negative mark of -1/4.
              </span>
            </li>
            <li className="flex">
              <span className="font-semibold mr-2">5.</span>
              <span>
                Ensure you are in a quiet environment and have a stable internet
                connection.
              </span>
            </li>
            <li className="flex">
              <span className="font-semibold mr-2">6.</span>
              <span>
                Keep an eye on the timer, and try to answer all questions within
                the given time.
              </span>
            </li>
            <li className="flex">
              <span className="font-semibold mr-2">7.</span>
              <span>
                Do not use any external resources such as dictionaries,
                websites, or assistance.
              </span>
            </li>
            <li className="flex">
              <span className="font-semibold mr-2">8.</span>
              <span>
                Answer honestly and to the best of your ability assess your
                proficiency level.
              </span>
            </li>
            <li className="flex">
              <span className="font-semibold mr-2">9.</span>
              <span>Check answers before submitting.</span>
            </li>
            <li className="flex">
              <span className="font-semibold mr-2">10.</span>
              <span>
                Your test results will be displayed immediately after
                submission, indicating whether you have passed or need to retake
                the test.
              </span>
            </li>
          </ol>
        </div>

        {/* Start Button */}
        <div className="flex justify-center">
          <Link href={"/questionnaire/mcq"}>
            <Button
              // onClick={handleStartTest}
              className="w-xs"
            >
              Start Test
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StartQuestionaire;
