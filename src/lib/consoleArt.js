export function logConsoleArt() {
  const banner = `
%c██╗     ██╗      █████╗ ███╗   ███╗ █████╗ %c██╗  ██╗██╗██████╗
%c██║     ██║     ██╔══██╗████╗ ████║██╔══██╗%c██║ ██╔╝██║██╔══██╗
%c██║     ██║     ███████║██╔████╔██║███████║%c█████╔╝ ██║██║  ██║
%c██║     ██║     ██╔══██║██║╚██╔╝██║██╔══██║%c██╔═██╗ ██║██║  ██║
%c███████╗███████╗██║  ██║██║ ╚═╝ ██║██║  ██║%c██║  ██╗██║██████╔╝
%c╚══════╝╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝%c╚═╝  ╚═╝╚═╝╚═════╝
%c                                           %c                   `

  const blue = 'color:#4a9ab5; font-family: monospace; font-weight: bold;'
  const orange = 'color:#e05c1a; font-family: monospace; font-weight: bold;'

  console.log(
    banner,
    blue, orange,
    blue, orange,
    blue, orange,
    blue, orange,
    blue, orange,
    blue, orange,
    blue, orange
  )
  console.log(
    '%cLooking under the hood? Building something, hiring, or just curious — say hi: itsnateguy@gmail.com',
    'color: #6b6b67; font-size: 13px;'
  )
}
