"use client";

import React, { useState } from "react";
import { Trash2, Save } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { createDestination } from "@/lib/destinations";
import { toast } from "../ui/toast";
import { Spinner } from "../ui/spinner";

const toArray = (value) =>
  String(value || "")
    .split(/[,\r\n]+/)
    .map((item) => item.trim())
    .filter(Boolean);

export default function AddTravelPackageForm() {
  const [category, setCategory] = useState("Beach");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const inputClass =
    "h-10 rounded-none border-input bg-muted/60 text-sm text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-[#179ec2]";

  const resetForm = (form) => {
    form.reset();
    setCategory("Beach");
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    const rawData = Object.fromEntries(formData.entries());

    // Convert form values into the correct data types.
    const data = {
      ...rawData,
      category,
      averageCost: Number(rawData.averageCost),
      durationDays: Number(rawData.durationDays),
      durationNights: Number(rawData.durationNights),
      highlights: toArray(rawData.highlights),
      perks: toArray(rawData.perks),
      featured: formData.has("featured"),
      isActive: formData.has("isActive"),
    };

    try {
      setIsSubmitting(true);
      const result = await createDestination(data);

      if (result?.success === false) {
        throw new Error(result.message || "Failed to create destination");
      }

      resetForm(form);
      toast.add({
        type: "success",
        title: "Destination created successfully",
      });
      router.push("/destinations");
      router.refresh();
    } catch (error) {
      console.error("Destination creation failed:", error);
      toast.add({
        type: "error",
        title: `${error.message}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background px-6 py-12 text-foreground transition-colors">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-10 font-serif text-4xl font-normal tracking-tight">
          Add New Destination
        </h1>
        {/* === showing spinner while isSubmitting true ===== */}
        {isSubmitting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3">
              <Spinner className="h-10 w-10 text-[#179ec2]" />
              <p className="text-sm font-medium text-foreground">
                Adding destination...
              </p>
            </div>
          </div>
        )}

        <Card className="mx-auto max-w-2xl rounded-none border border-border bg-card shadow-sm">
          <CardContent className="p-8 sm:p-10">
            <form className="space-y-6" onSubmit={onSubmit}>
              {/* Destination Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Destination Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Mount Kilimanjaro Climbing"
                  className={inputClass}
                  required
                />
              </div>

              {/* Country and City */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    name="country"
                    placeholder="Tanzania"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    placeholder="Moshi"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Category and Cost */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category" className={inputClass}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beach">Beach</SelectItem>
                      <SelectItem value="Historical">Historical</SelectItem>
                      <SelectItem value="Mountain">Mountain</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="averageCost">Average Cost</Label>
                  <Input
                    id="averageCost"
                    name="averageCost"
                    type="number"
                    min="0"
                    placeholder="4200"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Currency */}
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select defaultValue="USD" name="currency">
                  <SelectTrigger id="currency" className={inputClass}>
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="BDT">BDT</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Duration */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="durationDays">Duration (Days)</Label>
                  <Input
                    id="durationDays"
                    name="durationDays"
                    type="number"
                    min="1"
                    placeholder="8"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="durationNights">Duration (Nights)</Label>
                  <Input
                    id="durationNights"
                    name="durationNights"
                    type="number"
                    min="0"
                    placeholder="7"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Available Date */}
              <div className="space-y-2">
                <Label htmlFor="availableDate">Available Date</Label>
                <Input
                  id="availableDate"
                  name="availableDate"
                  type="date"
                  className={inputClass}
                  required
                />
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className={inputClass}
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe this beautiful destination..."
                  rows={5}
                  className="min-h-30 resize-none rounded-none border-input bg-muted/60 text-sm focus-visible:ring-1 focus-visible:ring-[#179ec2]"
                  required
                />
              </div>

              {/* Highlights */}
              <div className="space-y-2">
                <Label htmlFor="highlights">Highlights</Label>
                <Textarea
                  id="highlights"
                  name="highlights"
                  placeholder={`Trek through tropical rainforest Explore the scenic Shira Plateau Experience spectacular alpine landscapes`}
                  rows={5}
                  className="min-h-30 resize-none rounded-none border-input bg-muted/60 text-sm focus-visible:ring-1 focus-visible:ring-[#179ec2]"
                />
                <p className="text-xs text-muted-foreground">
                  Enter one highlight per line.
                </p>
              </div>

              {/* Perks */}
              <div className="space-y-2">
                <Label htmlFor="perks">Perks</Label>
                <Textarea
                  id="perks"
                  name="perks"
                  placeholder={`Free cancellation up to 7 days Travel insurance included 24/7 customer support`}
                  rows={4}
                  className="min-h-25 resize-none rounded-none border-input bg-muted/60 text-sm focus-visible:ring-1 focus-visible:ring-[#179ec2]"
                />
                <p className="text-xs text-muted-foreground">
                  Enter one perk per line.
                </p>
              </div>

              {/* Rating and Review Count */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    name="rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    placeholder="4.8"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reviewCount">Review Count</Label>
                  <Input
                    id="reviewCount"
                    name="reviewCount"
                    type="number"
                    min="0"
                    step="1"
                    placeholder="125"
                    className={inputClass}
                    required
                  />
                </div>
              </div>

              {/* Featured and Active */}
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex items-center gap-3 border border-border p-4">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    className="h-4 w-4 accent-[#179ec2]"
                  />
                  <Label htmlFor="featured" className="cursor-pointer">
                    Featured Destination
                  </Label>
                </div>

                <div className="flex items-center gap-3 border border-border p-4">
                  <input
                    type="checkbox"
                    id="isActive"
                    name="isActive"
                    defaultChecked
                    className="h-4 w-4 accent-[#179ec2]"
                  />
                  <Label htmlFor="isActive" className="cursor-pointer">
                    Active Destination
                  </Label>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <Button
                  type="reset"
                  variant="outline"
                  disabled={isSubmitting}
                  onClick={(e) => {
                    resetForm(e.currentTarget.form);
                  }}
                  className="h-10 rounded-none border-destructive/50 bg-background px-5 text-xs font-medium text-destructive hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="mr-1.5 h-3.5 w-3.5" />
                  Clear
                </Button>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="h-10 rounded-none bg-[#179ec2] px-5 text-xs font-medium text-white hover:bg-[#1389a8] dark:bg-[#19a8ce] dark:hover:bg-[#1593b5]"
                >
                  <Save className="mr-1.5 h-3.5 w-3.5" />
                  {isSubmitting ? "Adding Destination..." : "Add Destination"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
