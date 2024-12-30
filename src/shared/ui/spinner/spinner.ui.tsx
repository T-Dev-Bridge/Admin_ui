import cn from "classnames";
import spinnerStyles from "./spinner.module.css";

type SpinnerProps = {
  display?: boolean;
};

export function Spinner(props: SpinnerProps) {
  const { display = false } = props;
  const spinnerClasses = cn(spinnerStyles["fallback-spinner"], {
    [spinnerStyles.displayNone]: !display,
    [spinnerStyles.displayBlock]: display,
  });

  return (
    <div className={spinnerClasses}>
      <div className={`${spinnerStyles.loading} component-loader`}>
        <div
          className={`${spinnerStyles["effect-1"]} ${spinnerStyles.effects}`}
        />
        <div
          className={`${spinnerStyles["effect-2"]} ${spinnerStyles.effects}`}
        />
        <div
          className={`${spinnerStyles["effect-3"]} ${spinnerStyles.effects}`}
        />
      </div>
    </div>
  );
}
