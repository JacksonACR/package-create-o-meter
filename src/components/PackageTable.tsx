import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Package } from "@/types/package";
import { Card } from "@/components/ui/card";

interface PackageTableProps {
  packages: Package[];
}

export const PackageTable = ({ packages }: PackageTableProps) => {
  if (packages.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        No packages created yet. Create your first package using the form.
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden hover-scale">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Package Name</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Sessions/Week</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {packages.map((pkg) => (
            <TableRow key={pkg.id} className="hover:bg-muted/50">
              <TableCell className="font-medium">{pkg.name}</TableCell>
              <TableCell>
                {pkg.duration} {pkg.durationType}
              </TableCell>
              <TableCell>{pkg.sessionsPerWeek}</TableCell>
              <TableCell>
                {new Date(pkg.createdAt).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};