import classes from "./InputError.module.css";

type ErrorProps = React.PropsWithChildren<{}>;

export default function InputError({ children }: ErrorProps) {
  return <div className={classes.error}>{children}</div>;
}
