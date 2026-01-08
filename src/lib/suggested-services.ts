export type SuggestedService = {
    title: string;
    price: number;
    duration_mins: number;
    description?: string;
    available_days?: string[];
};

export const SUGGESTED_SERVICES: Record<string, SuggestedService[]> = {
    "Sharp Fades": [
        {
            title: "Signature Fade",
            price: 45,
            duration_mins: 45,
            description: "Precision fade with clipper & shear work. Includes straight razor line-up and hot towel finish.",
            available_days: ["Tue", "Wed", "Thu", "Fri", "Sat"]
        },
        {
            title: "Fade + Beard Trim",
            price: 60,
            duration_mins: 60,
            description: "Full service haircut plus beard shaping, tapering, and conditioning treatment.",
            available_days: ["Tue", "Wed", "Thu", "Fri", "Sat"]
        }
    ],
    "Wig Installs": [
        {
            title: "Full Frontal Install",
            price: 150,
            duration_mins: 120,
            description: "Adhesive install with customization, plucking, and basic styling. Hair not included.",
            available_days: ["Thu", "Fri", "Sat", "Sun"]
        },
        {
            title: "Wig Maintenance",
            price: 75,
            duration_mins: 90,
            description: "Shampoo, condition, and re-style of your existing unit. Includes lace cleaning.",
            available_days: ["Mon", "Tue", "Wed", "Thu"]
        }
    ],
    "Acrylic Sets": [
        {
            title: "Full Set (Short/Medium)",
            price: 65,
            duration_mins: 90,
            description: "Standard acrylic application with gel polish. Includes cuticle care.",
            available_days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
        },
        {
            title: "Bespoke Nail Art",
            price: 40,
            duration_mins: 45,
            description: "Hand-painted designs, charms, or 3D elements. Added on to any base service.",
            available_days: ["Wed", "Thu", "Fri"]
        }
    ],
    "Facials": [
        {
            title: "Dreampoint Glow Facial",
            price: 95,
            duration_mins: 60,
            description: "Deep cleansing, exfoliation, extractions, and custom mask based on skin type.",
            available_days: ["Mon", "Wed", "Fri"]
        }
    ],
    "Customs": [
        {
            title: "Signature Paint Job",
            price: 200,
            duration_mins: 300,
            description: "Full color change or detailed custom graphics on your provided pair.",
            available_days: ["Sat", "Sun"]
        }
    ]
};

export const getSuggestedServices = (specialty: string): SuggestedService[] => {
    return SUGGESTED_SERVICES[specialty] || [];
};
