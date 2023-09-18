import { useUser } from "../hooks/useUser";
import { signInWithGitHub } from "../utils/signIn";

export const UserOrLogin = () => {
  const user = useUser();

  if (!user) return <button onClick={signInWithGitHub}>Log in</button>;

  return (
    <h3>
      Logged in as <span className="italic font-bold">{user.email}</span>
    </h3>
  );
};
