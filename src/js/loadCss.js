export function LoadCss()
{
    let iconStyle=document.createElement('link')
    iconStyle.href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css'
    iconStyle.rel='stylesheet'

    document.head.appendChild(iconStyle)

    let css=document.createElement('link')
    css.href='../../style.css'
    css.rel='stylesheet'

    document.head.appendChild(css)
}