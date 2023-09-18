import supabase from "../supabase";

export async function signInWithGitHub() {
  await supabase.auth.signInWithOAuth({
    provider: "github",
  });
}
