type Color = string

type BadgeArgs = {
    h?: number, // height
    w?: number, // width
    bg: Color, // background color
    fg: Color, // foreground color
    t: string, // primary text
    t2: string, // secondary text
    r: number, // corner radius
    ic: string, // icon
    icScale: number, // icon scale
}
