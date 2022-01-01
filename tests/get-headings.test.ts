const { default: getHeadings } = require('../src/scripts/get-headings.ts')

const source = `# Heading 1\n## Heading 2\n\n## Heading 3\nTest text\n\n\nTest text test text\n\n\n`
  + `<Step number="1" title="Title" />\n<Step title="No Step Number" />\n\n<Step number="25" />\n`;
let headings: any;

beforeAll(async () => {
  headings = await getHeadings(source);
})

test('Correctly parses ## at level 2', () => {
  expect(headings.find((heading: any) => heading.text === "Heading 2")).toBeTruthy();
})

test('Correctly parses ### at level 3', () => {
  expect(headings.find((heading: any) => heading.text === "Heading 3")).toBeTruthy();
})

test('Correctly parses <Step> component at level 2', () => {
  expect(headings.find((heading: any) => heading.text === "1. Title")).toBeTruthy();
})

test('Ignores <Step> components if they are missing number or title', () => {
  expect(headings.find((heading: any) => heading.text.includes('25'))).toBeFalsy();
  expect(headings.find((heading: any) => heading.text.includes('No Step Number'))).toBeFalsy();
})
  
test('Ignores # lines', () => {
  expect(headings.find((heading: any) => heading.text.includes("Heading 1"))).toBeFalsy();
})

export { }