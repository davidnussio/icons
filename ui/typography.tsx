import { cva, type VariantProps } from "class-variance-authority";

// ⚠️ Disclaimer: Use of Tailwind CSS is optional
const typography = cva("typograpy", {
  variants: {
    variant: {
      h1: ["text-5xl font-semibold mb-10"],
      h2: ["text-3xl font-medium mb-4"],
    },
  },
});

export type TypographyProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof typography> & { as?: React.ElementType };

export const Typography: React.FC<TypographyProps> = ({
  className,
  variant,
  as = "span",
  ...props
}) => {
  const Component = as;
  return <Component className={typography({ variant })} {...props} />;
};

export const H1: React.FC<TypographyProps> = (props) => (
  <Typography {...props} as="h1" variant="h1" />
);

export const H2: React.FC<TypographyProps> = (props) => (
  <Typography {...props} as="h2" variant="h2" />
);
