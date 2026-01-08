import fs from "fs";
import path from "path";
import { Profile, Shop, Service, PlatformUpdate } from "./types";

type DBStructure = {
    profiles: Profile[];
    shops: Shop[];
    services: Service[];
    updates: PlatformUpdate[];
};

// Data File Path
const DB_FILE_PATH = path.join(process.cwd(), "src/lib/db.json");

// SEED DATA
const demoShopId = "demo_id";
const SEED_DATA: DBStructure = {
    profiles: [
        {
            id: demoShopId,
            username: "demo",
            full_name: "Demo Builder",
            craft: "Hair Stylist",
            vibe: "Industrial",
            engagement_score: 10,
            created_at: new Date().toISOString()
        }
    ],
    shops: [
        {
            id: "shop_demo",
            owner_id: demoShopId,
            slug: "demo",
            status: "founder",
            checklist: {
                services_stocked: true,
                goal_set: "To build a legacy.",
                flag_planted: null
            },
            created_at: new Date().toISOString()
        }
    ],
    services: [
        {
            id: "svc_1",
            shop_slug: "demo",
            title: "Signature Cut",
            price: 45,
            duration_mins: 45,
            description: "Precision cut with hot towel."
        }
    ],
    updates: [
        {
            id: "u_1",
            title: "Foundation Poured",
            content: "We've officially launched the Early Construction phase of Dreampoint. Welcome builders!",
            date: new Date().toISOString()
        },
        {
            id: "u_2",
            title: "New Tools in Service Editor",
            content: "You can now add detailed descriptions and weekly availability to your services.",
            date: new Date().toISOString()
        }
    ]
};

function readDB(): DBStructure {
    try {
        if (!fs.existsSync(DB_FILE_PATH)) {
            fs.writeFileSync(DB_FILE_PATH, JSON.stringify(SEED_DATA, null, 2));
            return SEED_DATA;
        }
        const data = fs.readFileSync(DB_FILE_PATH, "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading DB:", error);
        return SEED_DATA;
    }
}

function writeDB(data: DBStructure) {
    try {
        fs.writeFileSync(DB_FILE_PATH, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error("Error writing DB:", error);
    }
}

// Mock Delay to simulate network
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockDb = {
    /**
     * Check if a slug is available
     */
    checkSlug: async (slug: string): Promise<boolean> => {
        await delay(300);
        const db = readDB();
        const taken = db.shops.find((s) => s.slug === slug.toLowerCase());
        return !taken;
    },

    /**
     * Create a new "User" and "Shop" via the Onboarding Flow
     */
    createShop: async (data: {
        slug: string;
        fullName: string;
        craft: string;
        vibe: string;
    }) => {
        await delay(1500); // Simulate "Pouring Foundation"

        const newId = Math.random().toString(36).substring(7);
        const now = new Date().toISOString();

        const newProfile: Profile = {
            id: newId,
            username: data.slug,
            full_name: data.fullName,
            craft: data.craft,
            vibe: data.vibe,
            engagement_score: 0,
            created_at: now,
        };

        const newShop: Shop = {
            id: `shop_${newId}`,
            owner_id: newId,
            slug: data.slug,
            status: 'blueprint',
            checklist: {
                services_stocked: false,
                goal_set: null,
                flag_planted: null
            },
            created_at: now,
        };

        const db = readDB();
        db.profiles.push(newProfile);
        db.shops.push(newShop);
        writeDB(db);

        return { profile: newProfile, shop: newShop };
    },

    /**
     * UPDATE: Update Shop Checklist
     */
    updateChecklist: async (slug: string, updates: Partial<Shop['checklist']>) => {
        await delay(500);
        const db = readDB();
        const shopIndex = db.shops.findIndex(s => s.slug === slug);
        if (shopIndex === -1) return null;

        const services = db.services.filter(s => s.shop_slug === slug);
        const hasServices = services.length > 0;

        if (!db.shops[shopIndex].checklist) {
            db.shops[shopIndex].checklist = {
                services_stocked: false,
                goal_set: null,
                flag_planted: null
            };
        }

        db.shops[shopIndex].checklist = {
            ...db.shops[shopIndex].checklist,
            ...updates,
            services_stocked: hasServices
        };

        // Auto-upgrade status if complete
        const c = db.shops[shopIndex].checklist;
        if (c.services_stocked && c.goal_set && c.flag_planted) {
            db.shops[shopIndex].status = 'founder';
        }

        writeDB(db);
        return db.shops[shopIndex];
    },

    /**
     * DEV: Reset Shop to initial state
     */
    resetShop: async (slug: string) => {
        await delay(300);
        const db = readDB();

        // Remove Shop
        db.shops = db.shops.filter(s => s.slug !== slug);

        // Remove Services
        db.services = db.services.filter(s => s.shop_slug !== slug);

        // Remove Profile (username matches slug in our mock logic)
        db.profiles = db.profiles.filter(p => p.username !== slug);

        writeDB(db);
    },

    /**
     * Get shop by slug
     */
    getShop: async (slug: string) => {
        await delay(200);
        const db = readDB();
        const shop = db.shops.find((s) => s.slug === slug);
        if (!shop) {
            console.log(`[MockDB] getShop: Shop not found for slug '${slug}'`);
            return null;
        }

        const services = db.services.filter(s => s.shop_slug === slug);
        console.log(`[MockDB] getShop('${slug}'): Found ${services.length} services.`);

        // Ensure checklist exists (graceful migration for old data)
        if (!shop.checklist) {
            shop.checklist = {
                services_stocked: false,
                goal_set: null,
                flag_planted: null
            };
        }

        // DYNAMICALLY COMPUTE services_stocked
        shop.checklist.services_stocked = services.length > 0;
        console.log(`[MockDB] getShop('${slug}'): Computed services_stocked = ${shop.checklist.services_stocked}`);

        const profile = db.profiles.find((p) => p.id === shop.owner_id);
        return { shop, profile };
    },

    /**
     * Add a Service to a Shop
     */
    addService: async (serviceData: Omit<Service, 'id'>) => {
        await delay(600);
        const newService: Service = {
            ...serviceData,
            id: Math.random().toString(36).substring(7),
        };
        const db = readDB();
        db.services.push(newService);
        writeDB(db);
        return newService;
    },

    /**
     * Get all services for a Shop
     */
    getServices: async (slug: string) => {
        await delay(200);
        const db = readDB();
        return db.services.filter((s) => s.shop_slug === slug);
    },

    getAllShops: async () => {
        await delay(200);
        const db = readDB();
        return db.shops.map(shop => {
            const profile = db.profiles.find(p => p.id === shop.owner_id);
            return { shop, profile };
        });
    },

    /**
     * Increment engagement score for a user
     */
    bumpEngagement: async (username: string, amount: number) => {
        await delay(300);
        const db = readDB();
        const profileIndex = db.profiles.findIndex(p => p.username === username);
        if (profileIndex === -1) return null;

        db.profiles[profileIndex].engagement_score += amount;
        writeDB(db);
        return db.profiles[profileIndex];
    },

    /**
     * Get all platform updates
     */
    getPlatformUpdates: async () => {
        await delay(300);
        const db = readDB();
        return db.updates || [];
    },

    /**
     * Add a platform update
     */
    addPlatformUpdate: async (data: { title: string; content: string }) => {
        await delay(400);
        const db = readDB();
        const newUpdate: PlatformUpdate = {
            id: Math.random().toString(36).substring(7),
            ...data,
            date: new Date().toISOString()
        };
        if (!db.updates) db.updates = [];
        db.updates.unshift(newUpdate);
        writeDB(db);
        return newUpdate;
    }
};
