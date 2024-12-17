"use client";
import FallbackImage from "@/components/fallback-image";
import { Button } from "@/components/ui/button";
import { GET_Packages } from "@/lib/api";
import { PackageType } from "@/lib/types";
import { fetcher } from "@/lib/utils";
import { Calendar, Loader2 } from "lucide-react";
// import Image from "next/image";
import useSWR from "swr";

export default function HomePage() {
  const { data, error, mutate, isValidating } = useSWR(GET_Packages, fetcher);
  if (error)
    return (
      <div className="flex flex-col justify-center items-center p-10 gap-5">
        <div>Failed to load Packages</div>
        <Button
          variant={"outline"}
          disabled={isValidating}
          onClick={() => mutate()}
        >
          {isValidating ? "Retrying..." : "Retry"}
        </Button>
      </div>
    );
  if (!data)
    return (
      <div className="p-10 flex justify-center items-center">
        <Loader2 size={30} className="animate-spin" />
      </div>
    );

  return (
    <>
      <header>
        <h1 className="text-xl text-center p-3">Travel Packages</h1>
      </header>
      <main className="mx-auto max-w-[800px] p-3">
        {/* <code>{JSON.stringify(data)}</code> */}
        {data.map((pkg: PackageType, i: number) => (
          <PackageView key={i} pkg={pkg} />
        ))}
      </main>
    </>
  );
}

function PackageView({ pkg }: { pkg: PackageType }) {
  return (
    <div className="flex flex-col md:flex-row gap-5 p-3 rounded-lg border shadow hover:shadow-lg transition-shadow bg-primary-foreground">
      {/* Image */}
      <div className="flex flex-col">
        {/* <img alt={pkg.title} src={pkg.image || "/imgs/placeholder.png"} height={50} width={50} /> */}
        <FallbackImage
        className="mx-auto"
          fallbackSrc={"/imgs/placeholder.png"}
          src={pkg.image}
          alt={pkg.title}
          height={100}
          width={100}
        />
      </div>

      {/* Body */}
      <div className=" space-y-2 flex-1">
        <div className="text-xl font-semibold">{pkg.title}</div>
        <div>{pkg.description}</div>
        <div className="flex gap-3">
          <Calendar size={20}/> {pkg.availableDates[0].replaceAll('-','/')} - {pkg.availableDates[1].replaceAll('-','/')}
        </div>
      </div>

      {/* Pricing */}
      <div className="px-5 flex items-end justify-between md:flex-col">
        <div>
          <div className=" opacity-50">Starting Price</div>
          <div className="text-lg font-semibold">Rs. {pkg.price}</div>
        </div>

        <div>
          <Button>Book Now</Button>
        </div>
      </div>
    </div>
  );
}
