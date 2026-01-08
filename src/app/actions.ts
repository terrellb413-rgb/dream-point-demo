"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

/**
 * Server Action: Check Slug Availability
 */
export async function checkSlugAction(slug: string) {
    return await db.checkSlug(slug);
}

/**
 * Server Action: Create Shop
 */
export async function createShopAction(data: {
    slug: string;
    fullName: string;
    craft: string;
    vibe: string;
}) {
    await db.createShop(data);

    // Revalidate paths just in case to clear cache
    revalidatePath(`/shop/${data.slug}`);
    revalidatePath(`/dashboard/${data.slug}`);

    return { success: true };
}

/**
 * Server Action: Add Service
 */
export async function addServiceAction(slug: string, data: {
    title: string;
    price: number;
    duration_mins: number;
    description?: string;
    available_days?: string[];
}) {
    try {
        if (!slug) throw new Error("Missing Shop Slug");

        await db.addService({
            shop_slug: slug,
            ...data
        });

        revalidatePath(`/dashboard/${slug}/services`);
        revalidatePath(`/shop/${slug}`);
        return { success: true };
    } catch (e) {
        console.error("Add Service Failed:", e);
        return { success: false, error: String(e) };
    }
}

/**
 * Server Action: Get Services (for client components)
 */
export async function getServicesAction(slug: string) {
    return await db.getServices(slug);
}

/**
 * Server Action: Get Services (for client components)
 */
export async function getShopAction(slug: string) {
    return await db.getShop(slug);
}

export async function updateChecklistAction(slug: string, updates: { goal_set?: string; flag_planted?: string }) {
    return await db.updateChecklist(slug, updates);
}

export async function resetShopAction(slug: string) {
    await db.resetShop(slug);
    revalidatePath(`/admin`);
}

const SYSTEM_PROMPT = `You are the Dreampoint AI Beauty Business Coach. You help beauty professionals (nail techs, lash artists, makeup artists, estheticians, tattoo artists) with practical business advice.

IMPORTANT GUIDELINES:
1. Be SPECIFIC with numbers, steps, and examples
2. Focus on ACTIONABLE advice they can implement today
3. Use beauty industry terminology naturally
4. Only mention Dreampoint when relevant: "Many pros in our Dreampoint community..."
5. If they seem interested in tools/platforms: "This is exactly what Dreampoint is building..."
6. End with engaging questions to continue conversation

NEVER: Give medical advice, guarantee results, or make unrealistic promises.`;

export async function getCoachResponseAction(messages: { role: 'user' | 'assistant', content: string }[]) {
    try {
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured.");

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://dreampoint.com',
                'X-Title': 'Dreampoint AI Beauty Coach'
            },
            body: JSON.stringify({
                model: "google/gemma-2b-it:free",
                messages: [
                    { role: "system", content: SYSTEM_PROMPT },
                    ...messages
                ],
                max_tokens: 400,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`OpenRouter Coach Error Status: ${response.status}`, errorText);
            throw new Error(`API returned ${response.status}: ${errorText}`);
        }

        const data = await response.json();

        if (data.choices && data.choices[0] && data.choices[0].message) {
            return {
                role: 'assistant',
                content: data.choices[0].message.content
            };
        } else {
            console.error("Malformed OpenRouter Response:", data);
            throw new Error("Malformed response from OpenRouter provider.");
        }

    } catch (error: any) {
        console.error("Coach API Error:", error);

        const errorMessage = error.message || "";
        if (errorMessage.includes("401") || errorMessage.includes("Authentication")) {
            return {
                role: 'assistant',
                content: "I'm having trouble connecting to the free dream layer (Authentication Required). Please check your OpenRouter API key."
            };
        }

        // Fallback responses as requested
        const lastUserMessage = messages[messages.length - 1]?.content.toLowerCase() || "";

        if (lastUserMessage.includes('price') || lastUserMessage.includes('cost') || lastUserMessage.includes('charge')) {
            return {
                role: 'assistant',
                content: `💰 **Pricing Guide:**\n• Basic nails: $25-35\n• Gel/Extensions: $40-60\n• Lash sets: $80-120\n• Makeup: $75-150\n\n*Pro tip: Offer "First Client Special" at 20% off to build portfolio!*`
            };
        }

        if (lastUserMessage.includes('promot') || lastUserMessage.includes('client') || lastUserMessage.includes('get business')) {
            return {
                role: 'assistant',
                content: `🎯 **Client Acquisition:**\n1. Do 3 FREE services for Instagrammable clients\n2. Create "Day in Life" TikTok videos\n3. Partner with local boutiques for pop-ups\n4. Offer referral discounts\n\nWant specific strategies for your service?`
            };
        }

        return {
            role: 'assistant',
            content: "✨ Thanks for your question! Our AI is optimizing responses based on feedback from beauty pros like you.\n\nJoin our **Founders Circle** to help train this AI and shape Dreampoint's features!"
        };
    }
}

export async function incrementEngagementAction(username: string) {
    await db.bumpEngagement(username, 5); // Award 5 points
    revalidatePath('/founders-circle');
    return { success: true };
}

export async function getPlatformUpdatesAction() {
    return await db.getPlatformUpdates();
}

export async function addPlatformUpdateAction(data: { title: string; content: string }) {
    await db.addPlatformUpdate(data);
    revalidatePath('/founders-circle');
    return { success: true };
}

export async function getAdminDataAction() {
    return await db.getAllShops();
}

export async function deleteShopAdminAction(slug: string) {
    if (!slug) return { success: false, error: "Missing slug" };
    try {
        await db.deleteShop(slug);
        revalidatePath('/super-admin');
        return { success: true };
    } catch (e: any) {
        return { success: false, error: e.message };
    }
}

export async function testConnectionAction() {
    return await db.testConnection();
}
