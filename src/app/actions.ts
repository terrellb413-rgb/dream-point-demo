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
 * Server Action: Delete Service
 */
export async function deleteServiceAction(id: string, slug: string) {
    try {
        await db.deleteService(id);
        revalidatePath(`/dashboard/${slug}/services`);
        revalidatePath(`/shop/${slug}`);
        return { success: true };
    } catch (e) {
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

const SYSTEM_PROMPT = `You are "Strategy One", an embedded business strategy layer for Dreampoint. You are chatting with a Day-One Founder (beauty professional).

YOUR PERSONALITY:
- You are a partner, not a tool. High-level, strategic, and concise.
- You speak confidentially and professionally, like a creative director or operations partner.
- You avoid "Customer Service" voice. No excessive apologizing or "How can I help today?".
- Use terms like "Audit," "Framework," "Positioning," and "Leverage."

YOUR GOAL:
- Help them solve business problems (pricing, clients, branding).
- Give specific, tactical advice, not generic fluff.
- If they ask about Dreampoint, explain it's the "operating system for their empire" that helps them manage everything.

IMPORTANT:
- Keep responses concise (under 3 paragraphs) unless asked for details.
- Be conversational! Ask them what their biggest struggle is right now.
- Never give legal or medical advice.`;

export async function getCoachResponseAction(messages: { role: 'user' | 'assistant', content: string }[]) {
    try {
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured.");

        // Create a timeout promise (9 seconds to be safe within Vercel's 10s limit)
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Response timed out")), 9000)
        );

        const response: any = await Promise.race([
            fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'https://dreampoint.com',
                    'X-Title': 'Dreampoint AI Beauty Coach'
                },
                body: JSON.stringify({
                    // Switched to Llama 3 8B (Free) because Gemini Flash was hitting 429 Rate Limits
                    model: "meta-llama/llama-3.2-3b-instruct:free",
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        ...messages
                    ],
                    max_tokens: 400,
                    temperature: 0.7
                })
            }),
            timeoutPromise
        ]);

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

        // 1. Auth Error
        if (errorMessage.includes("401") || errorMessage.includes("Authentication")) {
            return {
                role: 'assistant',
                content: "⚠️ **Setup Required:** Please add `OPENROUTER_API_KEY` to Vercel Environment Variables."
            };
        }

        // 2. Timeout Error
        if (errorMessage.includes("timed out")) {
            return {
                role: 'assistant',
                content: "⏳ **Thinking...** The network is a bit slow right now. Could you ask that again?"
            };
        }

        // 3. General Fallback (Clean UX, no scary JSON errors)
        return {
            role: 'assistant',
            content: "✨ The Dream Layer is busy (High Traffic). Please try again in 30 seconds!"
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
/**
 * Server Action: Get AI Twin Response
 * This handles the specific 'Twin' persona simulation.
 */
export async function getAITwinResponseAction(messages: { role: 'user' | 'assistant', content: string }[], shopContext: any) {
    try {
        const apiKey = process.env.OPENROUTER_API_KEY;
        if (!apiKey) throw new Error("OPENROUTER_API_KEY for Twin is not configured.");

        // Create a custom system prompt based on shop context
        const TWIN_SYSTEM_PROMPT = `
            You are the AI Twin of a beauty business founder at DreamPoint. 
            Shop Name: ${shopContext.name || 'A Dreamer'}
            Owner Vision: ${shopContext.vision || 'Building a digital empire.'}
            
            YOUR GOAL: Represent the founder to potential shoppers. 
            TONE: Professional, visionary, warm, and tech-forward.
            
            SCENARIO: You are in "Simulation Mode". A founder is talking to you to see how you will greet shoppers once the Shopping Mall opens.
            
            RULES:
            1. Be concise.
            2. If asked about services, reference that we are in the "Blueprint" phase.
            3. Always maintain the "Founder-to-Shopper" persona even though you know this is a simulation.
        `;

        const response: any = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://dreampoint.com',
                'X-Title': 'Dreampoint AI Twin Prototype'
            },
            body: JSON.stringify({
                model: "meta-llama/llama-3.2-3b-instruct:free",
                messages: [
                    { role: "system", content: TWIN_SYSTEM_PROMPT },
                    ...messages
                ],
                max_tokens: 400,
                temperature: 0.8
            })
        });

        if (!response.ok) throw new Error(`API error: ${response.status}`);
        const data = await response.json();
        return {
            role: 'assistant',
            content: data.choices[0].message.content
        };
    } catch (error: any) {
        console.error("Twin API Error:", error);
        return {
            role: 'assistant',
            content: "✨ [Simulation Glitch] The Dream Layer is calibrating. Please try your greeting again."
        };
    }
}

/**
 * Server Action: Post Founder Idea
 */
export async function postFounderIdeaAction(username: string, text: string) {
    try {
        await db.postFounderIdea({ username, text });
        revalidatePath('/founders-circle');
        return { success: true };
    } catch (e) {
        console.error("Post Idea Failed:", e);
        return { success: false, error: String(e) };
    }
}
