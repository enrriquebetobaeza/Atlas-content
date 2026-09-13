import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { businessesTable } from "./businesses";

export const businessProfilesTable = pgTable("business_profiles", {
  id: serial("id").primaryKey(),
  businessId: text("business_id")
    .notNull()
    .unique()
    .references(() => businessesTable.id, { onDelete: "cascade" }),
  address: text("address").notNull(),
  cityState: text("city_state").notNull(),
  phone: text("phone").notNull(),
  website: text("website").notNull(),
  description: text("description").notNull(),
  services: text("services").array().notNull(),
  products: text("products").array().notNull(),
  hours: text("hours").notNull(),
  promotions: text("promotions").notNull(),
  targetCustomers: text("target_customers").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertBusinessProfileSchema = createInsertSchema(businessProfilesTable).omit({
  id: true,
  updatedAt: true,
});

export type InsertBusinessProfile = z.infer<typeof insertBusinessProfileSchema>;
export type BusinessProfile = typeof businessProfilesTable.$inferSelect;
