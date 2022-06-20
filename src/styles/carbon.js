import { css } from '@emotion/react'

export const carbonBase = css`
#carbonads * {
  margin: initial;
  padding: initial;
}
#carbonads {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial,
    sans-serif;
}
#carbonads {
  display: flex;
  max-width: 330px;
  z-index: 100;
}
#carbonads a {
  color: inherit;
  text-decoration: none;
}
#carbonads a:hover {
  color: inherit;
}
#carbonads span {
  position: relative;
  display: block;
  overflow: hidden;
}
#carbonads .carbon-wrap {
  display: flex;
}
#carbonads .carbon-img {
  display: block;
  margin: 0;
  line-height: 1;
}
#carbonads .carbon-img img {
  display: block;
}
#carbonads .carbon-text {
  font-size: 13px;
  padding: 10px;
  margin-bottom: 16px;
  line-height: 1.5;
  text-align: left;
}
#carbonads .carbon-poweredby {
  display: block;
  padding: 6px 8px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 600;
  font-size: 8px;
  line-height: 1;
  border-top-left-radius: 3px;
  position: absolute;
  bottom: 0;
  right: 0;
}
`

export const carbonLight = css`
  ${carbonBase};
  #carbonads {
    box-shadow: 0 1px 4px 1px hsla(0, 0%, 0%, 0.1);
    background-color: hsl(0, 0%, 98%);
  }
  #carbonads .carbon-poweredby {
    background: #f1f1f2;
  }
`

export const carbonDark = css`
  ${carbonBase};
  #carbonads {
    box-shadow: 0 1px 4px 1px hsla(0, 0%, 0%, 0.1);
    background-color: hsl(0, 0%, 10%);
  }
  #carbonads .carbon-poweredby {
    background: #1f1e1e;
  }
  `