import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LoadingButton } from "@/components/ui/LoadinButton";
import { X } from "lucide-react";

interface SubmitTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  remainingTime: string;
  totalQuestions: number;
  questionsAnswered: number;
  markedForReview: number;
  isLoading: boolean;
}

const SubmitTestModal = ({
  isOpen,
  onClose,
  onSubmit,
  remainingTime,
  totalQuestions,
  questionsAnswered,
  markedForReview,
  isLoading,
}: SubmitTestModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-base font-normal text-gray-800">
              Are you sure you want to submit the test?
            </DialogTitle>
            <DialogClose className="rounded-sm opacity-70 hover:opacity-100">
              <X className="h-4 w-4" />
            </DialogClose>
          </div>
        </DialogHeader>

        <div className="px-6 py-6 space-y-4">
          {/* Remaining Time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <span className="text-gray-700">Remaining Time:</span>
            </div>
            <span className="text-gray-900 font-semibold">{remainingTime}</span>
          </div>

          {/* Total Questions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700">Total Questions:</span>
            </div>
            <span className="text-gray-900 font-semibold">
              {totalQuestions}
            </span>
          </div>

          {/* Questions Answered */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700">Questions Answered:</span>
            </div>
            <span className="text-gray-900 font-semibold">
              {String(questionsAnswered).padStart(3, "0")}
            </span>
          </div>

          {/* Marked for Review */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-gray-700">Marked for review:</span>
            </div>
            <span className="text-gray-900 font-semibold">
              {String(markedForReview).padStart(3, "0")}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <div className="px-6 pb-6">
          <LoadingButton
            onClick={onSubmit}
            loading={isLoading}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-lg font-medium"
          >
            Submit Test
          </LoadingButton>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default SubmitTestModal;
