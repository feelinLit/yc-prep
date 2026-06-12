"use client";

import { Balance } from "@/components/Balance";
import { InvestorContact } from "@/components/dial-book/InvestorContact";

export default function DialBook() {
  const contacts = [
    {
      active: true,
      name: "Alice Smith",
      avatar: "/investor-avatars/woman-afroamerican.png",
      round: "Friends and family" as const,
      investment: 200,
      summaryID: "first",
    },
    {
      active: true,
      name: "Bob Smith",
      avatar: "/investor-avatars/man-white.png",
      round: "Pre-seed" as const,
      investment: 400,
    },
    {
      active: false,
      name: "Jennifer M. Johnson",
      avatar: "/investor-avatars/woman-white.png",
      round: "Seed" as const,
      investment: 680,
    },
    {
      active: false,
      name: "Richard Nixon",
      avatar: "/investor-avatars/man-white-beard.png",
      round: "Seed" as const,
      investment: 730,
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-5xl mx-auto px-4 md:px-8 py-6 overflow-y-auto gap-6">
      <div className="md:hidden">
        <Balance />
      </div>

      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">Investor Directory</h1>
        <p className="text-gray-100 text-sm">Review your investor relations and active investments.</p>
      </div>

      {/* Grid view for Desktop, List view for Mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {contacts.map((contact, idx) => (
          <div 
            key={idx} 
            className="bg-gray-800/40 border border-gray-700/40 hover:border-gray-600/60 rounded-2xl p-5 transition-all duration-300 hover:shadow-lg hover:shadow-black/10 flex items-center justify-between"
          >
            <InvestorContact
              active={contact.active}
              name={contact.name}
              avatar={contact.avatar}
              round={contact.round}
              investment={contact.investment}
              summaryID={contact.summaryID}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

