import { useState, useEffect } from "react";
import { Package } from "@/types/package";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { PackageFormFields } from "./PackageFormFields";

interface PackageFormProps {
  onSubmit: (pkg: Package) => void;
  editPackage?: Package | null;
  onCancel?: () => void;
}

export const PackageForm = ({ onSubmit, editPackage, onCancel }: PackageFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    durationType: "weeks" as const,
    sessionsPerWeek: "",
    price: "",
    paymentType: "one-time" as "one-time" | "recurring",
  });

  useEffect(() => {
    if (editPackage) {
      setFormData({
        name: editPackage.name,
        duration: editPackage.duration.toString(),
        durationType: editPackage.durationType,
        sessionsPerWeek: editPackage.sessionsPerWeek.toString(),
        price: editPackage.price.toString(),
        paymentType: editPackage.paymentType,
      });
    }
  }, [editPackage]);

  const validateName = (name: string) => {
    if (name.includes('-')) {
      toast.error("Package name cannot contain hyphens (-)");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateName(formData.name)) {
      return;
    }

    const packageData: Package = {
      id: editPackage?.id || crypto.randomUUID(),
      name: formData.name,
      duration: Number(formData.duration),
      durationType: formData.durationType,
      sessionsPerWeek: Number(formData.sessionsPerWeek),
      price: Number(formData.price),
      paymentType: formData.paymentType,
      createdAt: editPackage?.createdAt || new Date().toISOString(),
    };

    onSubmit(packageData);
    if (!editPackage) {
      setFormData({
        name: "",
        duration: "",
        durationType: "weeks",
        sessionsPerWeek: "",
        price: "",
        paymentType: "one-time",
      });
    }
  };

  const handleFieldChange = (field: string, value: string | "one-time" | "recurring") => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="p-6 hover-scale">
      <form onSubmit={handleSubmit} className="space-y-6">
        <PackageFormFields formData={formData} onChange={handleFieldChange} />
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button type="submit" className="flex-1">
            {editPackage ? "Update" : "Create"} Package
          </Button>
          {editPackage && (
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  );
};