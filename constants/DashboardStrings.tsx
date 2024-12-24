import {
  PlanetIcon,
  SchoolBusIcon,
  BuildingIcon,
  TargetIcon,
} from "@/assests/svg";
import {
  ArrowRight,
  Fan,
  Gauge,
  Globe2,
  KeySquare,
  Layers,
  Link,
  BadgePlus,
  ScrollText,
  ServerCog,
  Crown,
  Sparkles,
  Banknote,
  PiggyBank,
} from "lucide-react";

export interface dashboardSidebarOptionsTypes {
  icon: JSX.Element;
  title: string;
  linkName: string;
  linkOpenInNewTab?: boolean;
  willCrispOpen?: boolean;
  badge?: {
    title: string;
    icon: JSX.Element;
  };
}

export interface dashboardAnnoucementTypes {
  title: string;
  description: string;
  buttonTitle: string;
  link: string;
}

export type purchasePlansTypeProps =
  | "TEST"
  | "BASIC"
  | "STANDARD"
  | "PREMIUM"
  | "ENTERPRISE";

export interface purchasePlansTypes {
  icon: JSX.Element;
  name: string;
  type: purchasePlansTypeProps | string;
  description: string;
  price: string;
  totalGB: number;
  isSpecial?: boolean;
  pricePer: string;
  features: string[];
  buttonValues: {
    text: string;
    path: string;
    icon: JSX.Element;
    variant: "brand" | "ghost";
    size: "xs" | "sm" | "lg";
  };
  coupon?: string;
}

export const AdminSidebarOptions: dashboardSidebarOptionsTypes[] = [
  {
    icon: <Gauge size={18} />,
    title: "Dashboard",
    linkName: "/dashboard",
  },
  {
    icon: <ScrollText size={18} />,
    title: "Invoices",
    linkName: "/dashboard/invoices",
  },
  {
    icon: <Globe2 size={18} />,
    title: "Core Residential",
    linkName: "/dashboard/core-residential-proxies",
    badge: {
      icon: <Sparkles size={10} />,
      title: "New",
    },
  },
  {
    icon: <Fan size={18} />,
    title: "Proxy Generator",
    linkName: "/dashboard/core-proxy-generator",
    badge: {
      icon: <Sparkles size={10} />,
      title: "New",
    },
  },
  {
    icon: <ServerCog size={18} />,
    title: "IPv6 Datacenter",
    linkName: "/dashboard/ipv6-proxies",
    badge: {
      icon: <Crown size={10} />,
      title: "Popular",
    },
  },

  {
    icon: <Fan size={18} />,
    title: "Proxy Generator",
    linkName: "/dashboard/ipv6-proxy-generator",
  },
  {
    icon: <ServerCog size={18} />,
    title: "IPv4 Datacenter",
    linkName: "/dashboard/ipv4-proxies",
  },

  {
    icon: <Fan size={18} />,
    title: "Proxy Generator",
    linkName: "/dashboard/ipv4-proxy-generator",
  },
  {
    icon: <KeySquare size={18} />,
    title: "Support",
    linkName: "",
    willCrispOpen: true,
    linkOpenInNewTab: false,
    badge: {
      icon: <Link size={10} />,
      title: "On-Site Chat",
    },
  },
  {
    icon: <BadgePlus size={18} />, // HERE
    title: "Telegram Channel",
    linkName: "https://t.me/EclipseProxy",
    linkOpenInNewTab: true,
  },
  {
    icon: <BadgePlus size={18} />,
    title: "Discord Server",
    linkName: "https://discord.gg/EclipseProxy",
    linkOpenInNewTab: true,
  },
];


