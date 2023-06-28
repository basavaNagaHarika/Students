const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// API endpoint for getting student details and subjects
router.get("/:customerId", async (req, res) => {
  const customerId = req.params.customerId;

  try {
    // Query to fetch student details and subjects for the given customer ID
    const query =
      "SELECT c.name, c.email, GROUP_CONCAT(s.subjectName ORDER BY s.subjectName ASC) AS subjects FROM customers c LEFT JOIN subject_student_mapping m ON c.customerId = m.customerId LEFT JOIN subjects s ON m.subjectId = s.subjectId WHERE c.customerId = ? GROUP BY c.customerId";

    // Execute the query with the customer ID as a parameter
    const result = await pool.query(query, [customerId]);

    // Check if a student was found
    if (result[0].length > 0) {
      console.log(result[0]);
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    console.error("Error retrieving student details:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
