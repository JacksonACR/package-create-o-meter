import { useState } from "react";
import { PackageForm } from "@/components/PackageForm";
import { PackageTable } from "@/components/PackageTable";
import { Package } from "@/types/package";
import { toast } from "sonner";

const Index = () => {
  const [packages, setPackages] = useState<Package[]>([]);

  const handleCreatePackage = async (newPackage: Package) => {
    try {
      // Here we would integrate with Go High Level API
      // const response = await createGoHighLevelProduct(newPackage);
      
      setPackages([...packages, newPackage]);
      toast.success("Package created successfully!");
    } catch (error) {
      toast.error("Failed to create package");
      console.error("Error creating package:", error);
    }
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
          <PackageForm onSubmit={handleCreatePackage} />
          <PackageTable packages={packages} />
        </div>
      </div>
    </div>
  );
};

export default Index;