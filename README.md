# Systems Design - Diseño de Sistemas (2020 - Second Semester)

## Summary

In this repository I have located a copy of the work I've done in Programming this year.
As the semester goes by, we will be making some code optimizations to the current one.


## ***Task:*** **Diagrams**

#### *User-case diagram*
Here in this scheme, my classmate Yoel Fernandez and I described the general behaviour of the system. 
Basically we've desplayed the system and three different user types: the administrators, the seismologists and the analists or all the rest of the organization.

Every one of them has specific tasks:
The administrators is able to:
- Assign sensors to seismologists.
- Have access to existent sensors: modify, activate or deactivate.
- Register new users.

The seismologists can:
- List left seisms to validate.
- List assigned sensors.
- Modify unverified seisms data. 
  - If it is an excessive amount of data to verify, they can download it. 
  - If there are not mistakes left, the users can validate the seism.

The analists (or any other institute member) is be able to:
- Access verified seisms.
- Filter and download the sensors data in a CSV or ZIP file.
  
The system must:
- Send notifications to administrators whenever any active sensor stops working.

![User-case diagram](https://i.ibb.co/VLqc45n/usecase-diag.png)

#### *UML Classes diagram*
Here there are the system classes depicted.

![UML Classes diagram](https://i.ibb.co/PrvMvqY/uml.png)
