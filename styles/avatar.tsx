import { css } from '@emotion/react'

const baseAvatar = css`
  .avatar {
    border-radius: 50%;
    margin-top: 10px;
  }
`

export const lightAvatarTheme = css`
  ${baseAvatar};
  .avatar {
    border: 5px solid #bb855e !important;
  }
`

export const darkAvatarTheme = css`
  ${baseAvatar};
  .avatar {
    border: 5px solid #c89b7b !important;
  }
`
