import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Container from "../components/Container";

export default function profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const user = supabase.auth.user();
    setUser(user);
    console.log(user);
  }, []);
  return <Container>{user?.user_metadata?.full_name}</Container>;
}