export const AdminSidebarOptions2: dashboardSidebarOptionsTypes[] = [
  {
    icon: <Gauge size={18} />,
    title: "Dashboard",
    linkName: "/dashboard",
  },
  {
    icon: <ScrollText size={18} />,
    title: "Invoices",
    linkName: "/dashboard/invoices",
  },
  {
    icon: <Fan size={18} />,
    title: "Residential Proxy Generator",
    linkName: "/dashboard/proxy-generator",
  },
  {
    icon: <Globe2 size={18} />,
    title: "Core Residential",
    linkName: "/dashboard/core-residential-proxies",
    badge: {
      icon: <Sparkles size={10} />,
      title: "New",
    },
  },
  {
    icon: <Fan size={18} />,
    title: "Proxy Generator",
    linkName: "/dashboard/core-proxy-generator",
    badge: {
      icon: <Sparkles size={10} />,
      title: "New",
    },
  },
  {
    icon: <ServerCog size={18} />,
    title: "IPv6 Datacenter",
    linkName: "/dashboard/ipv6-proxies",
    badge: {
      icon: <Crown size={10} />,
      title: "Popular",
    },
  },

  {
    icon: <Fan size={18} />,
    title: "Proxy Generator",
    linkName: "/dashboard/ipv6-proxy-generator",
  },
  {
    icon: <ServerCog size={18} />,
    title: "IPv4 Datacenter",
    linkName: "/dashboard/ipv4-proxies",
  },

  {
    icon: <Fan size={18} />,
    title: "Proxy Generator",
    linkName: "/dashboard/ipv4-proxy-generator",
  },
  {
    icon: <KeySquare size={18} />,
    title: "Support",
    linkName: "",
    willCrispOpen: true,
    linkOpenInNewTab: false,
    badge: {
      icon: <Link size={10} />,
      title: "On-Site Chat",
    },
  },
  {
    icon: <BadgePlus size={18} />, // HERE
    title: "Telegram Channel",
    linkName: "https://t.me/EclipseProxy",
    linkOpenInNewTab: true,
  },
  {
    icon: <BadgePlus size={18} />,
    title: "Discord Server",
    linkName: "https://discord.gg/EclipseProxy",
    linkOpenInNewTab: true,
  },
];

export const dashboardAnnoucement: dashboardAnnoucementTypes[] = [
  {
    title: "Welcome to EclipseProxy!",
    description:
      "Welcome! Our website is still under development and we have a LOT planned for the future! If you ever do find any bugs, or require assistance for any other reason, feel free to contact us through our on-site livechat! Thank you for choosing EclipseProxy :)",
    buttonTitle: "Contact Support",
    link: "javascript:$crisp.push(['do', 'chat:open']);",
  },
];

export const dashboardPurchasePricing: purchasePlansTypes[] = [
  {
    icon: <TargetIcon />,
    name: "Residential Proxies",
    type: "ENTERPRISE",
    description:
      "Scrape any data with real residential proxies to avoid getting blocked.",
    price: "5",
    totalGB: 1,
    pricePer: "5$ per GB",
    features: [
      "Unlimited Threads",
      "Unique IP for each request",
      "Lighting fast speeds",
      "Geo IP Targeting",
      "Data does not expire",
      "Pay as you go",
    ],
    buttonValues: {
      text: "Purchase",
      path: "/",
      icon: <ArrowRight size={15} />,
      variant: "brand",
      size: "sm",
    },
  },
  {
    icon: <BuildingIcon />,
    name: "Residential Proxies",
    type: "BASIC",
    description:
      "Scrape any data with real residential proxies to avoid getting blocked.",
    price: "20",
    totalGB: 5,
    pricePer: "4$ per GB",
    isSpecial: true,
    features: [
      "Unlimited Threads",
      "Unique IP for each request",
      "Lighting fast speeds",
      "Geo IP Targeting",
      "Data does not expire",
      "Pay as you go",
    ],
    buttonValues: {
      text: "Purchase",
      path: "/",
      icon: <ArrowRight size={15} />,
      variant: "brand",
      size: "sm",
    },
  },
  {
    icon: <SchoolBusIcon />,
    name: "Residential Proxies",
    type: "STANDARD",
    description:
      "Scrape any data with real residential proxies to avoid getting blocked.",
    price: "72",
    totalGB: 20,
    pricePer: "3.6$ per GB",
    features: [
      "Unlimited Threads",
      "Unique IP for each request",
      "Lighting fast speeds",
      "Geo IP Targeting",
      "Data does not expire",
      "Pay as you go",
    ],
    buttonValues: {
      text: "Purchase",
      path: "/",
      icon: <ArrowRight size={15} />,
      variant: "brand",
      size: "sm",
    },
  },
  {
    icon: <PlanetIcon />,
    name: "Residential Proxies",
    type: "PREMIUM",
    description:
      "Scrape any data with real residential proxies to avoid getting blocked.",
    price: "130",
    totalGB: 40,
    pricePer: "3.2$ per GB",
    isSpecial: false,
    features: [
      "Unlimited Threads",
      "Unique IP for each request",
      "Lighting fast speeds",
      "Geo IP Targeting",
      "Data does not expire",
      "Pay as you go",
    ],
    buttonValues: {
      text: "Purchase",
      path: "/",
      icon: <ArrowRight size={15} />,
      variant: "brand",
      size: "sm",
    },
  },
];
