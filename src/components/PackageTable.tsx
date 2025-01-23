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
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PackageTableProps {
  packages: Package[];
  onDelete: (packageId: string) => void;
}

export const PackageTable = ({ packages, onDelete }: PackageTableProps) => {
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
            <TableHead className="w-[100px]">Actions</TableHead>
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
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Package</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete "{pkg.name}"? This action
                        cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => onDelete(pkg.id)}
                        className="bg-destructive hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};