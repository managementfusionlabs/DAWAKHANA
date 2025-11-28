// run once: node updateForms.js

import mongoose from "mongoose";
import Medicine from "./models/Medicine.js";

mongoose.connect("mongodb://127.0.0.1:27017/dawakhana");

async function run() {
  const meds = await Medicine.find();

  for (let m of meds) {
    if (!m.form) {
      m.form = "Tablet";  // default or detect by category
      await m.save();
    }
  }

  console.log("Updated all medicines!");
  process.exit();
}

run();
