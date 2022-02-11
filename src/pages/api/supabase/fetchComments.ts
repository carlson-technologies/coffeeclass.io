import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from "../../../utils/supabaseClient";

export default async function fetchComments(req: NextApiRequest, res: NextApiResponse) {

    // grab the slug from the request
    const slug = req.query.slug as string

    if (!slug) {
        return res.status(400).json({ error: 'Missing slug' })
    }

    let { data: comments, error } = await supabase
        .from("comments")
        .select("*")
        .eq("slug", slug)
        .eq("approved", "true");

    if (error) return res.status(500).json({ error: error.message })

    return res.status(200).json({ comments })
}