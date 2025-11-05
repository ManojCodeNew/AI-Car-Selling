"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, Car as CarIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { toggleSavedCar } from "@/actions/car-listing";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import useFetch from "@/hooks/use-fetch";

export const CarCard = ({ car }) => {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(car.wishlisted);

  // Use the useFetch hook
  const {
    loading: isToggling,
    fn: toggleSavedCarFn,
    data: toggleResult,
    error: toggleError,
  } = useFetch(toggleSavedCar);

  // Handle toggle result with useEffect
  useEffect(() => {
    if (toggleResult?.success && toggleResult.saved !== isSaved) {
      setIsSaved(toggleResult.saved);
      toast.success(toggleResult.message);
    }
  }, [toggleResult, isSaved]);

  // Handle errors with useEffect
  useEffect(() => {
    if (toggleError) {
      toast.error("Failed to update favorites");
    }
  }, [toggleError]);

  // Handle save/unsave car
  const handleToggleSave = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      toast.error("Please sign in to save cars");
      router.push("/sign-in");
      return;
    }

    if (isToggling) return;

    // Call the toggleSavedCar function using our useFetch hook
    await toggleSavedCarFn(car.id);
  };

  return (
    <div className="modern-card overflow-hidden group cursor-pointer">
      <div className="relative h-56">
        {car.images && car.images.length > 0 ? (
          <div className="relative w-full h-full">
            <Image
              src={car.images[0]}
              alt={`${car.make} ${car.model}`}
              fill
              className="object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <CarIcon className="h-12 w-12 text-gray-400" />
          </div>
        )}

        <button
          className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110 ${
            isSaved
              ? "text-red-500 hover:text-red-600"
              : "text-gray-600 hover:text-gray-900"
          }`}
          onClick={handleToggleSave}
          disabled={isToggling}
        >
          {isToggling ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Heart className={isSaved ? "fill-current" : ""} size={20} />
          )}
        </button>
      </div>

      <div className="p-6">
        <div className="flex flex-col mb-4">
          <h3 className="text-xl font-bold line-clamp-1 text-gray-900 mb-2">
            {car.make} {car.model}
          </h3>
          <span className="text-2xl font-bold text-yellow-500">
            ₹{car.price.toLocaleString()}
          </span>
        </div>

        <div className="text-gray-600 mb-4 flex items-center text-sm">
          <span className="bg-gray-100 px-3 py-1 rounded-full">{car.year}</span>
          <span className="mx-2">•</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">{car.transmission}</span>
          <span className="mx-2">•</span>
          <span className="bg-gray-100 px-3 py-1 rounded-full">{car.fuelType}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <div className="bg-[#ffc107]/10 text-[#ffc107] px-3 py-1 rounded-full text-sm font-medium">
            {car.bodyType}
          </div>
          <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {car.mileage.toLocaleString()} miles
          </div>
          <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
            {car.color}
          </div>
        </div>

        <button
          className="modern-button w-full"
          onClick={() => {
            router.push(`/cars/${car.id}`);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
};