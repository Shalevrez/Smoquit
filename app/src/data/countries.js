// ─────────────────────────────────────────────────────────────────────────
//  Countries, currencies and rough pack prices.
//
//  Prices are estimates, and the app says so on the settings screen. They
//  only ever seed the price field — what the money figures actually use is
//  whatever the person typed there.
//
//  Like the trigger names, country codes and product names are stored in
//  English and translated on the way out.
// ─────────────────────────────────────────────────────────────────────────

export const COUNTRIES = {
  IL: {
    name: "Israel",
    currency: "₪",
    code: "ILS",
    perPack: 36,
    products: [
      {
        n: "Marlboro (Red / Gold)",
        p: 36,
        type: "cig",
      },
      {
        n: "L&M",
        p: 34,
        type: "cig",
      },
      {
        n: "Winston",
        p: 35,
        type: "cig",
      },
      {
        n: "Parliament",
        p: 39,
        type: "cig",
      },
      {
        n: "Camel",
        p: 36,
        type: "cig",
      },
      {
        n: "Noblesse",
        p: 30,
        type: "cig",
      },
      {
        n: "Time",
        p: 30,
        type: "cig",
      },
      {
        n: "Golf",
        p: 30,
        type: "cig",
      },
      {
        n: "Pall Mall",
        p: 33,
        type: "cig",
      },
      {
        n: "Roll-your-own (Drum / Golden Virginia)",
        p: 45,
        type: "roll",
      },
      {
        n: "IQOS / Heets",
        p: 34,
        type: "heated",
      },
    ],
  },
  US: {
    name: "United States",
    currency: "$",
    code: "USD",
    perPack: 8,
    products: [
      {
        n: "Marlboro",
        p: 9,
        type: "cig",
      },
      {
        n: "Newport",
        p: 9,
        type: "cig",
      },
      {
        n: "Camel",
        p: 8,
        type: "cig",
      },
      {
        n: "Pall Mall",
        p: 7,
        type: "cig",
      },
      {
        n: "Winston",
        p: 7.5,
        type: "cig",
      },
      {
        n: "American Spirit",
        p: 10,
        type: "cig",
      },
      {
        n: "Lucky Strike",
        p: 7.5,
        type: "cig",
      },
      {
        n: "Roll-your-own",
        p: 6,
        type: "roll",
      },
      {
        n: "IQOS / Heets",
        p: 8,
        type: "heated",
      },
    ],
  },
  GB: {
    name: "United Kingdom",
    currency: "£",
    code: "GBP",
    perPack: 16,
    products: [
      {
        n: "Marlboro",
        p: 16.6,
        type: "cig",
      },
      {
        n: "Benson & Hedges",
        p: 16,
        type: "cig",
      },
      {
        n: "Lambert & Butler",
        p: 14.5,
        type: "cig",
      },
      {
        n: "Mayfair",
        p: 13.5,
        type: "cig",
      },
      {
        n: "Richmond",
        p: 13,
        type: "cig",
      },
      {
        n: "Amber Leaf (roll-your-own)",
        p: 20,
        type: "roll",
      },
      {
        n: "Golden Virginia (roll-your-own)",
        p: 21,
        type: "roll",
      },
      {
        n: "IQOS / Heets",
        p: 12,
        type: "heated",
      },
    ],
  },
  DE: {
    name: "Germany",
    currency: "€",
    code: "EUR",
    perPack: 8,
    products: [
      {
        n: "Marlboro",
        p: 8.6,
        type: "cig",
      },
      {
        n: "L&M",
        p: 8,
        type: "cig",
      },
      {
        n: "Gauloises",
        p: 8,
        type: "cig",
      },
      {
        n: "Lucky Strike",
        p: 8.2,
        type: "cig",
      },
      {
        n: "Pall Mall",
        p: 8,
        type: "cig",
      },
      {
        n: "West",
        p: 8,
        type: "cig",
      },
      {
        n: "Roll-your-own (Van Nelle / Pueblo)",
        p: 12,
        type: "roll",
      },
      {
        n: "IQOS / Heets",
        p: 8,
        type: "heated",
      },
    ],
  },
  FR: {
    name: "France",
    currency: "€",
    code: "EUR",
    perPack: 12,
    products: [
      {
        n: "Marlboro",
        p: 12.5,
        type: "cig",
      },
      {
        n: "Gauloises",
        p: 11.5,
        type: "cig",
      },
      {
        n: "Camel",
        p: 12,
        type: "cig",
      },
      {
        n: "Philip Morris",
        p: 11.5,
        type: "cig",
      },
      {
        n: "Winston",
        p: 11.5,
        type: "cig",
      },
      {
        n: "Roll-your-own",
        p: 16,
        type: "roll",
      },
      {
        n: "IQOS / Heets",
        p: 11,
        type: "heated",
      },
    ],
  },
  IT: {
    name: "Italy",
    currency: "€",
    code: "EUR",
    perPack: 6,
    products: [
      {
        n: "Marlboro",
        p: 6.2,
        type: "cig",
      },
      {
        n: "MS",
        p: 5.8,
        type: "cig",
      },
      {
        n: "Camel",
        p: 6,
        type: "cig",
      },
      {
        n: "Chesterfield",
        p: 5.5,
        type: "cig",
      },
      {
        n: "Winston",
        p: 5.7,
        type: "cig",
      },
      {
        n: "Roll-your-own",
        p: 8,
        type: "roll",
      },
      {
        n: "IQOS / Heets",
        p: 5.5,
        type: "heated",
      },
    ],
  },
  ES: {
    name: "Spain",
    currency: "€",
    code: "EUR",
    perPack: 5.4,
    products: [
      {
        n: "Marlboro",
        p: 5.4,
        type: "cig",
      },
      {
        n: "Fortuna",
        p: 5,
        type: "cig",
      },
      {
        n: "Ducados",
        p: 5,
        type: "cig",
      },
      {
        n: "Camel",
        p: 5.3,
        type: "cig",
      },
      {
        n: "Winston",
        p: 5.1,
        type: "cig",
      },
      {
        n: "Roll-your-own",
        p: 7,
        type: "roll",
      },
      {
        n: "IQOS / Heets",
        p: 5,
        type: "heated",
      },
    ],
  },
  AU: {
    name: "Australia",
    currency: "A$",
    code: "AUD",
    perPack: 45,
    products: [
      {
        n: "Winfield",
        p: 45,
        type: "cig",
      },
      {
        n: "Marlboro",
        p: 48,
        type: "cig",
      },
      {
        n: "Longbeach",
        p: 42,
        type: "cig",
      },
      {
        n: "Peter Jackson",
        p: 43,
        type: "cig",
      },
      {
        n: "Roll-your-own",
        p: 55,
        type: "roll",
      },
    ],
  },
  CA: {
    name: "Canada",
    currency: "C$",
    code: "CAD",
    perPack: 16,
    products: [
      {
        n: "du Maurier",
        p: 16,
        type: "cig",
      },
      {
        n: "Player's",
        p: 15.5,
        type: "cig",
      },
      {
        n: "Export A",
        p: 15,
        type: "cig",
      },
      {
        n: "Marlboro",
        p: 16,
        type: "cig",
      },
      {
        n: "Belmont",
        p: 16,
        type: "cig",
      },
      {
        n: "Roll-your-own",
        p: 14,
        type: "roll",
      },
    ],
  },
  IN: {
    name: "India",
    currency: "₹",
    code: "INR",
    perPack: 340,
    products: [
      {
        n: "Gold Flake",
        p: 340,
        type: "cig",
      },
      {
        n: "Classic",
        p: 360,
        type: "cig",
      },
      {
        n: "Wills Navy Cut",
        p: 320,
        type: "cig",
      },
      {
        n: "Marlboro",
        p: 380,
        type: "cig",
      },
      {
        n: "Bidi (bundle)",
        p: 30,
        type: "roll",
      },
    ],
  },
};
export const FALLBACK_COUNTRY = {
  name: "Other",
  currency: "$",
  code: "USD",
  perPack: 6,
  products: [
    {
      n: "Marlboro",
      p: 6,
      type: "cig",
    },
    {
      n: "Camel",
      p: 6,
      type: "cig",
    },
    {
      n: "Winston",
      p: 5.5,
      type: "cig",
    },
    {
      n: "L&M",
      p: 5,
      type: "cig",
    },
    {
      n: "Lucky Strike",
      p: 5.5,
      type: "cig",
    },
    {
      n: "Local brand",
      p: 5,
      type: "cig",
    },
    {
      n: "Roll-your-own",
      p: 7,
      type: "roll",
    },
    {
      n: "IQOS / Heets",
      p: 6,
      type: "heated",
    },
  ],
};
export function countryFor(code) {
  return COUNTRIES[code] || FALLBACK_COUNTRY;
}
export function detectCountry() {
  try {
    const region = (
      Intl.DateTimeFormat().resolvedOptions().locale ||
      (navigator.languages && navigator.languages[0]) ||
      navigator.language ||
      ""
    ).split("-")[1];
    if (region && COUNTRIES[region.toUpperCase()]) return region.toUpperCase();
    // No region in the locale — fall back to what the clock says.
    const zone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
    if (zone.includes("Jerusalem")) return "IL";
    if (zone.includes("London")) return "GB";
    if (zone.includes("Paris")) return "FR";
    if (zone.includes("Berlin")) return "DE";
    if (zone.includes("Rome")) return "IT";
    if (zone.includes("Madrid")) return "ES";
    if (zone.includes("Sydney") || zone.includes("Melbourne")) return "AU";
    if (zone.includes("Toronto") || zone.includes("Vancouver")) return "CA";
    if (zone.includes("Kolkata")) return "IN";
    if (zone.includes("New_York") || zone.includes("Chicago") || zone.includes("Los_Angeles"))
      return "US";
  } catch {}
  return "IL";
}
