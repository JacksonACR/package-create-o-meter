import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";

interface PackageFormFieldsProps {
  formData: {
    name: string;
    duration: string;
    durationType: "weeks";
    sessionsPerWeek: string;
    price: string;
    paymentType: "one-time" | "recurring";
  };
  onChange: (field: string, value: string | "one-time" | "recurring") => void;
}

export const PackageFormFields = ({ formData, onChange }: PackageFormFieldsProps) => {
  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="name">Package Name</Label>
        <Input
          id="name"
          placeholder="e.g., Premium Training Package"
          value={formData.name}
          onChange={(e) => onChange("name", e.target.value)}
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (weeks)</Label>
          <Input
            id="duration"
            type="number"
            min="1"
            placeholder="Duration"
            value={formData.duration}
            onChange={(e) => onChange("duration", e.target.value)}
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
            onChange={(e) => onChange("sessionsPerWeek", e.target.value)}
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
          onChange={(e) => onChange("price", e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Payment Type</Label>
        <RadioGroup
          value={formData.paymentType}
          onValueChange={(value: "one-time" | "recurring") =>
            onChange("paymentType", value)
          }
          className="flex flex-col sm:flex-row gap-4"
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
    </>
  );
};