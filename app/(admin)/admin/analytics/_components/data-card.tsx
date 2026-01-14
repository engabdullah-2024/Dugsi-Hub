import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataCardProps {
    value: string | number;
    label: string;
    icon: LucideIcon;
    description?: string;
    colorClass?: string;
}

export const DataCard = ({
    value,
    label,
    icon: Icon,
    description,
    colorClass = "text-primary bg-primary/10"
}: DataCardProps) => {
    return (
        <Card className="rounded-[2rem] border-2 shadow-xl bg-card/50 backdrop-blur-sm transition-all hover:scale-102 hover:shadow-2xl border-primary/5">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-sm font-black uppercase tracking-widest text-muted-foreground">
                    {label}
                </CardTitle>
                <div className={`p-3 rounded-2xl ${colorClass}`}>
                    <Icon className="h-5 w-5" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="text-4xl font-black">{value}</div>
                {description && (
                    <p className="text-xs text-muted-foreground mt-2 font-medium">{description}</p>
                )}
            </CardContent>
        </Card>
    )
}
