import { pgTable, serial, text, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { businessesTable } from "./businesses";

export const postsTable = pgTable("posts", {
  id: serial("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .references(() => businessesTable.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  platform: text("platform").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull().default("needs_approval"),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
  approvalDate: timestamp("approval_date", { withTimezone: true }),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  generationSource: text("generation_source").notNull().default("fallback"),
  generationContext: jsonb("generation_context")
    .$type<Record<string, unknown>>()
    .notNull()
    .default({}),
  qualityStatus: text("quality_status").notNull().default("pass"),
  qualityIssues: text("quality_issues").array().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPostSchema = createInsertSchema(postsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertPost = z.infer<typeof insertPostSchema>;
export type Post = typeof postsTable.$inferSelect;