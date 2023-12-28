# Student Enrollment Form

## Description

The Student Enrollment Form is a web application designed to gather information from users using an HTML form. The form includes fields such as Roll Number, Full Name, Class, Date of Birth, Address, and Enrollment Date. The collected data is stored in JsonPowerDB, a NoSQL database.

### Functionality

- **Adding Students:** Users can input the Roll Number, Full Name, Class, Date of Birth, Address, and Enrollment Date. When the Roll Number is submitted, the system checks whether the student's data is already available in the database. If it is not present, a new record is created. If the Roll Number already exists, the form is populated with the existing data, allowing users to update it.

## Release History

### Version 1.0.0 (28-12-2023)

- Initial release of the Student Enrollment Form.
- Implemented the functionality to add and update student records.
- Integration with JsonPowerDB for data storage.

## How to Use

1. Clone the repository to your local machine.
2. Set up a JsonPowerDB instance and configure the connection parameters.
3. Open the HTML form in a web browser.
4. Enter the student details and submit the form.

**Note:** Ensure that you have the necessary permissions and credentials to access the JsonPowerDB instance.

For more information on JsonPowerDB, visit [JsonPowerDB Documentation](https://login2explore.com/jpdb/docs.html).

Visit My Website To View https://pratikshinde.in
