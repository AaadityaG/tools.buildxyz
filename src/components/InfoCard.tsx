import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Link from "next/link";

interface InfoCardProps {
  title: string;
  description: string;
  href: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ title, description, href }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Link href={href} className="block" aria-label={title}>
        <Card className="hover:shadow-lg transition-shadow duration-200">
          <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </div>
  );
};

export default InfoCard;
