"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Car,
  Calendar,
  TrendingUp,
  Info,
  CheckCircle,
  Clock,
  XCircle,
  Star,
  DollarSign,
} from "lucide-react";

export function Dashboard({ initialData }) {
  const [activeTab, setActiveTab] = useState("overview");

  // Show error if data fetch failed
  if (!initialData || !initialData.success) {
    return (
      <Alert variant="destructive" className="modern-card">
        <Info className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {initialData?.error || "Failed to load dashboard data"}
        </AlertDescription>
      </Alert>
    );
  }

  const { cars, testDrives } = initialData.data;

  return (
    <div className="space-y-8">
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 bg-white/50 backdrop-blur-sm rounded-2xl p-2">
          <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-yellow-400 data-[state=active]:text-black font-semibold">
            Overview
          </TabsTrigger>
          <TabsTrigger value="test-drives" className="rounded-xl data-[state=active]:bg-yellow-400 data-[state=active]:text-black font-semibold">
            Test Drives
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-8 mt-8">
          {/* KPI Summary Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="modern-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Total Cars
                </h3>
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-full p-3">
                  <Car className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{cars.total}</div>
              <p className="text-sm text-gray-600">
                {cars.available} available • {cars.sold} sold
              </p>
            </div>

            <div className="modern-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Test Drives
                </h3>
                <div className="bg-gradient-to-br from-green-400 to-green-600 rounded-full p-3">
                  <Calendar className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">{testDrives.total}</div>
              <p className="text-sm text-gray-600">
                {testDrives.pending} pending • {testDrives.confirmed} confirmed
              </p>
            </div>

            <div className="modern-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Conversion Rate
                </h3>
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full p-3">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {testDrives.conversionRate}%
              </div>
              <p className="text-sm text-gray-600">
                From test drives to sales
              </p>
            </div>

            <div className="modern-card p-6 group hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                  Revenue
                </h3>
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 rounded-full p-3">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">₹{(cars.sold * 500000).toLocaleString()}</div>
              <p className="text-sm text-gray-600">
                {cars.sold} cars sold
              </p>
            </div>
          </div>

          {/* Detailed Analytics */}
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="modern-card p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Inventory Overview</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-2xl p-6">
                  <h4 className="font-semibold text-green-800 mb-3">Available Cars</h4>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-green-700">{cars.available}</div>
                    <div className="text-right">
                      <div className="text-sm text-green-600">
                        {((cars.available / cars.total) * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-green-500">of total inventory</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6">
                  <h4 className="font-semibold text-blue-800 mb-3">Cars Sold</h4>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-blue-700">{cars.sold}</div>
                    <div className="text-right">
                      <div className="text-sm text-blue-600">
                        {((cars.sold / cars.total) * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-blue-500">conversion rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modern-card p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Test Drive Analytics</h3>
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-2xl p-6">
                  <h4 className="font-semibold text-yellow-800 mb-3">Success Rate</h4>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-yellow-700">
                      {testDrives.total ? ((testDrives.completed / testDrives.total) * 100).toFixed(1) : 0}%
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-yellow-600">{testDrives.completed}</div>
                      <div className="text-xs text-yellow-500">completed drives</div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl p-6">
                  <h4 className="font-semibold text-purple-800 mb-3">Pending Bookings</h4>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-purple-700">{testDrives.pending}</div>
                    <div className="text-right">
                      <div className="text-sm text-purple-600">
                        {testDrives.total ? ((testDrives.pending / testDrives.total) * 100).toFixed(1) : 0}%
                      </div>
                      <div className="text-xs text-purple-500">need attention</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Test Drives Tab */}
        <TabsContent value="test-drives" className="space-y-8 mt-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5">
            {[
              { label: "Total", value: testDrives.total, icon: Calendar, color: "gray" },
              { label: "Pending", value: testDrives.pending, icon: Clock, color: "yellow" },
              { label: "Confirmed", value: testDrives.confirmed, icon: CheckCircle, color: "green" },
              { label: "Completed", value: testDrives.completed, icon: Star, color: "blue" },
              { label: "Cancelled", value: testDrives.cancelled, icon: XCircle, color: "red" }
            ].map((item, index) => (
              <div key={index} className="modern-card p-6 group hover:scale-105 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                    {item.label}
                  </h3>
                  <div className={`bg-gradient-to-br from-${item.color}-400 to-${item.color}-600 rounded-full p-3`}>
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{item.value}</div>
                {item.label !== "Total" && (
                  <p className="text-xs text-gray-600">
                    {((item.value / testDrives.total) * 100).toFixed(1)}% of total
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Status Breakdown Chart */}
          <div className="modern-card p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Booking Status Distribution</h3>
            <div className="space-y-6">
              {[
                { label: "Pending", value: testDrives.pending, color: "bg-yellow-500", bgColor: "bg-yellow-50" },
                { label: "Confirmed", value: testDrives.confirmed, color: "bg-green-500", bgColor: "bg-green-50" },
                { label: "Completed", value: testDrives.completed, color: "bg-blue-500", bgColor: "bg-blue-50" },
                { label: "Cancelled", value: testDrives.cancelled, color: "bg-red-500", bgColor: "bg-red-50" },
                { label: "No Show", value: testDrives.noShow, color: "bg-gray-500", bgColor: "bg-gray-50" }
              ].map((status, index) => (
                <div key={index} className={`${status.bgColor} rounded-2xl p-6`}>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold text-gray-800">{status.label}</span>
                    <span className="font-bold text-gray-900">
                      {status.value} ({((status.value / testDrives.total) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="w-full bg-white rounded-full h-3 overflow-hidden">
                    <div
                      className={`${status.color} h-3 rounded-full transition-all duration-1000 ease-out`}
                      style={{ width: `${(status.value / testDrives.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}