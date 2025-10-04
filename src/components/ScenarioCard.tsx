import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ScenarioCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  delay?: number;
}

const ScenarioCard = ({ title, description, image, link, delay = 0 }: ScenarioCardProps) => {
  return (
    <Card 
      className="overflow-hidden bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-glow group"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
      </div>
      <CardContent className="p-6">
        <h3 className="text-2xl font-bold mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">{description}</p>
        <Link to={link}>
          <Button className="w-full group/btn">
            Explore Module
            <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ScenarioCard;
