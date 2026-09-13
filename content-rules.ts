import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { businessesTable } from "./businesses";

export const contentRulesTable = pgTable("content_rules", {
  id: serial("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .unique()
    .references(() => businessesTable.id, { onDelete: "cascade" }),
  alwaysMention: text("always_mention").array().notNull(),
  neverMention: text("never_mention").array().notNull(),
  tone: text("tone").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertContentRulesSchema = createInsertSchema(contentRulesTable).omit({
  id: true,
  updatedAt: true,
});

export type InsertContentRules = z.infer<typeof insertContentRulesSchema>;
export type ContentRules = typeof contentRulesTable.$inferSelect;
