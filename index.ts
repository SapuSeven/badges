import svg from 'svg-builder'
import icons from "./icons";
import svgpath from "svgpath";
import anafanafo from "anafanafo";

function badge(args: BadgeArgs) {
    const finalHeight = args.h ?? 80
    const finalWidth = args.w
    const background = args.bg ?? '#222'
    const foreground = args.fg ?? '#fff'
    const text1 = args.t
    const text2 = args.t2
    const cornerRadius = args.r ?? 8
    const iconScale = args.icScale ?? .7
    const icon = args.ic

    const text1size = 32
    const text2size = 20
    const iconPadding = (1.0 - iconScale) / 2.0 * 100

    const textWidth = Math.max(
        text1 ? anafanafo(text1, { font: `11px Verdana` }) * (text1size / 11) : 0,
        text2 ? anafanafo(text2, { font: `11px Verdana` }) * (text2size / 11) : 0
    )
    const height = 100
    const width = finalWidth ? 100 * ((finalWidth) / (finalHeight)) : 100 + textWidth + (textWidth ? iconPadding : 0)

    const img = svg.newInstance()
        .height(finalHeight).width(finalWidth)
        .viewBox(`0 0 ${width} ${height}`)

    // Background
    img.rect({
        width: width,
        height: height,
        rx: cornerRadius,
        fill: background,
        stroke: 'none',
    })

    // Icon
    if (icons[icon]) {
        const iconPath = svgpath(icons[icon]).scale(iconScale).translate(iconPadding, iconPadding).toString()
        img.path({
            d: iconPath,
            fill: foreground,
            'fill-rule': 'evenodd'
        })
    }

    if (text1) {
        // noinspection JSSuspiciousNameCombination
        img.text({
            x: height,
            y: text2 ? 75 : 60,
            'font-size': text1size,
            'font-family': 'Verdana,Geneva,DejaVu Sans,sans-serif',
            fill: foreground
        }, text1)
    }

    if (text2) {
        // noinspection JSSuspiciousNameCombination
        img.text({
            x: height,
            y: 36,
            'font-size': text2size,
            'font-family': 'Verdana,Geneva,DejaVu Sans,sans-serif',
            fill: foreground
        }, text2)
    }

    return img.render()
}

export default badge
