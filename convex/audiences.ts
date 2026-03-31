import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: { id: v.id("audiences") },
  handler: async (ctx, args) => {
    return ctx.db.get(args.id);
  },
});

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    return ctx.db.query("audiences").withIndex("by_createdAt").order("desc").collect();
  },
});

export const create = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    structuredFields: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    return ctx.db.insert("audiences", {
      name: args.name,
      description: args.description,
      structuredFields: args.structuredFields,
      createdAt: now,
      updatedAt: now,
    });
  },
});
