interface OfferCardProps {
  title: string;
  description: string;
  conversion: string;
  amount: number;
  payoutCurrency: string;
  payoutType: string;
  link: string;
  imageUrl?: string;
  device?: string;
  isFastPay?: boolean;
  countries?: string[];
}

// Country code to flag emoji
const countryFlags: Record<string, string> = {
  US: "🇺🇸",
  CA: "🇨🇦",
  GB: "🇬🇧",
  AU: "🇦🇺",
  NZ: "🇳🇿",
  DE: "🇩🇪",
  FR: "🇫🇷",
  IT: "🇮🇹",
  ES: "🇪🇸",
  NL: "🇳🇱",
  BE: "🇧🇪",
  CH: "🇨🇭",
  AT: "🇦🇹",
  SE: "🇸🇪",
  NO: "🇳🇴",
  DK: "🇩🇰",
  FI: "🇫🇮",
  IE: "🇮🇪",
  PT: "🇵🇹",
  PL: "🇵🇱",
  JP: "🇯🇵",
  KR: "🇰🇷",
  CN: "🇨🇳",
  IN: "🇮🇳",
  BR: "🇧🇷",
  MX: "🇲🇽",
  AR: "🇦🇷",
  SG: "🇸🇬",
  HK: "🇭🇰",
  TW: "🇹🇼",
};

export default function OfferCard({
  title,
  description,
  conversion,
  amount,
  payoutCurrency,
  payoutType,
  link,
  imageUrl,
  device,
  isFastPay,
  countries = [],
}: OfferCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
      <div className="p-4 flex-1">
        <div className="flex gap-4">
          {/* Image */}
          <div className="flex-shrink-0">
            {imageUrl ? (
              <img
                src={imageUrl}
                alt={title}
                className="w-16 h-16 rounded-xl object-cover bg-gray-100"
              />
            ) : (
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-xl font-bold">
                  {title.charAt(0)}
                </span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <h3 className="font-bold text-gray-900 leading-tight line-clamp-2">
                {title}
              </h3>
              <div className="flex-shrink-0 text-right">
                <div className="text-lg font-bold text-green-600 whitespace-nowrap">
                  +{payoutCurrency === "USD" ? "$" : ""}{amount.toFixed(2)}
                </div>
                {isFastPay && (
                  <span className="text-xs text-orange-600 font-medium">
                    Fast Pay
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
              {description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {device && (
                <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border ${
                  device === "ios"
                    ? "border-gray-300 text-gray-600"
                    : "border-green-300 text-green-700"
                }`}>
                  {device === "ios" ? "🍎" : "🤖"} {device === "ios" ? "iOS" : "Android"}
                </span>
              )}
              <span className="text-xs px-2 py-0.5 rounded-full border border-blue-300 text-blue-700">
                {payoutType}
              </span>
            </div>
          </div>
        </div>

        {/* Countries */}
        {countries.length > 0 && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
            <span className="font-medium">Available:</span>
            <div className="flex gap-0.5">
              {countries.slice(0, 6).map((code) => (
                <span key={code} title={code}>
                  {countryFlags[code] || code}
                </span>
              ))}
              {countries.length > 6 && (
                <span className="text-gray-400">+{countries.length - 6}</span>
              )}
            </div>
          </div>
        )}

        {/* Conversion requirement */}
        <div className="mt-2 pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            <span className="font-medium text-gray-600">Requirement:</span> {conversion}
          </p>
        </div>
      </div>

      {/* Action */}
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 transition-colors"
      >
        Start Task
      </a>
    </div>
  );
}