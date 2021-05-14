<template>
    <mdb-line-chart
            :data="lineChartData"
            :options="lineChartOptions"
            :width="width"
            :height="height">
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
            'countProduct',
            'labels',
            'backgroundColor',
            'borderColor',
            'title',
            'height',
            'width',
            'pointOrder',
            'reserve',
            'orders'
        ],
        data() {
            return {
                lineChartData: {
                    labels: this.labels,
                    datasets: [
                        {
                            label: 'Количество товара',
                            backgroundColor: this.backgroundColor,
                            borderColor: this.borderColor,
                            borderWidth: 0.7,
                            fill: true,
                            data: this.countProduct
                        },
                        {
                            label: 'Уровень точки заказа',
                            backgroundColor: 'rgba(0, 255, 127, 0.4)',
                            borderColor: 'rgba(0, 255, 127, 0.4)',
                            borderWidth: 2,
                            fill: false,
                            data: this.pointOrder
                        },
                        {
                            label: 'Уровень резервного запаса',
                            backgroundColor: 'rgba(255, 0, 0, 0.6)',
                            borderColor: 'rgba(255, 0, 0, 0.6)',
                            borderWidth: 0.7,
                            fill: false,
                            data: this.reserve
                        },
                        {
                            label: 'Количество товара на момент заказа',
                            backgroundColor: 'rgba(0, 191, 255, 1)',
                            borderWidth: 3,
                            fill: false,
                            data: this.orders
                        },
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
        }
    };
</script>