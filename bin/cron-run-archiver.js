const CronJob = require("cron").CronJob;
const pm2 = require("pm2");

console.log("Before job instantiation");
const job = new CronJob(
  "0 */1 * * * *",
  function () {
    const d = new Date();
    console.log("Running script:", d);
    pm2.start(
      {
        script: "npm -- run archive",
        autorestart: false,
      },
      (err, apps) => {
        pm2.disconnect();
        if (err) {
          throw err;
        }
      }
    );
  },
  null,
  false,
  "Asia/Kolkata"
);
console.log("After job instantiation");
job.start();
console.log("is job running? ", job.running);
console.log("System TZ next 5: ", job.nextDates(5));
