import { useState } from "react";
import { Package } from "@/types/package";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PackageFormProps {
  onSubmit: (pkg: Package) => void;
}

export const PackageForm = ({ onSubmit }: PackageFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    durationType: "weeks",
    sessionsPerWeek: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPackage: Package = {
      id: crypto.randomUUID(),
      name: formData.name,
      duration: Number(formData.duration),
      durationType: formData.durationType as "weeks" | "months",
      sessionsPerWeek: Number(formData.sessionsPerWeek),
      createdAt: new Date().toISOString(),
    };

    onSubmit(newPackage);
    setFormData({
      name: "",
      duration: "",
      durationType: "weeks",
      sessionsPerWeek: "",
    });
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
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="duration">Duration</Label>
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
            <Label htmlFor="durationType">Period</Label>
            <Select
              value={formData.durationType}
              onValueChange={(value) =>
                setFormData({ ...formData, durationType: value })
              }
            >
              <SelectTrigger id="durationType">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="weeks">Weeks</SelectItem>
                <SelectItem value="months">Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
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

        <Button type="submit" className="w-full">
          Create Package
        </Button>
      </form>
    </Card>
  );
};