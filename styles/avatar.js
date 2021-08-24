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
        border: 5px solid #BB855E !important;
    }
`

export const darkAvatarTheme = css`
    ${baseAvatar};
    .avatar {
        border: 5px solid #C89B7B !important;
    }
`