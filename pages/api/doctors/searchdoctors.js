import mongoose from "mongoose";
import Doctor from "../../../util/Models/Doctor";
import { initMongoose } from "../../../util/mongodb";
export default async function handler(req, res) {
  const {
    body,
    method,
    query: { query },
  } = req;
  console.log(body);
  await initMongoose();
  // try {
  //   const user = await Doctor.find({});
  //   res.json({ status: 200, data: user });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  if (method === "GET") {
    try {
      const agg = [
        {
          $search: {
            index: "default",
            text: {
              query: query,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ];

      const searchresults = await Doctor.aggregate(agg);
      res.json({ status: 200, data: searchresults });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  // if (method === "POST") {
  //   try {
  //     const order = await PatientUser.updateOne(
  //       { email: email },
  //       {
  //         $setOnInsert: req.body,
  //       },
  //       { upsert: true }
  //     );
  //     res.status(200).json(order);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }
  if (method === "POST") {
    try {
      const newUser = new Doctor(body);
      const order = await newUser.save();
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  // if (method === "PUT") {
  //   try {
  //     const order = await PatientUser.findById(name, req.body, {
  //       new: true,
  //     });
  //     res.status(200).json(order);
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }
  // }
  if (method === "DELETE") {
  }
  res.json(await Doctor.find().exec());
}
