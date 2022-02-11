import type { NextApiRequest, NextApiResponse } from 'next'
import { supabase } from "../../../utils/supabaseClient";

export default async function addComment(req: NextApiRequest, res: NextApiResponse) {

    return res.status(200).json({ "hi": "hi" })
}