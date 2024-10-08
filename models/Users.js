const mongoose = require("mongoose");
const Schema = mongoose.Schema;
mongoose.set("useCreateIndex", true);

const UserSchema = new Schema({
  info: {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    // email: {
    //   type: String,
    //   // match: /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    //   required: false,
    // },
    // dob: { type: Date, required: false },
  },
  // telegram: [],
  friends: [{ type: Schema.Types.ObjectId, ref: "user" }],
  chat: { type: Schema.Types.ObjectId, ref: "chat" },
  schoolPlanner: {
    courses: [
      {
        general: {
          name: {},
          year: {},
          term: {},
          discipline: {},
          status: {},
          grade: {},
          partOfStudyPlan: {},
        },
        lectureFormat: {
          schedule: [],
          location: {},
          progress: {
            pagesTotal: {},
            pagesFinished: {},
            pagesUnfinished: {},
            pagesDailyTarget: {},
          },
          instructors: [],
        },
        practicalFormat: {
          type: {},
          schedule: {
            startDate: {},
            endDate: {},
            type: {
              intervals: [
                {
                  startDate: {
                    day: {},
                    month: {},
                    year: {},
                  },
                  endDate: {
                    day: {},
                    month: {},
                    year: {},
                  },
                  time: {},
                  status: {},
                },
              ],
              days: [
                {
                  day: {},
                  month: {},
                  year: {},
                  time: {},
                  repeated: { type: Boolean },
                  status: {},
                },
              ],
            },
          },
          location: {},
          status: {},
          instructors: [],
          progress: {
            pagesTotal: {},
            pagesFinished: {},
            pagesUnfinished: {},
            pagesDailyTarget: {},
          },
        },
      },
    ],
    lectures: [
      {
        lecture_name: {},
        lecture_course: {},
        lecture_instructor: {},
        lecture_writer: {},
        lecture_date: {},
        lecture_length: {},
        lecture_progress: {},
        lecture_pagesFinished: [],
        lecture_outlines: [],
        lecture_partOfPlan: {},
        lecture_hidden: {},
      },
    ],
    exams: [],
    memory: {
      instructors: [],
    },
  },
  study: {
    inMemory: {
      units: [],
      dataTypes: [],
      sets: [],
      functionNames: [
        {
          name: {},
          class: {},
          family: {},
        },
      ],
    },
    propertyObjects: [
      {
        propertyName: {},
        propertyLevel: {},
        propertyDataType: {},
        propertyDomain: {},
        propertyUnit: {},
      },
    ],
    functionNatures: [
      {
        name: {},
      },
    ],
    functionCodes: [
      {
        name: {},
      },
    ],
    changeFactors: [
      {
        name: {},
      },
    ],
    structures: [
      {
        keyword_structureName: {},
        keyword_structureSource: {},
        keyword_structureStatus: {},
        keyword_structureLevel: {},
        keyword_structureProperties: [],
      },
    ],
    function_keywords: [
      {
        keyword_functionName: {},
        keyword_functionNature: {},
        keyword_functionCode: [],
      },
    ],
    statements: [
      {
        statement_subjectProperty: {},
        statement_verb: {},
        statement_objectProperty: {},
      },
    ],
  },
  status: {
    isConnected: { type: Boolean, default: false },
  },
  notifications: [
    {
      id: { type: String, required: true },
      message: { type: String, required: true },
      status: { type: String, default: "unread" },
    },
  ],
  posts: [{ type: Schema.Types.ObjectId, ref: "posts" }],
  terminology: [
    {
      term: { type: String, required: true },
      meaning: { type: String, required: true },
      category: { type: String, required: true },
      subject: { type: String, required: true },
      date: { type: Date, default: Date.now() },
    },
  ],
  study_session: [
    {
      date: { type: Date, required: true },
      length: { type: Object, required: true },
    },
  ],
});
const UserModel = mongoose.model("user", UserSchema);
module.exports = UserModel;
