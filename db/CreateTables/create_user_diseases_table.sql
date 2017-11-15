CREATE TABLE IF NOT EXISTS UserDiseases(
DiseaseId INT,
userid INT,
FOREIGN KEY (DiseaseId) REFERENCES Diseases(DiseaseId),
FOREIGN KEY (userid) REFERENCES users(UserId)
);