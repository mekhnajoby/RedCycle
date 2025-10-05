import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Step {
  title: string;
  details: string;
}

interface ScenarioDetailProps {
  title: string;
  steps: Step[];
}

const ScenarioDetail: React.FC<ScenarioDetailProps> = ({ title, steps }) => {
  return (
    <Card className="bg-card border-border mb-6">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
          {steps.map((s, i) => (
            <li key={i}>
              <strong className="text-foreground">{s.title}:</strong> {s.details}
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
};

export default ScenarioDetail;
