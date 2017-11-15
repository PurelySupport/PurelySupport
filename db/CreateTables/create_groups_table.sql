CREATE TABLE IF NOT EXISTS Groups(
GroupId SERIAL PRIMARY KEY,
DiseaseId INT,
Name Varchar (60),
FOREIGN KEY (DiseaseId) REFERENCES Diseases(DiseaseId)
);
