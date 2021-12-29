export default async function getHeadings(source: any) {
    // Get each line individually, and filter out anything that
    // isn't a heading.
    const headingLines = source.split('\n').filter((line: any) => {
        return line.match(/^###*\s/);
    });

    // Transform the string '## Some text' into an object
    // with the shape '{ text: 'Some text', level: 2 }'
    const headingInfo = headingLines.map((raw: any) => {
        let level = 0;
        let copy = raw;

        while (copy[0] === '#') {
            level++;
            copy = copy.slice(1);
        }

        const text = raw.replace(/^#*\s/, '');

        return { text, level };
    });

    return headingInfo;
}
