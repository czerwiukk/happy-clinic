import { useUser } from "../hooks/useUser";
import supabase from "../supabase";
import { signInWithGitHub } from "../utils/signIn";
import { Button } from "./Button";

export const UserOrLogin = () => {
  const { user, loadingUser } = useUser();

  if (loadingUser)
    return (
      <p>
        Loading... <span className="text-2xl">👀</span>
      </p>
    );

  if (!user)
    return (
      <Button onClick={signInWithGitHub}>
        Log in <span className="text-2xl">✍️</span>
      </Button>
    );

  return (
    <div className="flex items-center gap-16">
      <h3>
        Logged in as <span className="italic font-bold">{user.email}</span>{" "}
        <span className="text-2xl">🤝</span>
      </h3>

      <Button
        onClick={async () => {
          await supabase.auth.signOut();
          window.location.replace("/");
        }}
      >
        Log out <span className="text-2xl">🚪</span>
      </Button>
    </div>
  );
};
