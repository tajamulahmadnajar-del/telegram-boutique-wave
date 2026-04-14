import { type ButtonHTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

interface InternalNavProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  to: string;
  params?: Record<string, unknown>;
  search?: Record<string, unknown>;
  replace?: boolean;
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

export function InternalNav({
  to,
  params,
  search,
  replace,
  className,
  children,
  onClick,
  type = "button",
  ...props
}: InternalNavProps) {
  const navigate = useNavigate();

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    navigate({
      to: to as any,
      params: params as any,
      search: search as any,
      replace,
    });
  };

  return (
    <button
      type={type}
      className={cn(className)}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
