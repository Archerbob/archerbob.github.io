function filterData() {
  event.preventDefault();
  
  var startdate = new Date(document.getElementById("startdate").value);
  var enddate = new Date(document.getElementById("enddate").value);
  
  console.log(startdate);
  console.log(enddate);

  var tableRows = document.querySelectorAll("#pitchData tr");

  tableRows.forEach(row => {
    var dateText = row.cells[1].textContent; // Get the date from the 2nd column (index 1)
    var rowDate = new Date(dateText);

    // Check if the row date is within the specified date range
    if (rowDate >= startdate && rowDate <= enddate) {
      row.style.display = ""; // Show row
    } else {
      row.style.display = "none"; // Hide row
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.getElementById('pitchData');

  fetch('https://compute.samford.edu/zohauth/clients/datajson/1')
      .then(response => response.json())
      .then(data => {
          data.forEach(pitch => {
              const row = document.createElement('tr');
              
              // Create link for pitch number with details page
              const pitchLink = `<a href="details.html?id=${pitch.PitchNo}">Pitch ${pitch.PitchNo}</a>`;

              // Populate table row with relevant data
              row.innerHTML = `
                  <td>${pitchLink}</td>
                  <td>${pitch.Date}</td>
                  <td>${pitch.Time}</td>
                  <td>${pitch.Batter}</td>
                  <td>${pitch.Balls}</td>
                  <td>${pitch.Strikes}</td>
                  <td>${pitch.Outs}</td>
                  <td>${pitch.PitchCall}</td>
                  <td>${pitch.KorBB || ''}</td>
                  <td>${pitch.RelSpeed || ''}</td>
                  <td>${pitch.SpinRate || ''}</td>
                  <td>${pitch.SpinAxis || ''}</td>
              `;
              
              tableBody.appendChild(row);
          });
      })
      .catch(error => {
          console.error('Error fetching pitch data:', error);
      });
});