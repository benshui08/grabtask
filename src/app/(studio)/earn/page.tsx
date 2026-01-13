"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import OfferCard from "@/components/OfferCard";

interface Offer {
  id: number;
  title: string;
  description: string;
  conversion: string;
  device: string;
  link: string;
  amount: number;
  payout_currency: string;
  payout_type: string;
  countries: string[];
  creatives: { url: string };
  is_fast_pay: boolean;
  offer_rank: number;
}

const countryOptions = [
  { value: "user", label: "My Location" },
  { value: "US", label: "🇺🇸 United States" },
  { value: "GB", label: "🇬🇧 United Kingdom" },
  { value: "CA", label: "🇨🇦 Canada" },
  { value: "AU", label: "🇦🇺 Australia" },
  { value: "DE", label: "🇩🇪 Germany" },
];

const deviceOptions = [
  { value: "user", label: "My Device" },
  { value: "android", label: "🤖 Android" },
  { value: "ios", label: "🍎 iOS" },
  { value: "desktop", label: "🖥️ Desktop" },
];

export default function EarnPage() {
  const { user, loading: authLoading } = useAuth();
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [country, setCountry] = useState("US");
  const [device, setDevice] = useState("user");
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    const fetchOffers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `/api/offers?subid=${user.uid}&country=${country}&device=${device}`
        );
        const data = await response.json();

        if (data.success) {
          let filteredOffers = data.offers || [];

          // Filter by device if not "user"
          if (device !== "user") {
            filteredOffers = filteredOffers.filter(
              (offer: Offer) => offer.device === device || offer.device === "all"
            );
          }

          const sortedOffers = filteredOffers.sort(
            (a: Offer, b: Offer) => a.offer_rank - b.offer_rank
          );
          setOffers(sortedOffers);
          setDetectedCountry(data.country);
        } else {
          setError("Failed to load offers");
        }
      } catch (err) {
        setError("Failed to load offers");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [user, country, device]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Sign in to Start Earning
          </h1>
          <p className="text-gray-600 mb-6">
            Please sign in to access available tasks and start earning rewards.
          </p>
          <a
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-full transition-colors"
          >
            Go to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-gray-900">Earn Rewards</h1>
          <p className="text-gray-600 mt-1">
            Complete tasks below to earn rewards.
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mt-4">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {countryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            <select
              value={device}
              onChange={(e) => setDevice(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {deviceOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>

            {!loading && (
              <span className="flex items-center text-sm text-gray-500">
                {offers.length} tasks available
                {detectedCountry && country === "user" && (
                  <span className="ml-1">in {detectedCountry}</span>
                )}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Offers List */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-gray-600">Loading available tasks...</p>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <p className="text-gray-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
            >
              Try again
            </button>
          </div>
        ) : offers.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <p className="text-gray-600">No tasks available for this region</p>
            <p className="text-gray-500 text-sm mt-1">Try selecting a different country</p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {offers.map((offer) => (
              <OfferCard
                key={offer.id}
                title={offer.title}
                description={offer.description}
                conversion={offer.conversion}
                amount={offer.amount}
                payoutCurrency={offer.payout_currency}
                payoutType={offer.payout_type}
                link={offer.link}
                imageUrl={offer.creatives?.url}
                device={offer.device}
                isFastPay={offer.is_fast_pay}
                countries={offer.countries}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}