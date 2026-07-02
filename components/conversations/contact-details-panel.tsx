"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Mail,
  MapPin,
  Phone,
  Plus,
  StickyNote,
} from "lucide-react";
import { Avatar, Button, Card } from "@/components/ui";
import type {
  ActivityItem,
  ContactDetails,
  ContactNote,
  DealInfo,
} from "@/lib/conversations/types";
import { fadeUp, staggerContainer, tableRow } from "@/lib/motion/variants";

export interface ContactProfileCardProps {
  contact: ContactDetails;
}

export function ContactProfileCard({ contact }: ContactProfileCardProps) {
  const isActive = contact.status === "Active now";

  return (
    <Card className="text-center">
      <Avatar
        initials={contact.initials}
        size="lg"
        color={contact.avatarColor}
        className="mx-auto h-16 w-16 text-lg"
      />
      <h3 className="mt-3 text-sm font-bold text-gray-900">{contact.name}</h3>
      <p className="mt-1 flex items-center justify-center gap-1.5 text-xs text-gray-500">
        {isActive ? (
          <span className="h-2 w-2 rounded-full bg-green-500" />
        ) : null}
        {contact.status}
      </p>

      <ul className="mt-4 space-y-2.5 text-left text-xs text-gray-600">
        <li className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          {contact.phone}
        </li>
        <li className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          <span className="truncate">{contact.email}</span>
        </li>
        <li className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          {contact.location}
        </li>
        <li className="flex items-center gap-2">
          <Building2 className="h-3.5 w-3.5 shrink-0 text-gray-400" />
          {contact.company}
        </li>
      </ul>

      <Button variant="secondary" size="sm" className="mt-4 w-full">
        View Contact
      </Button>
    </Card>
  );
}

export interface DealsCardProps {
  deals: DealInfo[];
}

export function DealsCard({ deals }: DealsCardProps) {
  if (!deals.length) return null;

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="border-b border-gray-100 px-4 py-3">
        <h3 className="text-sm font-bold text-gray-900">
          Deals ({deals.length})
        </h3>
      </div>
      {deals.map((deal) => (
        <div key={deal.id} className="space-y-3 p-4">
          <div className="flex items-start justify-between gap-2">
            <p className="text-sm font-semibold text-gray-900">{deal.title}</p>
            <span className="shrink-0 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-semibold text-orange-700">
              {deal.status}
            </span>
          </div>
          <dl className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <dt className="text-gray-400">Value</dt>
              <dd className="font-semibold text-gray-900">{deal.value}</dd>
            </div>
            <div>
              <dt className="text-gray-400">Stage</dt>
              <dd className="font-semibold text-gray-900">{deal.stage}</dd>
            </div>
            <div className="col-span-2">
              <dt className="text-gray-400">Updated</dt>
              <dd className="font-medium text-gray-700">{deal.updated}</dd>
            </div>
          </dl>
          <button
            type="button"
            className="cursor-pointer text-xs font-semibold text-violet-600 hover:text-violet-700"
          >
            View Deal
          </button>
        </div>
      ))}
    </Card>
  );
}

export interface NotesCardProps {
  notes: ContactNote[];
}

export function NotesCard({ notes }: NotesCardProps) {
  return (
    <Card padding="none" className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <h3 className="text-sm font-bold text-gray-900">Notes</h3>
        <button
          type="button"
          className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700"
        >
          <Plus className="h-3 w-3" />
          Add Note
        </button>
      </div>
      {notes.length ? (
        <ul className="divide-y divide-gray-50">
          {notes.map((note) => (
            <li key={note.id} className="flex gap-3 p-4">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50">
                <StickyNote className="h-4 w-4 text-amber-600" />
              </div>
              <div className="min-w-0">
                <p className="text-xs leading-relaxed text-gray-700">
                  {note.content}
                </p>
                <p className="mt-1.5 text-[10px] text-gray-400">
                  {note.author} · {note.date}
                </p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-4 py-6 text-center text-xs text-gray-400">
          No notes yet
        </p>
      )}
    </Card>
  );
}

export interface ActivityTimelineProps {
  activities: ActivityItem[];
}

export function ActivityTimeline({ activities }: ActivityTimelineProps) {
  if (!activities.length) return null;

  return (
    <Card padding="none" className="overflow-hidden">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <h3 className="text-sm font-bold text-gray-900">Recent Activity</h3>
        <button
          type="button"
          className="cursor-pointer text-xs font-semibold text-violet-600 hover:text-violet-700"
        >
          View all
        </button>
      </div>
      <motion.ul
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="divide-y divide-gray-50 p-4"
      >
        {activities.map((item) => {
          const Icon = item.icon;

          return (
            <motion.li
              key={item.id}
              variants={tableRow}
              className="flex items-center gap-3 py-2.5 first:pt-0 last:pb-0"
            >
              <div
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: item.iconBg }}
              >
                <Icon className="h-4 w-4" style={{ color: item.iconColor }} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-gray-800">
                  {item.title}
                </p>
              </div>
              <span className="shrink-0 text-[10px] text-gray-400">
                {item.timestamp}
              </span>
            </motion.li>
          );
        })}
      </motion.ul>
    </Card>
  );
}

export interface ContactDetailsPanelProps {
  contact: ContactDetails;
  deals: DealInfo[];
  notes: ContactNote[];
  activities: ActivityItem[];
}

export function ContactDetailsPanel({
  contact,
  deals,
  notes,
  activities,
}: ContactDetailsPanelProps) {
  return (
    <motion.aside
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      transition={{ duration: 0.45, delay: 0.1 }}
      className="hidden h-full w-72 shrink-0 overflow-y-auto border-l border-gray-100 bg-white p-4 xl:block lg:w-80"
    >
      <div className="space-y-4">
        <ContactProfileCard contact={contact} />
        <DealsCard deals={deals} />
        <NotesCard notes={notes} />
        <ActivityTimeline activities={activities} />
      </div>
    </motion.aside>
  );
}
