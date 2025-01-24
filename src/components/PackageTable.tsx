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
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { useState } from "react";

interface PackageTableProps {
  packages: Package[];
  onDelete: (packageId: string) => void;
  onEdit: (pkg: Package) => void;
}

export const PackageTable = ({ packages, onDelete, onEdit }: PackageTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(packages.length / itemsPerPage);

  if (packages.length === 0) {
    return (
      <Card className="p-8 text-center text-muted-foreground">
        No packages created yet. Create your first package using the form.
      </Card>
    );
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPackages = packages.slice(startIndex, endIndex);

  const renderPaginationItems = () => {
    const items = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => setCurrentPage(i)}
              isActive={currentPage === i}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      } else if (
        i === currentPage - 2 ||
        i === currentPage + 2
      ) {
        items.push(
          <PaginationItem key={i}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }
    return items;
  };

  return (
    <div className="space-y-4">
      <Card className="overflow-hidden hover-scale">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Package Name</TableHead>
                <TableHead className="hidden sm:table-cell">Duration</TableHead>
                <TableHead className="hidden sm:table-cell">Sessions/Week</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Payment Type</TableHead>
                <TableHead className="hidden lg:table-cell">Created</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentPackages.map((pkg) => (
                <TableRow key={pkg.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium">
                    {pkg.name}
                    <div className="sm:hidden text-sm text-muted-foreground">
                      {pkg.duration} weeks • {pkg.sessionsPerWeek} sessions/week
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{pkg.duration} weeks</TableCell>
                  <TableCell className="hidden sm:table-cell">{pkg.sessionsPerWeek}</TableCell>
                  <TableCell>{formatPrice(pkg.price)}</TableCell>
                  <TableCell className="hidden md:table-cell capitalize">{pkg.paymentType}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {new Date(pkg.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(pkg)}
                        className="hover:bg-primary/10 hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
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
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent className="flex-wrap justify-center">
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            {renderPaginationItems()}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};