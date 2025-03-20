// Your code here
// Function to create an employee record from an array
function createEmployeeRecord(arry) {
    return {
      firstName: arry[0],
      familyName: arry[1],
      title: arry[2],
      payPerHour: arry[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create multiple employee records
  function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord);
  }
  
  // Function to create a TimeIn event
  function createTimeInEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(' '); // Split into date and hour
    let newEvent = {
      type: "TimeIn",
      date: date,
      hour: parseInt(hour, 10) // Convert hour to integer
    };
    employeeRecord.timeInEvents.push(newEvent);
    return employeeRecord;
  }
  
  // Function to create a TimeOut event
  function createTimeOutEvent(employeeRecord, dateTime) {
    let [date, hour] = dateTime.split(' '); // Split into date and hour
    let newEvent = {
      type: "TimeOut",
      date: date,
      hour: parseInt(hour, 10) // Convert hour to integer
    };
    employeeRecord.timeOutEvents.push(newEvent);
    return employeeRecord;
  }
  
  // Function to calculate hours worked on a specific date
  function hoursWorkedOnDate(employeeRecord, date) {
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    
    if (timeInEvent && timeOutEvent) {
      let timeIn = timeInEvent.hour; // Time in hour
      let timeOut = timeOutEvent.hour; // Time out hour
      let hoursWorked = (timeOut - timeIn) / 100; // Convert minutes to hours
      return hoursWorked; 
    }
    return 0;
  }
  
  // Function to calculate wages earned on a specific date
  function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    return hoursWorked * employeeRecord.payPerHour; // Calculate wages
  }
  
  // Function to calculate all wages for an employee
  function allWagesFor(employeeRecord) {
    let totalWages = 0;
    employeeRecord.timeInEvents.forEach(function (timeInEvent) {
      let timeOutEvent = employeeRecord.timeOutEvents.find(function (timeOut) {
        return timeOut.date === timeInEvent.date;
      });
  
      if (timeOutEvent) {
        let hoursWorked = hoursWorkedOnDate(employeeRecord, timeInEvent.date);
        totalWages += hoursWorked * employeeRecord.payPerHour; // Add the daily wages to total
      }
    });
    return totalWages;
  }
  
  // Function to calculate the total payroll for all employees
  function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;
    employeeRecords.forEach(function (employee) {
      totalPayroll += allWagesFor(employee); // Sum the wages for each employee
    });
    return totalPayroll;
  }
  
  // Sample employee data
  const csvDataEmployees = [
    ["Thor", "Odinsson", "Electrical Engineer", 45],
    ["Loki", "Laufeysson-Odinsson", "HR Representative", 35],
    ["Natalia", "Romanov", "CEO", 150],
    ["Darcey", "Lewis", "Intern", 15],
    ["Jarvis", "Stark", "CIO", 125],
    ["Anthony", "Stark", "Angel Investor", 300]
  ];
  
  const csvTimesIn = [
    ["Thor", ["2018-01-01 0800", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Loki", ["2018-01-01 0700", "2018-01-02 0700", "2018-01-03 0600"]],
    ["Natalia", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1300"]],
    ["Darcey", ["2018-01-01 0700", "2018-01-02 0800", "2018-01-03 0800"]],
    ["Jarvis", ["2018-01-01 0500", "2018-01-02 0500", "2018-01-03 0500"]],
    ["Anthony", ["2018-01-01 1400", "2018-01-02 1400", "2018-01-03 1400"]]
  ];
  
  const csvTimesOut = [
    ["Thor", ["2018-01-01 1600", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Loki", ["2018-01-01 1700", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Natalia", ["2018-01-01 2300", "2018-01-02 2300", "2018-01-03 2300"]],
    ["Darcey", ["2018-01-01 1300", "2018-01-02 1300", "2018-01-03 1300"]],
    ["Jarvis", ["2018-01-01 1800", "2018-01-02 1800", "2018-01-03 1800"]],
    ["Anthony", ["2018-01-01 1600", "2018-01-02 1600", "2018-01-03 1600"]]
  ];
  
  // Create employee records from the CSV data
  let employeeRecords = createEmployeeRecords(csvDataEmployees);
  employeeRecords.forEach(function (rec) {
    let timesInRecordRow = csvTimesIn.find(function (row) {
      return rec.firstName === row[0];
    });
  
    let timesOutRecordRow = csvTimesOut.find(function (row) {
      return rec.firstName === row[0];
    });
  
    timesInRecordRow[1].forEach(function (timeInStamp) {
      createTimeInEvent(rec, timeInStamp);
    });
  
    timesOutRecordRow[1].forEach(function (timeOutStamp) {
      createTimeOutEvent(rec, timeOutStamp);
    });
  });
  
  // Calculate the total payroll
  console.log(calculatePayroll(employeeRecords));  // Should return the correct payroll total (11880)
  