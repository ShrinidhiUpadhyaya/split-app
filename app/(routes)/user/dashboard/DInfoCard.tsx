import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";

interface DInfoCardProps {
  title: string;
  children: React.ReactNode;
}

const DInfoCard = ({title, children}: DInfoCardProps) => {
  return (
    <Card className="flex-1">
      <CardHeader className="space-y-4">
        <CardTitle>{title}</CardTitle>
        <Separator />
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default DInfoCard;
