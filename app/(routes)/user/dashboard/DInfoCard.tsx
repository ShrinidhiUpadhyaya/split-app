import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";

interface DInfoCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const DInfoCard = ({title, className, children}: DInfoCardProps) => {
  return (
    <Card className={className}>
      <CardHeader className="space-y-4">
        <CardTitle>{title}</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default DInfoCard;
