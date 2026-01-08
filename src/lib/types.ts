export type Shop = {
    id: string;
    owner_id: string;
    slug: string;
    status: 'blueprint' | 'founder'; // Renamed status
    checklist: {
        services_stocked: boolean; // Derived from service count > 0
        goal_set: string | null;
        flag_planted: string | null; // URL
    };
    created_at: string;
};

export type Profile = {
    id: string;
    username: string;
    full_name: string;
    craft: string;
    vibe: string;
    engagement_score: number; // For leaderboard
    created_at: string;
};

export type Service = {
    id: string;
    shop_slug: string; // Linking by slug for mock convenience
    title: string;
    price: number;
    duration_mins: number;
    description?: string;
    available_days?: string[];
};

export type PlatformUpdate = {
    id: string;
    title: string;
    content: string;
    date: string;
};
