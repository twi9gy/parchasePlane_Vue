<template>
  <mdb-line-chart
      :data="lineChartData"
      :options="lineChartOptions"
      :width="width"
      :height="height"
      :backgroundColor="'#00BFFF'"
      >
  </mdb-line-chart>
</template>

<script>
  import { mdbLineChart } from "mdbvue";
  export default {
    name: "Chart",
    components: {
      mdbLineChart
    },
    props: [
      'values',
      'labels',
      'backgroundColor',
      'borderColor',
      'title',
      'height',
      'width'
    ],
    data() {
      return {
        lineChartData: {
          labels: this.labels,
          datasets: [
            {
              label: this.title,
              backgroundColor: this.backgroundColor,
              borderColor: this.borderColor,
              borderWidth: 0.7,
              data: this.values
            }
          ]
        },
        lineChartOptions: {
          responsive: false,
          maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: true,
                  color: "rgba(0, 0, 0, 0.1)"
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: true,
                  color: "rgba(0, 0, 0, 0.1)"
                }
              }
            ]
          }
        }
      };
    },
  };
</script>