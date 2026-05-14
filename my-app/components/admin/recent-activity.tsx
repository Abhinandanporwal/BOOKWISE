"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircle, Inbox } from "lucide-react";

// --- Type Definitions for better safety and readability ---
type ActivityType = "users" | "fines";

interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string; // Assuming ISO string format from API
  status: "active" | "inactive";
}

interface Fine {
  id: string;
  userId: string;
  amount: number;
  reason?: string;
  paid: boolean;
  createdAt: string; // Assuming ISO string format from API
}

interface RecentActivityProps {
  title: string;
  type: ActivityType;
}

// --- Main Component ---
export function RecentActivity({ title, type }: RecentActivityProps) {
  // Use specific types instead of any[]
  const [items, setItems] = useState<(User | Fine)[]>([]);
  const [usersMap, setUsersMap] = useState<Map<string, User>>(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (type === "users") {
          const response = await fetch("/api/recent-users");
          if (!response.ok) throw new Error("Failed to fetch recent users.");
          const data: User[] = await response.json();
          setItems(data);
        } else if (type === "fines") {
          // Fetch fines and users concurrently for efficiency
          const [finesRes, usersRes] = await Promise.all([
            fetch("/api/recent-fines"),
            fetch("/api/recent-users"),
          ]);

          if (!finesRes.ok) throw new Error("Failed to fetch recent fines.");
          if (!usersRes.ok) throw new Error("Failed to fetch associated users.");

          const finesData: Fine[] = await finesRes.json();
          const usersData: User[] = await usersRes.json();
          
          setItems(finesData);
          // Create a Map for efficient user lookup (O(1) average time complexity)
          setUsersMap(new Map(usersData.map(user => [user.id, user])));
        }
      } catch (err) {
        console.error("Failed to fetch recent activity:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type]);

  // --- Helper function to render content based on state ---
  const renderContent = () => {
    if (loading) {
      return (
        // A simple loading state, could be replaced with a skeleton loader
        <div className="p-4 text-sm text-center text-gray-400">Loading activity...</div>
      );
    }

    if (error) {
      return (
        // A clear error message for the user
        <div className="flex flex-col items-center justify-center p-6 space-y-2 text-rose-400">
          <AlertCircle className="w-8 h-8" />
          <p className="font-medium">Failed to load data</p>
          <p className="text-sm text-center text-gray-400">{error}</p>
        </div>
      );
    }

    if (items.length === 0) {
      return (
        // A graceful empty state
        <div className="flex flex-col items-center justify-center p-6 space-y-2 text-gray-400">
          <Inbox className="w-8 h-8" />
          <p className="font-medium">No Recent Activity</p>
          <p className="text-sm text-center">There are no recent items to display.</p>
        </div>
      );
    }

    // Render the list of items
    return (
      <div className="divide-y divide-gray-700/50">
        {items.map((item) => {
          if (type === "users" && 'email' in item) { // Type guard for User
            const user = item as User;
            return <UserActivityItem key={user.id} user={user} />;
          }
          if (type === "fines" && 'userId' in item) { // Type guard for Fine
            const fine = item as Fine;
            const user = usersMap.get(fine.userId);
            return <FineActivityItem key={fine.id} fine={fine} user={user} />;
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div className="overflow-hidden border rounded-lg shadow-md bg-gray-800/70 border-gray-700/50">
      <div className="p-4 border-b border-gray-700/50">
        <h3 className="font-medium text-gray-100">{title}</h3>
      </div>
      {renderContent()}
    </div>
  );
}

// --- Sub-components for cleaner rendering logic ---

const UserActivityItem = ({ user }: { user: User }) => (
  <div className="flex items-center p-4 space-x-4">
    <Avatar>
      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${user.name?.charAt(0)}`} />
      <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
    </Avatar>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-100 truncate">{user.name}</p>
      <p className="text-xs text-gray-400 truncate">{user.email}</p>
    </div>
    <div className="flex flex-col items-end">
      <span className="text-xs text-gray-400">
        {new Date(user.createdAt).toLocaleDateString()}
      </span>
      <span
        className={`text-xs px-2 py-0.5 rounded-full mt-1 ${
          user.status === "active"
            ? "bg-emerald-900/50 text-emerald-400"
            : "bg-gray-700/50 text-gray-400"
        }`}
      >
        {user.status}
      </span>
    </div>
  </div>
);

const FineActivityItem = ({ fine, user }: { fine: Fine; user?: User }) => (
  <div className="flex items-center p-4 space-x-4">
    <Avatar>
      <AvatarImage src={`/placeholder.svg?height=40&width=40&text=${user?.name?.charAt(0)}`} />
      <AvatarFallback>{user?.name?.charAt(0) || "?"}</AvatarFallback>
    </Avatar>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-100 truncate">
        ₹{fine.amount} — {fine.reason || "No reason"}
      </p>
      <p className="text-xs text-gray-400 truncate">{user?.name || `User ID: ${fine.userId}`}</p>
    </div>
    <div className="flex flex-col items-end">
      <span className="text-xs text-gray-400">
        {new Date(fine.createdAt).toLocaleDateString()}
      </span>
      <span
        className={`text-xs px-2 py-0.5 rounded-full mt-1 ${
          fine.paid
            ? "bg-emerald-900/50 text-emerald-400"
            : "bg-rose-900/50 text-rose-400"
        }`}
      >
        {fine.paid ? "Paid" : "Unpaid"}
      </span>
    </div>
  </div>
);
