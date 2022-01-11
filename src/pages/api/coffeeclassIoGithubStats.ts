import type { NextApiRequest, NextApiResponse } from 'next'

export default async function coffeeclassIoGithubStats(req: NextApiRequest, res: NextApiResponse) {
    const headers = {
        "Authorization": "Token " + process.env.GITHUB_SECRET,
    }

    const response = await fetch('https://api.github.com/repos/carlson-technologies/coffeeclass.io', {
        headers
    })

    const json = await response.json()

    return res.status(200).json({ data: json })
}