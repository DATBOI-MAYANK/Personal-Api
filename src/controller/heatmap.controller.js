import { NoFap } from "../model/NoFapLog.model";

const logDay = async (req, res) => {
  try {
    const { date, urgeLevel } = req.body;

    if (date === "" || urgeLevel === 0) {
      throw new error("Date or  Urge Level is missing.");
    }


    const newLog = NoFap(date, urgeLevel);

    await newLog.save();

    res.status(200).json({ message: "Day successfully tracked!" })
  } catch (err) {
    if (error.code === 11000) {
      return res.status(400).json({ error: "This day is already logged." });
    }
    res.status(500).json({ error: error.message });

  }
};
