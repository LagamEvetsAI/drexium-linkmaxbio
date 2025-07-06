
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface TutorialStepData {
  title: string;
  description: string;
  content: string[];
  tips?: string[];
  image?: string;
  category: 'intro' | 'profile' | 'links' | 'themes' | 'sharing' | 'analytics' | 'advanced';
}

interface TutorialStepProps {
  step: TutorialStepData;
}

export const TutorialStep = ({ step }: TutorialStepProps) => {
  const getCategoryColor = (category: string) => {
    const colors = {
      intro: 'bg-blue-500/20 text-blue-400',
      profile: 'bg-green-500/20 text-green-400',
      links: 'bg-purple-500/20 text-purple-400',
      themes: 'bg-pink-500/20 text-pink-400',
      sharing: 'bg-yellow-500/20 text-yellow-400',
      analytics: 'bg-red-500/20 text-red-400',
      advanced: 'bg-gray-500/20 text-gray-400',
    };
    return colors[category as keyof typeof colors] || colors.intro;
  };

  return (
    <Card className="bg-dark-bg border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-white">{step.title}</CardTitle>
          <Badge className={getCategoryColor(step.category)}>
            {step.category}
          </Badge>
        </div>
        <p className="text-gray-300 mt-2">{step.description}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        {step.content.map((item, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-neon-blue/20 text-neon-blue rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
              {index + 1}
            </div>
            <p className="text-gray-300 flex-1">{item}</p>
          </div>
        ))}

        {step.tips && step.tips.length > 0 && (
          <div className="mt-6 p-4 bg-neon-green/10 border border-neon-green/20 rounded-lg">
            <h4 className="text-neon-green font-semibold mb-2">💡 Dicas Importantes:</h4>
            <ul className="space-y-1">
              {step.tips.map((tip, index) => (
                <li key={index} className="text-gray-300 text-sm">
                  • {tip}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
