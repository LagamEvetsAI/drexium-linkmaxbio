
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, EyeOff } from "lucide-react";
import { TutorialStep } from "./TutorialStep";
import { tutorialSteps } from "./tutorialData";
import { useProfile } from "@/hooks/useProfile";

interface TutorialProps {
  open: boolean;
  onClose: () => void;
}

export const Tutorial = ({ open, onClose }: TutorialProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { skipTutorialPermanently } = useProfile();

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(0);
    onClose();
  };

  const handleSkipPermanently = () => {
    skipTutorialPermanently();
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-dark-surface border-gray-700">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-2xl font-bold text-white">
            Tutorial LinkMax.bio - Passo {currentStep + 1} de {tutorialSteps.length}
          </DialogTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSkipPermanently}
              className="text-gray-400 hover:text-white border-gray-600 hover:bg-gray-700 flex items-center gap-2"
            >
              <EyeOff className="w-4 h-4" />
              Não mostrar mais
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="mt-6">
          <TutorialStep step={tutorialSteps[currentStep]} />
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-700 rounded-full h-2 mt-6">
          <div
            className="bg-gradient-to-r from-neon-blue to-neon-green h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
          />
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-6">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Anterior
          </Button>

          <div className="text-gray-400 text-sm">
            {currentStep + 1} de {tutorialSteps.length}
          </div>

          {currentStep === tutorialSteps.length - 1 ? (
            <Button onClick={handleClose} className="btn-neon">
              Finalizar Tutorial
            </Button>
          ) : (
            <Button onClick={nextStep} className="btn-neon">
              Próximo
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
