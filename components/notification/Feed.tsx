import React, { useEffect } from "react";
import EmptyState from "../EmptyState";
import { BsTwitter } from "react-icons/bs";
import { Notification } from "@prisma/client";
import useNotifications from "@/hooks/useNotifications";

const Feed = () => {
  const { data: notifications = [] } = useNotifications();

  if (notifications.length === 0)
    return <EmptyState label="No notifications" />;

  return (
    <div className="flex flex-col">
      {notifications.map((notification: Notification) => (
        <div
          key={notification.id}
          className="flex items-center gap-4 p-6 border-b border-neutral-800"
        >
          <BsTwitter size={32} color="#fff" />

          <p className="text-sm">{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default Feed;
