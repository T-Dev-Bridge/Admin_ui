import { JSX } from "react";
import { Helmet } from "react-helmet";

type Props = {
  description?: string;
  children: JSX.Element | JSX.Element[];
  title?: string;
};

export function PageContainer({ title, description, children }: Props) {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta
          name="description"
          content={description}
        />
      </Helmet>
      {children}
    </div>
  );
}
