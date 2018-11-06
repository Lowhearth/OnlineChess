module.exports = function Player (id, alliance, socket){
  self={
    Id: id,
    Alliance: alliance,
    socket:socket

  }
  return self;
}
