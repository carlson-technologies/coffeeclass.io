// a cool underline css effect from https://codepen.io/ykadosh/pen/bGqJKqJ

const random = (from, to) => Math.floor(Math.random() * (to - from) + from)

const Underline = ({ children }) => {
    const strokeWidth = random(16, 20) / 100
    const height = random(4, 8)
    let lines = random(2, 4)
    let d = `M ${random(-5, 15)} ${random(-2, 2)}`
    let line = 0

    // Draw the lines
    while (line++ < lines) {
        const y = line * (height / lines); // Draw every line lower than the previous one
        d += ` Q ${random(30, 70)}` + // The x coordinate of the curve's center
            ` ${random(y - 5, y + 5)}` + // The y coordinate of the curve's center
            ` ${line % 2 === 0 ? random(-5, 15) : random(85, 105)}` + // The x coordinate of the curve's end, alternating between right to left based on the current line number
            ` ${random(y - 2, y + 2)}`; // The y coordinate of the curve's end
    }

    return (
        <>
            <div className='pen-stroke'>
                {children}
                <svg viewBox={`0 0 100 ${height}`} height={height} xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'>
                    <path d={d} strokeWidth={`${strokeWidth}em`} />
                </svg>
            </div>
            <style jsx>{`
            .pen-stroke {
                position: relative;
                display: inline;
            }
            .pen-stroke svg {
                position: absolute;
                top: 1.1em;
                left: 0;
                width: 100%;
                overflow: visible;
            }
            .pen-stroke svg path {
                fill: none;
                stroke: #bb8b62;
                stroke-linecap: round;
                stroke-linejoin: round;
                vector-effect: non-scaling-stroke;
            }
        `}</style>
        </>
    )
}

export default Underline