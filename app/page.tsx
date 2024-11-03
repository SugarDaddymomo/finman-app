'use client'

import Image from "next/image";
import Footer from "@/components/customComponents/Footer";
import Navbar from "@/components/customComponents/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {

  const router = useRouter();

  return (
    //<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* <main className="bg-secondaryColor flex flex-col gap-8 row-start-2 items-center sm:items-start"> */}
      <main className="bg-secondaryColor flex flex-col items-center py-16 px-6 sm:px-20 text-center">
        {/* Hero Section */}
        <section className="flex flex-col items-center mb-16 space-y-4">
          <h1 className="text-4xl sm:text-5xl font-bold" style={{ color: '#B685C4' }}>
            Track Your Finances, Manage Your Future
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 max-w-2xl">
            Empower your financial journey with real-time tracking and personalized insights.
          </p>
          <div className="flex gap-4 mt-6">
            <Button className="bg-primaryColor text-black  hover:text-primaryColor"
              onClick={() => router.push('/signup')}
            >
              Get Started
            </Button>
            <Button className="border border-primaryColor text-primaryColor hover:bg-primaryColor hover:text-black">
              Learn More
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-5xl mb-16">
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <Image src="/exp1.jpeg" alt="Expense Tracking" width={500} height={500} />
            <h2 className="mt-4 text-xl font-semibold" style={{ color: '#B685C4' }}>Expense Tracking</h2>
            <p className="mt-2 text-gray-600">Get instant insights on your spending habits.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <Image src="/download-resizehood.com.png" alt="Risk Assessment" width={500} height={500} />
            <h2 className="mt-4 text-xl font-semibold" style={{ color: '#B685C4' }}>Risk Assessment</h2>
            <p className="mt-2 text-gray-600">Check your financial risk score and adjust accordingly.</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-md text-center">
            <Image src="/insights.png" alt="Insights & Analysis" width={500} height={500} />
            <h2 className="mt-4 text-xl font-semibold" style={{ color: '#B685C4' }}>Insights & Analysis</h2>
            <p className="mt-2 text-gray-600">Understand and analyze your financial patterns.</p>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="flex flex-col items-center mb-16 space-y-6 max-w-4xl">
          <h2 className="text-3xl font-bold" style={{ color: '#B685C4' }}>How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-primaryColor">1. Sign Up</h3>
              <p className="mt-2 text-gray-600">Create your account in just a few easy steps.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-primaryColor">2. Track Expenses</h3>
              <p className="mt-2 text-gray-600">Easily add and categorize your expenses.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-primaryColor">3. View Reports</h3>
              <p className="mt-2 text-gray-600">Get insightful reports and manage your finances.</p>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="flex flex-col items-center mb-16 space-y-6 max-w-4xl">
          <h2 className="text-3xl font-bold" style={{ color: '#B685C4' }}>What Our Users Say</h2>
          <div className="space-y-4">
            <p className="text-gray-700 italic">"FinMan made managing my expenses a breeze! Highly recommend."</p>
            <p className="text-gray-700 italic">"With FinMan, I finally understand my spending habits and risks."</p>
          </div>
        </section>

        {/* Security Assurance */}
        <section className="flex flex-col items-center space-y-4 text-center max-w-md">
          <h2 className="text-xl font-bold" style={{ color: '#B685C4' }}>Your Data, Secured</h2>
          <p className="text-gray-600">We prioritize your privacy and use top security practices to keep your data safe.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
