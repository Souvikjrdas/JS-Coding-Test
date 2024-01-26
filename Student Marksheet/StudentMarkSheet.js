const students = [
  { name: "Dhishan Debnath", Roll: 1 },
  { name: "Animesh Gupta", Roll: 2 },
  { name: "Tapas Sen", Roll: 3 },
  { name: "Misti Dutta", Roll: 4 },
  { name: "Chini Misra", Roll: 5 },
];

const details = [
  { Roll: 5, subjects: { math: 35, english: 56, chemistry: 76, computer: 68 } },
  { Roll: 3, subjects: { math: 33, chemistry: 12, computer: 50, english: 35 } },
  { Roll: 1, subjects: { math: 55, english: 75, chemistry: 76, computer: 94 } },
  { Roll: 4, subjects: { english: 12, chemistry: 85, computer: 68, math: 45 } },
  { Roll: 2, subjects: { math: 55, english: 56, computer: 48, chemistry: 12 } },
];

const studentsMarkSheet = [];

//function to compute Marksheet of each student
function generateStudentMarkSheets(studentList , studentDetails , sMarksheet) {

  studentList.forEach((student) => {
    let detail = studentDetails.find(function (element) {
      return element.Roll == this;
    }, student.Roll);
    if (detail !== undefined) {
      let totalMarks =
        detail.subjects.math +
        detail.subjects.english +
        detail.subjects.chemistry +
        detail.subjects.computer;
      let examinationStatus = totalMarks >= 200 ? "pass" : "fail";
      sMarksheet.push({
        ...student,
        math: detail.subjects.math,
        chemistry: detail.subjects.chemistry,
        computer: detail.subjects.computer,
        english: detail.subjects.english,
        total: totalMarks,
        status: examinationStatus,
      });
    }
  });
}
generateStudentMarkSheets(students , details , studentsMarkSheet);
console.log(studentsMarkSheet);
