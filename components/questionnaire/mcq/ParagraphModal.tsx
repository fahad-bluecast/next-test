import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ComprehensiveParagraphModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
}

const ComprehensiveParagraphModal = ({
  isOpen,
  onClose,
  content,
}: ComprehensiveParagraphModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-normal text-gray-800 pb-4 border-b">
            Comprehensive Paragraph
          </DialogTitle>
        </DialogHeader>

        <div className="py-6 space-y-4 text-gray-800 text-sm leading-relaxed">
          {content.split("\n\n").map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <div className="flex justify-end pt-4">
          <Button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-700 text-white px-12 py-2 rounded"
          >
            Minimize
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ComprehensiveParagraphModal;
