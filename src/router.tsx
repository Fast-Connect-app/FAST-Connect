// utils/withMenuNavigation.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export function withMenuNavigation<T extends object>(
  WrappedComponent: React.ComponentType<T>
) {
  return (props: Omit<T, "handleMenuSelect">) => {
    const navigate = useNavigate();

    const handleMenuSelect = (route: string) => {
      navigate(route);
    };

    return (
      <WrappedComponent {...(props as T)} handleMenuSelect={handleMenuSelect} />
    );
  };
}
