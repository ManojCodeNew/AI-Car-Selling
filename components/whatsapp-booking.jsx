"use client";

import { useState } from "react";
import { MessageCircle, Phone } from "lucide-react";

export const WhatsAppBooking = ({ car, bookingData }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleWhatsAppBooking = () => {
    const message = `🚗 *Test Drive Booking Request*

*Car Details:*
• Make & Model: ${car.make} ${car.model}
• Year: ${car.year}
• Price: ₹${car.price.toLocaleString()}
• Color: ${car.color}

*Booking Details:*
• Date: ${bookingData.date}
• Time: ${bookingData.startTime} - ${bookingData.endTime}
• Notes: ${bookingData.notes || 'None'}

*Customer Information:*
• Name: ${bookingData.customerName}
• Phone: ${bookingData.customerPhone}

Please confirm this test drive booking. Thank you!`;

    const whatsappNumber = "+919876543210"; // Replace with actual business number
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleWhatsAppBooking}
        className="modern-button w-full flex items-center justify-center gap-3"
      >
        <MessageCircle className="h-5 w-5" />
        Book via WhatsApp
      </button>
      
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">Or call us directly:</p>
        <a 
          href="tel:+919876543210"
          className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-semibold"
        >
          <Phone className="h-4 w-4" />
          +91 98765 43210
        </a>
      </div>
    </div>
  );
};