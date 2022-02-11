import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { Button, Input, Box, useToast, Flex, Heading, useColorModeValue, Text } from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "../scripts/fetcher";

export default function Comments() {
    const router = useRouter();
    const SLUG = router.query.slug;
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const toast = useToast();
    const [commentUser, setCommentUser] = useState(null);

    const { data, error } = useSWR(
        `/api/supabase/fetchComments?slug=${SLUG}`,
        fetcher
    );
    console.log(data);

    useEffect(() => {
        const user = supabase.auth.user();
        setUser(user);
        console.log(user);
        getUserName(user.id);
    }, []);

    // async function fetchData(slug) {
    //     let { data: comments, error } = await supabase
    //         .from("comments")
    //         .select("*")
    //         .eq("slug", slug);

    //     // if there are no comments, set the comments to null
    //     if (comments.length === 0) setComments(null);
    //     else setComments(comments);
    //     console.log(comments);
    // }

    async function saveComment() {
        // if there is no text, don't save the comment
        if (newComment.length === 0) return;

        let { data: comment, error } = await supabase
            .from("comments")
            .insert({
                slug: SLUG,
                comment_text: newComment,
                user: user.id,
            })
        setNewComment("");

        toast({
            title: "Comment saved!",
            description: "Your comment has been saved. It will show up after an admin approves it.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    }

    async function deleteComment(id) {
        const { data, error } = await supabase
            .from("comments")
            .delete()
            .eq("id", id);
    }

    // fetch the user name based on id
    async function getUserName(id) {
        let { data, error } = await supabase
            .from("users")
            .select("user_metadata")
            .eq("id", id);

        try {
            setCommentUser(data[0]?.user_metadata?.full_name);
        } catch (error) {
            console.log(error);
        }
        // return data[0].user_metadata.full_name;
    }

    return (
        <Flex as="section">
            <Flex flexDir="column" flexGrow={1} mr={2}>
                {!data && <Text>Loading comments...</Text>}
                {data?.comments.length === 0 && <Text>This article has no comments.</Text>}
                {data?.comments?.map((comment) => (
                    <Box key={comment.id} bgColor={useColorModeValue("gray.200", "gray.700")} p={5}>
                        {/* 1. {comment.comment_text} - {comment.created_at} -{" "}
                        <strong>Approved:</strong> {comment.approved ? "Yes" : "No"}
                        <Button onClick={() => deleteComment(comment.id)}>Delete</Button> */}
                        <Heading as="h3" size="sm">{comment.comment_text}</Heading>
                    </Box>
                ))}
            </Flex>
            <Flex w={200} flexDir="column">
                <Heading size="md">Add a comment</Heading>
                <Input as="textarea" p={2} type="text" value={newComment} onChange={e => setNewComment(e.target.value)} />
                <Button onClick={() => saveComment()}>Save</Button>
            </Flex>
        </Flex>
    );
}
