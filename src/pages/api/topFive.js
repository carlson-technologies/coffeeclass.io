import chakra from '../../configs/learn/chakra-ui.json'

export default function handler(req, res) {
    const routes = chakra.routes.slice(0, 5)
    const titles = routes.map(route => route.title)
    res.status(200).json(titles)
}

