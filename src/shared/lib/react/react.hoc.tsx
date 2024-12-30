import {
  ComponentType,
  createElement,
  ForwardedRef,
  forwardRef,
  Suspense,
  SuspenseProps,
} from "react";

export function withSuspense<Props extends object>(
  component: ComponentType<Props>,
  suspenseProps: SuspenseProps & {
    FallbackComponent?: ComponentType;
  },
) {
  const Wrapped = forwardRef<Props, any>(
    (props: Props, ref: ForwardedRef<any>) =>
      createElement(
        Suspense,
        {
          fallback:
            suspenseProps.fallback ||
            (suspenseProps.FallbackComponent &&
              createElement(suspenseProps.FallbackComponent)),
        },
        createElement(component, { ...props, ref }),
      ),
  );

  const name = component.displayName || component.name || "Unknown";
  Wrapped.displayName = `withSuspense(${name})`;

  return Wrapped;
}
