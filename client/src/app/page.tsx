import classes from "./page.module.css";

export default async function Page() {
  return (
    <div className={classes.container}>
      <h2 className={classes.welcomeNote}>Welcome to Food App</h2>
    </div>
  );
}
