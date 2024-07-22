import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx, args) => {
    const messages = await ctx.db.query("messages").take(500);
    return messages;
  },
});

export const saveMessage = mutation({
  args: { body: v.string(), user: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.insert("messages", {
      body: args.body,
      user: args.user,
    });
  },
});
