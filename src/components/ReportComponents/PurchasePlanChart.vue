<script>
import { Scatter } from 'vue-chartjs'

export default {
    extends: Scatter,
    props: ['labels', 'values'],
    mounted () {
        if (this.labels !== undefined && this.values !== undefined) {
            this.renderChart(
                {
                    datasets: [
                        {
                            label: 'Scatter Dataset 1',
                            fill: true,
                            borderColor: '#f87979',
                            backgroundColor: '#f87979',
                            data: [
                                {
                                    x: -2,
                                    y: 4
                                }, 
                                {
                                    x: -1,
                                    y: 1
                                }, 
                                {
                                    x: 0,
                                    y: 0
                                }, 
                                {
                                    x: 1,
                                    y: 1
                                }, 
                                {
                                    x: 2,
                                    y: 4
                                }
                            ]
                        },
                        {
                            label: 'Scatter Dataset 2',
                            fill: false,
                            borderColor: '#7acbf9',
                            backgroundColor: '#7acbf9',
                            data: [
                                {
                                    x: -2,
                                    y: -4
                                }, 
                                {
                                    x: -1,
                                    y: -1
                                }, 
                                {
                                    x: 0,
                                    y: 1
                                }, 
                                {
                                    x: 1,
                                    y: -1
                                }, 
                                {
                                    x: 2,
                                    y: -4
                                }
                            ]
                        }
                    ]
                },
                {
                    responsive: true,
                     maintainAspectRatio: false
                }
            );
        }
    }
}
</script>
