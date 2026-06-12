import { Topic } from "@/components/components/Topic";

export default function Topics() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full py-3">
      <Topic topic="Startup 101" />
      <Topic topic="Product Development" />
      <Topic topic="Management Operations" />
      <Topic topic="Growth Strategies" />
      <Topic topic="Market and Customers" />
      <Topic topic="Founder Traits" />
      <Topic topic="Industry knowledge" />
    </div>
  );
}

