import data from "./data.json" assert { type: "json" };

const body = document.querySelector("body");
body.insertAdjacentHTML("beforeend", markupTable());

const tableBody = document.querySelector(".table-body");
let rowsCount = 0;
let dates = [];

function addElement(waterData) {
  for (let i = 0; i < waterData.length; i += 1) {
    if (dates.includes(waterData[i].collectiondate)) {
      if (waterData[i].parameter_smarts === "Oil and Grease") {
        tableBody.rows[
          dates.indexOf(waterData[i].collectiondate)
        ].cells[2].innerHTML = waterData[i].result_display;
      } else if (
        waterData[i].parameter_smarts === "Total Suspended Solids (TSS)"
      ) {
        tableBody.rows[
          dates.indexOf(waterData[i].collectiondate)
        ].cells[3].innerHTML = waterData[i].result_display;
      } else if (
        waterData[i].parameter_smarts ===
        "Biochemical Oxygen Demand (BOD) (5-day @ 20 Deg. C)"
      ) {
        tableBody.rows[
          dates.indexOf(waterData[i].collectiondate)
        ].cells[4].innerHTML = waterData[i].result_display;
      } else if (waterData[i].parameter_smarts === "pH") {
        tableBody.rows[
          dates.indexOf(waterData[i].collectiondate)
        ].cells[5].innerHTML = waterData[i].result_display;
      }
    } else {
      tableBody.insertAdjacentHTML("beforeend", markup(waterData[i]));

      if (waterData[i].parameter_smarts === "Oil and Grease") {
        tableBody.rows[rowsCount].cells[2].innerHTML =
          waterData[i].result_display;
      } else if (
        waterData[i].parameter_smarts === "Total Suspended Solids (TSS)"
      ) {
        tableBody.rows[rowsCount].cells[3].innerHTML =
          waterData[i].result_display;
      } else if (
        waterData[i].parameter_smarts ===
        "Biochemical Oxygen Demand (BOD) (5-day @ 20 Deg. C)"
      ) {
        tableBody.rows[rowsCount].cells[4].innerHTML =
          waterData[i].result_display;
      } else if (waterData[i].parameter_smarts === "pH") {
        tableBody.rows[rowsCount].cells[5].innerHTML =
          waterData[i].result_display;
      }

      rowsCount += 1;
      dates.push(waterData[i].collectiondate);
    }
  }
}

function markup(element) {
  return `
      <tr>
              <td class="test__date">
                  ${element.collectiondate}
              </td>
              <td>
                  ${element.monitoringpoint}
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
          </tr>

      `;
}

function markupTable() {
  return `
      <table>
        <thead>
            <tr>
                <th colspan="2">Sample Informations</th>
                <th colspan="4">Analytical Parameters</th>
            </tr>
            <tr>
                <th>Date</th>
                <th>Outfall Identification</th>
                <th>Oil and Grease</th>
                <th>Total Suspended Solids (TSS)</th>
                <th>Biochemical Oxygen Demand (BOD) (5-day @ 20 Deg. C)</th>
                <th>pH</th>
            </tr>
        </thead>
        <tbody class="table-body">


        </tbody>
    </table>

      `;
}

addElement(data.portal_qry_wq);
