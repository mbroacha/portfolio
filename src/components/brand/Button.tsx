import { Link } from "react-router-dom";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../lib/cn";

type ButtonVariant = "primary" | "secondary" | "text";

interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
  /** Text variant shows → by default (handoff). Set false to suppress. */
  showArrow?: boolean;
}

type ButtonAsButton = ButtonBaseProps &
  ComponentPropsWithoutRef<"button"> & {
    href?: undefined;
    to?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"a">, "href"> & {
    href: string;
    to?: undefined;
  };

type ButtonAsRouterLink = ButtonBaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "to"> & {
    to: string;
    href?: undefined;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsRouterLink;

const variantClass: Record<ButtonVariant, string> = {
  primary: "btn btn--primary",
  secondary: "btn btn--secondary",
  text: "btn btn--text",
};

/** Mono uppercase button. One primary per view. */
export const Button = ({
  variant = "primary",
  className,
  children,
  showArrow,
  ...props
}: ButtonProps) => {
  const classes = cn(variantClass[variant], className);
  const withArrow = showArrow ?? variant === "text";
  const content = (
    <>
      {children}
      {withArrow ? <span aria-hidden="true">→</span> : null}
    </>
  );

  if ("to" in props && props.to) {
    const { to, ...linkProps } = props;
    return (
      <Link to={to} className={classes} {...linkProps}>
        {content}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    return (
      <a href={href} className={classes} {...anchorProps}>
        {content}
      </a>
    );
  }

  const { type = "button", ...buttonProps } = props as ButtonAsButton;
  return (
    <button type={type} className={classes} {...buttonProps}>
      {content}
    </button>
  );
};
