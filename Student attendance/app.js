const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); 

// Route to handle attendance data submissions
app.post('/submit-attendance', (req, res) => {
    const selectedDate = req.body.date;
    const attendanceData = req.body.attendanceData;
    // Save the attendance data to a file or database on the backend
    // Replace this with your specific implementation
    // For example, you can save it to a text file
    fs.writeFileSync(`attendance.txt`, JSON.stringify(attendanceData));

    res.status(200).json({ message: 'Attendance data saved successfully' });
});

// Route to fetch attendance data for a specific date
app.get('/attendance/:date', (req, res) => {
    const selectedDate = req.params.date;

    // Check if the file exists before attempting to read it
    if (fs.existsSync('attendance.txt')) {
        // Read the attendance data from the 'attendance.txt' file
        try {
            const data = fs.readFileSync('attendance.txt', 'utf8');
            const attendanceData = JSON.parse(data);

            // Check if attendance data exists for the selected date
            if (attendanceData[selectedDate]) {
                // Attendance data for the selected date exists, send it as a response
                res.status(200).json({ attendanceData: attendanceData[selectedDate] });
            } else {
                // Attendance data for the selected date doesn't exist
                res.status(204).send();
            }
        } catch (err) {
          console.log(err)
        }
    } else {
        // File does not exist, respond with a 204 status code
        res.status(204).send();
    }
});
// Route to fetch all attendance data
app.get('/attendance', (req, res) => {
    try {
        const data = fs.readFileSync('attendance.txt', 'utf8');
        const attendanceData = JSON.parse(data);
        const attendanceArray = Object.values(attendanceData);
        res.status(200).json(attendanceArray);
    } catch (err) {
        console.log(err)
    }
});

app.listen(3000);