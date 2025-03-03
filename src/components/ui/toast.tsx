import * as React from "react";
import { cn } from "@/lib/utils";

interface ToastProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

const Toast: React.FC<ToastProps> = ({ title, description, action }) => {
  return (
    <div className={cn("flex items-center p-4 bg-white shadow-lg rounded-md")}>
      <div className="flex-1">
        <h4 className="font-semibold">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      {action && <div className="ml-4">{action}</div>}
    </div>
  );
};

export type { ToastProps };
export { Toast };
