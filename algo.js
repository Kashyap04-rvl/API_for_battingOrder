const mongo = require("mongoose");
const route = require("express").Router();

const db = mongo.model("mymodel"); // We used the model form the crick_api module

function calculateNextBattinOrder(remainingPlayers, matchContext) {
  let w1, w2, w3; //Weights
  console.log(matchContext.pressure);
  if (matchContext.pressure > 0.7) {
    w1 = 0.7;
    w2 = 0.0;
    w3 = 0.3;
  } else {
    w1 = 0.2;
    w2 = 0.6;
    w3 = 0.2;
  }

  return remainingPlayers
    .map((player) => {
    //   console.log(player.anchorSkill);
    //   console.log(player.finisherSkill);
    //   console.log(player.matchup_rating);
      const baselineScore =
        w1 * player.anchorSkill +
        w2 * player.finisherSkill +
        w3 * player.matchup_rating[matchContext.bowler];
      const pressureModifier = player.performance_under_pressure;
      const finalScore = baselineScore * pressureModifier * player.recentform;

      return {
        id: player.id,
        name: player.name,
        score: parseFloat((finalScore * 100).toFixed(1)),
        badges:
          player.performance_under_pressure > 0.8 ? ["Clutch Performer"] : [],
      };
    })
    .sort((a, b) => b.score - a.score);
}

route.post("/api/batorder/", async (req, res) => {
  try {
    const { team, pressure, bowler } = req.body;

    if (!team || !pressure) {
      return res.status(400).json({ message: "Missing Team name or Pressure" });
    }

    const remainingPlayers = await db.find({ team: team, hasbated: false });

    if (remainingPlayers.length === 0) {
      return res
        .status(200)
        .json({ message: "All players Havae Already bated!", lineup: [] });
    }
    const matchContext = { pressure: pressure, bowler: bowler };
    const optimizedLineup = calculateNextBattinOrder(
      remainingPlayers,
      matchContext,
    );

    return res.status(200).json({
      success: true,
      phase: pressure,
      recommended_order: optimizedLineup[0] || null, // top player in the lineup
      full_lineup: optimizedLineup,
    });
  } catch (error) {
    console.error("Error in oprimizing Batting Order" + error);
    return res.status(500).json({ message: "Internal Servwer Error" });
  }
});

module.exports = route;
