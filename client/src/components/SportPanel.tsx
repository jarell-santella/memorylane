export type Sport = "nba" | "nfl" | "nhl"

interface SportImage {
  left: string
  right: string
}

interface SportImages {
  nba: SportImage
  nfl: SportImage
  nhl: SportImage
}

const sportImages: SportImages = {
  nba: {
    left: "https://cdn.freebiesupply.com/images/large/2x/nba-logo-transparent.png",
    right:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Basketball_Clipart.svg/1024px-Basketball_Clipart.svg.png",
  },
  nfl: {
    left: "https://pngimg.com/d/american_football_PNG59.png",
    right:
      "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png",
  },
  nhl: {
    left: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/05_NHL_Shield.svg/800px-05_NHL_Shield.svg.png",
    right:
      "https://static.vecteezy.com/system/resources/thumbnails/018/062/545/small/ice-hockey-player-sport-team-png.png",
  },
}

const SportPanel = ({ sport, text }: { sport: Sport; text: string }) => {
  const { left, right } = sportImages[sport]

  return (
    <>
      <div className="side-title">
        <img src={left} alt="" />
      </div>
      <div className="mid-info">
        <p>{text}</p>
      </div>
      <div className="side-img">
        <img
          src={right}
          alt=""
        />
      </div>
    </>
  )
}

export default SportPanel
