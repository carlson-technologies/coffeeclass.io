import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import Container from "../components/Container";
import {
  Button,
  Heading,
  Box,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

export default function profile() {
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const user = supabase.auth.user();
    setUser(user);
    console.log(user);
    fetchData(user);
  }, []);

  async function fetchData(user: any) {
    let { data: comments, error } = await supabase
      .from("comments")
      .select("*")
      .eq("user", user?.id);

    // if there are no comments, set the comments to null
    // if (comments.length === 0) setComments(null);
    setComments(comments);
    console.log(comments);
  }

  async function deleteComment(id: number) {
    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", id);
  }

  return (
    <Container>
      <Flex flexDir="column" mx="auto" px={4}>
        {user?.user_metadata?.full_name}

        <Heading>Your comments:</Heading>
        {comments?.length === 0 && <p>Loading comments...</p>}
        {comments === null && <p>You have no comments.</p>}
        {comments?.map((comment, index) => (
          <Box
            key={comment.id}
            bgColor={useColorModeValue("gray.100", "gray.900")}
            borderRadius={5}
            my={4}
            p={5}
          >
            {++index}. {comment.comment_text} - {comment.created_at} -{" "}
            <strong>Approved:</strong> {comment.approved ? "Yes" : "No"}
            <Button onClick={() => deleteComment(comment.id)}>Delete</Button>
          </Box>
        ))}
      </Flex>
    </Container>
  );
}
