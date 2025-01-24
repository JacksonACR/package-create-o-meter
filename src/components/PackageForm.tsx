import { useState, useEffect } from "react";
import { Package } from "@/types/package";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

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

  return (
    <Card className="p-6 hover-scale">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Package Name</Label>
          <Input
            id="name"
            placeholder="e.g., Premium Training Package"
            value={formData.name}
            onChange={(e) => {
              const value = e.target.value;
              setFormData({ ...formData, name: value });
            }}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration (weeks)</Label>
            <Input
              id="duration"
              type="number"
              min="1"
              placeholder="Duration"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessionsPerWeek">Sessions per Week</Label>
            <Input
              id="sessionsPerWeek"
              type="number"
              min="1"
              max="7"
              placeholder="e.g., 3"
              value={formData.sessionsPerWeek}
              onChange={(e) =>
                setFormData({ ...formData, sessionsPerWeek: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>
          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g., 299.99"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Payment Type</Label>
          <RadioGroup
            value={formData.paymentType}
            onValueChange={(value: "one-time" | "recurring") =>
              setFormData({ ...formData, paymentType: value })
            }
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="one-time" id="one-time" />
              <Label htmlFor="one-time">One-time Payment</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="recurring" id="recurring" />
              <Label htmlFor="recurring">Recurring Payment</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="flex gap-4">
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