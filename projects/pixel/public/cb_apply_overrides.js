// Custom code
__cba.getDataFromClient = function () {
  console.log('I am overridden');
  return "x";
}

__cba.ApplicationCompleted = function () {
  return true;
}
