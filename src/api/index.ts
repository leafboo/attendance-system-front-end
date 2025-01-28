const attendanceApi = {
  // Note: async functionName is only used in objects or classes. It is the shorthand for async function functionName 
  async fetchData() {
    const [attendanceResponse, studentResponse] = await Promise.allSettled([
      fetch("https://lites-ams-api-main.vercel.app/attendance/get"),
      fetch("https://lites-ams-api-main.vercel.app/student/get")
    ]);

    let attendanceData, studentData

    if (attendanceResponse.status == "fulfilled") {
      attendanceData = await attendanceResponse.value.json();
    } else {
      console.error(attendanceResponse.reason);
    }

    if (studentResponse.status == "fulfilled") {
      studentData = await studentResponse.value.json();
    } else {
      console.error(studentResponse.reason);
    }
    return [attendanceData, studentData]
  },

  async addAttendance(addInputValue: string, isTimeIn: boolean, fetchData:() => void) {
    try {
      const response = await fetch('https://lites-ams-api-main.vercel.app/attendance/add', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: addInputValue,
          time_status: isTimeIn === true ? 1 : 0
        })
      })
      const data = await response.json();
      console.log(data)
      fetchData();

    } catch (error) {
      console.error(error)
    }
  },
  async getDownloadableExcelFile() {
    try {
          const response = await fetch('https://lites-ams-api-main.vercel.app/attendance/export', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              "file_name": "attendance.xlsx" // placeholder file name
            }),
          })
          // blob is basically json but different structure and for files coming from the server, in this case, an excel file
          // blobs are the data of the files I think
          const data = await response.blob();
          const url = window.URL.createObjectURL(data);
          // starting from here, idk what these does
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          a.download = 'attendance';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
         
        } catch(error) {
          console.error(error)
        }
  },
  async delete(idNumber: string, isTimeIn: boolean, fetchData: () => void) {
    try {
      const response = await fetch(`https://lites-ams-api-main.vercel.app/attendance/delete?student_id=${idNumber}&time_status=${isTimeIn ? 1 : 0}`,{
        method: 'DELETE'
      });
      const data = await response.json();
      console.log(data)
      fetchData();

    } catch(error) {
      console.error(error);
    }
  },
  async deleteAll(fetchData: () => void) {
    try {
      const response = await fetch("https://lites-ams-api-main.vercel.app/attendance/clear", {
        method: 'DELETE'
      });
      const data = await response.json();
      console.log(data);
      fetchData();
    } catch(error) {
      console.error(error);
    }
  }
}

export default attendanceApi;