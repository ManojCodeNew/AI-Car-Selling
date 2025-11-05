import { ChevronRight, Car, Calendar, Shield, Sparkles, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SignedOut } from "@clerk/nextjs";
import { getFeaturedCars } from "@/actions/home";
import { CarCard } from "@/components/car-card";
import { HomeSearch } from "@/components/home-search";
import Link from "next/link";
import Image from "next/image";
import { bodyTypes, carMakes, faqItems } from "@/lib/data";

export default async function Home() {
  const featuredCars = await getFeaturedCars();

  return (
    <div className="flex flex-col">
      {/* Hero Section with Modern Design */}
      <section className="relative min-h-screen flex items-center mt-6 justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "30px 30px"}}></div>
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 mb-6 max-w-6xl mx-auto px-4 text-center">
          <div className="floating">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-white/30">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="text-white font-medium">AI-Powered Car Discovery</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-6 text-white leading-tight">
              Find Your
              <span className="block gradient-title">Dream Car</span>
              <span className="text-5xl md:text-7xl">with AI Magic</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the future of car shopping with our advanced AI technology.
              Discover, compare, and test drive thousands of premium vehicles.
            </p>
          </div>

          {/* Modern Search Component */}
          <div className="glass-effect p-8 max-w-4xl mx-auto">
            <HomeSearch />
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">10K+</div>
              <div className="text-white/80">Premium Cars</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">50K+</div>
              <div className="text-white/80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99%</div>
              <div className="text-white/80">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Cars */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-yellow-400/10 rounded-full px-6 py-3 mb-6">
              <Star className="h-5 w-5 text-yellow-500" />
              <span className="text-gray-700 font-medium">Premium Collection</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Featured <span className="gradient-title">Vehicles</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Handpicked premium cars with verified quality and exceptional performance
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars && featuredCars.length > 0 ? (
              featuredCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Car className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No featured cars available at the moment.</p>
              </div>
            )}
          </div>
          <div className="text-center mt-12">
            <Link href="/cars">
              <button className="modern-button inline-flex items-center gap-2">
                View All Cars <ChevronRight className="h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Make */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Explore by <span className="gradient-title">Brand</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose from the world's most trusted automotive brands
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {carMakes.map((make) => (
              <Link
                key={make.name}
                href={`/cars?make=${make.name}`}
                className="modern-card p-6 text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="h-16 w-auto mx-auto mb-4 relative group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={
                      make.imageUrl || `/make/${make.name.toLowerCase()}.webp`
                    }
                    alt={make.name}
                    fill
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-yellow-500 transition-colors">{make.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "30px 30px"}}></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-title">Vehiql</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the future of car buying with our innovative platform
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-effect p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">AI-Powered Search</h3>
              <p className="text-gray-300 leading-relaxed">
                Revolutionary AI technology that understands your preferences and finds the perfect match from thousands of vehicles.
              </p>
            </div>
            <div className="glass-effect p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Instant Booking</h3>
              <p className="text-gray-300 leading-relaxed">
                Book test drives instantly with our smart scheduling system. Flexible timing that works around your busy lifestyle.
              </p>
            </div>
            <div className="glass-effect p-8 text-center group hover:scale-105 transition-all duration-300">
              <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-10 w-10 text-black" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Verified Quality</h3>
              <p className="text-gray-300 leading-relaxed">
                Every vehicle undergoes rigorous verification. Premium quality guaranteed with comprehensive warranty coverage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Body Type */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Shop by <span className="gradient-title">Category</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect vehicle type that matches your lifestyle and needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {bodyTypes.map((type) => (
              <Link
                key={type.name}
                href={`/cars?bodyType=${type.name}`}
                className="relative group cursor-pointer"
              >
                <div className="modern-card overflow-hidden h-64 relative group-hover:scale-105 transition-all duration-300">
                  <Image
                    src={
                      type.imageUrl || `/body/${type.name.toLowerCase()}.webp`
                    }
                    alt={type.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                    <div className="absolute bottom-6 left-6 right-6">
                      <h3 className="text-white text-2xl font-bold mb-2">
                        {type.name}
                      </h3>
                      <div className="modern-button text-sm inline-block">
                        Explore Now
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section with Accordion */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Got <span className="gradient-title">Questions?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find answers to the most commonly asked questions about our platform
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqItems.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="modern-card px-8 py-2 border-0">
                  <AccordionTrigger className="text-left text-lg font-semibold hover:text-yellow-500 transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 text-base leading-relaxed pt-4">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full" style={{backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)", backgroundSize: "30px 30px"}}></div>
        </div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              Ready to Find Your
              <span className="block gradient-title">Dream Car?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
              Join over 50,000 satisfied customers who discovered their perfect vehicle through our revolutionary AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <Link href="/cars">
                <button className="modern-button text-lg px-12 py-4">
                  Explore Cars Now
                </button>
              </Link>
              <SignedOut>
                <Link href="/sign-up">
                  <button className="bg-white/20 backdrop-blur-sm text-white font-semibold rounded-full px-12 py-4 hover:bg-white/30 transition-all duration-300 border border-white/30">
                    Start Free Trial
                  </button>
                </Link>
              </SignedOut>
            </div>
            <div className="mt-12 text-white/70">
              <p className="text-sm">✨ No credit card required • 🚗 Instant access • 🔒 100% secure</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            Designed and developed by{" "}
            <a 
              href="https://www.clooyzi.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-yellow-400 hover:text-yellow-300 transition-colors font-medium"
            >
              Clooyzi
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}