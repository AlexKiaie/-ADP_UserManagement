FROM mongo

COPY employeeData.json /employeeData.json
COPY departmentData.json /departmentData.json

CMD mongoimport --host mongodb --db adp_db --collection employees --type json --file /employeeData.json --jsonArray;mongoimport --host mongodb --db adp_db --collection departments --type json --file /departmentData.json --jsonArray