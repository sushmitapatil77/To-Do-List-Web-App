//jshint esversion:6

exports.getDate = function() {
  const today = new Date();
  const options = {
    weekday: "long",
    month: "numeric",
    day: "numeric"
  };

  return today.toLocaleDateString("en-US", options);
};
