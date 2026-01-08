import { supabase } from "./supabase";
import { Profile, Shop, Service, PlatformUpdate } from "./types";

/**
 * DATABASE ADAPTER (Supabase Version)
 * Replaces mock-db.ts
 */

export const db = {
    /**
     * Check if a slug is available
     */
    checkSlug: async (slug: string): Promise<boolean> => {
        const { data, error } = await supabase
            .from('shops')
            .select('slug')
            .eq('slug', slug.toLowerCase())
            .maybeSingle();

        if (error) {
            console.error("Error checking slug:", error);
            // If error (e.g. table doesn't exist yet), default to available? Or fail safe.
            return false;
        }
        return !data; // If data exists, it's taken.
    },

    /**
     * Create a new Shop + Profile
     */
    createShop: async (data: {
        slug: string;
        fullName: string;
        craft: string;
        vibe: string;
    }) => {
        // 1. Create Profile
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .insert({
                username: data.slug, // Using slug as username for simplicity
                full_name: data.fullName,
                craft: data.craft,
                vibe: data.vibe,
                engagement_score: 0
            })
            .select()
            .single();

        if (profileError) throw new Error(profileError.message);

        // 2. Create Shop
        const { data: shop, error: shopError } = await supabase
            .from('shops')
            .insert({
                owner_id: profile.id,
                slug: data.slug,
                status: 'blueprint',
                checklist: {
                    services_stocked: false,
                    goal_set: null,
                    flag_planted: null
                }
            })
            .select()
            .single();

        if (shopError) throw new Error(shopError.message);

        return { profile, shop };
    },

    /**
     * Get Shop by Slug
     */
    getShop: async (slug: string) => {
        const { data: shop, error } = await supabase
            .from('shops')
            .select('*')
            .eq('slug', slug)
            .single();

        if (error || !shop) return null;

        const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', shop.owner_id)
            .single();

        return { shop, profile };
    },

    /**
     * Get Services
     */
    getServices: async (slug: string) => {
        const { data, error } = await supabase
            .from('services')
            .select('*')
            .eq('shop_slug', slug);

        return data || [];
    },

    /**
     * Add Service
     */
    addService: async function (serviceData: Omit<Service, 'id'>) {
        const { data, error } = await supabase
            .from('services')
            .insert(serviceData)
            .select()
            .single();

        if (error) throw new Error(error.message);

        // NEW: Automatically mark "services_stocked" as true in the checklist
        await this.updateChecklist(serviceData.shop_slug, { services_stocked: true });

        return data;
    },

    /**
     * Update Checklist
     */
    updateChecklist: async (slug: string, updates: Partial<Shop['checklist']>) => {
        // First get current checklist
        const { data: shop } = await supabase
            .from('shops')
            .select('checklist')
            .eq('slug', slug)
            .single();

        if (!shop) return null;

        const newChecklist = { ...shop.checklist, ...updates };

        const { data, error } = await supabase
            .from('shops')
            .update({ checklist: newChecklist })
            .eq('slug', slug)
            .select()
            .single();

        return data;
    },

    /**
     * Delete Service
     */
    deleteService: async (id: string) => {
        const { error } = await supabase
            .from('services')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);
        return { success: true };
    },

    /**
     * Platform Updates (Founders Circle)
     */
    getPlatformUpdates: async (): Promise<PlatformUpdate[]> => {
        // Implementation for updates if table exists
        return [];
    },

    addPlatformUpdate: async (data: any) => {
        return;
    },

    bumpEngagement: async (username: string, amount: number) => {
        // simplified
        return;
    },

    resetShop: async (slug: string) => {
        // Admin only - delete by slug
        await supabase.from('shops').delete().eq('slug', slug);
        await supabase.from('profiles').delete().eq('username', slug);
    },

    /**
     * Admin: Get All Shops
     */
    getAllShops: async () => {
        const { data } = await supabase
            .from('shops')
            .select(`
                *,
                profile:profiles(*)
            `)
            .order('created_at', { ascending: false });

        return data || [];
    },

    /**
     * Admin: Delete Shop
     */
    deleteShop: async (slug: string) => {
        // Cascading deletion handled by Supabase foreign keys if set, 
        // but we'll be explicit just in case.
        const { error } = await supabase.from('shops').delete().eq('slug', slug);
        if (error) throw error;

        const { error: profileError } = await supabase.from('profiles').delete().eq('username', slug);
        if (profileError) throw profileError;

        return { success: true };
    },

    /**
     * Debug: Test Connection
     */
    testConnection: async () => {
        const diagnostics: any = {
            env_url_status: "missing",
            env_key_status: "missing",
            error: null
        };

        try {
            const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
            const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

            // 1. Diagnose Headers
            if (url) {
                diagnostics.env_url_status = `Present (Length: ${url.length})`;
                if (!url.startsWith('https://')) diagnostics.env_url_warning = "Does not start with https://";
                if (url.includes('"') || url.includes("'")) diagnostics.env_url_warning = "Contains quotes (please remove them in Vercel)";
            }
            if (key) {
                diagnostics.env_key_status = `Present (Length: ${key.length})`;
                if (key.includes('"') || key.includes("'")) diagnostics.env_key_warning = "Contains quotes (please remove them in Vercel)";
            }

            // 2. Test Request
            const { data, error } = await supabase.from('shops').select('count', { count: 'exact', head: true });

            if (error) {
                diagnostics.error = error;
                return {
                    success: false,
                    message: "Database Request Failed",
                    details: JSON.stringify(diagnostics, null, 2)
                };
            }

            return { success: true, message: "Connected successfully", details: JSON.stringify(diagnostics, null, 2) };

        } catch (e: any) {
            diagnostics.error_thrown = e.message || String(e);
            return { success: false, message: "Client Initialization Error", details: JSON.stringify(diagnostics, null, 2) };
        }
    }
};
