import { Streak } from "../model/Streak.model";

const logDay = async (req, res) => {
  try {
    const { date, urgeLevel } = req.body;

    if (date === "" || urgeLevel === 0) {
      throw new error("Date or  Urge Level is missing.");
    }

    const newLog = NoFap(date, urgeLevel);

    await newLog.save();

    res.status(200).json({ message: "Day successfully tracked!" });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: "This day is already logged." });
    }
    res.status(500).json({ error: err.message });
  }
};

const getCurrentStreak = async (req, res) => {
  try {
    const loggedDocs = Streak.find({}, { date: 1, _id: 0 });
    const dateSet = new Set(loggedDocs.map((doc) => doc.date));

    let streakCount = 0;
    let checkDate = new Date();

    const formatDate = (dateObj) => dateObj.toISOString().split("T")[0];


    let  todayStr = formatDate(checkDate)
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1)
    let yesterdayStr = formatDate(yesterday)

    if(!dateSet.has(todayStr) && !dateSet.has(yesterdayStr)){
       return res.json({ currentStreak: 0, message: "Streak broken! Log a new day to start over." });
    }

    if(!dateSet.has(todayStr) && dateSet.has(yesterdayStr)){
      checkDate = yesterday
    }

    while(dateSet.has(formatDate(checkDate))){
      streakCount++;

      checkDate.setDate(checkDate.getDate() - 1);

    }

    res.status(200).json({
      currentStreak: streakCount,
      totalDaysLogged: dateSet.size

    })
  } catch (err) {
        res.status(500).json({ err: err.message });

  }
};
