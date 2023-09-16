document.addEventListener('DOMContentLoaded', () => {
    const datePicker = document.getElementById('datePicker');
    const searchButton = document.getElementById('searchButton');
    const makeAttendanceButton = document.getElementById('makeattendance');
    const attendanceForm = document.getElementById('attendanceForm');
    const attendanceResult = document.getElementById('attendanceResult');
    const fetchAttendanceButton = document.getElementById('fetchAttendance');

    let attendanceData = {}; 

    searchButton.disabled = true;
    
    const studentDetails = [
        { id: 1, name: "Siva" },
        { id: 2, name: "Rajesh" },
        { id: 3, name: "Ashok" },
        { id: 4, name: "Sai" },
        { id: 5, name: "Ram" },
        { id: 6, name: "Krishna" },
        { id: 7, name: "Ramesh" },
        { id: 8, name: "Suresh" },
        { id: 9, name: "Naresh" },
        { id: 10, name: "Mahesh" }
    ];

    // Add an event listener to the date picker to enable the search button when a date is selected
    datePicker.addEventListener('change', () => {
        if (datePicker.value !== '') {
            searchButton.disabled = false;
        } else {
            searchButton.disabled = true;
        }
    });
    
    searchButton.addEventListener('click', () => {
        if (datePicker.value === '') {
            alert('Please select a date before searching.');
            return;
        }
        const selectedDate = datePicker.value;
        
        axios.get(`http://localhost:3000/attendance/${selectedDate}`)
        .then(response => {
            if (response.status === 200) {
                displayAttendanceResult(response.data.attendanceData);
            } else if (response.status === 204)  {
                // Attendance data for the selected date doesn't exist in the backend.
                // Create attendance data for the selected date.
                createAttendanceData(selectedDate);

                // Proceed with generating input fields and checkboxes as before.
                let studentInputs = '';
                studentDetails.forEach(student => {
                    studentInputs += `
                        <div>
                            <label for="student${student.id}">${student.name}:</label>
                            <input type="radio" id="present${student.id}" name="attendance${student.id}" value="present">
                            <label for="present${student.id}">Present</label>
                            <input type="radio" id="absent${student.id}" name="attendance${student.id}" value="absent">
                            <label for="absent${student.id}">Absent</label>
                        </div>
                    `;
                });
                attendanceForm.innerHTML = studentInputs;
                attendanceForm.style.display = 'block';
                attendanceResult.style.display = 'none';
            }
        })
        .catch(err => console.error(err));
    });
    
    makeAttendanceButton.addEventListener('click', () => {
        const selectedDate = datePicker.value;
        attendanceData[selectedDate] = {};
        studentDetails.forEach(student => {
            const presentCheckbox = document.getElementById(`present${student.id}`);
            const absentCheckbox = document.getElementById(`absent${student.id}`);
            if (presentCheckbox.checked) {
                attendanceData[selectedDate][student.name] = 'Present';
            } else if (absentCheckbox.checked) {
                attendanceData[selectedDate][student.name] = 'Absent';
            } else {
                attendanceData[selectedDate][student.name] = 'Not Marked';
            }
        });
    
        axios.post('http://localhost:3000/submit-attendance', {
            date: selectedDate,
            attendanceData: attendanceData,
        })
        .then(response => {
            console.log(response.data.message);
            displayAttendanceResult(attendanceData[selectedDate]);
        })
        .catch(err => console.error(err));
    });


//    function of fetch report

    fetchAttendanceButton.addEventListener('click', () => {
        axios.get(`http://localhost:3000/attendance`)
        .then(response => {
            if (response.status === 200) {
                displayfetchResult(response.data);
            } else {
                console.log('no data found');
            }
        })
        .catch(err => console.error(err));
       });

    function displayfetchResult(fetchdata){
        attendanceForm.style.display = 'none';
        attendanceResult.style.display = 'none';
        const studentsAttendance = {};
        let totalDates = 0;


        fetchdata.forEach(entry => {
            totalDates++;
            for (const [student, status] of Object.entries(entry)) {
                if (status === 'Present') {
                    if (!studentsAttendance[student]) {
                        studentsAttendance[student] = 1;
                    } else {
                        studentsAttendance[student]++;
                    }
                }
            }
        });
    
        let resultHtml = '<h2>Attendance Report</h2>';
        resultHtml += '<table>';
        resultHtml += '<tr><th>Student Name</th><th>Number of Days Present</th></tr>';
    
        studentDetails.forEach(student => {
            const studentName = student.name;
            const daysPresent = studentsAttendance[studentName] || 0;
            const attendancePercentage = ((daysPresent / totalDates) * 100).toFixed(2);
    
            resultHtml += `<tr><td>${studentName}</td><td>${daysPresent} / ${totalDates}</td><td>${attendancePercentage}%</td></tr>`;
        });
    
        resultHtml += '</table>';
        attendanceResult.innerHTML = resultHtml;
        attendanceResult.style.display = 'block';
    }

    function displayAttendanceResult(attendanceResultData) {
        let resultHtml = '<h2>Attendance Result</h2>';
        Object.entries(attendanceResultData).forEach(([student, status]) => {
            resultHtml += `<p>${student}: ${status}</p>`;
        });

        // Hide the student data and show the attendance result
        attendanceForm.style.display = 'none';
        attendanceResult.innerHTML = resultHtml;
        attendanceResult.style.display = 'block';
    }
    
    // Function to create attendance data for a given date
    function createAttendanceData(date) {
        // Initialize attendance data for the given date
        attendanceData[date] = {};
        // Set the initial values for each student as 'Not Marked'
        studentDetails.forEach(student => {
            attendanceData[date][student.name] = 'Not Marked';
        });
    }
});
