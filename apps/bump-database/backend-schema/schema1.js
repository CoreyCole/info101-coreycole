var schema = `
CREATE TABLE Students (
  uid VARCHAR(50) NOT NULL PRIMARY KEY,
  displayName VARCHAR(50) NOT NULL,
  email VARCHAR(50),
  facebookUid VARCHAR(50)
);
CREATE TABLE Bumps (
  bumpId int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  uid VARCHAR(50),
  expAmount int NOT NULL,
  timeRequested TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  whatDay DATE NOT NULL,
  forWhat VARCHAR(255) DEFAULT 'for meritous behavior'
);
`

module.exports = schema
