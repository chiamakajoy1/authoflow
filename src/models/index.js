const User = require("./User");
const Hospital = require("./Hospital");
const Patient = require("./Patient");

Hospital.hasMany(User, {
  foreignKey: "hospitalId",
});

User.belongsTo(Hospital, {
  foreignKey: "hospitalId",
});

Hospital.hasMany(Patient, {
  foreignKey: "hospitalId",
});

Patient.belongsTo(Hospital, {
  foreignKey: "hospitalId",
});

module.exports = {
  User,
  Hospital,
  Patient,
};