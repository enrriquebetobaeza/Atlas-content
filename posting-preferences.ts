import { pgTable, serial, text, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { businessesTable } from "./businesses";

export const postingPreferencesTable = pgTable("posting_preferences", {
  id: serial("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .unique()
    .references(() => businessesTable.id, { onDelete: "cascade" }),
  postingFrequency: integer("posting_frequency").notNull().default(10),
  approvalMode: text("approval_mode").notNull().default("approval"),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertPostingPreferencesSchema = createInsertSchema(postingPreferencesTable).omit({
  id: true,
  updatedAt: true,
});

export type InsertPostingPreferences = z.infer<typeof insertPostingPreferencesSchema>;
export type PostingPreferences = typeof postingPreferencesTable.$inferSelect;
