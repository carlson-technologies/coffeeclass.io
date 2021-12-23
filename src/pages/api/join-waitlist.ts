import type { NextApiRequest, NextApiResponse } from 'next'

export default async function JoinWaitlist (req: NextApiRequest, res: NextApiResponse) {
    const { email: EMAIL } = req.body

    if (!EMAIL) {
        return res.status(400).json({ error: 'Email is required' })
    }

    try {
        const API_KEY = process.env.BUTTONDOWN_KEY
        const response = await fetch(
            `https://api.buttondown.email/v1/subscribers`,
            {
                body: JSON.stringify({
                    email: EMAIL,
                    tags: ['coffeeclass.io', 'accounts-waitlist']
                }),
                headers: {
                    Authorization: `Token ${API_KEY}`,
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            }
        )

        if (response.status >= 400) {
            const text = await response.text()

            if (text.includes('already subscribed')) {
                return res.status(400).json({
                    error: `You're already subscribed to my mailing list!`
                })
            }

            if (text.includes('Enter a valid')) {
                return res.status(400).json({
                    error: `Please enter a valid email!`
                })
            }

            return res.status(400).json({
                error: text
            })
        }

        return res.status(201).json({ error: '' })
    } catch (error) {
        return res.status(500).json({ error: error.toString() })
    }
}