import Brand from "../UI/Brand/Brand";
import DrawerToggle from "./DrawerToggle/DrawerToggle";
import classes from "./Header.module.css";
import NavigationItems from "./NavigationItems/NavigationItems";

type Props = React.PropsWithChildren<{
  handlerToggleSideDrawer: () => void;
}>;

export default function Header({ handlerToggleSideDrawer }: Props) {
  return (
    <header className={classes.Header}>
      <DrawerToggle clickHandler={handlerToggleSideDrawer} />

      <div className={classes.Brand}>
        <Brand />
      </div>

      <nav className={classes.DesktopOnly}>
        <NavigationItems isAuthenticated={false} />
      </nav>
    </header>
  );
}
