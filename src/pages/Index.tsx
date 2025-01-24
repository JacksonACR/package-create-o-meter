import { useState } from "react";
import { PackageForm } from "@/components/PackageForm";
import { PackageTable } from "@/components/PackageTable";
import { Package } from "@/types/package";
import { toast } from "sonner";

const Index = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);

  const handleCreatePackage = async (newPackage: Package) => {
    try {
      // Here we would integrate with Go High Level API
      // const response = await createGoHighLevelProduct(newPackage);
      
      if (editingPackage) {
        setPackages(packages.map(pkg => 
          pkg.id === newPackage.id ? newPackage : pkg
        ));
        setEditingPackage(null);
        toast.success("Package updated successfully!");
      } else {
        setPackages([...packages, newPackage]);
        toast.success("Package created successfully!");
      }
    } catch (error) {
      toast.error(editingPackage ? "Failed to update package" : "Failed to create package");
      console.error("Error with package:", error);
    }
  };

  const handleDeletePackage = async (packageId: string) => {
    try {
      // Here we would integrate with Go High Level API
      // await deleteGoHighLevelProduct(packageId);
      
      setPackages(packages.filter((pkg) => pkg.id !== packageId));
      toast.success("Package deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete package");
      console.error("Error deleting package:", error);
    }
  };

  const handleEditPackage = (pkg: Package) => {
    setEditingPackage(pkg);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6 md:p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <header className="text-center mb-12 fade-in">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            PT Package Management
          </h1>
          <p className="text-muted-foreground">
            Create and manage your personal training packages
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-[400px,1fr]">
          <PackageForm 
            onSubmit={handleCreatePackage} 
            editPackage={editingPackage}
            onCancel={() => setEditingPackage(null)}
          />
          <PackageTable 
            packages={packages} 
            onDelete={handleDeletePackage}
            onEdit={handleEditPackage}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;